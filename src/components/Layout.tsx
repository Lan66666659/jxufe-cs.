import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { useSiteMotion } from '../hooks/use-site-motion';
import { Fade } from './animate-ui/primitives/effects/fade';
import { Highlight, HighlightItem } from './animate-ui/primitives/effects/highlight';
import {
  ScrollProgressProvider,
  ScrollProgress,
} from './animate-ui/primitives/animate/scroll-progress';
import { ActionLink } from './motion';
import { ArrowUpRight, Code2 as Github, Mail, Menu, X } from 'lucide-react';
import { site } from '../data/site';

const navigation = [
  ['/', '首页'],
  ['/about', '关于计协'],
  ['/departments', '部门架构'],
  ['/activities', '活动风采'],
  ['/resources', '知识分享'],
  ['/blog', '博客天地'],
  ['/friends', '友情链接'],
];

export default function Layout() {
  const { pathname } = useLocation();
  const { reduced } = useSiteMotion();
  const activePath = pathname === '/' ? '/' : `/${pathname.split('/')[1]}`;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [menuOpen]);

  return (
    <ScrollProgressProvider global>
      <ScrollProgress mode="scaleX" className="site-progress" aria-hidden="true" />
      <a className="skip-link" href="#main">
        跳转到正文
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link
            className="brand"
            to="/"
            onClick={() => setMenuOpen(false)}
            aria-label="江财计协首页"
          >
            <img src="/img/logo.png" alt="" width="43" height="43" />
            <span>
              <strong>计算机协会</strong>
              <small>江西财经大学</small>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="主导航">
            <Highlight
              mode="parent"
              controlledItems
              value={activePath}
              click={false}
              className="nav-highlight"
              containerClassName="nav-highlight-container"
              transition={{ duration: reduced ? 0 : 0.25 }}
            >
              {navigation.map(([to, label]) => (
                <HighlightItem key={to} value={to}>
                  <NavLink key={to} to={to} end={to === '/'}>
                    {label}
                  </NavLink>
                </HighlightItem>
              ))}
            </Highlight>
          </nav>
          <ActionLink className="header-join button-primary" to="/contact">
            加入我们
            <ArrowUpRight size={16} />
          </ActionLink>
          <button
            ref={menuButton}
            className="menu-toggle"
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <Fade
              id="mobile-navigation"
              className="mobile-nav"
              aria-label="移动端导航"
              role="navigation"
              transition={{ duration: reduced ? 0 : 0.18 }}
            >
              {[...navigation, ['/members', '优秀骨干'], ['/contact', '联系我们']].map(
                ([to, label]) => (
                  <NavLink key={to} end={to === '/'} to={to} onClick={() => setMenuOpen(false)}>
                    {label}
                    <ArrowUpRight size={16} />
                  </NavLink>
                ),
              )}
            </Fade>
          )}
        </AnimatePresence>
      </header>
      <main id="main" tabIndex={-1}>
        <Suspense
          fallback={
            <div className="content-loading" role="status">
              正在加载…
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <footer className="site-footer">
        <div className="footer-main site-container">
          <div className="footer-brand">
            <Link className="brand" to="/">
              <img src="/img/logo.png" alt="" width="40" height="40" />
              <span>
                <strong>计算机协会</strong>
                <small>江西财经大学 · 成立于1996年</small>
              </span>
            </Link>
            <p>探索技术 · 分享知识 · 共同成长</p>
            <div className="footer-socials mt-6 flex gap-3">
              <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub 仓库">
                <Github size={19} />
              </a>
              <a href={`mailto:${site.email}`} aria-label="发送邮件">
                <Mail size={19} />
              </a>
            </div>
          </div>
          <div className="footer-column">
            <span>探索计协</span>
            <Link to="/about">协会简介</Link>
            <Link to="/departments">部门架构</Link>
            <Link to="/members">优秀骨干</Link>
          </div>
          <div className="footer-column">
            <span>一起成长</span>
            <Link to="/activities">活动风采</Link>
            <Link to="/resources">知识分享</Link>
            <Link to="/blog">博客天地</Link>
            <Link to="/friends">友情链接</Link>
          </div>
          <div className="footer-column footer-contact">
            <span>保持联系</span>
            <a href={`mailto:${site.email}`}>
              {site.email}
              <ArrowUpRight size={13} />
            </a>
            <p>{site.address}</p>
            <p>指导老师：{site.teacher}</p>
          </div>
        </div>
        <div className="footer-bottom site-container">
          <span>© {new Date().getFullYear()} 江西财经大学计算机协会</span>
          <span>学习 · 实践 · 交流</span>
        </div>
      </footer>
    </ScrollProgressProvider>
  );
}
