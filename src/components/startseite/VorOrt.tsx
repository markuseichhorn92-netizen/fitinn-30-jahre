import Image from 'next/image'
import { Faq } from '@/components/fitinn/Faq'
import { studio, telLink } from '@/components/fitinn/studio'
import { Anruf, Knopf, Label, Zeilen } from '@/components/fitinn/Teile'
import { abschluss, fragen, PROBETRAINING, vorOrt } from './inhalt'

// Lokal und persönlich: links Aussage und echtes Studiofoto, rechts die
// belegten Standort- und Kontaktdaten und eine dunkle Informationsfläche.
export function VorOrt() {
  return (
    <section id="studio" className="fi-abschnitt" aria-labelledby="studio-titel">
      <div className="fi-satz fi-zwei fi-zwei--gleich">
        <div>
          <Label nr="05">{vorOrt.label}</Label>
          <h2 id="studio-titel" className="fi-h2"><Zeilen zeilen={vorOrt.zeilen} /></h2>
          <p className="fi-text" style={{ marginTop: 20 }}>{vorOrt.text}</p>
          <figure className="fi-foto" style={{ aspectRatio: '4 / 3', marginTop: 36 }} data-zeigen="">
            <Image
              src="/studio-2.avif"
              alt={vorOrt.bildAlt}
              fill
              sizes="(min-width: 1120px) 516px, (min-width: 960px) 44vw, 92vw"
              style={{ objectPosition: 'center 60%' }}
            />
            <figcaption>Trainingsfläche · Fit-Inn Trier</figcaption>
          </figure>
        </div>

        <div className="fi-vorort-rechts">
          <dl className="fi-daten">
            <div>
              <dt>Adresse</dt>
              <dd>
                {studio.strasse}, {studio.plz} {studio.ort}
                <br />
                <a href={studio.route} target="_blank" rel="noopener noreferrer">
                  Route planen<span className="sr-only"> (öffnet Google Maps in neuem Tab)</span>
                </a>
              </dd>
            </div>
            <div>
              <dt>Telefon</dt>
              <dd><a href={telLink} data-kontakt="telefon">{studio.telefon.anzeige}</a></dd>
            </div>
            <div>
              <dt>E-Mail</dt>
              <dd><a href={`mailto:${studio.email}`} data-kontakt="email">{studio.email}</a></dd>
            </div>
            <div>
              <dt>Website</dt>
              <dd><a href={studio.website.href}>{studio.website.anzeige}</a></dd>
            </div>
          </dl>

          <div className="fi-kasten" data-zeigen="">
            <span className="fi-kasten-zahl">{vorOrt.kasten.zahl}</span>
            <p>{vorOrt.kasten.text}</p>
            <small>{vorOrt.kasten.quelle}</small>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Fragen() {
  return (
    <section id="fragen" className="fi-abschnitt" aria-labelledby="fragen-titel" style={{ paddingTop: 0 }}>
      <div className="fi-satz fi-zwei">
        <div className="fi-zwei-links fi-zwei-links--klebend">
          <Label nr="06">Fragen</Label>
          <h2 id="fragen-titel" className="fi-h2"><Zeilen zeilen={['Was du vorher', 'wissen möchtest.']} /></h2>
          <p className="fi-text">Deine Frage ist nicht dabei? Ruf uns an – wir nehmen uns Zeit.</p>
          <div className="fi-aktionen"><Anruf vorsatz="Anrufen:" /></div>
        </div>
        <Faq fragen={fragen} />
      </div>
    </section>
  )
}

export function Abschluss() {
  return (
    <section className="fi-abschluss fi-orange" aria-labelledby="abschluss-titel">
      <div className="fi-satz fi-abschluss-raster">
        <div>
          <Label>{abschluss.label}</Label>
          <h2 id="abschluss-titel" className="fi-h2"><Zeilen zeilen={abschluss.zeilen} /></h2>
          <p className="fi-text">{abschluss.text}</p>
        </div>
        <div className="fi-abschluss-rechts">
          <Knopf href={PROBETRAINING} stil="dunkel" cta="startseite-abschluss">Probetraining anfragen</Knopf>
          <Anruf mono />
        </div>
      </div>
    </section>
  )
}
