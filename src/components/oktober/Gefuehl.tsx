import { gefuehl } from './inhalt'
import { AnrufVerweis, CtaKnopf, Platzhalter } from './Teile'

// Das Fit-Inn-Gefühl: persönlich, hochwertig, familiär.
export function Gefuehl() {
  return (
    <section id="gefuehl" className="abschnitt hell-2" aria-labelledby="gefuehl-titel">
      <div className="satz">
        <h2 id="gefuehl-titel" className="h2">{gefuehl.titel}</h2>
        <p className="lead">{gefuehl.text}</p>

        <div className="saeulen">
          {gefuehl.saeulen.map(s => (
            <div key={s.titel} className="saeule" data-erscheinen="">
              <h3>{s.titel}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>

        <Platzhalter
          motiv={gefuehl.bild.motiv}
          format={gefuehl.bild.format}
          alt={gefuehl.bild.alt}
          seitenverhaeltnis="16 / 9"
          className="gefuehl-bild"
        />

        <div className="aktionen cta-zeile">
          <CtaKnopf cta="oktober-allgemein">Unverbindlich anfragen</CtaKnopf>
          <AnrufVerweis />
        </div>
      </div>
    </section>
  )
}
