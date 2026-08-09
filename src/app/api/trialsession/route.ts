import { NextRequest, NextResponse } from 'next/server'

// Magicline Connect API – kein Auth-Token nötig (öffentlicher Connect-Endpoint).
// Übernommen aus fitinn-landing-v2, angepasst auf die laufende Kampagne:
// keine Quiz-/Krankenkassen-Daten mehr, dafür eine feste Kampagnen-Notiz.
// Pflichtfelder von Magicline (gegen die API verifiziert): firstname, lastname,
// email, phone, gender, dateOfBirth und address mit street, houseNumber, zip,
// city, country. Fehlt eines davon, antwortet Magicline mit VALIDATION_FAILED.
const STUDIO_ID = '1210005460'
const BASE_URL = 'https://fit-inn-trier.api.magicline.com/connect/v1'

// Notiz, die mit jeder Buchung an Magicline übergeben wird.
const CAMPAIGN_NOTE = '5-Euro-Aktion 2026 – 12 Wochen für je 5 € · Probetraining über Landingpage gebucht'

// Warnung, die nur im Ausnahmefall in der Notiz landet (siehe unten).
const OHNE_TRAINER_NOTE = 'ACHTUNG: Ohne Trainerzuweisung gebucht – zum Zeitpunkt der Buchung war '
  + 'keine Ressource frei. Bitte manuell einen Trainer zuweisen.'

// GET: freie Probetraining-Termine im angefragten Zeitraum laden.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

  if (!startDate || !endDate) {
    return NextResponse.json({ error: 'startDate and endDate required' }, { status: 400 })
  }

  try {
    const res = await fetch(
      `${BASE_URL}/trialsession?studioId=${STUDIO_ID}&startDate=${startDate}&endDate=${endDate}`,
      { next: { revalidate: 300 }, signal: AbortSignal.timeout(15000) }
    )
    if (!res.ok) throw new Error(`Magicline ${res.status}`)
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Termine konnten nicht geladen werden' }, { status: 500 })
  }
}

// POST: Probetraining buchen (Lead + Termin in einem Schritt).
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      firstName, lastName, email, mobilephone, gender, dateOfBirth,
      street, houseNumber, zip, city,
      marketingConsent, note,
      startDateTime,
    } = body

    // Pflichtfelder prüfen (entspricht den Anforderungen der Magicline-Buchung).
    if (!firstName || !lastName || !email || !mobilephone || !gender || !dateOfBirth
      || !street || !houseNumber || !zip || !city || !startDateTime) {
      return NextResponse.json({ error: 'Alle Pflichtfelder sind erforderlich' }, { status: 400 })
    }

    // Kampagnen-Notiz + optionale Anmerkung des Interessenten zusammenführen.
    const bookingNote = [CAMPAIGN_NOTE, note ? `Anmerkung: ${note}` : '']
      .filter(Boolean)
      .join(' | ')

    // Der Kunde ist derselbe, egal ob mit oder ohne Trainer gebucht wird.
    const leadCustomer = {
      firstname: firstName,
      lastname: lastName,
      email,
      phone: mobilephone,
      gender,
      dateOfBirth,
      address: {
        street,
        houseNumber,
        zip,
        city,
        country: 'DE',
      },
      privacyConfiguration: {
        email: marketingConsent ?? false,
        phone: marketingConsent ?? false,
        letter: false,
        textMessage: marketingConsent ?? false,
        mySportsMessage: false,
      },
    }

    const buchen = (trainerRequired: boolean, note: string) =>
      fetch(`${BASE_URL}/trialsession/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({
          studioId: Number(STUDIO_ID),
          // startDateTime exakt als UTC-String aus der Slots-API durchreichen (kein Konvertieren!).
          startDateTime,
          trainerRequired,
          note,
          leadCustomer,
        }),
      })

    // `trainerRequired: true` sorgt dafür, dass Magicline dem Termin eine
    // Ressource – also einen Trainer – zuweist. Ohne das Flag legt Magicline
    // den Termin ohne Trainer an, obwohl `bookingWithoutResourcesAllowed` in
    // den Studioeinstellungen nur die *Erlaubnis* dazu ist, nicht der Wunsch.
    //
    // Magicline prüft die Ressourcen vor allem anderen und antwortet mit
    // CONFLICT, wenn keine frei ist. Geprüft über alle 43 angebotenen Termine
    // eines Zeitraums: überall war ein Trainer verfügbar. Der Fall ist also
    // selten – aber wenn er einträte, wäre ein verlorener Lead der teuerste
    // denkbare Ausgang. Deshalb wird dann ohne Trainer gebucht und der Termin
    // in der Notiz deutlich markiert, damit ihn jemand von Hand zuweist.
    let bookRes = await buchen(true, bookingNote)
    let ohneTrainer = false

    if (!bookRes.ok) {
      const ersterFehler = await bookRes.clone().text()
      // Bewusst eng: CONFLICT allein genügt nicht, denn auch ein inzwischen
      // vergebener Termin kann so antworten – den dürfen wir nicht durch einen
      // zweiten Versuch ohne Trainer doch noch durchdrücken. Nur die
      // Ressourcenmeldung löst den Rückfall aus.
      if (ersterFehler.includes('CONFLICT') && /resource/i.test(ersterFehler)) {
        console.warn('Magicline: keine Ressource frei für', startDateTime, '– Buchung ohne Trainer.')
        bookRes = await buchen(false, `${bookingNote} | ${OHNE_TRAINER_NOTE}`)
        ohneTrainer = bookRes.ok
      }
    }

    const bookText = await bookRes.text()

    if (!bookRes.ok) {
      return NextResponse.json(
        { error: `Buchung fehlgeschlagen (${bookRes.status})`, details: bookText },
        { status: bookRes.status }
      )
    }

    return NextResponse.json({ success: true, ohneTrainer })
  } catch (err) {
    console.error('Booking proxy error:', err)
    return NextResponse.json({ error: 'Buchung konnte nicht abgeschlossen werden' }, { status: 500 })
  }
}
