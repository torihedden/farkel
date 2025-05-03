import { BrowserRouter, Routes, Route } from 'react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Game } from './Game/Game.tsx';
import { Instructions } from './Instructions/Instructions.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<App />} />
        <Route path="/game" element={<Game />} />
        <Route path="/instructions" element={<Instructions />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
