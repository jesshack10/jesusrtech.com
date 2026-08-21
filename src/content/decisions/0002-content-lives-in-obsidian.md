---
title: Content lives in an Obsidian vault
date: 2026-08-16
status: accepted
summary: The repo is an Obsidian vault; notes are the source of truth and the site is only a renderer.
tags:
  - content
  - workflow
publish: false
---

## Context

Editing articles meant opening GitHub and hand-writing frontmatter, where a
typo in `pubDate` fails the build. CV data lived in JSON, which is hostile to
write prose in.

## Decision

The repository root ==is== the Obsidian vault. CV entries, articles, projects,
decisions, and events are all notes. The build reads them directly.

## Consequences

- No database, ever. Notes in git are the database.
- A `remark` plugin teaches Astro the Obsidian dialect: wikilinks, embeds,
  `==highlights==`, and callouts like this one.
- Private notes need a gate — hence `publish: false` by default on this
  collection and on events.

> [!note] Why not a hosted CMS
> A CMS would have solved the editing problem alone. The vault also solves
> keeping private context next to the published output.

## Related

- [[0001-deploy-on-github-pages]]
