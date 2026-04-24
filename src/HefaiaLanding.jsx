import { useEffect } from 'react';
import { ArrowUpRight, AlertTriangle } from 'lucide-react';

export default function HefaiaLanding({ onEnterOniros }) {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Archivo+Black&family=JetBrains+Mono:wght@400;700&display=swap';
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  const display = "'Archivo Black', sans-serif";
  const mono = "'JetBrains Mono', monospace";

  return (
    <div style={{ backgroundColor: '#f8f6f1', color: '#080808', fontFamily: mono, minHeight: '100vh' }}>

      {/* NAV */}
      <nav style={{
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
      }}>
        <span style={{ fontFamily: display, fontSize: 20, letterSpacing: '-0.03em' }}>
          HEFAIA
        </span>
        <span style={{ fontSize: 11, letterSpacing: '0.15em', opacity: 0.45 }}>
          ENTROPIC LABS
        </span>
      </nav>

      {/* HERO */}
      <section style={{
        padding: 'clamp(80px, 12vw, 160px) 40px clamp(60px, 8vw, 120px)',
        maxWidth: 1100,
        margin: '0 auto',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          border: '1px solid rgba(0,0,0,0.15)',
          padding: '6px 14px',
          fontSize: 10,
          letterSpacing: '0.2em',
          marginBottom: 48,
          borderRadius: 2,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            backgroundColor: '#2563eb',
            display: 'inline-block',
            boxShadow: '0 0 8px #2563eb',
          }} />
          ENTROPIC LABS FOR HUMANITY PROGRESS
        </div>

        <h1 style={{
          fontFamily: display,
          fontSize: 'clamp(52px, 10vw, 152px)',
          letterSpacing: '-0.05em',
          lineHeight: 0.88,
          margin: 0,
        }}>
          LA<br />
          <span style={{
            WebkitTextStroke: '2px #080808',
            color: 'transparent',
          }}>FORJA.</span>
        </h1>

        <p style={{
          marginTop: 40,
          fontSize: 13,
          letterSpacing: '0.08em',
          opacity: 0.55,
          maxWidth: 520,
          lineHeight: 1.7,
        }}>
          PROYECTOS EN LA INTERSECCIÓN DE IA, COGNICIÓN Y CUIDADO.
        </p>
      </section>

      {/* DIVIDER */}
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', margin: '0 40px' }} />

      {/* INTRO */}
      <section style={{
        padding: 'clamp(48px, 6vw, 80px) 40px',
        maxWidth: 720,
        margin: '0 auto',
      }}>
        <p style={{ fontSize: 14, lineHeight: 1.8, opacity: 0.7, margin: '0 0 20px', letterSpacing: '0.03em' }}>
          Hefaia es mi espacio personal de construcción y experimentación con inteligencia artificial.
          Aquí viven los proyectos que me importan: herramientas honestas, investigación aplicada,
          y prototipos que intentan resolver problemas reales.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.8, opacity: 0.7, margin: '0 0 20px', letterSpacing: '0.03em' }}>
          No hay hype. No hay atajos. Solo trabajo.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.8, opacity: 0.7, margin: 0, letterSpacing: '0.03em' }}>
          Madrid, 2026.
        </p>
      </section>

      {/* DIVIDER */}
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', margin: '0 40px' }} />

      {/* LABS */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 40px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 48,
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <h2 style={{
            fontFamily: display,
            fontSize: 'clamp(28px, 4vw, 48px)',
            letterSpacing: '-0.03em',
            margin: 0,
          }}>
            LABS
          </h2>
          <span style={{ fontSize: 11, opacity: 0.4, letterSpacing: '0.1em' }}>
            2 PROYECTOS ACTIVOS
          </span>
        </div>

        {/* MULETIA CARD — activo, sin link por ahora */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '2px solid #080808',
          padding: 'clamp(32px, 4vw, 56px)',
          marginBottom: 16,
          position: 'relative',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 16,
          }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                border: '1px solid rgba(0,0,0,0.2)',
                padding: '4px 10px',
                fontSize: 9,
                letterSpacing: '0.2em',
                marginBottom: 24,
              }}>
                INVESTIGACIÓN ACTIVA
              </div>

              <h3 style={{
                fontFamily: display,
                fontSize: 'clamp(32px, 5vw, 64px)',
                letterSpacing: '-0.04em',
                margin: '0 0 12px',
                lineHeight: 1,
              }}>
                MULETIA
              </h3>

              <p style={{
                fontSize: 13,
                opacity: 0.6,
                maxWidth: 500,
                lineHeight: 1.6,
                letterSpacing: '0.03em',
                margin: 0,
              }}>
                Investigación en IA aplicada a Alzheimer. Acompañante cognitivo para personas
                con deterioro de memoria y sus familias. Privacidad por diseño.
              </p>
            </div>

            <div style={{ opacity: 0.2 }}>
              <ArrowUpRight size={32} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* ONIROS CARD — activo, clickable, noche */}
        <div
          onClick={onEnterOniros}
          style={{
            backgroundColor: '#0a0a0a',
            color: '#f2ede3',
            padding: 'clamp(32px, 4vw, 56px)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid #1a1a1a',
            marginBottom: 16,
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.25)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04,
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                border: '1px solid #9d0208',
                padding: '4px 10px',
                fontSize: 9,
                letterSpacing: '0.2em',
                color: '#ef4444',
                marginBottom: 24,
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: '50%',
                  backgroundColor: '#ef4444',
                  display: 'inline-block',
                  animation: 'pulse 2s infinite',
                }} />
                BETA · EN PRODUCCIÓN
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                <AlertTriangle size={28} strokeWidth={2} color="#9d0208" />
                <h3 style={{
                  fontFamily: display,
                  fontSize: 'clamp(32px, 5vw, 64px)',
                  letterSpacing: '-0.04em',
                  margin: 0,
                  lineHeight: 1,
                }}>
                  ONIROS
                </h3>
              </div>

              <p style={{
                fontSize: 13,
                opacity: 0.65,
                maxWidth: 500,
                lineHeight: 1.6,
                letterSpacing: '0.03em',
                margin: 0,
              }}>
                ¿Cuánto miente tu modelo favorito? Datos reales. Sin filtros.
              </p>
            </div>

            <ArrowUpRight size={32} strokeWidth={1.5} style={{ opacity: 0.4 }} />
          </div>
        </div>

        {/* PRÓXIMAMENTE */}
        {[
          { name: 'MEMULETIA', desc: 'Herramienta cognitiva personal. Asistencia IA hecha a medida.' },
          { name: 'PROMPT MUSEUM AI', desc: 'Colección curada. En construcción.' },
          { name: 'PROYECTO OCRE', desc: 'Pronto.' },
        ].map((item) => (
          <div key={item.name} style={{
            marginTop: 12,
            padding: '28px 32px',
            border: '1px dashed rgba(0,0,0,0.15)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
          }}>
            <div>
              <span style={{ fontFamily: display, fontSize: 18, letterSpacing: '-0.02em', opacity: 0.4 }}>
                {item.name}
              </span>
              <p style={{ fontSize: 11, opacity: 0.35, margin: '6px 0 0', letterSpacing: '0.05em' }}>
                {item.desc}
              </p>
            </div>
            <span style={{ fontSize: 11, letterSpacing: '0.15em', opacity: 0.35 }}>PRÓXIMAMENTE</span>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid rgba(0,0,0,0.08)',
        padding: '24px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 11,
        letterSpacing: '0.08em',
        opacity: 0.4,
        flexWrap: 'wrap',
        gap: 8,
      }}>
        <span>HEFAIA · ENTROPIC LABS FOR HUMANITY PROGRESS · MADRID, 2026</span>
        <span>hefaia.com</span>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
