import { useEffect, useState } from 'react';
import { ArrowUpRight, AlertTriangle, X, Globe } from 'lucide-react';
import { DroneIcon, PlaneIcon, BoltIcon, BriefcaseIcon, BrainIcon, MusicIcon } from './SecretRoom.jsx';
import { I18N } from './i18n/hefaiaLanding.js';

export default function HefaiaLanding({ onEnterOniros, onEnterSecret, onEnterEscorial, onEnterSuperpoder, onEnterPolitropico, lang: langProp, setLang: setLangProp }) {
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [secretPwd, setSecretPwd] = useState('');
  const [secretError, setSecretError] = useState(false);
  const [showEscorialModal, setShowEscorialModal] = useState(false);
  const [escorialPwd, setEscorialPwd] = useState('');
  const [escorialError, setEscorialError] = useState(false);
  const [showSuperpoderModal, setShowSuperpoderModal] = useState(false);
  const [superpoderPwd, setSuperpoderPwd] = useState('');
  const [superpoderError, setSuperpoderError] = useState(false);
  const [showCrmModal, setShowCrmModal] = useState(false);
  const [crmPwd, setCrmPwd] = useState('');
  const [crmError, setCrmError] = useState(false);
  const [showTdahModal, setShowTdahModal] = useState(false);
  const [tdahPwd, setTdahPwd] = useState('');
  const [tdahError, setTdahError] = useState(false);
  const [showNeuroModal, setShowNeuroModal] = useState(false);
  const [neuroPwd, setNeuroPwd] = useState('');
  const [neuroError, setNeuroError] = useState(false);
  // Lang sincronizado via props desde main.jsx; fallback local si se monta solo.
  const [langLocal, setLangLocal] = useState('en');
  const lang = langProp ?? langLocal;
  const setLang = setLangProp ?? setLangLocal;

  const t = I18N[lang];

  function handleSecretSubmit(e) {
    e.preventDefault();
    if (secretPwd.trim().toLowerCase() === 'javier') {
      setShowSecretModal(false);
      setSecretPwd('');
      setSecretError(false);
      onEnterSecret?.();
    } else {
      setSecretError(true);
      setSecretPwd('');
    }
  }

  function closeSecretModal() {
    setShowSecretModal(false);
    setSecretPwd('');
    setSecretError(false);
  }

  function handleEscorialSubmit(e) {
    e.preventDefault();
    if (escorialPwd.trim().toLowerCase() === 'marivi') {
      setShowEscorialModal(false);
      setEscorialPwd('');
      setEscorialError(false);
      onEnterEscorial?.();
    } else {
      setEscorialError(true);
      setEscorialPwd('');
    }
  }

  function closeEscorialModal() {
    setShowEscorialModal(false);
    setEscorialPwd('');
    setEscorialError(false);
  }

  function handleSuperpoderSubmit(e) {
    e.preventDefault();
    if (superpoderPwd.trim().toLowerCase() === 'movimiento') {
      setShowSuperpoderModal(false);
      setSuperpoderPwd('');
      setSuperpoderError(false);
      onEnterSuperpoder?.();
    } else {
      setSuperpoderError(true);
      setSuperpoderPwd('');
    }
  }

  function closeSuperpoderModal() {
    setShowSuperpoderModal(false);
    setSuperpoderPwd('');
    setSuperpoderError(false);
  }

  function handleCrmSubmit(e) {
    e.preventDefault();
    if (crmPwd.trim().toLowerCase() === 'crmovimiento') {
      setShowCrmModal(false);
      setCrmPwd('');
      setCrmError(false);
      window.open('https://github.com/raul-filero/planeta-movimiento-crm', '_blank');
    } else {
      setCrmError(true);
      setCrmPwd('');
    }
  }

  function closeCrmModal() {
    setShowCrmModal(false);
    setCrmPwd('');
    setCrmError(false);
  }

  function handleTdahSubmit(e) {
    e.preventDefault();
    if (tdahPwd.trim().toLowerCase() === 'tdah') {
      setShowTdahModal(false);
      setTdahPwd('');
      setTdahError(false);
      onEnterPolitropico?.();
    } else {
      setTdahError(true);
      setTdahPwd('');
    }
  }

  function closeTdahModal() {
    setShowTdahModal(false);
    setTdahPwd('');
    setTdahError(false);
  }

  function handleNeuroSubmit(e) {
    e.preventDefault();
    if (neuroPwd.trim().toLowerCase() === 'neuro') {
      setShowNeuroModal(false);
      setNeuroPwd('');
      setNeuroError(false);
      window.open('https://github.com/raul-filero/NeuroMusic', '_blank');
    } else {
      setNeuroError(true);
      setNeuroPwd('');
    }
  }

  function closeNeuroModal() {
    setShowNeuroModal(false);
    setNeuroPwd('');
    setNeuroError(false);
  }

  useEffect(() => {
    // Cargar Archivo Black + JetBrains Mono + Noto Sans SC (para zh)
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Archivo+Black&family=JetBrains+Mono:wght@400;700&family=Noto+Sans+SC:wght@400;900&display=swap';
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  // Stack tipográfico: en zh prepende Noto Sans SC para que los CJK no se rompan.
  const display =
    lang === 'zh'
      ? "'Noto Sans SC', 'Archivo Black', sans-serif"
      : "'Archivo Black', sans-serif";
  const mono =
    lang === 'zh'
      ? "'Noto Sans SC', 'JetBrains Mono', monospace"
      : "'JetBrains Mono', monospace";

  return (
    <div style={{ backgroundColor: '#f8f6f1', color: '#080808', fontFamily: mono, minHeight: '100vh' }}>

      {/* NAV */}
      <nav style={{
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <span style={{ fontFamily: display, fontSize: 20, letterSpacing: '-0.03em' }}>
          HEFAIA
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, letterSpacing: '0.15em', opacity: 0.45 }}>
            {t.company}
          </span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid rgba(0,0,0,0.2)',
            fontSize: 10,
            fontWeight: 700,
          }}>
            <Globe size={11} style={{ margin: '0 6px', opacity: 0.5 }} />
            {['es', 'en', 'zh'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                style={{
                  padding: '5px 9px',
                  backgroundColor: lang === l ? '#080808' : 'transparent',
                  color: lang === l ? '#f8f6f1' : '#080808',
                  border: 'none',
                  borderLeft: '1px solid rgba(0,0,0,0.2)',
                  fontFamily: mono,
                  fontWeight: 700,
                  fontSize: 10,
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        padding: 'clamp(80px, 12vw, 160px) 40px clamp(60px, 8vw, 120px)',
        maxWidth: 1100,
        margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(32px, 5vw, 80px)' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
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
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              hyphens: 'none',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                backgroundColor: '#2563eb',
                display: 'inline-block',
                flexShrink: 0,
                boxShadow: '0 0 8px #2563eb',
              }} />
              {t.badge}
            </div>

            <h1 style={{
              fontFamily: display,
              fontSize: 'clamp(36px, 8vw, 120px)',
              letterSpacing: lang === 'zh' ? '-0.02em' : '-0.04em',
              lineHeight: 0.95,
              margin: 0,
            }}>
              {t.heroLine1}<br />
              <span style={{
                WebkitTextStroke: '2px #080808',
                color: 'transparent',
              }}>{t.heroLine2}</span><br />
              {t.heroLine3}
            </h1>
          </div>

          <video
            src="/hefaia-logo.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: 'clamp(140px, 20vw, 260px)',
              flexShrink: 0,
              marginTop: 8,
            }}
          />
        </div>

        <p style={{
          marginTop: 40,
          fontSize: 13,
          letterSpacing: '0.08em',
          opacity: 0.55,
          maxWidth: 520,
          lineHeight: 1.7,
        }}>
          {t.heroDesc}
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
          {t.intro1}
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.8, opacity: 0.7, margin: '0 0 20px', letterSpacing: '0.03em' }}>
          {t.intro2}
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.8, opacity: 0.7, margin: 0, letterSpacing: '0.03em' }}>
          {t.intro3}
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
            {t.labs}
          </h2>
          <span style={{ fontSize: 11, opacity: 0.4, letterSpacing: '0.1em' }}>
            {t.activeProjects}
          </span>
        </div>

        {/* MULETIA CARD — clickable, abre muletia.com en pestaña nueva */}
        <a
          href="https://muletia.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            textDecoration: 'none',
            color: 'inherit',
            backgroundColor: '#ffffff',
            border: '2px solid #080808',
            padding: 'clamp(32px, 4vw, 56px)',
            marginBottom: 16,
            position: 'relative',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
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
                {t.activeBadge}
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
                {t.muletiaDesc}
              </p>
            </div>

            <ArrowUpRight size={32} strokeWidth={1.5} style={{ opacity: 0.45 }} />
          </div>
        </a>

        {/* ONIROS CARD */}
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
                {t.onirosBadge}
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
                {t.onirosDesc}
              </p>
            </div>

            <ArrowUpRight size={32} strokeWidth={1.5} style={{ opacity: 0.4 }} />
          </div>
        </div>

        {/* NEUROMUSIC CARD */}
        <a
          href="/neuromusic/"
          style={{
            display: 'block',
            textDecoration: 'none',
            backgroundColor: '#060010',
            color: '#f0f0ff',
            padding: 'clamp(32px, 4vw, 56px)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(180,0,255,0.3)',
            marginBottom: 16,
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(180,0,255,0.2), 0 0 0 1px rgba(180,0,255,0.5)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Ambient glow fondo */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 20% 50%, rgba(180,0,255,0.07) 0%, rgba(0,245,255,0.04) 50%, transparent 70%)',
          }} />

          {/* Equalizer bars decorativas — esquina derecha */}
          <div style={{
            position: 'absolute', right: 'clamp(24px,4vw,56px)', top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex', alignItems: 'flex-end', gap: 4, height: 48,
            pointerEvents: 'none',
          }}>
            {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.3, 0.65, 0.45].map((h, i) => (
              <div key={i} style={{
                width: 4,
                height: `${h * 100}%`,
                borderRadius: 2,
                background: i % 3 === 0 ? '#ff006e' : i % 3 === 1 ? '#b400ff' : '#00f5ff',
                opacity: 0.5,
                animation: `eq-bar ${0.8 + i * 0.15}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.08}s`,
              }} />
            ))}
          </div>

          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                border: '1px solid rgba(255,0,110,0.5)',
                padding: '4px 10px',
                fontSize: 9,
                letterSpacing: '0.2em',
                color: '#ff006e',
                marginBottom: 24,
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: '50%',
                  backgroundColor: '#ff006e',
                  display: 'inline-block',
                  animation: 'pulse 2s infinite',
                }} />
                {t.neuromusicBadge}
              </div>

              <h3 style={{
                fontFamily: display,
                fontSize: 'clamp(32px, 5vw, 64px)',
                letterSpacing: '-0.04em',
                margin: '0 0 12px',
                lineHeight: 1,
                background: 'linear-gradient(90deg, #ff006e, #b400ff, #00f5ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                NEUROMUSIC
              </h3>

              <p style={{
                fontSize: 13,
                opacity: 0.55,
                maxWidth: 500,
                lineHeight: 1.6,
                letterSpacing: '0.03em',
                margin: 0,
                color: '#f0f0ff',
              }}>
                {t.neuromusicDesc}
              </p>
            </div>

            <ArrowUpRight size={32} strokeWidth={1.5} style={{ opacity: 0.35, color: '#b400ff' }} />
          </div>
        </a>

        {/* PRÓXIMAMENTE */}
        {[
          { name: 'MEMULETIA', descKey: 'memuletiaDesc' },
          { name: 'KEN', descKey: 'kenDesc' },
          { name: 'PROMPT MUSEUM AI', descKey: 'promptMuseumDesc' },
          { name: 'PROYECTO OCRE', descKey: 'proyectoOcreDesc' },
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
                {t[item.descKey]}
              </p>
            </div>
            <span style={{ fontSize: 11, letterSpacing: '0.15em', opacity: 0.35 }}>{t.soonBadge}</span>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid rgba(0,0,0,0.08)',
        padding: '24px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 11,
        letterSpacing: '0.08em',
        opacity: 0.4,
        flexWrap: 'wrap',
        gap: 8,
      }}>
        <span>{t.footer}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            onClick={() => setShowSecretModal(true)}
            title={t.droneTooltip}
            aria-label={t.hangarAria}
            style={{
              background: 'none',
              border: 'none',
              padding: 4,
              cursor: 'pointer',
              opacity: 0.55,
              display: 'inline-flex',
              alignItems: 'center',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              color: '#080808',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.55';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <DroneIcon size={14} />
          </button>
          <button
            onClick={() => setShowEscorialModal(true)}
            title={t.planeTooltip}
            aria-label={t.planeAria}
            style={{
              background: 'none',
              border: 'none',
              padding: 4,
              cursor: 'pointer',
              opacity: 0.55,
              display: 'inline-flex',
              alignItems: 'center',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              color: '#080808',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.55';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <PlaneIcon size={14} />
          </button>
          <button
            onClick={() => setShowSuperpoderModal(true)}
            title={t.boltTooltip}
            aria-label={t.boltAria}
            style={{
              background: 'none',
              border: 'none',
              padding: 4,
              cursor: 'pointer',
              opacity: 0.55,
              display: 'inline-flex',
              alignItems: 'center',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              color: '#080808',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.55';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
          >
            <BoltIcon size={14} />
          </button>
          <button
            onClick={() => setShowCrmModal(true)}
            title={t.crmTooltip}
            aria-label={t.crmAria}
            style={{
              background: 'none',
              border: 'none',
              padding: 4,
              cursor: 'pointer',
              opacity: 0.55,
              display: 'inline-flex',
              alignItems: 'center',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              color: '#080808',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.55';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <BriefcaseIcon size={14} />
          </button>
          <button
            onClick={() => setShowTdahModal(true)}
            title="Investigación"
            aria-label="Acceso a investigación"
            style={{
              background: 'none',
              border: 'none',
              padding: 4,
              cursor: 'pointer',
              opacity: 0.55,
              display: 'inline-flex',
              alignItems: 'center',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              color: '#080808',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.55';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <BrainIcon size={14} />
          </button>
          <button
            onClick={() => setShowNeuroModal(true)}
            title="NeuroMusic"
            aria-label="Acceso a NeuroMusic"
            style={{
              background: 'none',
              border: 'none',
              padding: 4,
              cursor: 'pointer',
              opacity: 0.55,
              display: 'inline-flex',
              alignItems: 'center',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              color: '#080808',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.color = '#b400ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.55';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.color = '#080808';
            }}
          >
            <MusicIcon size={14} />
          </button>
          <span>hefaia.com</span>
        </span>
      </footer>

      {showSecretModal && (
        <div
          onClick={closeSecretModal}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(8,8,8,0.78)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#0a0a0a',
              color: '#f2ede3',
              border: '1px solid #2a2a2a',
              maxWidth: 360,
              width: '100%',
              padding: 32,
              fontFamily: mono,
              position: 'relative',
            }}
          >
            <button
              onClick={closeSecretModal}
              aria-label={t.closeAria}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'none',
                border: 'none',
                color: '#f2ede3',
                cursor: 'pointer',
                padding: 4,
                opacity: 0.6,
              }}
            >
              <X size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <DroneIcon size={20} color="#9d0208" />
              <span
                style={{
                  fontFamily: display,
                  fontSize: 18,
                  letterSpacing: '-0.02em',
                }}
              >
                {t.hangar}
              </span>
            </div>
            <p
              style={{
                fontSize: 11,
                opacity: 0.55,
                margin: '0 0 22px',
                letterSpacing: '0.1em',
              }}
            >
              {t.accessCode}
            </p>

            <form onSubmit={handleSecretSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input
                type="password"
                autoFocus
                value={secretPwd}
                onChange={(e) => {
                  setSecretPwd(e.target.value);
                  if (secretError) setSecretError(false);
                }}
                placeholder="········"
                style={{
                  background: 'transparent',
                  color: '#f2ede3',
                  border: '1px solid ' + (secretError ? '#9d0208' : '#3a3a3a'),
                  padding: '12px 14px',
                  fontFamily: mono,
                  fontSize: 14,
                  letterSpacing: '0.2em',
                  outline: 'none',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                }}
              />

              {secretError && (
                <span
                  style={{
                    fontSize: 10,
                    color: '#ef4444',
                    letterSpacing: '0.1em',
                    textAlign: 'center',
                  }}
                >
                  {t.wrongCode}
                </span>
              )}

              <button
                type="submit"
                style={{
                  backgroundColor: '#9d0208',
                  color: '#f2ede3',
                  border: 'none',
                  padding: '12px',
                  fontFamily: mono,
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '0.2em',
                  cursor: 'pointer',
                }}
              >
                {t.submit}
              </button>
            </form>
          </div>
        </div>
      )}

      {showEscorialModal && (
        <div
          onClick={closeEscorialModal}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(8,8,8,0.78)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#0a0908',
              color: '#f2ede3',
              border: '1px solid #2a201a',
              maxWidth: 360,
              width: '100%',
              padding: 32,
              fontFamily: mono,
              position: 'relative',
            }}
          >
            <button
              onClick={closeEscorialModal}
              aria-label={t.closeAria}
              style={{
                position: 'absolute', top: 12, right: 12,
                background: 'none', border: 'none',
                color: '#f2ede3', cursor: 'pointer',
                padding: 4, opacity: 0.6,
              }}
            >
              <X size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <PlaneIcon size={20} color="#c8a96e" />
              <span style={{ fontFamily: display, fontSize: 18, letterSpacing: '-0.02em' }}>
                {t.escorialLabel}
              </span>
            </div>
            <p style={{ fontSize: 11, opacity: 0.55, margin: '0 0 22px', letterSpacing: '0.1em' }}>
              {t.accessCode}
            </p>

            <form onSubmit={handleEscorialSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input
                type="password"
                autoFocus
                value={escorialPwd}
                onChange={(e) => {
                  setEscorialPwd(e.target.value);
                  if (escorialError) setEscorialError(false);
                }}
                placeholder="········"
                style={{
                  background: 'transparent',
                  color: '#f2ede3',
                  border: '1px solid ' + (escorialError ? '#9d0208' : '#2a201a'),
                  padding: '12px 14px',
                  fontFamily: mono,
                  fontSize: 14,
                  letterSpacing: '0.2em',
                  outline: 'none',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                }}
              />
              {escorialError && (
                <span style={{ fontSize: 10, color: '#ef4444', letterSpacing: '0.1em', textAlign: 'center' }}>
                  {t.escorialWrongCode}
                </span>
              )}
              <button
                type="submit"
                style={{
                  backgroundColor: '#c8a96e',
                  color: '#0a0908',
                  border: 'none',
                  padding: '12px',
                  fontFamily: mono,
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '0.2em',
                  cursor: 'pointer',
                }}
              >
                {t.escorialSubmit}
              </button>
            </form>
          </div>
        </div>
      )}

      {showSuperpoderModal && (
        <div
          onClick={closeSuperpoderModal}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(8,8,24,0.88)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#080818',
              color: '#d4d4f0',
              border: '1px solid #2a2a5a',
              maxWidth: 360,
              width: '100%',
              padding: 32,
              fontFamily: mono,
              position: 'relative',
            }}
          >
            <button
              onClick={closeSuperpoderModal}
              aria-label={t.closeAria}
              style={{
                position: 'absolute', top: 12, right: 12,
                background: 'none', border: 'none',
                color: '#d4d4f0', cursor: 'pointer',
                padding: 4, opacity: 0.6,
              }}
            >
              <X size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <BoltIcon size={20} color="#ffd700" />
              <span style={{ fontFamily: display, fontSize: 18, letterSpacing: '-0.02em' }}>
                {t.boltLabel}
              </span>
            </div>
            <p style={{ fontSize: 11, opacity: 0.55, margin: '0 0 22px', letterSpacing: '0.1em' }}>
              {t.accessCode}
            </p>

            <form onSubmit={handleSuperpoderSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input
                type="password"
                autoFocus
                value={superpoderPwd}
                onChange={(e) => {
                  setSuperpoderPwd(e.target.value);
                  if (superpoderError) setSuperpoderError(false);
                }}
                placeholder="········"
                style={{
                  background: 'transparent',
                  color: '#d4d4f0',
                  border: '1px solid ' + (superpoderError ? '#9d0208' : '#2a2a5a'),
                  padding: '12px 14px',
                  fontFamily: mono,
                  fontSize: 14,
                  letterSpacing: '0.2em',
                  outline: 'none',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                }}
              />
              {superpoderError && (
                <span style={{ fontSize: 10, color: '#ef4444', letterSpacing: '0.1em', textAlign: 'center' }}>
                  {t.boltWrongCode}
                </span>
              )}
              <button
                type="submit"
                style={{
                  backgroundColor: '#ffd700',
                  color: '#080818',
                  border: 'none',
                  padding: '12px',
                  fontFamily: mono,
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '0.2em',
                  cursor: 'pointer',
                }}
              >
                {t.boltSubmit}
              </button>
            </form>
          </div>
        </div>
      )}

      {showCrmModal && (
        <div
          onClick={closeCrmModal}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,10,4,0.88)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#040d06',
              color: '#d4f0dc',
              border: '1px solid #1a3a22',
              maxWidth: 360,
              width: '100%',
              padding: 32,
              fontFamily: mono,
              position: 'relative',
            }}
          >
            <button
              onClick={closeCrmModal}
              aria-label={t.closeAria}
              style={{
                position: 'absolute', top: 12, right: 12,
                background: 'none', border: 'none',
                color: '#d4f0dc', cursor: 'pointer',
                padding: 4, opacity: 0.6,
              }}
            >
              <X size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <BriefcaseIcon size={20} color="#22c55e" />
              <span style={{ fontFamily: display, fontSize: 18, letterSpacing: '-0.02em' }}>
                {t.crmLabel}
              </span>
            </div>
            <p style={{ fontSize: 11, opacity: 0.55, margin: '0 0 22px', letterSpacing: '0.1em' }}>
              {t.accessCode}
            </p>

            <form onSubmit={handleCrmSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input
                type="password"
                autoFocus
                value={crmPwd}
                onChange={(e) => {
                  setCrmPwd(e.target.value);
                  if (crmError) setCrmError(false);
                }}
                placeholder="········"
                style={{
                  background: 'transparent',
                  color: '#d4f0dc',
                  border: '1px solid ' + (crmError ? '#9d0208' : '#1a3a22'),
                  padding: '12px 14px',
                  fontFamily: mono,
                  fontSize: 14,
                  letterSpacing: '0.2em',
                  outline: 'none',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                }}
              />
              {crmError && (
                <span style={{ fontSize: 10, color: '#ef4444', letterSpacing: '0.1em', textAlign: 'center' }}>
                  {t.crmWrongCode}
                </span>
              )}
              <button
                type="submit"
                style={{
                  backgroundColor: '#22c55e',
                  color: '#040d06',
                  border: 'none',
                  padding: '12px',
                  fontFamily: mono,
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '0.2em',
                  cursor: 'pointer',
                }}
              >
                {t.crmSubmit}
              </button>
            </form>
          </div>
        </div>
      )}

      {showTdahModal && (
        <div
          onClick={closeTdahModal}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(8,8,20,0.82)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#fafafa',
              color: '#111',
              border: '1px solid #e0e0e0',
              maxWidth: 360,
              width: '100%',
              padding: 32,
              fontFamily: mono,
              position: 'relative',
            }}
          >
            <button
              onClick={closeTdahModal}
              aria-label="Cerrar"
              style={{
                position: 'absolute', top: 12, right: 12,
                background: 'none', border: 'none',
                color: '#555', cursor: 'pointer',
                padding: 4, opacity: 0.6,
              }}
            >
              <X size={16} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <BrainIcon size={20} color="#1a1a2e" />
              <span style={{ fontFamily: display, fontSize: 18, letterSpacing: '-0.02em', color: '#1a1a2e' }}>
                Investigación
              </span>
            </div>
            <p style={{ fontSize: 11, opacity: 0.5, margin: '0 0 22px', letterSpacing: '0.1em' }}>
              CÓDIGO DE ACCESO
            </p>
            <form onSubmit={handleTdahSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input
                type="password"
                autoFocus
                value={tdahPwd}
                onChange={(e) => {
                  setTdahPwd(e.target.value);
                  if (tdahError) setTdahError(false);
                }}
                placeholder="········"
                style={{
                  background: '#fff',
                  color: '#111',
                  border: '1px solid ' + (tdahError ? '#9d0208' : '#ccc'),
                  padding: '12px 14px',
                  fontFamily: mono,
                  fontSize: 14,
                  letterSpacing: '0.2em',
                  outline: 'none',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                }}
              />
              {tdahError && (
                <span style={{ fontSize: 10, color: '#ef4444', letterSpacing: '0.1em', textAlign: 'center' }}>
                  CÓDIGO INCORRECTO
                </span>
              )}
              <button
                type="submit"
                style={{
                  backgroundColor: '#1a1a2e',
                  color: '#fff',
                  border: 'none',
                  padding: '12px',
                  fontFamily: mono,
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '0.2em',
                  cursor: 'pointer',
                }}
              >
                ACCEDER
              </button>
            </form>
          </div>
        </div>
      )}

      {showNeuroModal && (
        <div
          onClick={closeNeuroModal}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(6,0,16,0.9)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#060010',
              color: '#f0f0ff',
              border: '1px solid rgba(180,0,255,0.4)',
              boxShadow: '0 0 60px rgba(180,0,255,0.18), 0 0 120px rgba(0,245,255,0.06)',
              maxWidth: 360,
              width: '100%',
              padding: 32,
              fontFamily: mono,
              position: 'relative',
            }}
          >
            <button
              onClick={closeNeuroModal}
              aria-label="Cerrar"
              style={{
                position: 'absolute', top: 12, right: 12,
                background: 'none', border: 'none',
                color: 'rgba(180,0,255,0.5)', cursor: 'pointer',
                padding: 4,
              }}
            >
              <X size={16} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <MusicIcon size={20} color="#b400ff" />
              <span style={{ fontFamily: display, fontSize: 18, letterSpacing: '-0.02em', color: '#b400ff' }}>
                NEUROMUSIC
              </span>
            </div>
            <p style={{ fontSize: 10, opacity: 0.4, margin: '0 0 22px', letterSpacing: '0.15em' }}>
              SEÑAL PRIVADA · CÓDIGO DE ACCESO
            </p>
            <form onSubmit={handleNeuroSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input
                type="password"
                autoFocus
                value={neuroPwd}
                onChange={(e) => {
                  setNeuroPwd(e.target.value);
                  if (neuroError) setNeuroError(false);
                }}
                placeholder="········"
                style={{
                  background: 'transparent',
                  color: '#00f5ff',
                  border: '1px solid ' + (neuroError ? '#ff006e' : 'rgba(0,245,255,0.3)'),
                  padding: '12px 14px',
                  fontFamily: mono,
                  fontSize: 14,
                  letterSpacing: '0.2em',
                  outline: 'none',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                  width: '100%',
                }}
              />
              {neuroError && (
                <span style={{ fontSize: 10, color: '#ff006e', letterSpacing: '0.1em', textAlign: 'center' }}>
                  SEÑAL NO RECONOCIDA
                </span>
              )}
              <button
                type="submit"
                style={{
                  backgroundColor: '#b400ff',
                  color: '#060010',
                  border: 'none',
                  padding: '12px',
                  fontFamily: mono,
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '0.2em',
                  cursor: 'pointer',
                }}
              >
                SINTONIZAR →
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes eq-bar {
          from { transform: scaleY(0.3); opacity: 0.35; }
          to   { transform: scaleY(1);   opacity: 0.7;  }
        }
      `}</style>
    </div>
  );
}
