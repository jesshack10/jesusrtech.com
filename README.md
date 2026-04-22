# jesusrtech.com

Personal portfolio and professional brand hub — built with Astro and Tailwind CSS.

## Stack

- **[Astro v6](https://astro.build)** — static site generator, zero JS by default
- **[Tailwind CSS v4](https://tailwindcss.com)** — utility-first styling via Vite plugin
- **MDX** — blog posts and project pages as markdown files
- **Vercel** — deployment with automatic CI/CD on git push

## Pages

| Route | Description |
|---|---|
| `/` | Hero, tagline, featured projects |
| `/cv` | Full resume driven by `src/data/cv.json` |
| `/projects` | Project grid + individual detail pages |
| `/blog` | Post list + individual blog post pages |
| `/contact` | Social links and email |
| `/uses` | Tools and gear driven by `src/data/uses.json` |

## Getting started

```bash
pnpm install
pnpm dev
```

The dev server starts at `http://localhost:4321`.

## Content

### Adding a blog post

Create a new `.mdx` file in `src/content/blog/`:

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

### Adding a project

Create a new `.mdx` file in `src/content/projects/`:

```mdx
---
title: "Project Name"
description: "One-liner shown on the project card."
pubDate: 2026-04-22
status: active
tags: ["typescript", "react"]
repoUrl: "https://github.com/jesshack10/project"
liveUrl: "https://project.com"
featured: true
order: 1
---

Full project write-up here.
```

### Updating the CV

Edit `src/data/cv.json` — all sections (experience, education, skills, certifications) live there. No component changes needed.

### Updating the Uses page

Edit `src/data/uses.json` — add or remove items per category.

## Build & deploy

```bash
pnpm build      # builds to dist/
pnpm preview    # previews the production build locally
```

Deployed via Vercel. Every push to `main` triggers an automatic deploy. Pull requests get a preview URL.

## Project structure

```
src/
├── content/
│   ├── blog/        ← blog posts (.mdx)
│   └── projects/    ← project pages (.mdx)
├── data/
│   ├── cv.json      ← resume data
│   └── uses.json    ← tools/gear data
├── pages/           ← routes
├── layouts/         ← BaseLayout, PageLayout, ProseLayout
├── components/      ← nav, ui, home, blog, projects, cv, contact
├── styles/
│   └── global.css   ← Tailwind + CSS custom properties (theme tokens)
└── utils/           ← formatDate, sortPosts, readingTime
```

## Design tokens

Colors are defined as CSS custom properties in `src/styles/global.css` with separate values for light and dark mode. Tailwind maps them via `@theme` so you can use `text-green`, `bg-surface`, `border-border`, etc. throughout components.

Dark mode is toggled by adding/removing the `.dark` class on `<html>` — no flash on load because the theme script runs inline before first paint.
