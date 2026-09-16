import { lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
const Home = lazy(() => import('./pages/Home'));
import aliases from './data/aliases.json';

const About = lazy(() => import('./pages/Explore').then((module) => ({ default: module.About })));
const Departments = lazy(() =>
  import('./pages/Explore').then((module) => ({ default: module.Departments })),
);
const Activities = lazy(() =>
  import('./pages/Explore').then((module) => ({ default: module.Activities })),
);
const Members = lazy(() =>
  import('./pages/Explore').then((module) => ({ default: module.Members })),
);
const Friends = lazy(() =>
  import('./pages/Explore').then((module) => ({ default: module.Friends })),
);
const Contact = lazy(() =>
  import('./pages/Explore').then((module) => ({ default: module.Contact })),
);
const Resources = lazy(() =>
  import('./pages/Library').then((module) => ({ default: module.Resources })),
);
const Blog = lazy(() => import('./pages/Library').then((module) => ({ default: module.Blog })));
const Article = lazy(() =>
  import('./pages/Library').then((module) => ({ default: module.Article })),
);
const NotFound = lazy(() =>
  import('./pages/Library').then((module) => ({ default: module.NotFound })),
);

function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    // Lazy articles need a moment to mount before resolving a table-of-contents anchor.
    const targetId = decodeURIComponent(hash.slice(1));
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
      return;
    }
    const observer = new MutationObserver(() => {
      const pendingTarget = document.getElementById(targetId);
      if (!pendingTarget) return;
      pendingTarget.scrollIntoView({ behavior: 'instant', block: 'start' });
      observer.disconnect();
    });
    observer.observe(document.getElementById('root')!, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => observer.disconnect(), 5000);
    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [pathname, hash]);
  useEffect(() => {
    const updateTitle = () => {
      const element = document.querySelector('main h1');
      const heading = element?.getAttribute('aria-label') ?? element?.textContent;
      if (heading) document.title = `${heading.replace(/\.$/, '')} | 江财计协`;
    };
    updateTitle();
    const observer = new MutationObserver(updateTitle);
    observer.observe(document.getElementById('root')!, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return null;
}

function LegacyRedirect({ to }: { to: string }) {
  const { hash, search } = useLocation();
  return <Navigate replace to={`${to}${search}${hash}`} />;
}

export default function App() {
  return (
    <>
      <RouteEffects />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="departments" element={<Departments />} />
          <Route path="activities" element={<Activities />} />
          <Route path="members" element={<Members />} />
          <Route path="friends" element={<Friends />} />
          <Route path="contact" element={<Contact />} />
          <Route path="resources" element={<Resources />} />
          <Route path="resources/:id" element={<Article kind="resource" />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<Article kind="blog" />} />
          {Object.entries(aliases).map(([from, to]) => (
            <Route key={from} path={from} element={<LegacyRedirect to={to} />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
