---
title: Deploy on GitHub Pages, not Vercel
date: 2026-08-16
status: accepted
summary: Pages serves jesusrtech.com because attaching a custom domain on Vercel requires a paid plan.
tags:
  - infra
  - deployment
publish: false
---

## Context

The repo carried a Pages workflow and a `public/CNAME`, while the README claimed
Vercel. Two documented deploy paths for one domain is a trap — eventually one
silently wins and nobody knows which.

## Decision

==GitHub Pages== is the deploy target. `.github/workflows/deploy.yml` builds on
every push to `main` and publishes `dist/`.

## Consequences

> [!warning] Keep `public/CNAME`
> Deleting it detaches the custom domain on the next deploy.

- The site must stay fully static. No SSR, no server routes.
- No PR previews. CI only runs on `main`, so a broken build is found after merge.

## Related

- [[0002-content-lives-in-obsidian]]
