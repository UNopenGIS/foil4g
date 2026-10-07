export const axes = [
  { id: "category", label: "テーマ" },
  { id: "region", label: "対象地域" },
  { id: "license", label: "ライセンス" },
  { id: "provider", label: "提供元" },
  { id: "format", label: "データ形式" },
  { id: "access", label: "取り出し方" },
] as const;

export type Axis = (typeof axes)[number]["id"];
export type Filters = Partial<Record<Axis | "q", string>>;
export type Card = {
  id: string;
  title: string;
  description: string;
  href: string;
  provider: string;
  category: string[];
  region: string[];
  format: string[];
  license: string[];
  access: string;
  checked: string;
  searchText: string;
};

type Entry = {
  id: string;
  data: {
    title: string;
    description?: string;
    provider?: string | string[];
    provider_group?: string;
    source_data?: string | string[];
    format?: string | string[];
    coverage?: string;
    categories?: string[];
    regions?: string[];
    formats?: string[];
    license?: string[];
    access?: string;
    checked?: Date | null;
  };
};

const accessLabels: Record<string, string> = {
  range: "必要な範囲を取得（HTTP Range）",
  catalog: "カタログ・API から選ぶ",
  split: "地域・単位別のファイルを取得",
  whole: "ファイル全体を取得",
  unconfirmed: "未確認",
};

export function facetLabel(axis: Axis, value: string): string {
  if (axis === "access") return accessLabels[value] ?? value;
  if (axis === "license" && value === "unknown") return "未確認";
  if (axis === "license" && value === "other") return "独自の利用条件";
  return value;
}

const normalize = (text: string) => text.normalize("NFKC").toLocaleLowerCase("ja");
const tags = (values?: string[]) => [...new Set(values?.length ? values : ["未分類"])];

export function buildCard(entry: Entry, base: string): Card {
  const { data } = entry;
  const card: Card = {
    id: entry.id,
    title: data.title,
    description: data.description ?? "",
    href: `${base.replace(/\/$/, "")}/${entry.id}/`,
    provider: data.provider_group ?? "未分類",
    category: tags(data.categories),
    region: tags(data.regions),
    format: tags(data.formats),
    license: [...new Set(data.license ?? ["unknown"])],
    access: data.access ?? "unconfirmed",
    checked: data.checked?.toISOString().slice(0, 10) ?? "",
    searchText: "",
  };
  card.searchText = normalize([
    card.title, card.description, card.provider, data.provider, data.source_data, data.format, data.coverage,
    ...card.category, ...card.region, ...card.format, ...card.license,
    card.access, facetLabel("access", card.access),
  ].flat().filter((value) => typeof value === "string").join(" "));
  return card;
}

export function facetValues(card: Card, axis: Axis): string[] {
  const value = card[axis];
  return Array.isArray(value) ? value : [value];
}

export function getFacets(cards: Card[], axis: Axis) {
  const counts = new Map<string, number>();
  for (const card of cards) {
    for (const value of new Set(facetValues(card, axis))) {
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }
  }
  return [...counts].map(([value, count]) => ({ value, count, label: facetLabel(axis, value) }))
    .sort((a, b) => a.label.localeCompare(b.label, "ja"));
}

export function filterCards(cards: Card[], filters: Filters): Card[] {
  const terms = normalize(filters.q ?? "").trim().split(/\s+/).filter(Boolean);
  return cards.filter((card) =>
    axes.every(({ id }) => !filters[id] || facetValues(card, id).includes(filters[id]!)) &&
    terms.every((term) => card.searchText.includes(term)),
  );
}

export function readFilters(params: URLSearchParams): Filters {
  return Object.fromEntries(["q", ...axes.map(({ id }) => id)]
    .map((key) => [key, params.get(key) ?? ""])
    .filter(([, value]) => value));
}

export function writeFilters(filters: Filters, current = new URLSearchParams()): URLSearchParams {
  const params = new URLSearchParams(current);
  for (const key of ["q", ...axes.map(({ id }) => id)] as const) {
    const value = filters[key];
    if (value) params.set(key, value);
    else params.delete(key);
  }
  return params;
}

export function facetHref(base: string, axis: Axis, value?: string): string {
  return `${base.replace(/\/$/, "")}/browse/${axis}/${value === undefined ? "" : `${encodeURIComponent(value)}/`}`;
}
