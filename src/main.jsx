import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import HefaiaLanding from './HefaiaLanding.jsx';
import App from './App.jsx';
import SecretRoom from './SecretRoom.jsx';
import './index.css';

function EscorialPage({ onBack }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#080808' }}>
      <div style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #222' }}>
        <button
          onClick={onBack}
          style={{
            background: 'none', border: 'none', color: '#f2ede3', cursor: 'pointer',
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em',
            opacity: 0.5, display: 'flex', alignItems: 'center', gap: 6, padding: '4px 0',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
        >
          ← HEFAIA
        </button>
      </div>
      <iframe
        src="https://fileroeco.github.io/elescorial/"
        title="El Escorial"
        style={{ flex: 1, border: 'none', width: '100%' }}
      />
    </div>
  );
}

function Root() {
  const [page, setPage] = useState('hefaia');
  // Idioma compartido entre HefaiaLanding y App (Oniros). Default ingles.
  const [lang, setLang] = useState('en');

  if (page === 'oniros') {
    return <App onBack={() => setPage('hefaia')} lang={lang} setLang={setLang} />;
  }
  if (page === 'secret') {
    return <SecretRoom onBack={() => setPage('hefaia')} />;
  }
  if (page === 'escorial') {
    return <EscorialPage onBack={() => setPage('hefaia')} />;
  }
  return (
    <HefaiaLanding
      onEnterOniros={() => setPage('oniros')}
      onEnterSecret={() => setPage('secret')}
      onEnterEscorial={() => setPage('escorial')}
      lang={lang}
      setLang={setLang}
    />
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
