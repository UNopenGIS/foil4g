import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { docsSchema } from "@astrojs/starlight/schema";

// Mirrors the frontmatter described in docs/README.md. Starlight's own
// schema supplies title (and its optional page settings); these are the
// data source card fields on top of it.
const stringOrList = z.union([z.string(), z.array(z.string())]);

const cardFields = z.object({
  id: z.string().optional(),
  provider: stringOrList.optional(),
  source_data: stringOrList.optional(),
  license: z.array(z.string()).min(1),
  license_note: z.string().optional(),
  access: z.enum(["range", "catalog", "split", "whole", "unconfirmed"]),
  access_note: z.string().optional(),
  format: stringOrList.optional(),
  coverage: z.string().optional(),
  period: z.string().optional(),
  resolution: z.string().optional(),
  size: z.string().optional(),
  update: z.string().optional(),
  url: z.string().optional(),
  docs: z.string().optional(),
  checked: z.coerce.date().nullable(),
  details: z.record(z.string(), z.string()).optional(),
});

// Starlight serves the "docs" collection. It reads the cards where they are,
// in docs/data_source, and keeps their paths as page URLs.
const docs = defineCollection({
  loader: glob({
    base: "./docs",
    pattern: "data_source/**/*.md",
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  // StarlightPage validates other pages (such as the index) with this schema
  // too, so the card fields are optional here and required together below.
  schema: (context) =>
    docsSchema({ extend: cardFields.partial() })(context).superRefine((data, ctx) => {
      const isCard = data.license !== undefined || data.access !== undefined;
      if (!isCard) return;
      for (const key of ["license", "access", "checked"] as const) {
        if (data[key] === undefined) {
          ctx.addIssue({ code: "custom", path: [key], message: `${key} is required on a data source card` });
        }
      }
    }),
});

export const collections = { docs };
