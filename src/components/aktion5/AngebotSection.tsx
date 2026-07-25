import { aktion } from './content'
import { Glasses, Sprig } from './Decor'
import { Haken } from './icons'
import { btnAmber, decorLayer, eyebrowAmber, wrap } from './styles'

const LEISTUNGEN =
  'Clubnutzung · Cardio-Entertainment · Mineralgetränke · Trainingspläne · TechnoGym App · WLAN · Gesundheits-Check-up'

// AKT 4 · DAS ANGEBOT
export function AngebotSection() {
  return (
    <section
      id="angebot"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--ink)',
        color: '#fff',
        padding: 'clamp(6rem,13vw,11rem) 0',
        scrollMarginTop: 64,
      }}
    >
      <Glasses
        style={{
          left: '3%',
          top: '12%',
          width: 'clamp(84px,8.5vw,132px)',
          height: 'clamp(35px,3.5vw,55px)',
          transform: 'rotate(10deg)',
        }}
        strokeOpacity=".26"
      />
      <Sprig
        style={{
          right: '2%',
          bottom: '8%',
          width: 'clamp(86px,8.6vw,140px)',
          height: 'clamp(120px,12vw,196px)',
          transform: 'rotate(12deg)',
        }}
        strokeOpacity=".22"
      />
      <div
        aria-hidden="true"
        style={{
          ...decorLayer,
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(120vw,1100px)',
          height: 'min(60vw,560px)',
        }}
      >
        <svg viewBox="0 0 1100 560" width="100%" height="100%" fill="none">
          <g stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" transform="translate(550 92)">
            <line y2="-330" transform="rotate(28)" strokeOpacity=".05" />
            <line y2="-330" transform="rotate(48)" strokeOpacity=".06" />
            <line y2="-330" transform="rotate(68)" strokeOpacity=".08" />
            <line y2="-330" transform="rotate(88)" strokeOpacity=".1" />
            <line y2="-330" transform="rotate(108)" strokeOpacity=".08" />
            <line y2="-330" transform="rotate(128)" strokeOpacity=".06" />
            <line y2="-330" transform="rotate(148)" strokeOpacity=".05" />
            <line y2="-330" transform="rotate(168)" strokeOpacity=".04" />
            <line y2="-330" transform="rotate(188)" strokeOpacity=".04" />
            <line y2="-330" transform="rotate(208)" strokeOpacity=".05" />
          </g>
          <circle cx="550" cy="92" r="40" fill="var(--amber)" fillOpacity=".12" />
        </svg>
      </div>

      <div style={wrap}>
        <div style={{ textAlign: 'center', maxWidth: '22ch', margin: '0 auto' }}>
          <span data-reveal="" style={eyebrowAmber}>Der Einstieg</span>
          <h2
            data-reveal=""
            style={{
              fontSize: 'clamp(38px,6.6vw,92px)',
              lineHeight: .98,
              letterSpacing: '-.04em',
              fontWeight: 800,
              margin: '.25em 0 0',
            }}
          >
            5 € die Woche.
          </h2>
          <p
            data-reveal=""
            style={{
              fontSize: 'clamp(19px,1.9vw,23px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,.66)',
              margin: '1em 0 0',
            }}
          >
            Zwölf Wochen für je 5 € – in beiden Laufzeiten. Du entscheidest nur, wie lange du bleibst.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gap: 'clamp(1rem,2vw,1.6rem)',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
            marginTop: 'clamp(2.5rem,5vw,4rem)',
            alignItems: 'stretch',
          }}
        >
          {/* 1 Jahr */}
          <div
            data-reveal=""
            className="lift"
            style={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid var(--line-dark)',
              borderRadius: 24,
              padding: 'clamp(1.8rem,3.4vw,2.8rem)',
            }}
          >
            <span style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-.01em' }}>1 Jahr</span>
            <span style={{ fontSize: 16, color: 'rgba(255,255,255,.55)', marginTop: '.25em' }}>
              52 Wochen Mitgliedschaft
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '.2em', margin: 'clamp(1.6rem,3vw,2.4rem) 0 0' }}>
              <span style={{ fontSize: 'clamp(52px,7vw,84px)', lineHeight: 1, letterSpacing: '-.04em', fontWeight: 800 }}>
                5&nbsp;€
              </span>
              <span style={{ fontSize: 18, color: 'rgba(255,255,255,.55)' }}>/ Woche</span>
            </div>
            <p style={{ fontSize: 18, lineHeight: 1.6, fontWeight: 300, color: 'rgba(255,255,255,.8)', margin: '1em 0 0' }}>
              Die ersten <span style={{ fontWeight: 600, color: '#fff' }}>12 Wochen</span> für je 5 €.
            </p>
            <div
              style={{
                marginTop: 'auto',
                paddingTop: 'clamp(1.6rem,3vw,2.2rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: '.65em',
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,.45)',
                }}
              >
                Immer enthalten
              </span>
              <span style={{ fontSize: 17, lineHeight: 1.5, fontWeight: 300, color: 'rgba(255,255,255,.7)' }}>
                {LEISTUNGEN}
              </span>
            </div>
          </div>

          {/* 2 Jahre — empfohlen */}
          <div
            data-reveal=""
            className="lift"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--paper)',
              color: 'var(--ink)',
              border: '1px solid var(--paper)',
              borderRadius: 24,
              padding: 'clamp(1.8rem,3.4vw,2.8rem)',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 'clamp(1.8rem,3.4vw,2.8rem)',
                right: 'clamp(1.8rem,3.4vw,2.8rem)',
                background: 'var(--amber)',
                color: '#04161b',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '.04em',
                padding: '.4em 1em',
                borderRadius: 999,
              }}
            >
              Empfohlen
            </span>
            <span style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-.01em' }}>2 Jahre</span>
            <span style={{ fontSize: 16, color: 'var(--muted)', marginTop: '.25em' }}>104 Wochen Mitgliedschaft</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '.2em', margin: 'clamp(1.6rem,3vw,2.4rem) 0 0' }}>
              <span style={{ fontSize: 'clamp(52px,7vw,84px)', lineHeight: 1, letterSpacing: '-.04em', fontWeight: 800 }}>
                5&nbsp;€
              </span>
              <span style={{ fontSize: 18, color: 'var(--muted)' }}>/ Woche</span>
            </div>
            <p style={{ fontSize: 18, lineHeight: 1.6, fontWeight: 300, color: '#33484d', margin: '1em 0 0' }}>
              Die ersten <span style={{ fontWeight: 600, color: 'var(--ink)' }}>12 Wochen</span> für je 5 € – mit dem
              längeren Weg und allen Extras.
            </p>
            <div
              style={{
                marginTop: 'auto',
                paddingTop: 'clamp(1.6rem,3vw,2.2rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: '.65em',
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'var(--muted)',
                }}
              >
                Immer enthalten
              </span>
              <span style={{ fontSize: 17, lineHeight: 1.5, fontWeight: 300, color: '#33484d' }}>{LEISTUNGEN}</span>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '.6em',
                  fontSize: 16.5,
                  lineHeight: 1.45,
                  color: '#8a5a13',
                  fontWeight: 600,
                  marginTop: '.5em',
                }}
              >
                <Haken style={{ flex: 'none', marginTop: '.15em' }} />
                Nur hier: 3 Monate Coach Premium in der Fit-Inn App
              </span>
            </div>
          </div>
        </div>

        <div
          data-reveal=""
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(1rem,2.5vw,2rem)',
            marginTop: 'clamp(2rem,4vw,3rem)',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: 16.5, color: 'rgba(255,255,255,.6)' }}>
            Danach regulärer Wochenbeitrag von{' '}
            <span style={{ color: '#fff', fontWeight: 600 }}>{aktion.regulaererWochenbeitrag}</span> · Aktion gültig bis{' '}
            <span style={{ color: '#fff', fontWeight: 600 }}>{aktion.gueltigBis}</span>
          </span>
          <a href="#termin" className="lift" style={btnAmber}>Platz sichern</a>
        </div>
      </div>
    </section>
  )
}
