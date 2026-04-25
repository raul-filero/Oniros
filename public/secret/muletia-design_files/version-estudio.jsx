// Versión C — Estudio de arquitectura
// Plano técnico con garabatos, figuras vectoriales, El Escorial, rosa de los vientos
function VersionEstudio() {
  const C = window.MULETIA_CONTENT;

  const ink = '#1a1a18';
  const blue = '#2a4a6a';
  const paper = '#f6f3eb';
  const grid = 'rgba(26,26,24,0.06)';
  const lineHard = 'rgba(26,26,24,0.4)';
  const lineSoft = 'rgba(26,26,24,0.15)';
  const redPencil = '#c4463a';
  const muted = 'rgba(26,26,24,0.5)';

  const mono = { fontFamily: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, Menlo, monospace' };
  const serif = { fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif' };

  const page = {
    width: 794,
    background: paper,
    color: ink,
    fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
    padding: '40px 48px 52px',
    boxSizing: 'border-box',
    position: 'relative',
    backgroundImage: `
      linear-gradient(${grid} 1px, transparent 1px),
      linear-gradient(90deg, ${grid} 1px, transparent 1px)
    `,
    backgroundSize: '20px 20px',
    overflow: 'hidden',
  };

  // ── SVG: El Escorial silhouette (simplified) ──
  const Escorial = ({ style }) => (
    <svg viewBox="0 0 400 120" style={{ width: 260, opacity: 0.12, ...style }} fill={ink} stroke="none">
      {/* Base wall */}
      <rect x="20" y="80" width="360" height="40" rx="1" />
      {/* Central dome */}
      <ellipse cx="200" cy="52" rx="32" ry="28" />
      <rect x="178" y="52" width="44" height="28" />
      {/* Cross on dome */}
      <rect x="197" y="20" width="6" height="20" />
      <rect x="191" y="26" width="18" height="5" />
      {/* Left tower */}
      <rect x="30" y="40" width="28" height="40" />
      <polygon points="30,40 44,18 58,40" />
      <rect x="41" y="10" width="6" height="16" />
      <rect x="36" y="14" width="16" height="4" />
      {/* Right tower */}
      <rect x="342" y="40" width="28" height="40" />
      <polygon points="342,40 356,18 370,40" />
      <rect x="353" y="10" width="6" height="16" />
      <rect x="348" y="14" width="16" height="4" />
      {/* Inner towers */}
      <rect x="120" y="48" width="22" height="32" />
      <polygon points="120,48 131,30 142,48" />
      <rect x="258" y="48" width="22" height="32" />
      <polygon points="258,48 269,30 280,48" />
      {/* Windows row */}
      {[70,100,150,180,220,250,300,330].map((x,i) => (
        <rect key={i} x={x} y="88" width="8" height="12" rx="1" opacity="0.5" fill={paper} />
      ))}
      {/* Courtyard arches */}
      {[160,175,190,205,220,235].map((x,i) => (
        <React.Fragment key={i}>
          <rect x={x} y="70" width="3" height="10" opacity="0.4" fill={paper} />
        </React.Fragment>
      ))}
    </svg>
  );

  // ── SVG: Compass rose ──
  const Compass = ({ style }) => (
    <svg viewBox="0 0 80 80" style={{ width: 56, ...style }}>
      <g transform="translate(40,40)" stroke={ink} strokeWidth="0.8" fill="none" opacity="0.25">
        <circle r="28" />
        <circle r="2" fill={ink} />
        {/* N/S/E/W */}
        <line y1="-28" y2="-18" />
        <line y1="28" y2="18" />
        <line x1="-28" x2="-18" />
        <line x1="28" x2="18" />
        {/* Diagonals */}
        {[45,135,225,315].map(a => (
          <line key={a} x1={0} y1={0}
            x2={Math.cos(a*Math.PI/180)*20}
            y2={Math.sin(a*Math.PI/180)*20}
            strokeDasharray="2,3" />
        ))}
        {/* N arrow */}
        <polygon points="0,-28 -4,-20 4,-20" fill={ink} stroke="none" />
        <text x="0" y="-31" textAnchor="middle" fontSize="7" fill={ink} fontFamily="serif" stroke="none">N</text>
      </g>
    </svg>
  );

  // ── SVG: Section mark ──
  const SectionMark = ({ label }) => (
    <svg viewBox="0 0 40 40" style={{ width: 28, marginRight: 8, flexShrink: 0 }}>
      <circle cx="20" cy="20" r="18" fill="none" stroke={ink} strokeWidth="1.5" />
      <line x1="2" y1="20" x2="38" y2="20" stroke={ink} strokeWidth="0.8" />
      <text x="20" y="16" textAnchor="middle" fontSize="10" fill={ink} fontWeight="700" fontFamily="serif">{label}</text>
      <text x="20" y="32" textAnchor="middle" fontSize="7" fill={muted} fontFamily="monospace">SEC</text>
    </svg>
  );

  // ── SVG: Dimension line ──
  const DimLine = ({ w }) => (
    <svg viewBox={`0 0 ${w} 16`} style={{ width: '100%', height: 12, marginTop: 4, marginBottom: 8 }}>
      <line x1="4" y1="8" x2={w-4} y2="8" stroke={ink} strokeWidth="0.5" opacity="0.3" />
      <line x1="4" y1="3" x2="4" y2="13" stroke={ink} strokeWidth="0.5" opacity="0.3" />
      <line x1={w-4} y1="3" x2={w-4} y2="13" stroke={ink} strokeWidth="0.5" opacity="0.3" />
    </svg>
  );

  // ── SVG: Hand-drawn sketchy circle annotation ──
  const SketchCircle = ({ cx, cy, r, text, style }) => (
    <svg style={{ position: 'absolute', pointerEvents: 'none', ...style }} width={r*2+40} height={r*2+40}>
      <ellipse cx={r+20} cy={r+20} rx={r} ry={r*0.9}
        fill="none" stroke={redPencil} strokeWidth="1.2" opacity="0.5"
        strokeDasharray="4,3"
        transform={`rotate(-3 ${r+20} ${r+20})`} />
      {text && <text x={r+20} y={r*2+36} textAnchor="middle" fontSize="9" fill={redPencil} fontFamily="serif" fontStyle="italic" opacity="0.7">{text}</text>}
    </svg>
  );

  // ── SVG: Person sketch (stick figure with wheelchair/walker suggestion) ──
  const PersonSketch = ({ style, label }) => (
    <svg viewBox="0 0 50 70" style={{ width: 32, ...style }} stroke={ink} strokeWidth="1" fill="none" opacity="0.2">
      <circle cx="25" cy="12" r="7" />
      <line x1="25" y1="19" x2="25" y2="42" />
      <line x1="25" y1="26" x2="14" y2="36" />
      <line x1="25" y1="26" x2="36" y2="36" />
      <line x1="25" y1="42" x2="16" y2="58" />
      <line x1="25" y1="42" x2="34" y2="58" />
      {label && <text x="25" y="67" textAnchor="middle" fontSize="7" fill={ink} stroke="none" fontFamily="serif">{label}</text>}
    </svg>
  );

  // ── SVG: Brain sketch ──
  const BrainSketch = ({ style }) => (
    <svg viewBox="0 0 60 50" style={{ width: 40, ...style }} stroke={ink} strokeWidth="0.8" fill="none" opacity="0.15">
      <path d="M30 45 C30 45, 10 40, 8 28 C6 16, 14 8, 22 6 C26 5, 28 6, 30 8 C32 6, 34 5, 38 6 C46 8, 54 16, 52 28 C50 40, 30 45, 30 45Z" />
      <path d="M30 8 C30 15, 28 25, 30 45" strokeDasharray="2,2" />
      <path d="M18 14 C22 18, 24 22, 22 28" strokeDasharray="1.5,2" />
      <path d="M42 14 C38 18, 36 22, 38 28" strokeDasharray="1.5,2" />
    </svg>
  );

  // ── SVG: Building sketch ──
  const BuildingSketch = ({ style }) => (
    <svg viewBox="0 0 60 70" style={{ width: 36, ...style }} stroke={ink} strokeWidth="0.8" fill="none" opacity="0.15">
      <rect x="8" y="15" width="44" height="50" />
      <polygon points="8,15 30,2 52,15" />
      <rect x="16" y="24" width="8" height="8" />
      <rect x="36" y="24" width="8" height="8" />
      <rect x="16" y="40" width="8" height="8" />
      <rect x="36" y="40" width="8" height="8" />
      <rect x="24" y="50" width="12" height="15" />
    </svg>
  );

  const H = ({ n, t, s }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, paddingBottom: 10, borderBottom: `1.5px solid ${lineHard}` }}>
      <SectionMark label={n} />
      <div style={{ flex: 1 }}>
        <span style={{ ...serif, fontSize: 22, fontWeight: 700, letterSpacing: -0.3 }}>{t}</span>
        <span style={{ ...mono, fontSize: 9, letterSpacing: 2, color: muted, marginLeft: 14, textTransform: 'uppercase' }}>{s}</span>
      </div>
    </div>
  );

  return (
    <div style={page}>
      {/* Decorative elements */}
      <Escorial style={{ position: 'absolute', top: 24, right: 44 }} />
      <Compass style={{ position: 'absolute', top: 28, left: 48 }} />
      <BrainSketch style={{ position: 'absolute', top: 180, right: 52 }} />

      {/* ═══ CARTELA ═══ */}
      <div style={{ position: 'relative', marginBottom: 8, paddingBottom: 18, borderBottom: `2.5px double ${ink}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ marginLeft: 62 }}>
            <div style={{ ...mono, fontSize: 9, letterSpacing: 3, color: muted, textTransform: 'uppercase' }}>
              Estudio Raúl · Anteproyecto MUL-01 · Rev. C
            </div>
            <div style={{ ...serif, fontSize: 52, fontWeight: 700, letterSpacing: -2, lineHeight: 1, marginTop: 4 }}>
              {C.titulo}
            </div>
            <div style={{ ...serif, fontSize: 16, color: muted, marginTop: 6, fontStyle: 'italic' }}>
              {C.subtitulo}
            </div>
          </div>
          <div style={{ ...mono, fontSize: 9, letterSpacing: 1.5, color: muted, textAlign: 'right', lineHeight: 1.8 }}>
            <div>PLANO 01/01</div>
            <div>ESC. 1:1</div>
            <div>RAÚL → PAPÁ</div>
            <div>ABR. 2026</div>
          </div>
        </div>
      </div>

      {/* Fold mark */}
      <div style={{ position: 'absolute', left: 0, top: '50%', width: 12, borderTop: `1px dashed ${lineSoft}` }}></div>

      {/* ═══ BLOQUE 1 ═══ */}
      <section style={{ marginTop: 24, marginBottom: 28, position: 'relative' }}>
        <H n="A" t={C.bloque1.titulo} s={C.bloque1.subtitulo} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, position: 'relative' }}>
          <div>
            <div style={{ ...mono, fontSize: 9, letterSpacing: 2.5, color: blue, marginBottom: 8, textTransform: 'uppercase', borderBottom: `1px solid ${lineSoft}`, paddingBottom: 4 }}>
              Descripción funcional
            </div>
            {C.bloque1.queHace.map((l, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <span style={{ ...mono, fontSize: 9, color: muted, marginTop: 3, minWidth: 16 }}>0{i+1}.</span>
                <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.55, textWrap: 'pretty' }}>{l}</p>
              </div>
            ))}
          </div>
          <div style={{ position: 'relative' }}>
            <PersonSketch style={{ position: 'absolute', top: -8, right: 4 }} />
            <div style={{ ...mono, fontSize: 9, letterSpacing: 2.5, color: blue, marginBottom: 8, textTransform: 'uppercase', borderBottom: `1px solid ${lineSoft}`, paddingBottom: 4 }}>
              Usuarios del edificio
            </div>
            {C.bloque1.aQuienSirve.map((l, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <span style={{ ...mono, fontSize: 9, color: muted, marginTop: 3 }}>→</span>
                <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.55 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ancla abuela — anotación a lápiz rojo */}
        <div style={{
          marginTop: 20, padding: '14px 18px', position: 'relative',
          border: `1.5px solid ${redPencil}`,
          background: 'rgba(196,70,58,0.03)',
        }}>
          <div style={{ position: 'absolute', top: -9, left: 16, background: paper, padding: '0 8px', ...mono, fontSize: 8, letterSpacing: 2, color: redPencil, textTransform: 'uppercase' }}>
            ✎ Nota a mano · {C.bloque1.anclaAbuela.titulo}
          </div>
          <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, fontStyle: 'italic', color: ink }}>{C.bloque1.anclaAbuela.texto}</p>
        </div>
        <DimLine w={700} />
      </section>

      {/* ═══ BLOQUE 2 ═══ */}
      <section style={{ marginBottom: 28, position: 'relative' }}>
        <H n="B" t={C.bloque2.titulo} s="Perfiles de entrenamiento" />

        <div style={{ display: 'flex', gap: 0, position: 'relative' }}>
          <PersonSketch style={{ position: 'absolute', top: -6, right: 12 }} label="pac." />
          {C.bloque2.historias.map((h, i) => (
            <div key={i} style={{
              flex: 1,
              padding: '14px 14px 16px',
              borderRight: i < 2 ? `1px solid ${lineSoft}` : 'none',
              borderTop: `1px solid ${lineHard}`,
              borderBottom: `1px solid ${lineHard}`,
              borderLeft: i === 0 ? `1px solid ${lineHard}` : 'none',
              position: 'relative',
            }}>
              {/* case number circle */}
              <div style={{
                position: 'absolute', top: -10, left: 12,
                background: paper, padding: '0 4px',
                ...mono, fontSize: 8, letterSpacing: 1.5, color: muted,
              }}>CASO 0{i+1}</div>

              <div style={{ ...serif, fontSize: 18, fontWeight: 700, marginTop: 4 }}>{h.nombre}</div>
              <div style={{ ...mono, fontSize: 9, color: muted, marginBottom: 10 }}>{h.edad} · {h.lugar}</div>

              <div style={{ ...mono, fontSize: 8, letterSpacing: 1.5, color: blue, marginBottom: 2, textTransform: 'uppercase' }}>Situación</div>
              <p style={{ margin: '0 0 6px', fontSize: 11.5, lineHeight: 1.45 }}>{h.momento} {h.que}</p>

              <div style={{ ...mono, fontSize: 8, letterSpacing: 1.5, color: blue, marginBottom: 2, textTransform: 'uppercase' }}>Con Muletia</div>
              <p style={{ margin: '0 0 8px', fontSize: 11.5, lineHeight: 1.45 }}>{h.conMuletia}</p>

              <div style={{ ...mono, fontSize: 9, color: muted, borderTop: `1px dashed ${lineSoft}`, paddingTop: 6, fontStyle: 'italic' }}>
                ≡ {h.ancla}
              </div>
            </div>
          ))}
        </div>
        <DimLine w={700} />
      </section>

      {/* ═══ BLOQUE 3 ═══ */}
      <section style={{ position: 'relative' }}>
        <H n="C" t={C.bloque3.titulo} s={C.bloque3.subtitulo} />
        <BuildingSketch style={{ position: 'absolute', top: 4, right: 8 }} />

        {/* Realismo tabla — estilo cuadro de materiales */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ ...mono, fontSize: 9, letterSpacing: 2.5, color: blue, marginBottom: 8, textTransform: 'uppercase', borderBottom: `1px solid ${lineSoft}`, paddingBottom: 4 }}>
            Cuadro de partidas · {C.bloque3.realismo.titulo}
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: `1.5px solid ${lineHard}` }}>
                <th style={{ ...mono, fontSize: 8, letterSpacing: 2, color: muted, textTransform: 'uppercase', textAlign: 'left', padding: '6px 10px', width: 150 }}>Partida</th>
                <th style={{ ...mono, fontSize: 8, letterSpacing: 2, color: muted, textTransform: 'uppercase', textAlign: 'left', padding: '6px 10px' }}>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {C.bloque3.realismo.items.map((it, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${lineSoft}` }}>
                  <td style={{ ...mono, fontSize: 10, color: blue, padding: '8px 10px', verticalAlign: 'top', letterSpacing: 0.5, fontWeight: 600 }}>{it.k}</td>
                  <td style={{ padding: '8px 10px', lineHeight: 1.5 }}>{it.v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Planning de obra — línea de tiempo tipo diagrama de Gantt simplificado */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ ...mono, fontSize: 9, letterSpacing: 2.5, color: blue, marginBottom: 10, textTransform: 'uppercase', borderBottom: `1px solid ${lineSoft}`, paddingBottom: 4 }}>
            Planning de obra · {C.bloque3.hitos.titulo}
          </div>

          {/* Timeline bar */}
          <div style={{ position: 'relative', height: 28, marginBottom: 4, border: `1px solid ${lineSoft}`, display: 'flex' }}>
            {[0,3,6,9,12,15,18].map((m, i) => (
              <div key={i} style={{
                flex: 1, borderRight: `1px solid ${lineSoft}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                ...mono, fontSize: 8, color: muted, letterSpacing: 1,
                background: m >= 12 ? 'rgba(196,70,58,0.04)' : 'transparent',
              }}>M{m}</div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, border: `1px solid ${lineHard}` }}>
            {C.bloque3.hitos.fases.map((f, i) => (
              <div key={i} style={{
                padding: '12px 14px',
                borderRight: i < 2 ? `1px solid ${lineSoft}` : 'none',
                background: i === 2 ? 'rgba(196,70,58,0.04)' : 'transparent',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ ...serif, fontSize: 9, width: 16, height: 16, borderRadius: '50%', border: `1px solid ${ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    {String.fromCharCode(97 + i)}
                  </span>
                  <span style={{ ...serif, fontSize: 14, fontWeight: 700 }}>{f.fase}</span>
                </div>
                <div style={{ ...mono, fontSize: 9, color: muted, fontStyle: 'italic', marginBottom: 10, marginLeft: 22 }}>{f.subtitulo}</div>
                {f.puntos.map((p, j) => (
                  <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
                    <span style={{ ...mono, fontSize: 9, color: i === 2 ? redPencil : blue, fontWeight: 600, minWidth: 58, letterSpacing: 0.5 }}>{p.mes}</span>
                    <span style={{ fontSize: 11.5, lineHeight: 1.4 }}>{p.texto}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Excedencia — sello de aprobación */}
        <div style={{
          border: `1.5px solid ${lineHard}`, padding: '16px 18px', position: 'relative',
          background: '#faf8f2',
        }}>
          {/* "Sello" decorativo */}
          <div style={{
            position: 'absolute', top: -1, right: -1, width: 64, height: 64,
            border: `2px solid ${redPencil}`, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: 'rotate(12deg)', opacity: 0.25,
          }}>
            <div style={{ ...serif, fontSize: 7, textTransform: 'uppercase', textAlign: 'center', color: redPencil, fontWeight: 700, lineHeight: 1.2 }}>
              Red de<br/>seguridad<br/>activa
            </div>
          </div>

          <div style={{ ...mono, fontSize: 9, letterSpacing: 2.5, color: blue, textTransform: 'uppercase', marginBottom: 8 }}>
            Estructura de seguridad · {C.bloque3.excedencia.titulo}
          </div>
          <p style={{ margin: '0 0 12px', fontSize: 12.5, lineHeight: 1.6, maxWidth: 620 }}>{C.bloque3.excedencia.texto}</p>
          <div style={{ borderTop: `1px dashed ${lineSoft}`, paddingTop: 12 }}>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, fontStyle: 'italic', color: ink }}>
              {C.bloque3.excedencia.pideAyuda}
            </p>
          </div>
        </div>

        {/* Cierre emocional — anotación a lápiz */}
        <div style={{
          marginTop: 22, padding: '12px 18px',
          border: `1px solid ${redPencil}`,
          borderStyle: 'dashed',
          background: 'rgba(196,70,58,0.02)',
          textAlign: 'center',
          position: 'relative',
        }}>
          <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', background: paper, padding: '0 10px', ...mono, fontSize: 8, letterSpacing: 2, color: redPencil, textTransform: 'uppercase' }}>
            ✎ nota personal
          </div>
          <p style={{ margin: 0, ...serif, fontSize: 14, color: ink, fontStyle: 'italic', lineHeight: 1.6 }}>
            {C.cierreEmocional.texto}
          </p>
        </div>

        {/* ═══ CARTELA FINAL — tipo sello de plano ═══ */}
        <div style={{
          marginTop: 24, borderTop: `2.5px double ${ink}`, paddingTop: 10,
          display: 'grid', gridTemplateColumns: '1fr auto auto',
          gap: 20, alignItems: 'end',
        }}>
          <div>
            <div style={{ ...serif, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>MULETIA</div>
            <div style={{ ...mono, fontSize: 8, color: muted, letterSpacing: 1.5, marginTop: 2 }}>
              ANTEPROYECTO · DOCUMENTO DE CONVERSACIÓN FAMILIAR
            </div>
          </div>
          <div style={{ ...mono, fontSize: 8, color: muted, letterSpacing: 1, textAlign: 'right', lineHeight: 1.8 }}>
            <div>PROMOTOR: RAÚL</div>
            <div>DIRECTOR: PAPÁ</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ ...mono, fontSize: 8, color: muted, letterSpacing: 1 }}>FIRMA</div>
            <div style={{ width: 80, borderBottom: `1px solid ${lineHard}`, height: 20 }}></div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.VersionEstudio = VersionEstudio;
