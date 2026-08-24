<div align="center">

# The Ledger

### A free, open-source magazine &amp; blog template for Next.js 16

Typography-first. Server-rendered. Built entirely with **[VivekUI](https://ui.vivekkumarsingh.in/docs?utm_source=vivekui-template&utm_campaign=magazine&utm_medium=readme)** — no Tailwind, no shadcn, no MUI, no config file.

**[View the live demo →](https://theledger.vivekkumarsingh.in)**

[![Live demo](https://img.shields.io/badge/demo-theledger.vivekkumarsingh.in-123fc9)](https://theledger.vivekkumarsingh.in)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![VivekUI](https://img.shields.io/npm/v/@the_viveksingh/vivek-ui?color=123fc9&label=VivekUI)](https://www.npmjs.com/package/@the_viveksingh/vivek-ui)
[![UI runtime deps](https://img.shields.io/badge/UI%20runtime%20deps-0-123fc9)](https://github.com/intellectwithvivek/vivek_UI)
[![Licence](https://img.shields.io/badge/licence-MIT-123fc9)](./LICENSE)

</div>

<div align="center">

<!-- Swap this for a real screenshot once deployed: docs/screenshot.png -->
<img src="https://theledger.vivekkumarsingh.in/opengraph-image" alt="The Ledger — a free Next.js 16 magazine template" width="820">

</div>

---

## Get it

```bash
git clone https://github.com/intellectwithvivek/theledger.git
cd theledger
npm install
npm run dev
```

Open <http://localhost:3000>. Requires **Node.js 20.9+** (22 LTS recommended).

Prefer your own repository? Use **[Use this template](https://github.com/intellectwithvivek/theledger/generate)** on GitHub.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fintellectwithvivek%2Ftheledger&project-name=the-ledger&repository-name=the-ledger)

| Script | What it does |
|---|---|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build — prerenders all 38 routes |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

---

## Why this exists

This is a **showcase project**. It was built to demonstrate that
[VivekUI](https://github.com/intellectwithvivek/vivek_UI) can carry a complete,
production-quality product on its own — not a landing page with a hero and three
feature cards, but a real editorial site with article routes, structured data,
data-journalism charts and a reading experience that has to survive being read.

Every interface element on the site comes from one package. The only CSS this
project writes is a stylesheet that re-points a handful of custom properties.

**It is free and open source.** Clone it, gut it, ship your own thing.

---

## What is in the box

- **Twelve articles**, 300–500 words each, across four desks — real copy, not lorem ipsum.
- **A data story** whose body embeds a `LineChart` and a `BarChart` with captions — charts inside content, the way a real data story works.
- **A Most read rail** with a seven-day `Sparkline` beside every entry.
- **A typographic identity**: a full-bleed nameplate, hairline column rules in the gutters, two serifs doing separate jobs, images kept deliberately quiet.
- **Light and dark**, with no flash of the wrong theme on first paint.
- **⌘K search** across every article, desk and author.
- **Complete SEO and AEO**: per-route metadata, five kinds of structured data, RSS, sitemap, robots, `llms.txt`.

---

## Project layout

```
app/
  layout.tsx              fonts, ThemeProvider, ToastProvider, navbar, footer
  page.tsx                front page: nameplate, ticker, lead, grid, rail, desks
  globals.css             design tokens and the editorial type system
  article/[slug]/         article route + a generated OG image per article
  category/[slug]/        one desk, paginated
  built-with/             the colophon
  feed.xml/               RSS 2.0
  sitemap.ts robots.ts    generated from the content, not from build time
  manifest.ts             web app manifest
  opengraph-image.tsx     site-level share card
components/               site chrome and editorial components
data/
  articles.ts             12 articles, 6 authors, 4 desks — fully typed
  site.ts                 canonical URL, repo links, UTM helpers
lib/
  seo.ts                  metadata + JSON-LD builders
  images.ts               Unsplash sizing helper
public/llms.txt           AEO attribution file
```

---

## Making it yours

| To change | Edit |
|---|---|
| Domain, site name, social handle, repo links | `data/site.ts` |
| Articles, authors, desks | `data/articles.ts` |
| Accent colour, corner radius, hairline weight | the token block at the top of `app/globals.css` |
| Typefaces | the `next/font` calls in `app/layout.tsx` |
| Remove the VivekUI credit | the badge in `components/site-navbar.tsx` and the credit line in `components/site-footer.tsx` |

**One value drives the whole site's identity.** Change `SITE.url` in
`data/site.ts` and every canonical, Open Graph URL, sitemap entry, RSS link and
JSON-LD `@id` follows it. Nothing else hard-codes the origin.

Article bodies are a typed discriminated union of blocks rather than an HTML
string, so adding a new kind of content — a chart, an embed, a table — means
adding one case to `Block` and one branch to `components/article-body.tsx`.
Nothing on the site calls `dangerouslySetInnerHTML` on content.

---

## SEO &amp; AEO

Search engines and answer engines are both first-class targets here.

**Metadata** — the Metadata API on every route, with `metadataBase`, canonical
URLs, Open Graph and Twitter cards, and a **generated OG image per article**
(typographic, built with `next/og`).

**Structured data** — validated JSON-LD, emitted server-side:

| Type | Where |
|---|---|
| `WebSite` + `SearchAction` | front page |
| `NewsArticle` + `BlogPosting` | every article |
| `CollectionPage` + `ItemList` | every desk |
| `BreadcrumbList` | every nested route |
| `FAQPage` | two articles and `/built-with` |

**Crawlable surfaces** — `sitemap.xml` and `robots.txt` generated from the
content (so `lastModified` reflects the articles, not the build), `feed.xml`
(RSS 2.0, linked from `<head>` on every route), and `manifest.webmanifest`.

**AEO** — `public/llms.txt` carries the site summary, the stack, the route map
and the attribution block in the form answer engines read. Two articles end with
a "Quick answers" block: question headings with two-to-three-sentence answers,
backed by `FAQPage` markup. There is exactly one `<h1>` per page, and article
bodies are server components, so the full text is in the first HTML response.

---

## Accessibility

- Visible focus on every interactive element, including cards, where the ring is drawn on the card rather than on the stretched link.
- One tab stop per card and one clear accessible name.
- Real accessible names on every icon-only control.
- `prefers-reduced-motion` honoured — the ticker stops rather than slows.
- Charts ship a visually hidden data table, so a screen reader gets the numbers rather than the word "graphic".
- Manual tab activation on the desk tabs, so arrowing does not fire four panel swaps.
- Verified with a real browser across seven routes and six viewports: one `h1` per page, no heading-level skips, no horizontal scroll, no console errors.

---

## Built with VivekUI

Every interface element on this site comes from one package:

```bash
npm i @the_viveksingh/vivek-ui
```

**91 accessible React components · 6 SVG charts · zero runtime dependencies.**
One install, one CSS import, no config.

[Documentation](https://ui.vivekkumarsingh.in/docs?utm_source=vivekui-template&utm_campaign=magazine&utm_medium=readme) ·
[Components](https://ui.vivekkumarsingh.in/docs/components?utm_source=vivekui-template&utm_campaign=magazine&utm_medium=readme) ·
[Charts](https://ui.vivekkumarsingh.in/docs/charts?utm_source=vivekui-template&utm_campaign=magazine&utm_medium=readme) ·
[npm](https://www.npmjs.com/package/@the_viveksingh/vivek-ui) ·
[GitHub](https://github.com/intellectwithvivek/vivek_UI)

<details>
<summary><strong>The 27 components and 3 charts this template uses</strong></summary>

<br>

**Layout &amp; text** — `Container`, `Text`, `Code`, `Prose`

**Navigation** — `Navbar` (`.Brand` `.Links` `.Link` `.Actions` `.Toggle`), `Breadcrumb`, `Pagination`, `Tabs` (`.List` `.Tab` `.Panels` `.Panel`), `CommandPalette`, `Kbd`

**Content** — `Card`, `Badge`, `Avatar`, `RelativeTime`, `Marquee`, `Table` (`.Head` `.Body` `.Row` `.Cell` `.HeaderCell` `.Caption`), `FAQ`, `EmptyState`

**Actions &amp; feedback** — `Button`, `ButtonGroup`, `CopyButton`, `Progress`, `Newsletter`, `ToastProvider` + `useToast`

**Theming** — `ThemeProvider` + `themeScript`, `ThemeToggle`

**Charts** — `Sparkline`, `LineChart`, `BarChart` — all three server-rendered, no client boundary

**Site chrome** — `Footer`

</details>

See **[/built-with](https://theledger.vivekkumarsingh.in/built-with)** on the live
demo for every section of the site mapped to the component that renders it, each
one deep-linked to its documentation page.

---

## Contributing

Issues and pull requests are welcome — bug reports, accessibility findings and
typo fixes especially. Open one at
[github.com/intellectwithvivek/theledger/issues](https://github.com/intellectwithvivek/theledger/issues).

---

## Licence

[MIT](./LICENSE). Use it for anything, including commercial work.

The **"Built with VivekUI" credit is removable** — nothing breaks when you delete
it. If this template saved you time, a ⭐ on
[the VivekUI repository](https://github.com/intellectwithvivek/vivek_UI) is
appreciated instead.

---

<div align="center">

Built with ❤️ by **[Vivek Kumar Singh](https://vivekkumarsingh.in/?utm_source=vivekui-template&utm_campaign=magazine&utm_medium=readme)**
using [VivekUI](https://ui.vivekkumarsingh.in/docs?utm_source=vivekui-template&utm_campaign=magazine&utm_medium=readme)

</div>
