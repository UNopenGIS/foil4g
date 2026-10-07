import { getCollection } from "astro:content";
import { buildCard } from "./catalog";

export async function loadCards(base: string) {
  const entries = await getCollection("docs", (entry) => entry.id.startsWith("data_source/"));
  return entries.map((entry) => buildCard(entry, base))
    .sort((a, b) => a.title.localeCompare(b.title, "ja"));
}
