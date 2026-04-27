import { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';

// Drone SVG inline — vista cenital de quadcopter, lucide-react no trae icono de dron.
function DroneIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <line x1="7.8" y1="7.8" x2="10.5" y2="10.5" />
      <line x1="16.2" y1="7.8" x2="13.5" y2="10.5" />
      <line x1="7.8" y1="16.2" x2="10.5" y2="13.5" />
      <line x1="16.2" y1="16.2" x2="13.5" y2="13.5" />
      <rect x="10" y="10" width="4" height="4" rx="0.5" />
    </svg>
  );
}

// Maletín/CRM — icono briefcase inline.
export function BriefcaseIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="12" strokeWidth="2" />
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  );
}

// Las 29 palabras: nombres + lugares + memorias compartidas con su padre.
const WORDS = [
  'Violeta', 'Marivi', 'Raúl', 'Javier', 'Chula', 'Canito',
  'Perriflauta', 'Manolo', 'Pedro', 'Iñigo', 'Pipa', 'Trufa',
  'Potoco', 'Buen Pueblo', 'Tejar', 'PingPong', 'Paradores',
  'Crucero', 'Port Aventura', 'Parque de Atracciones', 'El Chino Feliz',
  'Museos', 'Cerámica', 'Nudos', 'Yate', 'Submarinismo',
  'Cabeza del Buey', 'Escorial', 'Madrid',
];

// Posiciones determinísticas (no random — para que no salten entre re-renders).
// Distribución sunflower con golden angle, evita aglomeraciones y deja
// el centro libre para el botón.
function getStarPositions() {
  return WORDS.map((_, i) => {
    const goldenAngle = 137.5077640500378;
    const angle = (i * goldenAngle) % 360;
    // Anillos con radio creciente; alterna para evitar densidad central.
    const ringIdx = Math.floor(i / 6);
    const radius = 22 + ringIdx * 9 + ((i * 3.7) % 5);
    const cx = 50 + Math.cos((angle * Math.PI) / 180) * radius;
    const cy = 50 + Math.sin((angle * Math.PI) / 180) * radius;
    return {
      left: `${Math.max(4, Math.min(96, cx))}%`,
      top: `${Math.max(8, Math.min(92, cy))}%`,
      delay: ((i * 0.41) % 2.7) + 0.2,
      size: 2 + ((i * 0.7) % 2.5),
    };
  });
}

const POSITIONS = getStarPositions();

export default function SecretRoom({ onBack }) {
  const [view, setView] = useState('stars'); // 'stars' | 'design'
  const [format, setFormat] = useState('html'); // 'html' | 'pdf'

  // Cargar Cormorant Garamond (italic) para los nombres + Archivo Black + JetBrains Mono.
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cormorant+Garamond:ital,wght@1,400;1,600&family=JetBrains+Mono:wght@400;700&display=swap';
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  // Esc: si estás en diseño vuelve a estrellas; si estás en estrellas vuelve a Hefaia.
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') {
        if (view === 'design') setView('stars');
        else onBack?.();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [view, onBack]);

  if (view === 'design') {
    return (
      <DesignViewer
        format={format}
        setFormat={setFormat}
        onClose={() => setView('stars')}
      />
    );
  }

  return <StarryNight onBack={onBack} onOpen={() => setView('design')} />;
}

const IMAGE_COUNT = 21;
const getStarImage = (i) => `/javier/javier-${String((i % IMAGE_COUNT) + 1).padStart(2, '0')}.jpg`;

