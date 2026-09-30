# Fit-Inn Trier – Aktionsseite „5 € pro Woche bis Silvester“

Nachbau der Onepage-Landingpage (fit-inn-trier-dark-landing.onepage.me/5-euro-woche) als Next.js-App, Deployment über Vercel.

## Texte ändern
Alle Texte, Preise und Daten stehen in `src/content/*.json` (eine Datei pro Sektion, Reihenfolge wie auf der Seite).
- Aktionszeitraum/Preise: `src/content/03-angebot.json` (`promoStart`, `priceUntil`, `tarife`) und `src/content/01-hero.json`
- FAQ: `src/content/08-faq.json`
- FINN-Chat-Texte & Hinweis-Trigger: `src/content/00-finn-widget.json`

## Buchungen
- Probetraining wird direkt in **Magicline** gebucht (Formular unten + FINN-Chat).
- Zusätzlich optional E-Mail ans Team über Resend (`/api/lead`). Dafür in Vercel setzen: `RESEND_API_KEY`, `LEAD_EMAIL_TO`, `LEAD_EMAIL_FROM` (siehe `.env.example`). Ohne diese Variablen wird nichts gesendet.

## Entwicklung
```bash
npm install
npm run dev
```
