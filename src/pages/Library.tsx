import { ActionButton } from '../components/motion';
import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Globe,
  Laptop,
  Search,
  Terminal,
  Wrench,
  X,
} from 'lucide-react';
import { PageHeading, PostRow } from '../components/shared';
import SpotlightCard from '../components/react-bits/SpotlightCard';
import content from '../data/site';
import { ResourceRotator, ShinyLabel } from '../components/InteriorEffects';

const articleFiles = import.meta.glob('../content/*.html', { query: '?raw', import: 'default' });
const resourceIcons = [Globe, Laptop, Wrench, BookOpen];

export function Resources() {
  return (
    <div className="site-container inner-page resources-page">
      <PageHeading
        label="THE KNOWLEDGE TOOLBOX"
        title="知识分享"
        description="例会中介绍的软件工具、维修方法与办公技能，按主题整理在这里。"
      />
      <ResourceRotator />
      <div className="resource-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
        {content.resources.map((resource, index) => {
          const Icon = resourceIcons[index];
          return (
            <Link key={resource.id} to={`/resources/${resource.id}`}>
              <SpotlightCard className="resource-card" spotlightColor="rgba(94, 167, 255, 0.15)">
                <div className="resource-card-top flex items-center justify-between text-accent">
                  <Icon size={28} />
                  <span>GUIDE / 0{index + 1}</span>
                </div>
                <h2>{resource.title}</h2>
                <p>{resource.description}</p>
                <span className="text-link">
                  打开知识工具箱
                  <ArrowUpRight size={17} />
                </span>
              </SpotlightCard>
            </Link>
          );
        })}
      </div>
      <div className="library-callout">
        <Terminal size={30} />
        <div>
          <h2>想看更深入的技术实践？</h2>
          <p>从 Linux 探索到开发手记，博客里还有更多伙伴的经验。</p>
        </div>
        <Link className="text-link" to="/blog">
          去博客看看
          <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );
}

export function Blog() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const category = params.get('category') ?? '全部文章';
  const categories = ['全部文章', ...new Set(content.posts.map((post) => post.category))];
  const filtered = content.posts.filter(
    (post) =>
      (category === '全部文章' || post.category === category) &&
      `${post.title} ${post.description} ${post.author}`
        .toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase()),
  );
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };
  return (
    <div className="site-container inner-page blog-page">
      <PageHeading
        label="THE COMMUNITY JOURNAL"
        title="博客天地"
        description="协会动态、Linux 使用经验、开发记录与成员的技术文章。"
      />
      <div className="journal-heading">
        <ShinyLabel text="写下问题，留下解法。" />
        <span>TECH NOTES / JXUFE</span>
      </div>
      <div className="blog-controls flex flex-col gap-5 min-[1021px]:flex-row min-[1021px]:items-center min-[1021px]:justify-between">
        <div className="filter-bar flex flex-wrap gap-2" aria-label="文章分类">
          {categories.map((item) => (
            <ActionButton
              key={item}
              aria-pressed={category === item}
              className={category === item ? 'active' : ''}
              onClick={() => update('category', item === '全部文章' ? '' : item)}
            >
              {item}
            </ActionButton>
          ))}
        </div>
        <div className="search-field">
          <Search size={18} />
          <input
            type="search"
            aria-label="搜索博客文章"
            placeholder="搜索文章、作者…"
            value={query}
            onChange={(event) => update('q', event.target.value)}
          />
          {query && (
            <ActionButton aria-label="清空搜索" onClick={() => update('q', '')}>
              <X size={16} />
            </ActionButton>
          )}
        </div>
      </div>
      <p className="result-count" role="status">
        {filtered.length} 篇文章<span>按发布时间排序</span>
      </p>
      {filtered.length ? (
        <div className="post-list">
          {filtered.map((post, index) => (
            <PostRow key={post.id} post={post} index={index} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={36} />
          <h2>还没有找到相关的文章</h2>
          <p>试试其他关键词，或者浏览全部文章。</p>
          <ActionButton className="button button-primary" onClick={() => setParams({})}>
            查看全部文章
            <ArrowRight size={17} />
          </ActionButton>
        </div>
      )}
    </div>
  );
}

export function Article({ kind }: { kind: 'blog' | 'resource' }) {
  const { id } = useParams();
  const item =
    kind === 'blog'
      ? content.posts.find((post) => post.id === id)
      : content.resources.find((resource) => resource.id === id);
  const [loaded, setLoaded] = useState<{ key: string; html: string; error?: boolean }>();
  const key = `${kind}-${id}`;
  useEffect(() => {
    let active = true;
    const loader = articleFiles[`../content/${key}.html`];
    if (loader)
      loader()
        .then((html) => {
          if (active) setLoaded({ key, html: html as string });
        })
        .catch(() => {
          if (active) setLoaded({ key, html: '', error: true });
        });
    return () => {
      active = false;
    };
  }, [key]);
  if (!item) return <NotFound />;
  const post = kind === 'blog' ? content.posts.find((post) => post.id === id) : null;
  const postIndex = content.posts.findIndex((post) => post.id === id);
  const next = postIndex >= 0 ? content.posts[postIndex + 1] : null;
  return (
    <div className="site-container inner-page article-page">
      <Link className="text-link article-back" to={kind === 'blog' ? '/blog' : '/resources'}>
        <ArrowLeft size={16} />
        {kind === 'blog' ? '返回博客天地' : '返回知识分享'}
      </Link>
      <div className="article-heading">
        <div className="eyebrow">{post?.category ?? 'COMMUNITY KNOWLEDGE'}</div>
        <h1>{item.title}</h1>
        {post ? (
          <p>
            <span>{post.author}</span>
            <time dateTime={post.date}>{post.date}</time>
            <span>江财计协 · 技术记录</span>
          </p>
        ) : (
          <p>江财计协 · 例会知识分享</p>
        )}
      </div>
      {loaded?.key === key ? (
        loaded.error ? (
          <div className="empty-state" role="alert">
            <h2>文章暂时加载失败</h2>
            <ActionButton
              className="button button-primary"
              onClick={() => window.location.reload()}
            >
              重新加载
            </ActionButton>
          </div>
        ) : (
          <div className="article-content" dangerouslySetInnerHTML={{ __html: loaded.html }} />
        )
      ) : (
        <p className="article-loading" role="status">
          正在加载文章…
        </p>
      )}
      <div className="article-footer">
        <Link className="text-link" to={kind === 'blog' ? '/blog' : '/resources'}>
          <ArrowLeft size={17} />
          浏览更多{kind === 'blog' ? '文章' : '知识'}
        </Link>
        {next && (
          <Link to={`/blog/${next.id}`} className="next-article">
            <span>下一篇</span>
            {next.title}
            <ArrowRight size={17} />
          </Link>
        )}
      </div>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="site-container not-found">
      <span className="error-code">
        404<span>_</span>
      </span>
      <h1>这一页，还没有被写下</h1>
      <p>链接可能已经变更。回到首页，继续你的探索。</p>
      <Link to="/" className="button button-primary">
        返回首页
        <ArrowRight size={17} />
      </Link>
    </div>
  );
}
