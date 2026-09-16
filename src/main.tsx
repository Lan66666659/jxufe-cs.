import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import './components/react-bits/site-effects.css';
import App from './App';
import { SiteMotionProvider } from './components/SiteMotion';

console.log('木鱼到此一游~');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteMotionProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SiteMotionProvider>
  </StrictMode>,
);
