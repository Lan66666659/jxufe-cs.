import { ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useInView } from 'motion/react';
import { lazy, Suspense, useRef, type ReactNode } from 'react';
import { SoftReveal, PhotoTilt, ActionLink } from './motion';
import StarBorder from './react-bits/StarBorder';
import { MotionToggle } from './SiteMotion';
import { useSiteMotion } from '../hooks/use-site-motion';
const InteriorAurora = lazy(() =>
  import('./InteriorEffects').then((module) => ({ default: module.InteriorAurora })),
);
const BackgroundBeams = lazy(() =>
  import('./aceternity/background-beams').then((module) => ({ default: module.BackgroundBeams })),
);
import content from '../data/site';

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <SoftReveal className={className} delay={delay}>
      {children}
    </SoftReveal>
  );
}

export function SectionHeading({
  label,
  title,
  description,
  to,
  linkText,
}: {
  number?: string;
  label: string;
  title: string;
  description?: string;
  to?: string;
  linkText?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <div className="section-kicker">{label}</div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {to && (
        <Link className="text-link" to={to}>
          {linkText ?? '了解更多'}
          <ArrowUpRight size={17} />
        </Link>
      )}
    </div>
  );
}

export function PageHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  const { pathname } = useLocation();
  const page = pathname.split('/')[1];
  const number = (
    {
      about: '1996',
      departments: '05',
      activities: '06',
      members: '17',
      resources: '04',
      blog: '08',
      friends: '10',
      contact: 'HELLO',
    } as Record<string, string>
  )[page];
  return (
    <div className="page-heading interior-heading" data-page={page}>
      {(page === 'about' || page === 'contact') && (
        <Suspense fallback={null}>
          <InteriorAurora />
        </Suspense>
      )}
      <div className="interior-heading-top">
        <div className="breadcrumbs">
          <Link to="/">首页</Link>
          <span>/</span>
          <span>{title}</span>
        </div>
        <MotionToggle />
      </div>
      <div className="interior-heading-copy">
        <span className="interior-heading-label">{label}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <span className="interior-heading-number" aria-hidden="true">
        {number}
      </span>
    </div>
  );
}

export function ActivityCard({
  activity,
}: {
  activity: (typeof content.activities)[number];
  index?: number;
}) {
  return (
    <PhotoTilt>
      <Link to={`/activities#activity-${activity.id}`} className="activity-card">
        <div className="activity-image">
          <img src={activity.image} alt={activity.title} loading="lazy" width="640" height="430" />
          <span className="image-tag">{activity.category}</span>
          <span className="image-arrow absolute right-3 bottom-3 z-10 grid size-8 place-items-center rounded-full bg-ice text-ink">
            <ArrowUpRight size={21} />
          </span>
        </div>
        <div className="activity-meta">
          <span>{activity.category}</span>
        </div>
        <h3>{activity.title}</h3>
        <p>{activity.description}</p>
      </Link>
    </PhotoTilt>
  );
}

export function PostRow({ post }: { post: (typeof content.posts)[number]; index: number }) {
  return (
    <Link className="post-row" to={`/blog/${post.id}`}>
      <div className="post-body">
        <div className="post-meta flex items-center gap-4 text-label text-muted">
          <span>{post.category}</span>
          <time dateTime={post.date}>{post.date.replaceAll('-', '.')}</time>
        </div>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
      </div>
      <span className="post-author">{post.author}</span>
      <ArrowUpRight className="post-arrow" size={23} />
    </Link>
  );
}

export function JoinBanner({ paused = false }: { paused?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: '200px' });
  const { paused: sitePaused, reduced } = useSiteMotion();
  paused = paused || sitePaused;
  return (
    <section className="join-banner" ref={ref} data-motion-paused={paused || reduced || !inView}>
      {inView && !reduced && !paused && (
        <div className="join-beams" aria-hidden="true">
          <Suspense fallback={null}>
            <BackgroundBeams />
          </Suspense>
        </div>
      )}
      <div>
        <div className="section-kicker">加入计算机协会</div>
        <h2>对计算机感兴趣？来计协看看。</h2>
        <p>不限专业，不限基础。加入招新交流群，了解课程和活动安排。</p>
      </div>
      <StarBorder
        as="div"
        className="join-star"
        color="#ffffff"
        backgroundColor="#1552b4"
        textColor="#fff"
        borderColor="#5d9bef"
        thickness={3}
        speed="4s"
        data-effect="StarBorder"
      >
        <ActionLink className="button-light" to="/contact">
          查看加入方式
          <ArrowUpRight size={18} />
        </ActionLink>
      </StarBorder>
    </section>
  );
}
