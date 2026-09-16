import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { load } from 'cheerio';

const data = JSON.parse(await fs.readFile('src/data/content.json', 'utf8'));
const aliases = JSON.parse(await fs.readFile('src/data/aliases.json', 'utf8'));
const normalize = (text) => text.replace(/\s+/g, '');
const read = async (file) => load(await fs.readFile(file, 'utf8'));
const compareLegacy = process.argv.includes('--compare-legacy');
const legacyGroups = compareLegacy
  ? [
      ['departments', 'pages/dept.html', '.dept-card', 'h3', 'title'],
      ['activities', 'pages/activity.html', '.act-card', 'h4', 'title'],
      ['members', 'pages/member.html', '.member-card', 'h4', 'name'],
      ['friends', 'pages/friendlink.html', '.friend-card', 'h4', 'title'],
      ['resources', 'pages/tech.html', '.tech-card', 'h4', 'title'],
    ]
  : [];
for (const [group, file, selector, title, key] of legacyGroups) {
  const $ = await read(`legacy/${file}`);
  const originalNames = $(selector)
    .toArray()
    .map((item) => $(item).find(title).text().trim());
  const currentNames = data[group].map((item) => item[key]);
  assert.deepEqual(
    // New members may be added after migration; every original member must remain in order.
    group === 'members'
      ? currentNames.filter((name) => originalNames.includes(name))
      : currentNames,
    originalNames,
    `${group}: source entries changed or missing`,
  );
}
if (compareLegacy) {
  const index = await read('legacy/blog/index.html');
  assert.equal(data.posts.length, index('.org-ul a').length);
}
const routes = new Set(Object.values(aliases));
let verifiedArticles = 0;
for (const kind of ['blog', 'resource']) {
  for (const item of kind === 'blog' ? data.posts : data.resources) {
    const originalPath =
      kind === 'blog' ? `legacy/blog/${item.id}.html` : `legacy/pages/tech-detail/${item.id}.html`;
    const selector = kind === 'blog' ? '#content' : '.detail-content';
    const migrated = await read(`src/content/${kind}-${item.id}.html`);
    if (compareLegacy) {
      const original = await read(originalPath);
      original(
        `${selector} script, ${selector} style, ${selector} .title, ${selector} .back-btn`,
      ).remove();
      assert.equal(
        normalize(migrated('body').text()),
        normalize(original(selector).text()),
        `${item.id}: article text must be retained`,
      );
    }
    assert.equal(
      migrated('script,iframe,style').length,
      0,
      `${item.id}: executable content in article`,
    );
    for (const link of migrated('a[href]').toArray()) {
      const href = migrated(link).attr('href');
      if (href.startsWith('#')) {
        const target = decodeURIComponent(href.slice(1));
        assert.ok(
          migrated('[id]')
            .toArray()
            .some((node) => migrated(node).attr('id') === target),
          `${item.id}: broken anchor ${href}`,
        );
      } else if (href.startsWith('/')) {
        assert.ok(routes.has(href.split('#')[0]), `${item.id}: unknown internal link ${href}`);
      }
    }
    verifiedArticles++;
  }
}
const localImages = new Set(
  [...data.activities, ...data.members, ...data.friends]
    .map((item) => item.image)
    .filter((src) => src.startsWith('/img/')),
);
localImages.add('/img/logo.png');
for (const image of localImages) await fs.access(`public${image}`);
for (const [oldPath] of Object.entries(aliases)) {
  if (!oldPath.endsWith('.php')) await fs.access(`dist${oldPath}`);
}
console.log(
  `Content verified: ${verifiedArticles} complete articles, ${localImages.size} local images, ${Object.keys(aliases).length} legacy aliases; all local article links and anchors resolve.`,
);
