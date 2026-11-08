import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Barlow_Condensed, Inter, Space_Grotesk } from 'next/font/google';
import ConsentBanner from '@/components/ConsentBanner';
import FunnelView from '@/components/FunnelView';
import HideOn from '@/components/HideOn';
import MetaPixel from '@/components/MetaPixel';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const grotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-space-grotesk', display: 'swap' });

const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-barlow', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://angebot.fit-inn-trier.de'),
  alternates: { canonical: '/' },
  title: '5 € pro Woche bis Silvester – nur für die ersten 25 | Fit-Inn Trier',
  description:
    'Fit-Inn Trier: Bis 31.12.2026 nur 5 € pro Woche – je früher du startest, desto mehr sparst du. Nur für die ersten 25 Neuanmeldungen. Familiengeführt seit 1996, TechnoGym-Geräte. Probetraining kostenlos buchen.',
  openGraph: {
    title: '5 € pro Woche bis Silvester | Fit-Inn Trier',
    description: 'Je früher du startest, desto mehr sparst du. Nur für die ersten 25 Neuanmeldungen.',
    images: ['/media/833da1bc-191f-4c62-a865-5783d332fd28.avif'],
    locale: 'de_DE',
    type: 'website',
  },
};

export const viewport: Viewport = { themeColor: '#05090B', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${grotesk.variable} ${barlow.variable}`}>
      <body>
        {children}
        <FunnelView />
        {/* Magicline-Chatbot (Mitglieder-/Interessenten-Chat) auf allen Seiten */}
        <Script id="ml-member-chatbot-widget-script" src="https://fit-inn-trier.web.magicline.com/chatbot/widget/widget.js?uuid=a48084fc-8418-4bb1-b987-4bf4d852398f&studioId=1210005460&studioName=Fit-Inn%20Trier" strategy="afterInteractive" />
        <Script id="ml-chat-pille" strategy="afterInteractive">{`/* Fit-Inn Chat-Knopf: Intercom-Pille. Ersetzt groesser/snippet.js (Größe 125 % ist enthalten).
   Der runde Magicline-Knopf fährt nach links zu einer Pille mit Text auf und schließt sich wieder.
   Robust: fehlt etwas im Widget, passiert nichts. Konfig optional über window.MLPILL. */
(function () {
  try {
    var ID = 'ml-member-chatbot-widget-iframe', SCALE = 1.25, BASE = 60;
    var C = window.MLPILL || {};
    var TEXT = C.text || 'Fragen? Frag Lena 👋';
    var FIRST = C.first != null ? C.first : 4000, HOLD = C.hold != null ? C.hold : 6000;
    var GAP = C.gap != null ? C.gap : 30000, MAX = C.max != null ? C.max : 3;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var shown = 0, timer, pill, span, ready = false, expanded = false, pillW = 0;

    function frame() { return document.getElementById(ID); }
    function doc(f) { try { return f && (f.contentDocument || f.contentWindow.document); } catch (e) { return null; } }
    function isOpen(d) { return !!(d && d.querySelector('[data-role="chatbot-container"]')); }
    function setI(f, p, v) { if (f.style.getPropertyValue(p) !== v || f.style.getPropertyPriority(p) !== 'important') f.style.setProperty(p, v, 'important'); }

    // Größe/Position des Iframes: geschlossen = Knopf (+ ggf. Pille), offen = Widget bestimmt selbst
    function layout() {
      var f = frame(), d = doc(f); if (!f || !d) return;
      if (isOpen(d)) {
        if (expanded) collapse(true);
        ['width', 'height', 'transform', 'transform-origin'].forEach(function (p) { if (f.style.getPropertyPriority(p) === 'important') f.style.removeProperty(p); });
        return;
      }
      setI(f, 'transform-origin', '100% 100%'); setI(f, 'transform', 'scale(' + SCALE + ')');
      if (reduce) return;
      setI(f, 'height', BASE + 'px'); setI(f, 'width', (expanded ? pillW + 18 : BASE) + 'px');
    }

    function build(d) {
      var st = d.createElement('style');
      st.textContent =
        '[data-role="chatbot-teaser"]{display:none!important}' +
        '#fi-pill{position:fixed;right:2px;bottom:2px;height:45px;width:45px;border-radius:23px;z-index:-1;opacity:0;overflow:hidden;cursor:pointer;' +
        'background:linear-gradient(135deg,#0A4958,#107E97);color:#fff;font:600 15px/45px "Source Sans Pro",Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",Arial,sans-serif;' +
        'white-space:nowrap;box-shadow:0 2px 10px rgba(10,73,88,.35);transition:width .6s cubic-bezier(.34,1.45,.5,1),opacity .25s ease;-webkit-tap-highlight-color:transparent}' +
        '#fi-pill.on{opacity:1}' +
        '#fi-pill span{position:absolute;right:56px;top:0;opacity:0;transform:translateX(8px);transition:opacity .25s ease,transform .35s ease}' +
        '#fi-pill.on span{opacity:1;transform:none;transition-delay:.18s}';
      d.head.appendChild(st);
      pill = d.createElement('div'); pill.id = 'fi-pill'; pill.setAttribute('role', 'button'); pill.setAttribute('aria-label', 'Chat öffnen');
      span = d.createElement('span'); span.textContent = TEXT; pill.appendChild(span); d.body.appendChild(pill);
      pill.addEventListener('click', function () {
        var b = d.querySelector('[data-role="chatbot-bubble"]'); if (b) b.click();
      });
      pillW = Math.ceil(span.getBoundingClientRect().width) + 56 + 20;
    }

    function expand() {
      var f = frame(), d = doc(f); if (!pill || !d || isOpen(d) || document.hidden) return false;
      pillW = Math.ceil(span.getBoundingClientRect().width) + 56 + 20;
      expanded = true; layout();
      requestAnimationFrame(function () { requestAnimationFrame(function () { pill.classList.add('on'); pill.style.width = pillW + 'px'; }); });
      return true;
    }
    function collapse(instant) {
      if (!pill) return; expanded = false;
      pill.classList.remove('on'); pill.style.width = '45px';
      if (instant) { layout(); return; }
      setTimeout(layout, 650);
    }

    function cycle() {
      clearTimeout(timer);
      if (shown >= MAX) return;
      var f = frame(), d = doc(f);
      if (!d || isOpen(d) || document.hidden || !expand()) { timer = setTimeout(cycle, 5000); return; }
      shown++;
      timer = setTimeout(function () { collapse(); timer = setTimeout(cycle, GAP); }, HOLD);
    }

    function init() {
      var f = frame(), d = doc(f);
      if (!f || !d || !d.body || !d.head) return false;
      if (!d.querySelector('[data-role="chatbot-bubble"]')) return false;
      if (!ready) {
        ready = true;
        if (!reduce) { build(d); timer = setTimeout(cycle, FIRST); }
        new MutationObserver(layout).observe(f, { attributes: true, attributeFilter: ['style'] });
        setInterval(layout, 500);
      }
      layout(); return true;
    }

    var tries = 0, poll = setInterval(function () {
      try { if (init() || ++tries > 240) clearInterval(poll); } catch (e) { clearInterval(poll); }
    }, 250);
  } catch (e) { /* nichts kaputt machen */ }
})();`}</Script>
        {/* /start (Studio-QR „Apps & WLAN“): bewusst ohne Cookie-Banner und Meta Pixel */}
        <HideOn paths={['/start', '/app', '/app/fitinn', '/app/technogym']}>
          <MetaPixel />
          <ConsentBanner />
        </HideOn>
      </body>
    </html>
  );
}
