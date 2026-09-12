import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Cursor from './Cursor';
import { initSmoothScroll } from './smoothScroll';
import 'lenis/dist/lenis.css';
import './index.css';

initSmoothScroll();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Cursor />
  </React.StrictMode>
);
