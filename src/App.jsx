import { useState, useEffect, useMemo, useCallback } from 'react';
import { AlertTriangle, X, ArrowUpRight, Plus, Radio, Globe } from 'lucide-react';
import vectaraData from './data/vectara.json';

/* ============================================================
   i18n — ES / EN / ZH
   ============================================================ */
const I18N = {
  es: {
    brand: 'ONIROS',
    tagline: 'EL ALUCINÓMETRO',
    version: 'v0.1 · beta',
    report: 'REPORTAR ALUCINACIÓN',
    heroLine1: 'LESS',
    heroLine2: 'HALLUCINATION,',
    heroLine3: 'MORE TRUTH.',
    heroDesc:
      'RANKING DE FIABILIDAD DE MODELOS DE LENGUAJE. DATOS OFICIALES VS. PERCEPCIÓN DE LA COMUNIDAD. TÚ DECIDES.',
    rankTitle: 'RANKING DEL HUMO',
    rankHint: '↓ cuanto más abajo, más miente',
    modeOfficial: 'MODO OFICIAL',
    modeCommunity: 'MODO COMUNIDAD',
    modeOfficialDesc: 'benchmark Vectara HHEM',
    modeCommunityDesc: 'reportes de usuarios (Reddit + propios)',
    warning: 'Las respuestas de la IA pueden contener errores.',
    moreInfo: 'Más información',
    reportsLabel: 'REPORTES',
    rateLabel: 'TASA',
    pending: 'PENDIENTE',
    notRated: 'AUTO-EVALUACIÓN EN CURSO',
    evidences: 'EVIDENCIAS RECIENTES',
    evidencesSrc: '// SCRAPEADO DE REDDIT',
    see: 'VER',
    sync: 'ÚLTIMA SYNC',
    footer1: 'ONIROS · UN PROYECTO DE HEFAIA · DATOS AGREGADOS',
    footer2: 'PRUEBA DE CONCEPTO · DATOS DUMMY',
    modalTitle: 'REPORTAR UNA MENTIRA',
    modalDesc: 'PEGA LA ALUCINACIÓN Y UN ENLACE DE PRUEBA.',
    fieldModel: 'MODELO',
    fieldText: 'QUÉ SE INVENTÓ',
    fieldTextPh: 'Pega aquí la respuesta alucinada...',
    fieldUrl: 'PRUEBA (URL DE CHAT / IMGUR / REDDIT)',
    submit: 'ENVIAR REPORTE →',
    dangerLow: 'CONFIABLE',
    dangerMid: 'DUDOSA',
    dangerHigh: 'PELIGROSA',
    dangerCrit: 'HUMO PURO',
    onirosNote: 'Tampoco nos escapamos. Vota nuestra tasa.',
  },
  en: {
    brand: 'ONIROS',
    tagline: 'THE HALLUCINOMETER',
    version: 'v0.1 · beta',
    report: 'REPORT HALLUCINATION',
    heroLine1: 'LESS',
    heroLine2: 'HALLUCINATION,',
    heroLine3: 'MORE TRUTH.',
    heroDesc:
      'RELIABILITY RANKING OF LANGUAGE MODELS. OFFICIAL BENCHMARKS VS. COMMUNITY PERCEPTION. YOU DECIDE.',
    rankTitle: 'THE SMOKE RANKING',
    rankHint: '↓ the lower, the more it lies',
    modeOfficial: 'OFFICIAL MODE',
    modeCommunity: 'COMMUNITY MODE',
    modeOfficialDesc: 'Vectara HHEM benchmark',
    modeCommunityDesc: 'user reports (Reddit + ours)',
    warning: 'AI responses may contain mistakes.',
    moreInfo: 'More info',
    reportsLabel: 'REPORTS',
    rateLabel: 'RATE',
    pending: 'PENDING',
    notRated: 'SELF-ASSESSMENT IN PROGRESS',
    evidences: 'RECENT EVIDENCE',
    evidencesSrc: '// SCRAPED FROM REDDIT',
    see: 'VIEW',
    sync: 'LAST SYNC',
    footer1: 'ONIROS · A HEFAIA PROJECT · AGGREGATED DATA',
    footer2: 'PROOF OF CONCEPT · DUMMY DATA',
    modalTitle: 'REPORT A LIE',
    modalDesc: 'PASTE THE HALLUCINATION AND A PROOF LINK.',
    fieldModel: 'MODEL',
    fieldText: 'WHAT IT MADE UP',
    fieldTextPh: 'Paste the hallucinated answer here...',
    fieldUrl: 'PROOF (CHAT / IMGUR / REDDIT URL)',
    submit: 'SEND REPORT →',
    dangerLow: 'RELIABLE',
    dangerMid: 'QUESTIONABLE',
    dangerHigh: 'DANGEROUS',
    dangerCrit: 'PURE SMOKE',
    onirosNote: "We don't escape either. Vote our rate.",
  },
  zh: {
    brand: 'ONIROS',
    tagline: '幻觉测量仪',
    version: 'v0.1 · 测试版',
    report: '举报幻觉',
    heroLine1: '少一点',
    heroLine2: '幻觉，',
    heroLine3: '多一点真相。',
    heroDesc: '大语言模型可靠性排行榜。官方基准 vs 社区感知。你来决定。',
    rankTitle: '谎言排行榜',
    rankHint: '↓ 越往下，撒谎越多',
    modeOfficial: '官方模式',
    modeCommunity: '社区模式',
    modeOfficialDesc: 'Vectara HHEM 基准测试',
    modeCommunityDesc: '用户举报（Reddit + 本站）',
    warning: 'AI 的回答可能包含错误。',
    moreInfo: '更多信息',
    reportsLabel: '举报数',
    rateLabel: '幻觉率',
    pending: '待评估',
    notRated: '自我评估中',
    evidences: '最新证据',
    evidencesSrc: '// 来自 Reddit',
    see: '查看',
    sync: '最后同步',
    footer1: 'ONIROS · HEFAIA 项目 · 聚合数据',
    footer2: '概念验证 · 模拟数据',
    modalTitle: '举报一个谎言',
    modalDesc: '粘贴幻觉内容和证据链接。',
    fieldModel: '模型',
    fieldText: '编造了什么',
    fieldTextPh: '在此粘贴幻觉回答...',
    fieldUrl: '证据（聊天 / Imgur / Reddit 链接）',
    submit: '提交举报 →',
    dangerLow: '可靠',
    dangerMid: '存疑',
    dangerHigh: '危险',
    dangerCrit: '纯属胡扯',
    onirosNote: '我们也跑不掉。投我们一票。',
  },
};

