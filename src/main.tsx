import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root')!;

// If the root element already has children, it means react-snap prerendered
// HTML is present — use hydrateRoot to attach React to the existing DOM.
// Otherwise (fresh page load with no prerender), render from scratch.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}