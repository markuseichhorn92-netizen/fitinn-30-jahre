import { LegalPage } from '@/components/LegalPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum',
  robots: 'noindex',
}

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        <strong>FIT-INN Trier</strong><br />
        Inhaber: Harald Eichhorn<br />
        Auf Hirtenberg 8<br />
        54296 Trier
      </p>

      <h3>Kontakt</h3>
      <p>
        Telefon: 0651 308524<br />
        E-Mail: info@fit-inn-trier.de
      </p>

      <h3>Umsatzsteuer-ID</h3>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
        DE179498447
      </p>

      <h3>Angaben zur Berufshaftpflichtversicherung</h3>
      <p>
        <strong>Name und Sitz des Versicherers:</strong><br />
        AXA Versicherung AG<br />
        Colonia-Allee 10-20<br />
        51067 Köln
      </p>
      <p><strong>Geltungsraum der Versicherung:</strong> Deutschland</p>

      <h3>Redaktionell verantwortlich</h3>
      <p>
        Markus Eichhorn<br />
        Auf Hirtenberg 8<br />
        54296 Trier
      </p>

      <h3>Zentrale Kontaktstelle nach dem Digital Services Act (DSA)</h3>
      <p>
        Unsere zentrale Kontaktstelle für Nutzer und Behörden nach Art. 11, 12 DSA
        erreichen Sie wie folgt:
      </p>
      <p>
        E-Mail: info@fit-inn-trier.de<br />
        Die für den Kontakt zur Verfügung stehenden Sprachen sind: Deutsch, Englisch.
      </p>

      <h3>EU-Streitschlichtung</h3>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>
      </p>
      <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>

      <h3>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h3>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <p className="!text-muted-foreground/60 !text-xs mt-12">
        Seit 1996 ein Familienunternehmen.
      </p>
    </LegalPage>
  )
}
