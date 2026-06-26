import { NextRequest, NextResponse } from 'next/server'

// Magicline Connect API – kein Auth-Token nötig (öffentlicher Connect-Endpoint).
// Übernommen aus fitinn-landing-v2, angepasst auf die Sommerferien-Aktion:
// keine Quiz-/Krankenkassen-Daten mehr, dafür eine feste Kampagnen-Notiz.
const STUDIO_ID = '1210005460'
const BASE_URL = 'https://fit-inn-trier.api.magicline.com/connect/v1'

// Notiz, die mit jeder Buchung an Magicline übergeben wird (statt „30 Tage Bauchweg Projekt“).
const CAMPAIGN_NOTE = 'Sommerferien-Aktion 2026 – beitragsfrei trainieren · Probetraining über Landingpage gebucht'

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

    const bookRes = await fetch(`${BASE_URL}/trialsession/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        studioId: Number(STUDIO_ID),
        // startDateTime exakt als UTC-String aus der Slots-API durchreichen (kein Konvertieren!).
        startDateTime,
        // false: Buchung scheitert nicht, wenn gerade kein Trainer verfügbar ist
        // (siehe Magicline-Hinweis – mit true schlägt die Buchung sonst fehl).
        trainerRequired: false,
        note: bookingNote,
        leadCustomer: {
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
        },
      }),
    })

    const bookText = await bookRes.text()

    if (!bookRes.ok) {
      return NextResponse.json(
        { error: `Buchung fehlgeschlagen (${bookRes.status})`, details: bookText },
        { status: bookRes.status }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Booking proxy error:', err)
    return NextResponse.json({ error: 'Buchung konnte nicht abgeschlossen werden' }, { status: 500 })
  }
}
