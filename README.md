# jesusrtech.com

Personal portfolio and professional brand hub — built with Astro and Tailwind CSS.

The site is aimed at **prospective clients**: someone who lands here should be able
to tell what I do, see proof that I've done it, and book a call — without scrolling
twice.

## Stack

- **[Astro v6](https://astro.build)** — static site generator, near-zero JS
- **[Tailwind CSS v4](https://tailwindcss.com)** — CSS-first config via the Vite plugin
- **Obsidian** — the repo is a vault; notes are the source of truth
- **Markdown / MDX** — articles, case studies, CV entries, decisions
- **JSON** — identity, services, and videos as plain data files
- **GitHub Pages** — deployed automatically on every push to `main`

## Pages

| Route | Description |
|---|---|
| `/` | Hero, services, featured case studies, videos, contact CTA |
| `/projects` | Case-study grid + individual project pages |
| `/videos` | Talks, walkthroughs, and streams |
| `/blog` | Post list + individual post pages |
| `/cv` | Resume, built from the notes in `src/content/cv/` |
| `/contact` | Booking link, social presence, email |
| `/uses` | Tools and gear driven by `src/data/uses.json` |
| `/decisions` | Decision log — only notes marked `publish: true` |

## Getting started

```bash
pnpm install
pnpm dev
```

The dev server starts at `http://localhost:4321`.


## The vault

**This repository is an Obsidian vault.** Open the repo folder in Obsidian and
everything — CV entries, articles, project case studies, decisions, events —
is a note you can edit, link, and search. The site is only a renderer; the
notes are the source of truth. There is no database and never needs to be.

```
open Obsidian → edit a note → commit → push → live in ~60s
```

### What lives where

| Folder | Collection | Public? |
|---|---|---|
| `src/content/blog/` | Articles | Yes, unless `draft: true` |
| `src/content/projects/` | Case studies | Yes |
| `src/content/cv/` | One note per role, degree, certification | Frontmatter only |
| `src/content/decisions/` | Why things are the way they are | **Only if `publish: true`** |
| `src/content/events/` | Milestones worth remembering | Private (no page yet) |
| `public/attachments/` | Images you paste into notes | Served at `/attachments/…` |
| `_templates/` | Obsidian note templates | Never published |

`decisions` and `events` default to `publish: false`, so a half-finished
thought can never leak onto the site. Publishing is always deliberate.

### CV notes are half-public by design

Only a CV note's **frontmatter** is rendered — `title`, `org`, dates, and
`highlights`. The body below is yours: context, evidence, links, interview
prep. Write freely there; none of it is published.

### Obsidian syntax that works on the site

A `remark` plugin (`src/plugins/remark-obsidian.mjs`) teaches the build
Obsidian's dialect, so notes render correctly without being rewritten:

| You write | You get |
|---|---|
| `[[Note]]`, `[[Note\|Alias]]` | A link to that note's page |
| `[[Note#Heading]]` | A link to that heading |
| `![[diagram.png]]` | The image, from `public/attachments/` |
| `==important==` | A highlight |
| `> [!warning] Title` | A callout box |

> [!note] Links to unpublished notes are safe
> If a wikilink points at a draft, an unpublished decision, or a note with no
> page at all, the words render as plain text instead of a link. A private
> note can never become a 404 for a visitor.

### Setting it up

1. Obsidian → **Open folder as vault** → choose this repository.
2. The committed `.obsidian/` config already sets attachments to
   `public/attachments/`, points templates at `_templates/`, and hides
   `node_modules/`, `dist/`, and the source folders from the file explorer.
3. Install the **Obsidian Git** community plugin to commit and push without
   leaving the app. Per-machine UI state (`workspace.json`, installed plugins)
   is gitignored, so two machines will not fight.

### Two traps worth knowing

> [!warning] YAML eats colons
> A bullet like `- Cut latency: 2.1s to 340ms` parses as a **map**, not a
> string, and fails the build. Quote any value containing `: ` —
> `- "Cut latency: 2.1s to 340ms"`. Years are safe: `start: 2024` is coerced
> from a number automatically.

> [!warning] Editing the plugin does not invalidate rendered notes
> Astro caches rendered content in `node_modules/.astro/data-store.json`,
> keyed on the note. If you change `remark-obsidian.mjs` and output looks
> stale, clear it:
> ```bash
> rm -rf .astro dist node_modules/.astro && pnpm build
> ```

### Writing without Obsidian

Everything is plain Markdown, so the GitHub web editor still works in a pinch.
Nothing about the vault locks you in.

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

Create a note in `src/content/projects/` (the `Project` template sets this up).
The card leads with `outcome` and `metrics`, so put the result there — the body
explains how you got it:

```md
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

Create a `.md` file in `src/content/blog/` — or press **Ctrl/Cmd + N** in Obsidian
and apply the `Article` template. Prefer `.md` over `.mdx` for prose; MDX exists
for notes that genuinely need components, and its JSX confuses editors.

```md
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
├── content/         ← the Obsidian vault
│   ├── blog/        ← articles
│   ├── projects/    ← case studies
│   ├── cv/          ← one note per role / degree / certification
│   ├── decisions/   ← decision log (private by default)
│   └── events/      ← milestones (private by default)
├── data/
│   ├── site.json    ← identity, socials, booking, availability, skills
│   ├── services.json← consulting offers
│   ├── videos.json  ← video list (schema-validated)
│   └── uses.json    ← tools/gear data
├── pages/           ← routes
├── layouts/         ← BaseLayout, PageLayout, ProseLayout
├── components/      ← nav, ui, home, blog, projects, videos, cv, contact
├── plugins/
│   └── remark-obsidian.mjs  ← wikilinks, embeds, highlights, callouts
├── styles/
│   └── global.css   ← tokens, blueprint utilities, motion
└── utils/           ← formatDate, sortPosts, video, cta
```
