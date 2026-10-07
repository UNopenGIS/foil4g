import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const { scripts } = JSON.parse(read('package.json'));

test('standard commands serve, build, and preview the Astro site', () => {
  assert.equal(scripts.dev, 'astro dev');
  assert.equal(scripts.build, 'astro build');
  assert.equal(scripts.preview, 'astro preview');
});

test('GitHub Pages deploys tested Astro output using its configured site and base', () => {
  const workflow = read('.github/workflows/build-deploy.yml');
  assert.match(workflow, /actions\/setup-node@/);
  assert.match(workflow, /npm run test:site/);
  assert.match(workflow, /npm run build/);
  assert.match(workflow, /ASTRO_SITE:.*steps\.pages\.outputs\.origin/);
  assert.match(workflow, /ASTRO_BASE:.*steps\.pages\.outputs\.base_path/);
  assert.match(workflow, /path: ['"]?dist-site/);
  assert.doesNotMatch(workflow, /build-storybook|storybook-static/);
});
