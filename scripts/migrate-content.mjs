import fs from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';
import sanitizeHtml from 'sanitize-html';

const root = new URL('../', import.meta.url);
const read = async (file) => load(await fs.readFile(new URL(`legacy/${file}`, root), 'utf8'));
const image = (src = '') => (src.includes('img/') ? `/img/${src.split('img/')[1]}` : src);
const text = ($, el, selector) => $(el).find(selector).text().trim();
const aliases = {
  '/index.html': '/',
  '/index.php': '/',
  '/pages/intro.html': '/about',
  '/pages/dept.html': '/departments',
  '/pages/activity.html': '/activities',
  '/pages/member.html': '/members',
  '/pages/tech.html': '/resources',
  '/pages/friendlink.html': '/friends',
  '/pages/contact.html': '/contact',
  '/blog/index.html': '/blog',
  '/pages/blog/index.html': '/blog',
};
const intro = await read('pages/intro.html');
const dept = await read('pages/dept.html');
const activity = await read('pages/activity.html');
const members = await read('pages/member.html');
const friends = await read('pages/friendlink.html');
const departments = dept('.dept-card')
  .toArray()
  .map((el) => ({
    title: text(dept, el, 'h3'),
    description: text(dept, el, 'p'),
  }));
const activities = activity('.act-card')
  .toArray()
  .map((el, index) => ({
    id: String(index + 1),
    title: text(activity, el, 'h4'),
    description: text(activity, el, 'p'),
    image: image(activity(el).find('img').attr('src')),
    category: ['社群日常', '志愿服务', '共同成长', '技术课堂', '技术课堂', '共同成长'][index],
  }));
const memberList = members('.member-card')
  .toArray()
  .map((el) => ({
    name: text(members, el, 'h4'),
    role: text(members, el, '.member-job'),
    description: text(members, el, '.member-desc'),
    image: image(members(el).find('img').attr('src')),
  }));
const friendList = friends('.friend-card')
  .toArray()
  .map((el) => ({
    title: text(friends, el, 'h4'),
    description: text(friends, el, '.friend-desc'),
    image: image(friends(el).find('img').attr('src')),
    href: friends(el).find('a').attr('href'),
  }));
const blogIndex = await read('blog/index.html');
const posts = [];
const resources = [];
const techIndex = await read('pages/tech.html');

const clean = (html, sourcePath) => {
  const $ = load(html, null, false);
  $('script, style, .title, .back-btn').remove();
  // Org section classes collide with Tailwind's outline-width utilities.
  $('[class]').each((_, el) => {
    const classes = $(el).attr('class').split(/\s+/);
    $(el).attr(
      'class',
      classes.map((name) => (/^outline-\d+$/.test(name) ? `org-${name}` : name)).join(' '),
    );
  });
  $('[src]').each((_, el) => {
    $(el).attr('src', image($(el).attr('src')));
  });
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (href.startsWith('#')) return;
    if (/^https?:/.test(href)) {
      $(el).attr({ target: '_blank', rel: 'noopener noreferrer' });
      return;
    }
    const resolved = new URL(href, `https://local.invalid/${sourcePath}`);
    if (resolved.origin === 'https://local.invalid') {
      $(el).attr('href', `${aliases[resolved.pathname] ?? resolved.pathname}${resolved.hash}`);
    }
  });
  return sanitizeHtml($.html(), {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      'img',
      'span',
      'figure',
      'figcaption',
      'details',
      'summary',
    ],
    allowedAttributes: {
      '*': ['id', 'class', 'role'],
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt', 'width', 'height'],
      td: ['colspan', 'rowspan'],
      th: ['colspan', 'rowspan'],
    },
  });
};

for (const el of blogIndex('.org-ul a').toArray()) {
  const file = blogIndex(el).attr('href');
  const id = file.replace(/\.html$/, '');
  aliases[`/blog/${file}`] = `/blog/${id}`;
}
for (const el of techIndex('.tech-card-link').toArray()) {
  const file = techIndex(el).attr('href');
  aliases[`/pages/${file}`] = `/resources/${path.basename(file, '.html')}`;
}
for (const el of blogIndex('.org-ul a').toArray()) {
  const file = blogIndex(el).attr('href');
  const id = file.replace(/\.html$/, '');
  const $ = await read(`blog/${file}`);
  const date = `${id.slice(0, 4)}-${id.slice(4, 6)}-${id.slice(6, 8)}`;
  const title = $('h1.title').text().trim();
  const paragraphs = $('#content p')
    .toArray()
    .map((p) => $(p).text().trim().replace(/\s+/g, ' '));
  posts.push({
    id,
    title,
    date,
    author: $('meta[name="author"]').attr('content') ?? '计算机协会',
    description: paragraphs.find((p) => p.length > 30)?.slice(0, 130) ?? title,
    category: /上线|帖子/.test(title)
      ? '协会动态'
      : /Debian|keyd/.test(title)
        ? 'Linux 探索'
        : '开发实践',
  });
  await fs.writeFile(
    new URL(`src/content/blog-${id}.html`, root),
    clean($('#content').html(), `blog/${file}`),
  );
}
for (const el of techIndex('.tech-card-link').toArray()) {
  const file = techIndex(el).attr('href');
  const id = path.basename(file, '.html');
  const $ = await read(`pages/${file}`);
  resources.push({
    id,
    title: text(techIndex, el, 'h4'),
    description: techIndex(el)
      .find('p')
      .toArray()
      .map((p) => techIndex(p).text().trim())
      .join('；'),
  });
  await fs.writeFile(
    new URL(`src/content/resource-${id}.html`, root),
    clean($('.detail-content').html(), `pages/${file}`),
  );
}
await fs.writeFile(
  new URL('src/data/content.json', root),
  JSON.stringify(
    {
      intro: intro('.intro-text').text().trim(),
      departments,
      activities,
      members: memberList,
      friends: friendList,
      posts: posts.sort((a, b) => b.date.localeCompare(a.date)),
      resources,
    },
    null,
    2,
  ) + '\n',
);
await fs.writeFile(new URL('src/data/aliases.json', root), JSON.stringify(aliases, null, 2) + '\n');
console.log(
  `Migrated ${departments.length} departments, ${activities.length} activities, ${memberList.length} members, ${friendList.length} friends, ${posts.length} posts, ${resources.length} resources.`,
);