function StarryNight({ onBack, onOpen }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedStars, setClickedStars] = useState(new Set());
  const [animatingStars, setAnimatingStars] = useState(new Set());
  const [expandedImage, setExpandedImage] = useState(null);

  function handleStarClick(i) {
    if (clickedStars.has(i) || animatingStars.has(i)) return;
    setAnimatingStars((prev) => new Set([...prev, i]));
    setTimeout(() => {
      setAnimatingStars((prev) => { const n = new Set(prev); n.delete(i); return n; });
      setClickedStars((prev) => new Set([...prev, i]));
    }, 550);
  }

  return (
    <div
      style={{
        background:
          'radial-gradient(ellipse at center, #0c1730 0%, #04060f 80%)',
        color: '#f2ede3',
        fontFamily: "'JetBrains Mono', monospace",
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Back HEFAIA */}
      <nav style={{ position: 'absolute', top: 14, left: 24, zIndex: 10 }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: '#f2ede3',
            cursor: 'pointer',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.1em',
            opacity: 0.4,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.4')}
        >
          <ArrowLeft size={14} /> HEFAIA
        </button>
      </nav>

      {/* Drone esquina superior derecha */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          right: 24,
          opacity: 0.45,
          zIndex: 10,
        }}
      >
        <DroneIcon size={18} color="#9d0208" />
      </div>

      {/* Mensaje sutil esquina inferior derecha */}
      <span
        style={{
          position: 'absolute',
          bottom: 16,
          right: 24,
          fontSize: 10,
          opacity: 0.32,
          letterSpacing: '0.15em',
          fontStyle: 'italic',
          zIndex: 10,
        }}
      >
        cuidado, que vuelas !!
      </span>

      {/* Estrellas decorativas pequeñas (no nombradas) — fondo */}
      {Array.from({ length: 80 }).map((_, i) => {
        const a = (i * 73 + 11) % 100;
        const b = (i * 49 + 7) % 100;
        const s = 0.5 + ((i * 0.31) % 1.4);
        const d = ((i * 0.17) % 4) + 0.3;
        return (
          <span
            key={`bg-${i}`}
            style={{
              position: 'absolute',
              left: `${a}%`,
              top: `${b}%`,
              width: s,
              height: s,
              backgroundColor: '#f2ede3',
              borderRadius: '50%',
              opacity: 0.18 + ((i * 0.13) % 0.35),
              animation: `twinkle ${2 + ((i * 0.07) % 2.5)}s ${d}s ease-in-out infinite`,
              pointerEvents: 'none',
            }}
          />
        );
      })}

      {/* Estrellas con palabra (las 29 nombradas) */}
      {WORDS.map((word, i) => {
        const pos = POSITIONS[i];
        const isHovered = hoveredIndex === i;
        const isAnimating = animatingStars.has(i);
        const isClicked = clickedStars.has(i);

        if (isClicked) {
          return (
            <div
              key={word}
              onClick={() => setExpandedImage(getStarImage(i))}
              style={{
                position: 'absolute',
                left: pos.left,
                top: pos.top,
                transform: 'translate(-50%, -50%)',
                zIndex: 4,
                cursor: 'pointer',
                animation: 'fadeInPhoto 0.4s ease forwards',
              }}
            >
              <img
                src={getStarImage(i)}
                alt={word}
                style={{
                  width: 72,
                  height: 72,
                  objectFit: 'cover',
                  borderRadius: '50%',
                  boxShadow: '0 0 18px rgba(242,237,227,0.45)',
                  display: 'block',
                }}
              />
              <span
                style={{
                  display: 'block',
                  textAlign: 'center',
                  marginTop: 5,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: 13,
                  color: '#f2ede3',
                  opacity: 0.75,
                  whiteSpace: 'nowrap',
                  textShadow: '0 0 12px rgba(0,0,0,0.9)',
                }}
              >
                {word}
              </span>
            </div>
          );
        }

        return (
          <div
            key={word}
            onMouseEnter={() => !isAnimating && setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleStarClick(i)}
            style={{
              position: 'absolute',
              left: pos.left,
              top: pos.top,
              transform: 'translate(-50%, -50%)',
              cursor: isAnimating ? 'default' : 'pointer',
              padding: 18,
              zIndex: 3,
            }}
          >
            <span
              style={{
                display: 'block',
                width: pos.size * 2,
                height: pos.size * 2,
                backgroundColor: '#f2ede3',
                borderRadius: '50%',
                boxShadow: isAnimating
                  ? '0 0 50px 18px rgba(255,255,220,1)'
                  : '0 0 8px rgba(242,237,227,0.55)',
                opacity: isAnimating ? 0 : isHovered ? 0 : 0.85,
                transform: isAnimating ? 'scale(8)' : isHovered ? 'scale(0.4)' : 'scale(1)',
                transition: isAnimating
                  ? 'opacity 0.55s ease, transform 0.55s ease, box-shadow 0.3s ease'
                  : 'opacity 0.45s ease, transform 0.45s ease',
                animation:
                  isAnimating || isHovered
                    ? 'none'
                    : `twinkle ${2.5 + ((i * 0.11) % 1.5)}s ${pos.delay}s ease-in-out infinite`,
              }}
            />
            <span
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                whiteSpace: 'nowrap',
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 22,
                color: '#f2ede3',
                opacity: isHovered && !isAnimating ? 0.95 : 0,
                transition: 'opacity 0.45s ease',
                pointerEvents: 'none',
                textShadow: '0 0 18px rgba(0,0,0,0.95)',
                letterSpacing: '0.02em',
              }}
            >
              {word}
            </span>
          </div>
        );
      })}

      {/* Botón central MIRA MI PROYECTO */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 5,
        }}
      >
        <button
          onClick={onOpen}
          style={{
            background: 'transparent',
            color: '#f2ede3',
            border: '1px solid rgba(242,237,227,0.45)',
            padding: '20px 44px',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: '0.4em',
            cursor: 'pointer',
            transition:
              'background 0.3s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
            backdropFilter: 'blur(2px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(242,237,227,0.08)';
            e.currentTarget.style.borderColor = 'rgba(242,237,227,0.9)';
            e.currentTarget.style.transform = 'scale(1.04)';
            e.currentTarget.style.boxShadow = '0 0 32px rgba(242,237,227,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(242,237,227,0.45)';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          MIRA MI PROYECTO
        </button>
      </div>

      {expandedImage && (
        <div
          onClick={() => setExpandedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(4,6,15,0.88)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={expandedImage}
            alt=""
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              boxShadow: '0 0 60px rgba(242,237,227,0.2)',
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 0.3; }
        }
        @keyframes fadeInPhoto {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.6); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </div>
  );
}

function DesignViewer({ format, setFormat, onClose }) {
  const sources = {
    html: '/secret/muletia-design.html',
    pdf: '/secret/muletia-pater-v2.pdf',
  };

  return (
    <div
      style={{
        backgroundColor: '#0a0a0a',
        color: '#f2ede3',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <nav
        style={{
          padding: '14px 24px',
          borderBottom: '1px solid #2a2a2a',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#f2ede3',
            cursor: 'pointer',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.1em',
            opacity: 0.6,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <ArrowLeft size={14} /> ATRÁS
        </button>

        <div style={{ display: 'flex', gap: 0 }}>
          {[
            { id: 'html', label: 'DISEÑO' },
            { id: 'pdf', label: 'PDF' },
          ].map((f, idx, arr) => {
            const active = f.id === format;
            return (
              <button
                key={f.id}
                onClick={() => setFormat(f.id)}
                style={{
                  background: active ? '#f2ede3' : 'transparent',
                  color: active ? '#0a0a0a' : '#f2ede3',
                  border: '1px solid #f2ede3',
                  padding: '8px 22px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  cursor: 'pointer',
                  borderRight: idx === arr.length - 1 ? '1px solid #f2ede3' : 'none',
                  opacity: active ? 1 : 0.6,
                  transition: 'opacity 0.15s ease',
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </nav>

      <div style={{ padding: 12, flex: 1 }}>
        <iframe
          key={format}
          src={sources[format]}
          title={format}
          style={{
            width: '100%',
            height: 'calc(100vh - 80px)',
            border: '1px solid #2a2a2a',
            backgroundColor: '#fff',
          }}
        />
      </div>
    </div>
  );
}

// Icono avión — lucide-react no tiene uno con el estilo correcto
function PlaneIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4c-2 0-4 1-5.5 2.5L10 10 3.2 8.6c-.6-.1-.9.8-.4 1.2l4.4 4.2L4 18l-1 1h3l1-1 4.6-3.2 4.2 4.4c.4.5 1.3.2 1.2-.4z" />
    </svg>
  );
}

function BoltIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

export { DroneIcon, PlaneIcon, BoltIcon };
