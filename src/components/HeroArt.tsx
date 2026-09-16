import { lazy, Suspense, useSyncExternalStore } from 'react';
import { Code2, Cpu, Sparkles } from 'lucide-react';
const Orb = lazy(() => import('./react-bits/Orb'));

const query = '(prefers-reduced-motion: no-preference) and (min-width: 768px)';
function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

export default function HeroArt() {
  const animated = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="orbit-track orbit-track-one" />
      <div className="orbit-track orbit-track-two" />
      <div className="orb-stage">
        <div className="orb-fallback" />
        {animated && (
          <Suspense fallback={null}>
            <Orb hue={20} hoverIntensity={0.3} backgroundColor="#101214" />
          </Suspense>
        )}
        <div className="orb-core">
          <span className="core-bracket">&lt;</span>
          <span>
            cs<span className="core-cursor">_</span>
          </span>
          <span className="core-bracket">/&gt;</span>
        </div>
      </div>
      <div className="floating-label label-code">
        <Code2 size={17} />
        <span>CREATE WITH CODE</span>
        <i />
      </div>
      <div className="floating-label label-learn">
        <Cpu size={16} />
        <span>保持好奇，持续探索</span>
      </div>
      <div className="floating-label label-together">
        <Sparkles size={15} />
        <span>BETTER TOGETHER</span>
      </div>
      <div className="art-coordinate">
        KEEP YOUR CURIOSITY
        <br />
        <span>NANCHANG · CHINA</span>
      </div>
      <span className="art-plus plus-one">+</span>
      <span className="art-plus plus-two">+</span>
    </div>
  );
}
