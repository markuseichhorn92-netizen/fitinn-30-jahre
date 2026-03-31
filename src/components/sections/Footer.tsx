import { Phone, Instagram, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-5 footer-glow">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          {/* Kontakt */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-bold mb-2">FIT-INN Trier</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Auf Hirtenberg 8<br />54296 Trier
            </p>
            <a href="tel:+49651308524" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-2">
              <Phone className="w-3.5 h-3.5" /> 0651 308524
            </a>
          </div>

          {/* Social */}
          <div>
            <p className="font-bold mb-2 text-sm">Social Media</p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="https://www.instagram.com/fit_inn_trier/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Instagram className="w-3.5 h-3.5" /> Instagram
              </a>
              <a href="https://www.facebook.com/FitInnFeyen" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Facebook className="w-3.5 h-3.5" /> Facebook
              </a>
            </div>
          </div>

          {/* Rechtliches */}
          <div>
            <p className="font-bold mb-2 text-sm">Rechtliches</p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="/impressum" className="hover:text-foreground transition-colors">Impressum</a>
              <a href="/datenschutz" className="hover:text-foreground transition-colors">Datenschutz</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            © 1996–2026 FIT-INN Trier. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-muted-foreground/70 max-w-2xl mx-auto">
            * Das Jubiläums-Angebot (30% Rabatt auf die ersten 6 Monate) gilt ausschließlich für Neumitglieder
            bei Abschluss eines 52- oder 104-Wochen-Vertrags. Gültig bis 30.04.2026. Nicht kombinierbar mit anderen Aktionen.
          </p>
        </div>
      </div>
    </footer>
  )
}
