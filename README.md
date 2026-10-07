# FOIL4G: Free and Open Information Library for Geospatial

## Concept

We incorporate Benjamin Franklin’s library concept into the idea of the Free and Open Information Library for Geospatial (FOIL4G):

> "Since our books were often referred to in our disquisitions upon the queries, it might be convenient to have them all together where we meet, so that they might be consulted when needed. Additionally, by pooling our books into a common library, we would, while we liked to keep them together, have the advantage of using the books of all the other members, which would be nearly as beneficial as if each owned the whole."

This quote is highly relevant to emphasize the philosophy behind FOIL4G. FOIL4G aims to create an open library of geospatial information, allowing all members to freely access and collaboratively utilize the data. By doing so, it leverages individual resources to enhance the collective knowledge and capabilities of the entire community.

Specifically, FOIL4G can incorporate the following elements:

1. **Aggregation of Shared Resources**: Collect smart maps, geospatial data, relevant documents, and more in one place where everyone can access them.
2. **Collaborative Work and Learning**: Facilitate discussions among members, enabling them to consult necessary information on the spot for effective decision-making and problem-solving.
3. **Expansion of Knowledge**: By utilizing the shared library, each member can benefit from the knowledge and resources of others, thus enhancing their own capabilities.

In this way, FOIL4G applies Benjamin Franklin’s library concept to modern geospatial information systems, providing a platform where all participants can cooperate and grow together.

## Goals

- Create and provide a library of freely accessible geospatial data for everyone.
- Develop and provide a library of skills and recipes for handling those data.
- Facilitate effective decision-making and problem-solving through the sharing of that information.
- Promote the automatic processing of geospatial information by generative AI through the sharing of that information.

## Development

Use Node.js 24 and install dependencies with `npm ci`.

```bash
npm run dev          # Astro + Starlight at http://localhost:4321/foil4g/
npm run test:site    # Markdown plugin and migration tests
npm run site:check   # Astro and map preview type checks
npm run build        # Static site in dist-site/
npm run test:build   # Validate the built cards, internal links, assets, search, and 404
npm run preview      # Preview the production build
```

The site reads data source cards from `docs/data_source/`. Each card is available at
`/data_source/<provider>/<name>/` under the configured base path. Starlight provides
Japanese navigation, full-text search, themes, and a table of contents. The existing
Uppsala conflict card also loads its React map preview in the browser.

### Hosting

GitHub Pages builds and publishes `dist-site/`, using the origin and base path returned
by `actions/configure-pages`. Pull requests and pushes test both `/` and `/foil4g/`.
Locally, the defaults match `https://unopengis.org/foil4g/`. Override them for another host:

```bash
ASTRO_SITE=https://example.org ASTRO_BASE=/ npm run build
ASTRO_BASE=/ npm run test:build
```

Cloudflare Pages can continue to use `npm run site:build` (an alias of the Astro build)
and `dist-site/`. When `CF_PAGES_URL` is set, the site defaults to that URL and `/`;
set `ASTRO_SITE` to the production URL when a stable canonical URL is needed.
The `site:dev`, `site:build`, and `site:preview` commands remain available.

### Repository layout

- `site/`: Astro pages, Starlight overrides, Markdown plugins, and map previews
- `docs/data_source/`: data source cards with validated frontmatter
- `src/`: reusable React maps, datasets, and examples
- `public/`: shared images and MapLibre styles
- `tests/`: checks for generated site output

The previous Vite app and Storybook remain available while map examples are migrated:
`npm run app:dev`, `npm run app:build`, `npm run app:preview`, `npm run storybook`, and
`npm run build-storybook`. GitHub Pages publishes the Astro site.

## Contributing

Interested in contributing to FOIL4G? We welcome contributions of all kinds from anyone. Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for more details on how to submit bug reports, feature requests, and pull requests. For more information on our Code of Conduct, please refer to the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) file.
