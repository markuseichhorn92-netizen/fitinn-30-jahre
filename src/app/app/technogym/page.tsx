import { technogymApp } from '@/lib/start-config';
import AppSteps, { stepMeta, type Step } from '../AppSteps';

// Ziel des kleinen QR-Codes auf dem A4-Aufsteller. Studio-Link verbindet die App direkt mit dem Fit-Inn.
export const dynamic = 'force-dynamic';
export const metadata = stepMeta('Technogym-App laden – Fit-Inn Trier', 'So kommst du zur Technogym-App für Trainingsplan, Training und Anmeldung an den Geräten.', '/app/technogym');
export { viewport } from '../AppSteps';

const STEPS: Step[] = [
  { title: 'Technogym-App laden', text: 'Kostenlos, direkt im Store. Der Link verbindet die App gleich mit dem Fit-Inn:' },
  { title: 'Öffnen und anmelden', text: 'Dort findest du deinen Trainingsplan, dein Training und die Anmeldung an den Geräten. Fragen? Sprich uns an der Theke an.' },
];

export default function Page() {
  return <AppSteps app={technogymApp} id="technogym" title="Technogym-App" sub="Für dein Training an den Geräten" steps={STEPS} buttonStep={0} />;
}
