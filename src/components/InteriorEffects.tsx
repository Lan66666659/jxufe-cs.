import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { useInView } from 'motion/react';
import { ArrowUpRight, Code2, Wrench, BookOpen, Terminal, Users } from 'lucide-react';
import CircularText from './react-bits/CircularText';
import ScrollReveal from './react-bits/ScrollReveal';
import GlareHover from './react-bits/GlareHover';
import TiltedCard from './react-bits/TiltedCard';
import PixelTransition from './react-bits/PixelTransition';
import LogoLoop from './react-bits/LogoLoop';
import RotatingText from './react-bits/RotatingText';
import ShinyText from './react-bits/ShinyText';
import { useSiteMotion } from '../hooks/use-site-motion';
import content from '../data/site';
import './react-bits/interior-effects.css';

const Aurora = lazy(() => import('./react-bits/Aurora'));
const auroraColors = ['#1758df', '#65c6ff', '#245fdf'];

function useVisibleMotion() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: '60px' });
  const { paused } = useSiteMotion();
  const [foreground, setForeground] = useState(!document.hidden);
  useEffect(() => {
    const update = () => setForeground(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  return { ref, paused: paused || !visible || !foreground };
}

export function InteriorAurora() {
  const { ref, paused } = useVisibleMotion();
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const query = matchMedia('(min-width: 801px)');
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return (
    <div ref={ref} className="interior-aurora" aria-hidden="true" data-effect="Aurora">
      {!paused && desktop && (
        <Suspense fallback={null}>
          <Aurora colorStops={auroraColors} amplitude={0.9} blend={0.5} speed={0.45} />
        </Suspense>
      )}
    </div>
  );
}

export function AssociationSeal() {
  const { ref, paused } = useVisibleMotion();
  return (
    <div className="association-seal" ref={ref}>
      <div className="seal-ring" aria-hidden="true" data-effect="CircularText">
        <CircularText
          text="JXUFE COMPUTER ASSOCIATION • SINCE 1996 • "
          spinDuration={35}
          onHover="pause"
          paused={paused}
        />
      </div>
      <img src="/img/logo.png" alt="江西财经大学计算机协会会徽" width="180" height="180" />
      <span className="seal-corner">一起学习 / 一起动手</span>
    </div>
  );
}

export function MissionReveal() {
  const { paused } = useSiteMotion();
  return (
    <section className="mission-reveal" data-effect="ScrollReveal">
      <span className="section-kicker">我们的宗旨</span>
      <ScrollReveal
        disabled={paused}
        baseOpacity={0.4}
        blurStrength={2}
        baseRotation={1}
        wordAnimationEnd="bottom 85%"
      >
        普及计算机知识，提高计算机应用水平，培养计算机专业人才。
      </ScrollReveal>
    </section>
  );
}

export function DepartmentGlare({ children, index }: { children: ReactNode; index: number }) {
  const { paused } = useSiteMotion();
  return (
    <div className="department-glare" data-effect="GlareHover" data-motion-paused={paused}>
      <GlareHover
        width="100%"
        height="100%"
        background={index % 2 ? '#edf5ff' : '#ffffff'}
        borderColor="#c9ddfb"
        glareColor="#57a6ff"
        glareOpacity={0.3}
        glareSize={220}
      >
        {children}
      </GlareHover>
    </div>
  );
}

export function ActivityTilt({ activity }: { activity: (typeof content.activities)[number] }) {
  const { paused } = useSiteMotion();
  return (
    <div className="activity-tilt" data-effect="TiltedCard">
      <TiltedCard
        imageSrc={activity.image}
        altText={activity.title}
        containerHeight="100%"
        imageHeight="100%"
        imageWidth="100%"
        rotateAmplitude={paused ? 0 : 7}
        scaleOnHover={paused ? 1 : 1.035}
        showMobileWarning={false}
        showTooltip={false}
        displayOverlayContent
        overlayContent={
          <span className="tilt-photo-label">
            {activity.category}
            <ArrowUpRight size={18} />
          </span>
        }
      />
    </div>
  );
}

export function MemberPixels({ member }: { member: (typeof content.members)[number] }) {
  const { paused } = useSiteMotion();
  return (
    <div className="member-pixels" data-effect="PixelTransition">
      <PixelTransition
        disabled={paused}
        gridSize={6}
        pixelColor="#4188ec"
        animationStepDuration={0.23}
        label={`切换${member.name}的照片与介绍`}
        firstContent={
          <img src={member.image} alt={member.name} loading="lazy" width="300" height="330" />
        }
        secondContent={
          <div className="pixel-member-details">
            <Users size={30} />
            <span>{member.role}</span>
            <strong>{member.name}</strong>
            <p>{member.description}</p>
          </div>
        }
      />
      <span className="pixel-hint" aria-hidden="true">
        触碰认识 TA <span>↗</span>
      </span>
    </div>
  );
}

const friendLogos = content.friends.map((friend) => ({
  node: (
    <span className="friend-loop-item">
      {friend.image.startsWith('/img/') ? (
        <img src={friend.image} alt="" width="40" height="40" />
      ) : (
        <span className="friend-loop-initial">{friend.title[0]}</span>
      )}
      <span>{friend.title}</span>
    </span>
  ),
}));

export function FriendsLoop() {
  const { ref, paused } = useVisibleMotion();
  return (
    <div className="friends-loop" ref={ref} data-effect="LogoLoop" aria-hidden="true">
      <LogoLoop
        logos={friendLogos}
        speed={35}
        logoHeight={40}
        gap={50}
        fadeOut
        fadeOutColor="#edf5ff"
        paused={paused}
      />
    </div>
  );
}

const topics = ['用好工具', '动手维修', '提高效率', '分享经验'];
export function ResourceRotator() {
  const { ref, paused } = useVisibleMotion();
  return (
    <div className="resource-rotator" ref={ref} data-effect="RotatingText">
      <div>
        <span className="section-kicker">计协知识工具箱</span>
        <p className="resource-slogan" aria-label="一起用好工具、动手维修、提高效率、分享经验">
          <span aria-hidden="true">一起</span>
          <span aria-hidden="true">
            <RotatingText
              texts={topics}
              auto={!paused}
              rotationInterval={2600}
              staggerDuration={0.04}
              mainClassName="rotating-topic"
              splitLevelClassName="rotating-word"
            />
          </span>
        </p>
        <span className="resource-caption">从每周例会开始，把学到的知识用起来。</span>
      </div>
      <div className="tool-orbit" aria-hidden="true">
        <Code2 />
        <Wrench />
        <BookOpen />
        <Terminal />
        <span>+</span>
      </div>
    </div>
  );
}

export function ShinyLabel({ text, light = false }: { text: string; light?: boolean }) {
  const { ref, paused } = useVisibleMotion();
  return (
    <div className="shiny-label" ref={ref} data-effect="ShinyText">
      <ShinyText
        text={text}
        disabled={paused}
        color={light ? '#d1e7ff' : '#1b55a2'}
        shineColor={light ? '#ffffff' : '#70aef3'}
        speed={3}
        delay={1.5}
      />
    </div>
  );
}
