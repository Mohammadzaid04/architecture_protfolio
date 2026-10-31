/**
 * Application DOM entrypoint.
 * Mounts React 19 application in StrictMode and loads global stylesheet.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/App';
import '@/styles/globals.css';
import '@/styles/site-effects.css';
import '@/styles/footer-cta.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find root DOM element');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