/* ============================================================
   Modelos: los rates oficiales vienen de vectara.json (datos reales,
   actualizables con `npm run update-vectara`). Los reportes de la
   comunidad y los posts de Reddit son mock por ahora — se conectarán
   a una BD real (Supabase) en la siguiente iteración.
   ============================================================ */

// Datos de comunidad (mock). Cuando haya BD real, esto vendrá de Supabase.
const COMMUNITY_DATA = {
  claude: {
    communityReports: 156,
    redditPosts: [
      { title: 'Se inventó una API de Python con docs detalladas', subreddit: 'r/ClaudeAI', upvotes: 423, date: '3d' },
    ],
  },
  gpt5: {
    communityReports: 342,
    redditPosts: [
      { title: 'Me dio un paper de arXiv que no existe', subreddit: 'r/ChatGPT', upvotes: 847, date: '1d' },
      { title: 'Inventó una función de NumPy con 100% confianza', subreddit: 'r/OpenAI', upvotes: 1203, date: '3d' },
    ],
  },
  gemini: {
    communityReports: 489,
    redditPosts: [
      { title: 'Juró que la Torre Eiffel está en Roma', subreddit: 'r/Bard', upvotes: 2143, date: '2d' },
      { title: 'Me inventó 3 citas de Wikipedia', subreddit: 'r/Bard', upvotes: 891, date: '4d' },
    ],
  },
  llama: {
    communityReports: 201,
    redditPosts: [
      { title: 'Inventó una ciudad llamada "Santarém del Mar"', subreddit: 'r/LocalLLaMA', upvotes: 234, date: '2d' },
    ],
  },
  grok: {
    communityReports: 287,
    redditPosts: [
      { title: 'Dice que Shakespeare era alemán', subreddit: 'r/grok', upvotes: 891, date: '12h' },
    ],
  },
  deepseek: {
    communityReports: 98,
    redditPosts: [
      { title: 'Confundió dos emperadores Han distintos', subreddit: 'r/LocalLLaMA', upvotes: 156, date: '4d' },
    ],
  },
  mistral: {
    communityReports: 67,
    redditPosts: [
      { title: 'Inventó una ley francesa inexistente al citarla', subreddit: 'r/LocalLLaMA', upvotes: 112, date: '5d' },
    ],
  },
};

