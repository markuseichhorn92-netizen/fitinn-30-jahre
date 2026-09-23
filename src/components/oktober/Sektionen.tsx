import Image from 'next/image'
import { Faq } from '@/components/fitinn/Faq'
import { aktivierungsgebuehr, GEBUEHR_NAME } from '@/components/fitinn/studio'
import { Anruf, FotoPlatzhalter, Haken, Knopf, Label, Zeilen } from '@/components/fitinn/Teile'
import {
  ablauf, aktion, anfrage, angebot, ernaehrung, fragen, gefuehl, hero, kontakt, laufzeiten, platzhalterZeigen,
  rechtshinweis, stimmen, team, vertrauen, type CtaId,
} from './inhalt'

// Alle Sektionen der Oktober-Seite im Fit-Inn-Designsystem. Jede Schaltfläche
// zeigt vorerst auf #anfrage; data-cta hält fest, welche Option gewählt wurde.

const ANFRAGE = '#anfrage'

function Cta({ cta, stil = 'orange', children }: { cta: CtaId; stil?: 'orange' | 'dunkel' | 'linie'; children: string }) {
  return <Knopf href={ANFRAGE} cta={cta} stil={stil}>{children}</Knopf>
}

// ─── Hero ─────────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <section className="fi-hero" aria-labelledby="hero-titel">
      <div className="fi-satz fi-hero-raster">
        <div>
          <h1 id="hero-titel" className="fi-h1">
            <span className="fi-hero-ort">{hero.ort}</span>
            <span className="sr-only">: </span>
            <Zeilen zeilen={hero.zeilen} betont={[1]} />
          </h1>
          <p className="fi-text fi-lead">{hero.subline}</p>

          <div className="fi-vermerk">
            <p className="fi-vermerk-kopf">{hero.preisVorsatz}</p>
            <p className="fi-vermerk-preis">
              <strong>{aktion.vorteilsPreis}<span aria-hidden="true">*</span></strong>
              <span>{hero.preisNachsatz}</span>
            </p>
            <p className="fi-vermerk-bedingung">{hero.preisBedingung}</p>
          </div>

          <div className="fi-aktionen" data-leiste-aus="">
            <Cta cta="oktober-allgemein">{hero.knopf}</Cta>
            <a href="#hinweise" className="fi-verweis">* Alle Bedingungen</a>
          </div>
        </div>

        <figure className="fi-tafel" style={{ margin: 0 }}>
          <div className="fi-tafel-kopf" aria-hidden="true">
            <span className="fi-tafel-kopf-punkt">{hero.tafel.kopf}</span>
            <span>{hero.tafel.marke}</span>
          </div>
          <div className="fi-tafel-bild">
            <Image
              src="/studio-1.avif"
              alt={hero.tafel.bildAlt}
              fill
              priority
              sizes="(min-width: 1120px) 528px, (min-width: 960px) 46vw, 92vw"
              style={{ objectPosition: 'center 60%' }}
            />
          </div>
          <ul className="fi-tafel-werte fi-tafel-werte--2">
            {hero.tafel.werte.map(w => (
              <li key={w.wert}>
                <strong>{w.wert}</strong>
                <span>{w.text}</span>
              </li>
            ))}
          </ul>
          <figcaption className="fi-tafel-streifen">
            <span>{hero.tafel.streifenLabel}</span>
            <strong>{hero.tafel.streifenText}</strong>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

