import React from 'react';
import ReactDOM from 'react-dom/client';
import { LazyMotion, domAnimation } from 'framer-motion';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Cursor from './components/Cursor';
import { initSmoothScroll } from './lib/smoothScroll';
import '@fontsource/barlow/300.css';
import 'lenis/dist/lenis.css';
import './index.css';

initSmoothScroll();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Loads only the animation features the site uses; `strict` makes any
        full `motion` component an error, so the bundle can't silently regrow. */}
    <LazyMotion features={domAnimation} strict>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </LazyMotion>
    <Cursor />
  </React.StrictMode>,
);
