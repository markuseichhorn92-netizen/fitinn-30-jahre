// Schlichtes Akkordeon mit feinen Trennlinien und Pluszeichen rechts.
// <details> öffnet ohne JavaScript; Tastatur und Screenreader bekommen das
// Verhalten vom Browser. Dieselben Texte speisen das FAQPage-Schema.
export type Frage = { frage: string; antwort: string }

export function Faq({ fragen, ersteOffen = false }: { fragen: readonly Frage[]; ersteOffen?: boolean }) {
  return (
    <div className="fi-faq">
      {fragen.map((f, i) => (
        <details key={f.frage} open={ersteOffen && i === 0}>
          <summary>
            <span>{f.frage}</span>
            <span className="fi-faq-plus" aria-hidden="true" />
          </summary>
          <div className="fi-faq-antwort">
            <p>{f.antwort}</p>
          </div>
        </details>
      ))}
    </div>
  )
}

/** FAQPage-Schema aus denselben Texten wie das sichtbare Akkordeon. */
export function faqSchema(fragen: readonly Frage[], id: string) {
  return {
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: fragen.map(f => ({
      '@type': 'Question',
      name: f.frage,
      acceptedAnswer: { '@type': 'Answer', text: f.antwort },
    })),
  }
}
