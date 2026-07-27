import Image from 'next/image'
import { Sprig, Glow } from './Decor'
import { btnAmber, btnGhost, decorLayer, eyebrowAmber, wrap, wrapWide } from './styles'
import type { Variante } from './varianten'

// AKT 1 · HOOK
export function Hero({ hero }: { hero: Variante['hero'] }) {
  return (
    <header style={{ position: 'relative', background: 'var(--ink)', color: '#fff', overflow: 'hidden' }}>
      <Sprig
        style={{
          left: '2%',
          top: '16%',
          width: 'clamp(90px,9vw,150px)',
          height: 'clamp(126px,12.6vw,210px)',
          transform: 'rotate(-14deg)',
        }}
        strokeOpacity=".26"
      />

      <div
        aria-hidden="true"
        style={{
          ...decorLayer,
          top: '-14%',
          right: '-14%',
          width: 'min(86vw,860px)',
          height: 'min(86vw,860px)',
        }}
      >
        <svg viewBox="0 0 600 600" width="100%" height="100%" fill="none" stroke="var(--amber)">
          <circle cx="300" cy="300" r="292" strokeOpacity=".18" strokeWidth="1.5" />
          <circle cx="300" cy="300" r="234" strokeOpacity=".21" strokeWidth="1.5" />
          <circle cx="300" cy="300" r="176" strokeOpacity=".25" strokeWidth="1.5" />
          <circle cx="300" cy="300" r="118" strokeOpacity=".2" strokeWidth="1.5" />
          <circle cx="300" cy="300" r="62" fill="var(--amber)" fillOpacity=".1" stroke="none" />
        </svg>
      </div>

      <Glow
        style={{ top: '-18%', right: '-10%', width: 'min(70vw,720px)', height: 'min(70vw,720px)' }}
        strength=".3"
      />

      <div style={{ ...wrap, zIndex: 2, padding: 'clamp(7rem,14vh,10rem) clamp(20px,5vw,60px) 0', textAlign: 'center' }}>
        <span data-reveal="" style={{ ...eyebrowAmber, display: 'inline-block' }}>
          {hero.eyebrow}
        </span>
        <h1
          data-reveal=""
          style={{
            fontSize: 'clamp(46px,9.4vw,136px)',
            lineHeight: .94,
            letterSpacing: '-.045em',
            fontWeight: 800,
            margin: '.22em 0 0',
            textWrap: 'balance',
          }}
        >
          {hero.zeile1}<br />{hero.zeile2}
        </h1>
        <p
          data-reveal=""
          style={{
            fontSize: 'clamp(20px,2.3vw,30px)',
            lineHeight: 1.4,
            fontWeight: 300,
            color: 'rgba(255,255,255,.72)',
            margin: 'clamp(1.2rem,2.6vw,1.9rem) auto 0',
            maxWidth: '24ch',
          }}
        >
          {hero.subline}<br />
          <span style={{ color: '#fff', fontWeight: 600, whiteSpace: 'nowrap' }}>{hero.preiszeile}</span>
        </p>
        <div
          data-reveal=""
          style={{
            display: 'flex',
            gap: 14,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: 'clamp(1.8rem,3.5vw,2.6rem)',
          }}
        >
          <a href="#termin" className="lift" style={btnAmber}>Probetraining sichern</a>
          <a href="#angebot" className="lift" style={btnGhost}>Angebot ansehen</a>
        </div>
      </div>

      {/* Linien-Fries: trainierende Figuren */}
      <div
        aria-hidden="true"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          marginTop: 'clamp(2.2rem,5vw,3.6rem)',
          height: 'clamp(118px,13vw,190px)',
          pointerEvents: 'none',
        }}
      >
        <svg
          viewBox="0 0 1200 200"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax meet"
          fill="none"
          stroke="var(--amber)"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <g strokeOpacity=".2" strokeWidth="2.6">
            <path d="M40 148 q13 -7 26 0 t26 0" />
            <path d="M400 152 q13 -7 26 0 t26 0" />
            <path d="M700 146 q13 -7 26 0 t26 0" />
            <path d="M1100 152 q13 -7 26 0 t26 0" />
            <path d="M0 172 H1200" />
          </g>
          <g strokeOpacity=".42" strokeWidth="7.5">
            <circle cx="204" cy="72" r="13" fill="var(--amber)" fillOpacity=".42" stroke="none" />
            <path d="M204 84 V128" /><path d="M204 96 L226 74" /><path d="M204 96 L188 114" />
            <path d="M204 128 L191 168" /><path d="M204 128 L217 166" />
            <circle cx="252" cy="56" r="10" strokeWidth="4" />
            <circle cx="290" cy="102" r="10.5" fill="var(--amber)" fillOpacity=".42" stroke="none" />
            <path d="M290 112 V142" /><path d="M290 120 L275 103" /><path d="M290 120 L305 101" />
            <path d="M290 142 L280 168" /><path d="M290 142 L299 167" />
          </g>
          <g strokeOpacity=".42" strokeWidth="7.5">
            <circle cx="560" cy="70" r="13" fill="var(--amber)" fillOpacity=".42" stroke="none" />
            <path d="M560 82 V128" /><path d="M560 94 L545 114" /><path d="M560 94 L586 116" />
            <path d="M560 128 L546 168" /><path d="M560 128 L573 166" />
            <circle cx="602" cy="106" r="10.5" fill="var(--amber)" fillOpacity=".42" stroke="none" />
            <path d="M602 116 V144" /><path d="M602 124 L586 116" /><path d="M602 124 L613 138" />
            <path d="M602 144 L593 168" /><path d="M602 144 L610 167" />
          </g>
          <g strokeOpacity=".34" strokeWidth="5">
            <path d="M900 168 V96" />
            <path d="M864 96 A36 28 0 0 1 936 96" />
            <path d="M900 96 V86" />
          </g>
          <g strokeOpacity=".42" strokeWidth="7.5">
            <circle cx="962" cy="78" r="13" fill="var(--amber)" fillOpacity=".42" stroke="none" />
            <path d="M962 90 V132" /><path d="M962 102 L945 86" /><path d="M962 102 L979 86" />
            <path d="M962 132 L949 168" /><path d="M962 132 L972 167" />
            <circle cx="1024" cy="104" r="10.5" fill="var(--amber)" fillOpacity=".42" stroke="none" />
            <path d="M1024 114 V142" /><path d="M1024 122 L1009 111" /><path d="M1024 122 L1038 130" />
            <path d="M1024 142 L1011 168" /><path d="M1024 142 L1034 164" />
          </g>
        </svg>
      </div>

      <div data-reveal="" style={{ ...wrapWide, margin: 'clamp(1.2rem,3vw,2rem) auto 0' }}>
        <div style={{ position: 'relative', borderRadius: '26px 26px 0 0', overflow: 'hidden' }}>
          <div style={{ position: 'relative', width: '100%', height: 'clamp(320px,52vh,560px)' }}>
            <Image
              src={hero.bild}
              alt={hero.bildAlt}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center 22%' }}
            />
          </div>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: 'linear-gradient(180deg,rgba(4,22,27,.18) 0%,rgba(4,22,27,0) 34%)',
            }}
          />
        </div>
      </div>
    </header>
  )
}
