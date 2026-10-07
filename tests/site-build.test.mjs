import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import test from 'node:test';

const output = resolve('dist-site');
const base = `${(process.env.ASTRO_BASE ?? (process.env.CF_PAGES_URL ? '/' : '/foil4g/')).replace(/\/$/, '')}/`;
const htmlFiles = readdirSync(output, { recursive: true }).filter((file) => file.endsWith('.html'));
const read = (file) => readFileSync(join(output, file), 'utf8');

test('every data source card is published at its existing URL', () => {
  const cards = readdirSync('docs/data_source', { recursive: true }).filter((file) => file.endsWith('.md'));
  assert.ok(cards.length > 0);
  for (const card of cards) {
    const file = `data_source/${card.replace(/\.md$/, '')}/index.html`;
    assert.ok(existsSync(join(output, file)), `Missing card: ${file}`);
    assert.equal([...read(file).matchAll(/<h1\b/g)].length, 1, `Duplicate page title: ${file}`);
    assert.ok(/class="card-info(?: |")/.test(read(file)), `Missing metadata table: ${file}`);
  }
});

test('all internal page links and assets resolve under the hosting base path', () => {
  for (const file of htmlFiles) {
    for (const [, reference] of read(file).matchAll(/(?:href|src)="([^"#]+)"/g)) {
      if (!reference.startsWith('/') || reference.startsWith('//')) continue;
      assert.ok(reference.startsWith(base), `${file}: ${reference} is outside ${base}`);
      const path = decodeURIComponent(reference.slice(base.length).split(/[?#]/)[0]);
      assert.ok(existsSync(join(output, path)), `${file}: missing ${reference}`);
    }
  }
});

test('the built site includes Japanese navigation, search, and a usable 404 page', () => {
  assert.match(read('index.html'), /lang="ja"/);
  assert.ok(existsSync(join(output, 'pagefind/pagefind.js')));
  assert.match(read('404.html'), /ページが見つかりません/);
  assert.ok(read('404.html').includes('データソース一覧に戻る'), '404 page needs a link back to the index');
});
