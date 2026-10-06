import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Mirrors the frontmatter described in docs/README.md.
const stringOrList = z.union([z.string(), z.array(z.string())]);

const dataSources = defineCollection({
  loader: glob({
    base: "./docs/data_source",
    pattern: "**/*.md",
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z
    .object({
      title: z.string(),
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
    })
    .strict(),
});

export const collections = { dataSources };
