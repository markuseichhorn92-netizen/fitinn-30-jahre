import s from './rezepte.module.css';

// Pflicht-Hinweis für KI-Bilder (Fit-Inn-Regel): Petrol, Coral-Punkt.
export function KiPlakette({ klein }: { klein?: boolean }) {
  return <span className={`${s.ki} ${klein ? s.kiKlein : ''}`}><i aria-hidden="true" />KI-generiertes Bild</span>;
}
