import { z, defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    pubDate:     z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage:   z.string().optional(),
    tags:        z.array(z.string()).default([]),
    draft:       z.boolean().default(false),
    featured:    z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    pubDate:     z.coerce.date(),
    status:      z.enum(['active', 'completed', 'archived']).default('completed'),
    tags:        z.array(z.string()).default([]),
    heroImage:   z.string().optional(),
    repoUrl:     z.string().url().optional(),
    liveUrl:     z.string().url().optional(),
    featured:    z.boolean().default(false),
    order:       z.number().optional(),

    /* ── Case-study fields ──────────────────────────────────
       A client scanning the page reads `outcome` and `metrics`
       and nothing else. Treat them as the headline, not extras. */

    /** What you were on the engagement, e.g. "Lead engineer". */
    role:    z.string().optional(),
    /** Client or employer. Use `confidential: true` instead of a
        fake name when you can't say. */
    client:  z.string().optional(),
    /** Renders the client as "Confidential client" and hides links. */
    confidential: z.boolean().default(false),
    /** Display year or range, e.g. "2025" or "2024–2025". */
    year:    z.string().optional(),
    /** One sentence naming the result. Lead with the number. */
    outcome: z.string().optional(),
    /** Up to three headline figures shown large on the card. */
    metrics: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
      .max(3)
      .default([]),
  }),
});

const videos = defineCollection({
  loader: file('./src/data/videos.json'),
  schema: z.object({
    id:          z.string(),
    title:       z.string(),
    description: z.string(),
    /** Full watch URL. YouTube thumbnails are derived from it. */
    url:         z.string().url(),
    platform:    z.enum(['youtube', 'twitch', 'conference', 'other']).default('youtube'),
    /** Override only when the derived YouTube thumbnail is wrong or
        the platform isn't YouTube. */
    thumbnail:   z.string().optional(),
    publishedAt: z.coerce.date(),
    /** Display string, e.g. "12:04". Purely cosmetic. */
    duration:    z.string().optional(),
    tags:        z.array(z.string()).default([]),
    featured:    z.boolean().default(false),
  }),
});

export const collections = { blog, projects, videos };
