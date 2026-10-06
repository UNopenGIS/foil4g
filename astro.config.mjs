import { defineConfig } from "astro/config";
import remarkStripWikilinks from "./site/plugins/remark-strip-wikilinks.mjs";

// The Vite app and Storybook keep src/ and public/. The documentation site
// lives in site/ and builds to dist-site/, reading the cards from docs/.
export default defineConfig({
  srcDir: "./site",
  outDir: "./dist-site",
  markdown: {
    remarkPlugins: [remarkStripWikilinks],
  },
});
