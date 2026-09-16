import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import BlurText from './react-bits/BlurText';
import GradientText from './react-bits/GradientText';
import CountUp from './react-bits/CountUp';
import ScrollVelocity from './react-bits/ScrollVelocity';

const Particles = lazy(() => import('./react-bits/Particles'));
const blues = ['#1559ce', '#3796e9', '#1152bd'];

export function HeroParticles({ paused }: { paused: boolean }) {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 801px) and (pointer: fine)');
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return (
    <div className="hero-particles" aria-hidden="true" data-effect="Particles">
      {desktop && !paused && (
        <Suspense fallback={null}>
          <Particles
            particleCount={110}
            particleColors={blues}
            particleSpread={12}
            speed={0.12}
            particleBaseSize={90}
            alphaParticles
            pixelRatio={1}
          />
        </Suspense>
      )}
    </div>
  );
}

export function AssociationTitle({ paused }: { paused: boolean }) {
  return (
    <h1 aria-label="江西财经大学计算机协会">
      <span className="sr-only">江西财经大学计算机协会</span>
      <span className="university-name" aria-hidden="true" data-effect="BlurText">
        {paused ? (
          '江西财经大学'
        ) : (
          <BlurText
            text="江西财经大学"
            animateBy="letters"
            delay={45}
            stepDuration={0.2}
            direction="bottom"
          />
        )}
      </span>
      <span className="association-name" aria-hidden="true" data-effect="GradientText">
        <GradientText colors={blues} animationSpeed={6} paused={paused}>
          计算机协会
        </GradientText>
      </span>
      <span className="hero-title-line" aria-hidden="true" />
    </h1>
  );
}

export function AnimatedNumber({
  value,
  from = 0,
  paused,
}: {
  value: number;
  from?: number;
  paused: boolean;
}) {
  return (
    <strong data-effect="CountUp">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {paused ? value : <CountUp from={from} to={value} duration={1.5} />}
      </span>
    </strong>
  );
}

export function CommunityRibbon({ paused }: { paused: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: '80px' });
  return (
    <div ref={ref} className="community-ribbon" aria-hidden="true" data-effect="ScrollVelocity">
      <ScrollVelocity
        texts={['写代码 / 修电脑 / 做研究 / 交朋友 / ']}
        velocity={24}
        numCopies={4}
        paused={paused || !visible}
        parallaxClassName="community-marquee"
        scrollerClassName="community-scroller"
      />
    </div>
  );
}
