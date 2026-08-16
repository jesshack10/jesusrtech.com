# jesusrtech.com

Personal portfolio and professional brand hub — built with Astro and Tailwind CSS.

The site is aimed at **prospective clients**: someone who lands here should be able
to tell what I do, see proof that I've done it, and book a call — without scrolling
twice.

## Stack

- **[Astro v6](https://astro.build)** — static site generator, near-zero JS
- **[Tailwind CSS v4](https://tailwindcss.com)** — CSS-first config via the Vite plugin
- **MDX** — blog posts and project case studies as markdown files
- **JSON** — identity, services, and videos as plain data files
- **GitHub Pages** — deployed automatically on every push to `main`

## Pages

| Route | Description |
|---|---|
| `/` | Hero, services, featured case studies, videos, contact CTA |
| `/projects` | Case-study grid + individual project pages |
| `/videos` | Talks, walkthroughs, and streams |
| `/blog` | Post list + individual post pages |
| `/cv` | Full resume driven by `src/data/cv.json` |
| `/contact` | Booking link, social presence, email |
| `/uses` | Tools and gear driven by `src/data/uses.json` |

## Getting started

```bash
pnpm install
pnpm dev
```

The dev server starts at `http://localhost:4321`.

## Content

### Who you are — `src/data/site.json`

The single source of truth for name, role, positioning line, location, socials,
availability, and the booking URL. **Every field marked `TODO` is a placeholder and
must be replaced before launch.**

Two fields behave conditionally, so the site never ships a dead control:

- `booking.url` — empty means the primary CTA falls back to an email link
- `cvPdf` — empty means the CV download button is not rendered at all

A social entry whose `url` still says `TODO` is filtered out of every list.

### Services — `src/data/services.json`

The consulting offers on the home page. Keep 3–4. `deliverables` should be concrete
things a client receives, not activities.

### Videos — `src/data/videos.json`

A flat JSON array, schema-validated at build time. YouTube thumbnails are derived
from the watch URL, so omit `thumbnail` for YouTube content:

```json
{
  "id": "unique-slug",
  "title": "How I cut our build time in half",
  "description": "One or two sentences on what a viewer gets out of this.",
  "url": "https://www.youtube.com/watch?v=VIDEO_ID",
  "platform": "youtube",
  "publishedAt": "2026-02-01",
  "duration": "12:04",
  "tags": ["performance"],
  "featured": true
}
```

Set `platform` to `conference`, `twitch`, or `other` for anything else — those need
their own `thumbnail` path. The Videos section hides itself when the array is empty.

### Adding a project case study

Create a `.mdx` file in `src/content/projects/`. The card leads with `outcome` and
`metrics`, so put the result there — the body explains how you got it:

```mdx
---
title: "Checkout rewrite"
description: "One-liner shown in listings and search results."
pubDate: 2026-04-22
status: completed
role: "Lead engineer"
client: "Acme Corp"        # or omit and set `confidential: true`
year: "2025"
outcome: "Cut checkout latency from 2.1s to 340ms, lifting completion 12%."
metrics:
  - label: "p95 latency"
    value: "-84%"
  - label: "Completion"
    value: "+12%"
tags: ["typescript", "postgres"]
repoUrl: "https://github.com/jesshack10/project"
liveUrl: "https://project.com"
featured: true
order: 1
---

Full write-up here.
```

Setting `confidential: true` renders the client as "Confidential client" and hides
the repo and live links.

### Adding a blog post

Create a `.mdx` file in `src/content/blog/`:

```mdx
---
title: "My Post Title"
description: "One-sentence summary shown in the post list."
pubDate: 2026-04-22
tags: ["tag1", "tag2"]
featured: false
---

Your post content here.
```

## Design

The visual language is **engineering blueprint**: Swiss layout, generous whitespace,
hairline rules, and monospace reserved for metadata — never for body copy. Geeky
through precision rather than costume.

Tokens live as CSS custom properties in `src/styles/global.css`, mapped into Tailwind
via `@theme`. Use `text-accent`, `bg-surface`, `border-line`, and friends; never
hardcode a hex value in a component.

| Token | Role |
|---|---|
| `--accent` | Signal amber. The only warm colour on the page — reserve it for actions and emphasis |
| `--line` | Hairlines and the drafting grid; quieter than `--border` |
| `--border` | Card and panel edges |

Helper classes: `.bp-grid` (drafting grid), `.bp-grid-fade` (edge mask),
`.bp-label` (monospace annotation), `.bp-ticks` (registration marks on hover).

Theme follows the operating system and leans dark: an explicit OS preference always
wins, and a device reporting no preference gets dark. The toggle persists a choice
to `localStorage`.

### Motion

Elements marked `data-reveal` fade up once on scroll, staggered with
`--reveal-delay`. Page-to-page navigation uses native CSS view transitions, so it
costs no JavaScript. Everything is disabled under `prefers-reduced-motion`, and the
`.no-js` fallback guarantees content is visible without JavaScript.

## Build & deploy

```bash
pnpm build      # builds to dist/
pnpm preview    # previews the production build locally
```

**Deployed on GitHub Pages.** Every push to `main` triggers
`.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to
Pages. The custom domain is held by `public/CNAME` — keep that file, or the domain
detaches on the next deploy.

Not Vercel: attaching a custom domain there requires a paid plan. Earlier
documentation claiming Vercel was wrong.

## Project structure

```
src/
├── content/
│   ├── blog/        ← blog posts (.mdx)
│   └── projects/    ← project case studies (.mdx)
├── data/
│   ├── site.json    ← identity, socials, booking, availability
│   ├── services.json← consulting offers
│   ├── videos.json  ← video list (schema-validated)
│   ├── cv.json      ← resume data
│   └── uses.json    ← tools/gear data
├── pages/           ← routes
├── layouts/         ← BaseLayout, PageLayout, ProseLayout
├── components/      ← nav, ui, home, blog, projects, videos, cv, contact
├── styles/
│   └── global.css   ← tokens, blueprint utilities, motion
└── utils/           ← formatDate, sortPosts, video, cta
```