export function Vertrauen() {
  return (
    <section className="fi-leiste-vertrauen" aria-label="Das Fit-Inn in Zahlen">
      <div className="fi-satz">
        <ul>
          {vertrauen.map(v => (
            <li key={v.titel}>
              <strong>{v.titel}</strong>
              <span>{v.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ─── Angebot ──────────────────────────────────────────────────────────────

export function Angebot() {
  return (
    <section id="angebot" className="fi-abschnitt" aria-labelledby="angebot-titel">
      <div className="fi-satz">
        <Label nr="01">{angebot.label}</Label>
        <h2 id="angebot-titel" className="fi-h2"><Zeilen zeilen={angebot.zeilen} /></h2>
        <p className="fi-text" style={{ marginTop: 20 }}>{angebot.text}</p>

        <div className="fi-preise fi-preise--2">
          {laufzeiten.map(l => (
            <article
              key={l.id}
              className={`fi-preis${l.empfohlen ? ' fi-preis--dunkel' : ''}`}
              aria-labelledby={`tarif-${l.wochen}`}
              data-zeigen=""
            >
              {l.empfohlen && <span className="fi-preis-marke">{angebot.empfehlung}</span>}
              <p className="fi-preis-kopf" style={{ marginTop: 0 }}>{l.name}</p>
              <h3 id={`tarif-${l.wochen}`} className="fi-preis-name" style={{ marginTop: 6 }}>{l.titel}</h3>

              <p className="fi-preis-kopf">Die ersten {aktion.vorteilsWochen} Wochen</p>
              <p className="fi-preis-betrag">
                <strong>{aktion.vorteilsPreis}<span aria-hidden="true">*</span></strong>
                <span>pro Woche</span>
              </p>
              <p className="fi-preis-unter">danach <strong>{l.folgebeitrag} pro Woche</strong></p>

              <hr className="fi-preis-trenner" />

              <ul className="fi-haken-liste">
                {l.leistungen.map(p => (
                  <li key={p}><Haken /><span>{p}</span></li>
                ))}
              </ul>

              {l.extra && (
                <p className="fi-preis-extra">
                  <span className="fi-preis-extra-plus" aria-hidden="true">Plus</span>
                  <span>
                    <span className="sr-only">Zusätzlich: </span>
                    <strong>{l.extra.titel}</strong>
                    <span className="fi-preis-extra-wert">{l.extra.wert}</span>
                  </span>
                </p>
              )}

              <table className="fi-rechnung" style={{ marginTop: 28 }}>
                <caption>Deine Rechnung über {l.name}</caption>
                <tbody>
                  {l.rechnung.map(z => (
                    <tr key={z.was}>
                      <th scope="row">{z.was}</th>
                      <td className="fi-formel">{z.rechnung}</td>
                      <td>{z.summe}</td>
                    </tr>
                  ))}
                  <tr>
                    <th scope="row">Beiträge gesamt</th>
                    <td className="fi-formel" />
                    <td>{l.beitraege}</td>
                  </tr>
                  <tr>
                    <th scope="row">{GEBUEHR_NAME}</th>
                    <td className="fi-formel">einmalig</td>
                    <td>{aktivierungsgebuehr}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="fi-summe">
                    <th scope="row" colSpan={2}>Gesamtpreis über {l.name}</th>
                    <td>{l.gesamt}</td>
                  </tr>
                </tfoot>
              </table>

              <div className="fi-preis-fuss">
                <Cta cta={l.id} stil={l.empfohlen ? 'orange' : 'linie'}>{l.knopf}</Cta>
              </div>
            </article>
          ))}
        </div>

        <aside id="hinweise" className="fi-hinweise" aria-labelledby="hinweise-titel">
          <h3 id="hinweise-titel">* Gut zu wissen</h3>
          <ul>
            {angebot.hinweise.map(h => <li key={h}>{h}</li>)}
          </ul>
          <p>
            Alle Bedingungen im Wortlaut stehen in den <a href="#pflichtangaben">Pflichtangaben zum Angebot</a>.
          </p>
        </aside>

        <div className="fi-aktionen" style={{ marginTop: 40 }}>
          <Cta cta="oktober-allgemein">Unverbindlich anfragen</Cta>
          <Anruf vorsatz="Fragen zum Angebot?" />
        </div>
      </div>
    </section>
  )
}

// ─── Das Fit-Inn-Gefühl ───────────────────────────────────────────────────

export function Gefuehl() {
  return (
    <section id="gefuehl" className="fi-abschnitt fi-dunkel fi-raster-grund" aria-labelledby="gefuehl-titel">
      <div className="fi-satz">
        <Label nr="02">{gefuehl.label}</Label>
        <div className="fi-kopfreihe">
          <div>
            <h2 id="gefuehl-titel" className="fi-h2"><Zeilen zeilen={gefuehl.zeilen} /></h2>
            <p className="fi-text">{gefuehl.text}</p>
          </div>
          <div className="fi-aktionen">
            <Cta cta="oktober-allgemein">Unverbindlich anfragen</Cta>
          </div>
        </div>
        <ol className="fi-spalten fi-spalten--3">
          {gefuehl.saeulen.map((s, i) => (
            <li key={s.titel} className="fi-spalte" data-zeigen="">
              <span className="fi-spalte-nr" aria-hidden="true">0{i + 1}</span>
              <h3 className="fi-h3">{s.titel}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="fi-fussnote fi-aktionen">
          <span>{gefuehl.fussnote}</span>
          <Anruf vorsatz="Anrufen:" mono />
        </div>
      </div>
    </section>
  )
}

// ─── Training trifft Ernährung ────────────────────────────────────────────

export function Ernaehrung() {
  return (
    <section id="ernaehrung" className="fi-abschnitt fi-hell" aria-labelledby="ernaehrung-titel">
      <div className="fi-satz fi-zwei">
        <div className="fi-zwei-links">
          <Label nr="03">{ernaehrung.label}</Label>
          <h2 id="ernaehrung-titel" className="fi-h2"><Zeilen zeilen={ernaehrung.zeilen} /></h2>
          <p className="fi-text">{ernaehrung.text}</p>
          <ul className="fi-haken-liste" style={{ marginTop: 28 }}>
            {ernaehrung.punkte.map(p => <li key={p}><Haken /><span>{p}</span></li>)}
          </ul>
          <div className="fi-aktionen">
            <Cta cta="oktober-104">{ernaehrung.knopf}</Cta>
            <Anruf />
          </div>
        </div>
        <div className="fi-kasten" style={{ alignSelf: 'center' }} data-zeigen="">
          <span className="fi-kasten-zahl">{ernaehrung.kasten.zahl}</span>
          <p>{ernaehrung.kasten.text}</p>
          <p className="fi-kasten-wert">{ernaehrung.kasten.wert}</p>
        </div>
      </div>
    </section>
  )
}

// ─── Ablauf ───────────────────────────────────────────────────────────────

export function Ablauf() {
  return (
    <section id="ablauf" className="fi-abschnitt" aria-labelledby="ablauf-titel">
      <div className="fi-satz fi-zwei fi-zwei--gleich">
        <div className="fi-zwei-links fi-zwei-links--klebend">
          <Label nr="04">{ablauf.label}</Label>
          <h2 id="ablauf-titel" className="fi-h2"><Zeilen zeilen={ablauf.zeilen} /></h2>
          <p className="fi-text">{ablauf.text}</p>
          <div className="fi-aktionen">
            <Cta cta="oktober-allgemein">Schritt 1: Jetzt anfragen</Cta>
            <Anruf />
          </div>
        </div>
        <ol className="fi-schritte">
          {ablauf.schritte.map((s, i) => (
            <li key={s.titel} className="fi-schritt" data-zeigen="">
              <span className="fi-schritt-nr" aria-hidden="true">0{i + 1}</span>
              <h3 className="fi-h3"><span className="sr-only">Schritt {i + 1}: </span>{s.titel}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

// ─── Team und Stimmen ─────────────────────────────────────────────────────

export function Team() {
  return (
    <section id="team" className="fi-abschnitt fi-trenner" aria-labelledby="team-titel">
      <div className="fi-satz">
        <Label nr="05">{team.label}</Label>
        <div className="fi-zwei fi-zwei--gleich" style={{ alignItems: 'end' }}>
          <h2 id="team-titel" className="fi-h2"><Zeilen zeilen={team.zeilen} /></h2>
          <p className="fi-text">{team.text}</p>
        </div>
        {platzhalterZeigen && (
        <div className="fi-team">
          <FotoPlatzhalter motiv={team.familie.motiv} alt={team.familie.alt} seitenverhaeltnis="21 / 9" />
          <ul className="fi-team-personen">
            {team.personen.map((p, i) => (
              <li key={i}>
                <FotoPlatzhalter motiv="Porträt · quadratisch" alt={`Porträt: ${p.name}, ${p.rolle}`} seitenverhaeltnis="1 / 1" />
                <strong>{p.name}</strong>
                <span>{p.rolle}</span>
              </li>
            ))}
          </ul>
        </div>
        )}
      </div>
    </section>
  )
}

// Solange nur Platzhalter vorliegen und diese ausgeblendet sind, entfällt
// der Abschnitt ganz – eine Überschrift ohne Stimmen wäre ein leeres Versprechen.
export function Stimmen() {
  if (!platzhalterZeigen && stimmen.eintraege.every(s => s.platzhalter)) return null
  return (
    <section id="stimmen" className="fi-abschnitt fi-hell" aria-labelledby="stimmen-titel">
      <div className="fi-satz">
        <Label nr="06">{stimmen.label}</Label>
        <h2 id="stimmen-titel" className="fi-h2"><Zeilen zeilen={stimmen.zeilen} /></h2>
        <ul className="fi-spalten fi-spalten--3">
          {stimmen.eintraege.filter(s => platzhalterZeigen || !s.platzhalter).map((s, i) =>
            s.platzhalter ? (
              <li key={i} className="fi-spalte fi-stimme-leer" data-platzhalter="stimme">
                <span className="fi-platzhalter-marke">Platzhalter</span>
                <p>Hier steht bald die echte Stimme eines Mitglieds – nur mit dessen Freigabe.</p>
                <p className="fi-stimme-name">{s.name} · {s.seit}</p>
              </li>
            ) : (
              <li key={i} className="fi-spalte">
                <figure style={{ margin: 0 }}>
                  <blockquote className="fi-stimme-zitat">„{s.zitat}“</blockquote>
                  <figcaption className="fi-stimme-name">{s.name} · {s.seit}</figcaption>
                </figure>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────

export function Fragen() {
  return (
    <section id="fragen" className="fi-abschnitt" aria-labelledby="fragen-titel">
      <div className="fi-satz fi-zwei">
        <div className="fi-zwei-links fi-zwei-links--klebend">
          <Label nr="07">Fragen</Label>
          <h2 id="fragen-titel" className="fi-h2"><Zeilen zeilen={['Deine Fragen,', 'unsere Antworten.']} /></h2>
          <p className="fi-text">Etwas nicht dabei? Ruf uns an – wir nehmen uns Zeit.</p>
          <div className="fi-aktionen">
            <Cta cta="oktober-allgemein">Unverbindlich anfragen</Cta>
            <Anruf vorsatz="Anrufen:" />
          </div>
        </div>
        <Faq fragen={fragen} ersteOffen />
      </div>
    </section>
  )
}

// ─── Anfrage (Ziel aller Schaltflächen) ───────────────────────────────────

export function Anfrage() {
  return (
    <section id="anfrage" className="fi-abschluss fi-orange" aria-labelledby="anfrage-titel" data-leiste-aus="">
      <div className="fi-satz fi-zwei fi-zwei--gleich" style={{ alignItems: 'end' }}>
        <div>
          <Label>{anfrage.label}</Label>
          <h2 id="anfrage-titel" className="fi-h2"><Zeilen zeilen={anfrage.zeilen} /></h2>
          <p className="fi-text">{anfrage.text}</p>
          <div className="fi-aktionen" style={{ marginTop: 28 }}>
            <Knopf href={`tel:${kontakt.telefon.link}`} stil="dunkel" pfeil={false}>
              Anrufen: {kontakt.telefon.anzeige}
            </Knopf>
            <a href={`mailto:${kontakt.email}`} data-kontakt="email" className="fi-verweis fi-verweis--mono">
              {kontakt.email}
            </a>
          </div>
        </div>

        {/* PLATZHALTER Anfragestrecke: Formular hier einbinden. Die gewählte
            Option steht am auslösenden Link in data-cta. */}
        <div className="fi-platzhalter" data-platzhalter="anfragestrecke" style={{ minHeight: 260, justifyContent: 'center' }}>
          <span className="fi-platzhalter-marke">Platzhalter</span>
          <p>{anfrage.platzhalter}</p>
          <p>Bis dahin erreichst du uns telefonisch unter {kontakt.telefon.anzeige} oder per E-Mail.</p>
        </div>
      </div>
    </section>
  )
}

/** Pflichtangaben zum Angebot, ausführlich. Ziel des Sternchens. */
export function Pflichtangaben() {
  return (
    <section id="pflichtangaben" className="fi-pflicht" aria-labelledby="pflicht-titel">
      <div className="fi-satz">
        <h2 id="pflicht-titel">* Pflichtangaben zum Angebot</h2>
        <p>
          {rechtshinweis.map((teil, i) =>
            teil.href ? (
              <a key={i} href={teil.href} target="_blank" rel="noopener noreferrer">
                {teil.t}
                <span className="sr-only"> (öffnet in neuem Tab)</span>
              </a>
            ) : (
              <span key={i}>{teil.t}</span>
            ),
          )}
        </p>
      </div>
    </section>
  )
}
