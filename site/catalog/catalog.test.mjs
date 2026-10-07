import assert from 'node:assert/strict';
import test from 'node:test';
import { buildCard, getFacets, filterCards, readFilters, writeFilters } from './catalog.ts';

const inputs = [
  { id: 'data_source/SmartMaps/紛争', data: { title: '紛争 PMTiles', provider_group: 'SmartMaps', provider: 'UN Smart Maps', license: ['CC-BY-4.0'], access: 'range', categories: ['紛争・人道'], regions: ['全世界'], formats: ['PMTiles'], format: 'PMTiles v3', coverage: '全世界', checked: new Date('2026-10-06') } },
  { id: 'data_source/国土地理院/標高', data: { title: '標高', provider_group: '国土地理院', license: ['CC-BY-4.0', 'other', 'CC-BY-4.0'], access: 'split', categories: ['地形・標高'], regions: ['日本'], formats: ['GeoTIFF'], format: 'GeoTIFF', coverage: '日本', checked: null } },
  { id: 'data_source/NASA/画像', data: { title: '衛星画像', provider_group: 'NASA', license: ['unknown'], access: 'unconfirmed', checked: null } },
];
const cards = () => inputs.map((entry) => buildCard(entry, '/foil4g/'));

test('cards keep canonical links and searchable metadata while using the existing provider groups', () => {
  const card = cards()[0];
  assert.equal(card.href, '/foil4g/data_source/SmartMaps/紛争/');
  assert.equal(card.provider, 'SmartMaps');
  assert.equal(card.checked, '2026-10-06');
  assert.equal(cards()[1].checked, '');
  assert.equal(filterCards(cards(), { q: 'UN Smart Maps' }).length, 1);
  assert.equal(filterCards(cards(), { q: '全世界' }).length, 1);
});

test('a card belongs to every stated license, counted once per license', () => {
  const facets = getFacets(cards(), 'license');
  assert.equal(facets.find((f) => f.value === 'CC-BY-4.0').count, 2);
  assert.equal(facets.find((f) => f.value === 'other').count, 1);
  assert.equal(facets.find((f) => f.value === 'unknown').count, 1);
  assert.equal(filterCards(cards(), { license: 'other' }).length, 1);
});

test('different axes and keywords narrow results with AND; empty and unknown filters are safe', () => {
  assert.equal(filterCards(cards(), {}).length, 3);
  assert.equal(filterCards(cards(), { provider: 'SmartMaps', license: 'CC-BY-4.0', access: 'range', q: 'pmtiles' }).length, 1);
  assert.equal(filterCards(cards(), { provider: 'SmartMaps', access: 'split' }).length, 0);
  assert.equal(filterCards(cards(), { license: 'missing' }).length, 0);
  assert.equal(filterCards(cards(), { q: '  ＰＭＴｉｌｅｓ　全世界  ' }).length, 1);
  assert.equal(filterCards(cards(), { q: 'PMTiles 日本' }).length, 0);
});

test('filters round trip in a URL with Japanese text and preserve unrelated query parameters', () => {
  const original = new URLSearchParams('utm_source=test&provider=NASA');
  const filters = { provider: '国土地理院', license: 'CC-BY-4.0', access: 'split', q: '標高 日本' };
  const params = writeFilters(filters, original);
  assert.deepEqual(readFilters(params), filters);
  assert.equal(params.get('utm_source'), 'test');
  assert.equal(original.get('provider'), 'NASA');
  const reset = writeFilters({}, params);
  assert.equal(reset.toString(), 'utm_source=test');
});

test('a missing optional field never becomes a searchable undefined value', () => {
  const card = buildCard({ id: 'data_source/NASA/example', data: { title: '例' } }, '/');
  assert.equal(card.href, '/data_source/NASA/example/');
  assert.equal(filterCards([card], { q: 'undefined' }).length, 0);
});

test('theme, region and format support multiple memberships and combine with other axes', () => {
  const card = buildCard({ id: 'data_source/NASA/example', data: {
    title: '例', provider_group: 'NASA', categories: ['地形・標高', 'ベースマップ'], regions: ['日本', '関東'],
    formats: ['GeoTIFF', 'COG'], license: ['CC-BY-4.0'], access: 'range',
  } }, '/');
  assert.equal(filterCards([card], { category: 'ベースマップ', region: '関東', format: 'COG', provider: 'NASA', license: 'CC-BY-4.0', access: 'range' }).length, 1);
  assert.equal(filterCards([card], { region: '全世界' }).length, 0);
  assert.equal(getFacets([card], 'format').length, 2);
});

test('provider groups are defined by YAML frontmatter, independent of file location', () => {
  const card = buildCard({ id: 'data_source/Folder/example', data: { title: '例', provider_group: '共同配布', provider: ['機関A', '機関B'] } }, '/');
  assert.equal(card.provider, '共同配布');
  assert.equal(filterCards([card], { provider: '共同配布' }).length, 1);
});

test('a missing provider group stays unclassified instead of being inferred from the folder', () => {
  const card = buildCard({ id: 'data_source/Folder/example', data: { title: '例' } }, '/');
  assert.equal(card.provider, '未分類');
});

test('card descriptions come from YAML frontmatter and are searchable', () => {
  const card = buildCard({ id: 'data_source/example', data: { title: '例', description: '都市の建物を比較できます。' } }, '/');
  assert.equal(card.description, '都市の建物を比較できます。');
  assert.equal(filterCards([card], { q: '比較' }).length, 1);
});
