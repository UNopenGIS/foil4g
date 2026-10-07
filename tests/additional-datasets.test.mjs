import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const html = readFileSync('dist-site/data_source/index.html', 'utf8');
const cards = [...html.matchAll(/data-catalog-card="([^"]+)"/g)].map(([, value]) => JSON.parse(
  value.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'),
));
const additions = [
  ['デジタル庁', 'デジタル庁 アドレス・ベース・レジストリ', 'split', 'PDL-1.0'],
  ['e-Stat', 'e-Stat 国勢調査 小地域境界', 'split', 'CC-BY-4.0'],
  ['国土交通省', '国土数値情報 鉄道データ N02', 'whole', 'CC-BY-4.0'],
  ['国土交通省', 'PLATEAU 3D都市モデル', 'catalog', 'other'],
  ['警察庁', '警察庁 交通事故統計オープンデータ', 'split', 'PDL-1.0'],
  ['Ookla', 'Ookla Speedtest 通信品質データ', 'range', 'CC-BY-NC-SA-4.0'],
  ['NYC TLC', 'NYC TLC タクシー乗車記録', 'range', 'unknown'],
];
test('new practical datasets have explicit classifications and accurate access and license labels', () => {
  for (const [provider, title, access, license] of additions) {
    const matches = cards.filter((card) => card.title === title);
    assert.equal(matches.length, 1, `Expected one card for ${title}`);
    const card = matches[0];
    assert.equal(card.provider, provider);
    assert.equal(card.access, access);
    assert.ok(card.license.includes(license));
    assert.ok(card.description.length > 20);
    for (const axis of ['category', 'region', 'format']) {
      assert.ok(card[axis].length && !card[axis].includes('未分類'), `${title}: ${axis}`);
    }
  }
});