// Combina datos oficiales de Vectara + datos de comunidad
const INITIAL_MODELS = [
  ...vectaraData.models.map((m) => ({
    ...m,
    isSelf: false,
    communityReports: COMMUNITY_DATA[m.id]?.communityReports ?? 0,
    redditPosts: COMMUNITY_DATA[m.id]?.redditPosts ?? [],
  })),
  // Oniros: no está en Vectara, se auto-evalúa
  {
    id: 'oniros',
    name: 'ONIROS',
    company: 'Hefaia',
    officialRate: null,
    communityReports: 0,
    isSelf: true,
    redditPosts: [],
  },
];

function getDanger(ratio, t) {
  if (ratio < 0.35) return { level: t.dangerLow, color: '#2d6a4f', bg: '#2d6a4f' };
  if (ratio < 0.55) return { level: t.dangerMid, color: '#b8860b', bg: '#d4a017' };
  if (ratio < 0.80) return { level: t.dangerHigh, color: '#c2410c', bg: '#ea580c' };
  return { level: t.dangerCrit, color: '#7f1d1d', bg: '#9d0208' };
}

export default function Alucinometro({ onBack, lang: langProp, setLang: setLangProp }) {
  const [models, setModels] = useState(INITIAL_MODELS);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('gemini');
  const [formText, setFormText] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [pulseId, setPulseId] = useState(null);
  // Lang sincronizado con HefaiaLanding via props desde main.jsx; fallback local si se monta solo.
  const [langLocal, setLangLocal] = useState('en');
  const lang = langProp ?? langLocal;
  const setLang = setLangProp ?? setLangLocal;
  const [mode, setMode] = useState('community');

  const t = I18N[lang];

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Archivo+Black&family=JetBrains+Mono:wght@400;700&family=Noto+Sans+SC:wght@400;900&display=swap';
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  const scoreOf = useCallback(
    (model) => {
      if (mode === 'official') {
        if (model.officialRate == null) return -1;
        return model.officialRate;
      }
      return model.communityReports;
    },
    [mode]
  );

  const sorted = useMemo(() => {
    const rated = models.filter((m) => scoreOf(m) !== -1);
    const unrated = models.filter((m) => scoreOf(m) === -1);
    return [...rated.sort((a, b) => scoreOf(a) - scoreOf(b)), ...unrated];
  }, [models, scoreOf]);

  const ratedValues = models.filter((m) => scoreOf(m) !== -1).map(scoreOf);
  const maxScore = Math.max(...ratedValues, 1);
  const totalReports = models.reduce((s, m) => s + m.communityReports, 0);

  function handleReport(e) {
    e.preventDefault();
    if (!formText.trim()) return;
    setModels((prev) =>
      prev.map((m) =>
        m.id === selectedId ? { ...m, communityReports: m.communityReports + 1 } : m
      )
    );
    setPulseId(selectedId);
    setTimeout(() => setPulseId(null), 1200);
    setFormText('');
    setFormUrl('');
    setShowModal(false);
  }

  const now = new Date();
  const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const fontStack =
    lang === 'zh'
      ? "'Noto Sans SC', 'JetBrains Mono', monospace"
      : "'JetBrains Mono', monospace";
  const displayStack =
    lang === 'zh'
      ? "'Noto Sans SC', 'Archivo Black', sans-serif"
      : "'Archivo Black', sans-serif";

  return (
    <div
      style={{
        backgroundColor: '#f2ede3',
        color: '#0a0a0a',
        fontFamily: fontStack,
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.04,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          zIndex: 1,
        }}
      />

      <nav
        style={{
          borderBottom: '3px solid #0a0a0a',
          padding: '14px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f2ede3',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: fontStack,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                opacity: 0.5,
                padding: '4px 8px 4px 0',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              ← HEFAIA
            </button>
          )}
          <AlertTriangle size={22} strokeWidth={2.5} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: displayStack, fontSize: 18, letterSpacing: '-0.02em' }}>
              {t.brand}
            </span>
            <span
              style={{
                fontSize: 9,
                letterSpacing: '0.2em',
                opacity: 0.6,
                marginTop: 3,
                fontWeight: 700,
              }}
            >
              {t.tagline}
            </span>
          </div>
          <span style={{ fontSize: 11, opacity: 0.6, marginLeft: 8 }}>{t.version}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              border: '2px solid #0a0a0a',
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            <Globe size={12} style={{ margin: '0 6px' }} />
            {['es', 'en', 'zh'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  padding: '6px 10px',
                  backgroundColor: lang === l ? '#0a0a0a' : 'transparent',
                  color: lang === l ? '#f2ede3' : '#0a0a0a',
                  border: 'none',
                  borderLeft: '1px solid #0a0a0a',
                  fontFamily: fontStack,
                  fontWeight: 700,
                  fontSize: 11,
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowModal(true)}
            style={{
              backgroundColor: '#0a0a0a',
              color: '#f2ede3',
              border: 'none',
              padding: '10px 18px',
              fontFamily: fontStack,
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.1em',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Plus size={14} /> {t.report}
          </button>
        </div>
      </nav>

      <div
        style={{
          borderBottom: '1px solid #0a0a0a',
          padding: '10px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.08em',
          backgroundColor: '#e8e0cf',
          position: 'relative',
          zIndex: 2,
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Radio size={12} />{' '}
          {mode === 'official'
            ? `VECTARA HHEM · ${sorted.length} modelos`
            : 'r/ChatGPT · r/Bard · r/ClaudeAI · r/LocalLLaMA · r/grok'}
        </span>
        <span>
          {t.sync} →{' '}
          {mode === 'official'
            ? new Date(vectaraData.updatedAt).toLocaleDateString(lang === 'zh' ? 'zh-CN' : lang === 'en' ? 'en-US' : 'es-ES')
            : timeString}{' '}
          · {totalReports} {t.reportsLabel}
        </span>
      </div>

      <section
        style={{
          padding: '64px 24px 40px',
          borderBottom: '3px solid #0a0a0a',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: displayStack,
            fontSize: 'clamp(44px, 9vw, 148px)',
            letterSpacing: lang === 'zh' ? '-0.02em' : '-0.05em',
            lineHeight: 0.88,
            margin: 0,
          }}
        >
          {t.heroLine1}
          <br />
          <span style={{ color: '#9d0208' }}>{t.heroLine2}</span>
          <br />
          {t.heroLine3}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 12,
            letterSpacing: '0.15em',
            opacity: 0.75,
            maxWidth: 560,
            lineHeight: 1.5,
          }}
        >
          {t.heroDesc}
        </div>
      </section>

      <section style={{ padding: '32px 24px 0', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', border: '3px solid #0a0a0a', maxWidth: 720 }}>
          {[
            { id: 'official', label: t.modeOfficial, desc: t.modeOfficialDesc },
            { id: 'community', label: t.modeCommunity, desc: t.modeCommunityDesc },
          ].map((m) => {
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                style={{
                  flex: 1,
                  padding: '16px 20px',
                  backgroundColor: active ? '#0a0a0a' : 'transparent',
                  color: active ? '#f2ede3' : '#0a0a0a',
                  border: 'none',
                  fontFamily: fontStack,
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderRight: m.id === 'official' ? '3px solid #0a0a0a' : 'none',
                }}
              >
                <div style={{ fontFamily: displayStack, fontSize: 16, letterSpacing: '-0.01em' }}>
                  {m.label}
                </div>
                <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4 }}>{m.desc}</div>
              </button>
            );
          })}
        </div>
      </section>

      <section style={{ padding: '40px 24px 24px', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 16,
            marginBottom: 32,
            flexWrap: 'wrap',
          }}
        >
          <h1
            style={{
              fontFamily: displayStack,
              fontSize: 'clamp(32px, 6vw, 72px)',
              letterSpacing: '-0.03em',
              lineHeight: 0.9,
              margin: 0,
            }}
          >
            {t.rankTitle}
          </h1>
          <span style={{ fontSize: 12, opacity: 0.6 }}>{t.rankHint}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {sorted.map((model, idx) => {
            const score = scoreOf(model);
            const isUnrated = score === -1;
            const ratio = isUnrated ? 0 : score / maxScore;
            const danger = getDanger(ratio, t);
            const isPulsing = pulseId === model.id;

            return (
              <div
                key={model.id}
                style={{
                  borderTop: '2px solid #0a0a0a',
                  paddingTop: 18,
                  position: 'relative',
                  transition: 'transform 0.3s ease',
                  transform: isPulsing ? 'translateX(8px)' : 'translateX(0)',
                  opacity: isUnrated ? 0.55 : 1,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 4,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    flexWrap: 'wrap',
                    gap: 8,
                  }}
                >
                  <span>
                    #{String(idx + 1).padStart(2, '0')} · {model.company.toUpperCase()}
                    {model.isSelf && (
                      <span
                        style={{
                          marginLeft: 8,
                          backgroundColor: '#0a0a0a',
                          color: '#f2ede3',
                          padding: '2px 6px',
                          fontSize: 9,
                        }}
                      >
                        SELF
                      </span>
                    )}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {isUnrated ? (
                      <span
                        style={{
                          backgroundColor: '#555',
                          color: '#f2ede3',
                          padding: '3px 8px',
                          letterSpacing: '0.1em',
                        }}
                      >
                        {t.pending}
                      </span>
                    ) : (
                      <span
                        style={{
                          backgroundColor: danger.bg,
                          color: '#f2ede3',
                          padding: '3px 8px',
                          letterSpacing: '0.1em',
                        }}
                      >
                        {danger.level}
                      </span>
                    )}
                    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {isUnrated
                        ? t.notRated
                        : mode === 'official'
                        ? `${model.officialRate}% ${t.rateLabel}`
                        : `${model.communityReports} ${t.reportsLabel}`}
                    </span>
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: displayStack,
                    fontSize: '2.5rem',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    color: '#0a0a0a',
                    margin: 0,
                    wordBreak: 'break-word',
                  }}
                >
                  {model.name}
                </div>

                {!isUnrated && (
                  <div
                    style={{
                      fontFamily: displayStack,
                      fontSize: `${0.9 + ratio * 7.5}rem`,
                      lineHeight: 0.95,
                      letterSpacing: '-0.03em',
                      marginTop: 12,
                      color: danger.color,
                      display: 'flex',
                      alignItems: 'center',
                      gap: `${8 + ratio * 16}px`,
                      wordBreak: 'break-word',
                      transition: 'font-size 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    }}
                  >
                    <AlertTriangle
                      size={Math.min(20 + ratio * 80, 120)}
                      strokeWidth={2.5}
                      style={{ flexShrink: 0 }}
                    />
                    <span>
                      {t.warning}{' '}
                      <span style={{ textDecoration: 'underline' }}>{t.moreInfo}</span>
                    </span>
                  </div>
                )}

                {model.isSelf && (
                  <div
                    style={{
                      marginTop: 12,
                      fontSize: 13,
                      opacity: 0.7,
                      fontStyle: 'italic',
                    }}
                  >
                    ↑ {t.onirosNote}
                  </div>
                )}

                <div
                  style={{
                    marginTop: 14,
                    height: 4,
                    backgroundColor: '#d4ccb8',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${ratio * 100}%`,
                      backgroundColor: isUnrated ? '#555' : danger.color,
                      transition: 'width 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section
        style={{
          borderTop: '3px solid #0a0a0a',
          marginTop: 48,
          padding: '32px 24px',
          backgroundColor: '#0a0a0a',
          color: '#f2ede3',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 12,
            marginBottom: 24,
            flexWrap: 'wrap',
          }}
        >
          <h2
            style={{
              fontFamily: displayStack,
              fontSize: 'clamp(24px, 4vw, 44px)',
              letterSpacing: '-0.03em',
              margin: 0,
            }}
          >
            {t.evidences}
          </h2>
          <span style={{ fontSize: 11, opacity: 0.6, letterSpacing: '0.1em' }}>
            {t.evidencesSrc}
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 12,
          }}
        >
          {sorted
            .flatMap((m) =>
              m.redditPosts.map((p, i) => {
                const score = scoreOf(m);
                const ratio = score === -1 ? 0 : score / maxScore;
                return {
                  ...p,
                  modelName: m.name,
                  color: getDanger(ratio, t).color,
                  key: `${m.id}-${i}`,
                };
              })
            )
            .map((post) => (
              <div
                key={post.key}
                style={{
                  border: '1px solid #3a3a3a',
                  padding: 14,
                  fontSize: 13,
                  lineHeight: 1.4,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    opacity: 0.7,
                  }}
                >
                  <span style={{ color: post.color, fontWeight: 700 }}>[{post.modelName}]</span>
                  <span>
                    {post.subreddit} · {post.date}
                  </span>
                </div>
                <div style={{ marginBottom: 10 }}>&gt; {post.title}</div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: 11,
                    opacity: 0.7,
                  }}
                >
                  <span>↑ {post.upvotes.toLocaleString()}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {t.see} <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            ))}
        </div>
      </section>

      <footer
        style={{
          borderTop: '1px solid #3a3a3a',
          padding: '20px 24px',
          backgroundColor: '#0a0a0a',
          color: '#f2ede3',
          fontSize: 11,
          letterSpacing: '0.08em',
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 2,
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <span>{t.footer1}</span>
        <span>{t.footer2}</span>
      </footer>

      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10,10,10,0.85)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#f2ede3',
              border: '3px solid #0a0a0a',
              maxWidth: 520,
              width: '100%',
              padding: 28,
              position: 'relative',
            }}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
              }}
            >
              <X size={20} />
            </button>
            <h3
              style={{
                fontFamily: displayStack,
                fontSize: 28,
                letterSpacing: '-0.02em',
                margin: '0 0 6px',
              }}
            >
              {t.modalTitle}
            </h3>
            <p
              style={{
                fontSize: 12,
                opacity: 0.7,
                margin: '0 0 20px',
                letterSpacing: '0.05em',
              }}
            >
              {t.modalDesc}
            </p>
            <form onSubmit={handleReport} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em' }}>
                {t.fieldModel}
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  style={{
                    display: 'block',
                    width: '100%',
                    marginTop: 6,
                    padding: '10px 12px',
                    border: '2px solid #0a0a0a',
                    backgroundColor: '#f2ede3',
                    fontFamily: fontStack,
                    fontSize: 14,
                  }}
                >
                  {models.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} — {m.company}
                    </option>
                  ))}
                </select>
              </label>

              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em' }}>
                {t.fieldText}
                <textarea
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  placeholder={t.fieldTextPh}
                  rows={4}
                  style={{
                    display: 'block',
                    width: '100%',
                    marginTop: 6,
                    padding: '10px 12px',
                    border: '2px solid #0a0a0a',
                    backgroundColor: '#f2ede3',
                    fontFamily: fontStack,
                    fontSize: 13,
                    resize: 'vertical',
                    boxSizing: 'border-box',
                  }}
                />
              </label>

              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em' }}>
                {t.fieldUrl}
                <input
                  type="url"
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                  placeholder="https://..."
                  style={{
                    display: 'block',
                    width: '100%',
                    marginTop: 6,
                    padding: '10px 12px',
                    border: '2px solid #0a0a0a',
                    backgroundColor: '#f2ede3',
                    fontFamily: fontStack,
                    fontSize: 13,
                    boxSizing: 'border-box',
                  }}
                />
              </label>

              <button
                type="submit"
                style={{
                  backgroundColor: '#9d0208',
                  color: '#f2ede3',
                  border: 'none',
                  padding: '14px',
                  fontFamily: fontStack,
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: '0.15em',
                  cursor: 'pointer',
                  marginTop: 4,
                }}
              >
                {t.submit}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
