import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { MotionConfig } from 'motion/react';
import { Pause, Play } from 'lucide-react';
import { SiteMotionContext, useSiteMotion } from '../hooks/use-site-motion';

export function SiteMotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(
    () => matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  const [manualPause, setManualPause] = useState(false);
  const value = useMemo(
    () => ({
      paused: reduced || manualPause,
      reduced,
      toggle: () => setManualPause((value) => !value),
    }),
    [reduced, manualPause],
  );
  return (
    <SiteMotionContext.Provider value={value}>
      <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>{children}</MotionConfig>
    </SiteMotionContext.Provider>
  );
}

export function MotionToggle() {
  const { paused, reduced, toggle } = useSiteMotion();
  return (
    <button
      className="motion-toggle"
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      disabled={reduced}
    >
      {paused ? <Play size={14} /> : <Pause size={14} />}
      {reduced ? '已减少动态效果' : paused ? '开启动效' : '暂停动效'}
    </button>
  );
}
