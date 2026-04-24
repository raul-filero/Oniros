import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import HefaiaLanding from './HefaiaLanding.jsx';
import App from './App.jsx';
import './index.css';

function Root() {
  const [page, setPage] = useState('hefaia');

  if (page === 'oniros') {
    return <App onBack={() => setPage('hefaia')} />;
  }
  return <HefaiaLanding onEnterOniros={() => setPage('oniros')} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
