import { BrowserRouter, Routes, Route } from 'react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Play } from './Play/Play.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<App />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
