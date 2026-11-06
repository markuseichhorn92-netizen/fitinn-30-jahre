import Link from 'next/link';
import { technogymApp } from '@/lib/start-config';
import AppShell, { stepMeta, type Step } from '../AppSteps';
import extra from '../app.module.css';

// Ziel des kleinen QR-Codes auf dem A4-Aufsteller. Studio-Link verbindet die App direkt mit dem Fit-Inn.
export const dynamic = 'force-dynamic';
export const metadata = stepMeta('Technogym-App laden – Fit-Inn Trier', 'So kommst du zur Technogym-App für Trainingsplan, Training und Anmeldung an den Geräten.', '/app/technogym');
export { viewport } from '../AppSteps';

const STEPS: Step[] = [
  { title: 'Technogym-App laden', text: 'Kostenlos, direkt im Store. Der Link verbindet die App gleich mit dem Fit-Inn:' },
  { title: 'Öffnen und anmelden', text: 'Dort findest du deinen Trainingsplan, dein Training und die Anmeldung an den Geräten. Fragen? Sprich uns an der Theke an.' },
];

export default function Page() {
  return (
    <AppShell
      app={technogymApp}
      id="technogym"
      badge="Für dein Training"
      title={<>Die <em>Technogym</em> App</>}
      lead="Trainingsplan, Training und Anmeldung an den Geräten – direkt mit dem Fit-Inn verbunden."
      steps={STEPS}
      stepsKick="So geht’s"
      stepsTitle="In 2 Schritten startklar"
      buttonStep={0}
      after={
        <section className={extra.sec}>
          <div className={extra.callout}>
            <span className={extra.dot} aria-hidden="true">i</span>
            <p>Punkte, Prämien, Check-in und Mitgliedschaft findest du in der neuen <Link href="/app/fitinn">Fit-Inn App</Link>.</p>
          </div>
        </section>
      }
    />
  );
}
