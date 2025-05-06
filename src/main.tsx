import { BrowserRouter, Routes, Route } from 'react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Instructions } from './Instructions/Instructions.tsx';
import { Play } from './Play/Play.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/:farkel?/" index element={<App />} />
        <Route path="/:farkel?/play" element={<Play />} />
        <Route path="/:farkel?/instructions" element={<Instructions />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
