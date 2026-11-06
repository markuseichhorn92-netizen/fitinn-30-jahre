import { fitInnApp } from '@/lib/start-config';
import AppSteps, { stepMeta, type Step } from '../AppSteps';

// Ziel des großen QR-Codes auf dem A4-Aufsteller. URL darf sich nicht ändern (Aufsteller ist gedruckt).
export const dynamic = 'force-dynamic';
export const metadata = stepMeta('Neue Fit-Inn-App in wenigen Schritten – Fit-Inn Trier', 'So kommst du zur neuen Fit-Inn-App: alte App löschen, neue laden, anmelden, Willkommenspunkte einlösen.', '/app/fitinn');
export { viewport } from '../AppSteps';

const STEPS: Step[] = [
  { title: 'Alte Fit-Inn-App löschen', text: 'iPhone: App gedrückt halten → „App entfernen“ → „App löschen“. Android: App gedrückt halten → „Deinstallieren“. Die neue App ist komplett neu, ein Update ersetzt die alte nicht.' },
  { title: 'Neue Fit-Inn-App laden', text: 'Kostenlos, direkt im Store:' },
  { title: 'Öffnen und registrieren', text: <>Melde dich mit der E-Mail-Adresse an, die du bei deinem Vertragsabschluss angegeben hast. Klappt das nicht? Schreib uns an <a href="mailto:info@fit-inn-trier.de">info@fit-inn-trier.de</a> – bei sehr langjährigen Mitgliedern richten wir noch etwas für dich ein.</> },
  { title: 'Willkommensgutschein einlösen', text: 'Löse in der App deinen Willkommensgutschein über 5 Extra-Punkte ein.' },
  { title: 'Punkte sammeln', text: 'Für jeden Check-in im Studio bekommst du 1 Punkt (einmal pro Tag). Dein Punktekonto siehst du in der App.' },
  { title: 'Training bleibt in der Technogym-App', text: <>Trainingsplan, Training und Anmeldung an den Geräten findest du weiterhin dort: <a href="/app/technogym">Technogym-App laden</a>.</> },
];

export default function Page() {
  return <AppSteps app={fitInnApp!} id="fitinn" title="Neue Fit-Inn-App" sub="In wenigen Schritten startklar" steps={STEPS} buttonStep={1} />;
}
