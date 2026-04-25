import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import HefaiaLanding from './HefaiaLanding.jsx';
import App from './App.jsx';
import SecretRoom from './SecretRoom.jsx';
import './index.css';

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
  return (
    <HefaiaLanding
      onEnterOniros={() => setPage('oniros')}
      onEnterSecret={() => setPage('secret')}
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
