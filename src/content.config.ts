import { z, defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';

/**
 * Every collection here is a folder of Obsidian notes. Frontmatter keys are
 * chosen to be pleasant in Obsidian's Properties panel: flat where possible,
 * dates as plain YYYY-MM-DD, tags as a list.
 *
 * `publish` is the gate. It defaults to false on the private collections, so
 * a half-finished thought in the vault can never appear on the site by
 * accident — publishing is always a deliberate act.
 */

/** Obsidian writes .md; .mdx stays available for notes that need components. */
const NOTES = '**/*.{md,mdx}';

/** Ignore Obsidian's own furniture and anything parked as private. */
const ignore = ['**/_*/**', '**/.obsidian/**', '**/*.excalidraw.md'];

const blog = defineCollection({
  loader: glob({ pattern: NOTES, base: './src/content/blog', ignore }),
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
  loader: glob({ pattern: NOTES, base: './src/content/projects', ignore }),
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

    role:         z.string().optional(),
    client:       z.string().optional(),
    confidential: z.boolean().default(false),
    year:         z.coerce.string().optional(),
    outcome:      z.string().optional(),
    metrics: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .max(3)
      .default([]),
  }),
});

/**
 * CV entries: one note per role, degree, or certification. The note body is
 * free-form — write as much as you like in Obsidian; only `highlights` is
 * rendered on the public CV, so the body doubles as private working notes.
 */
const cv = defineCollection({
  loader: glob({ pattern: NOTES, base: './src/content/cv', ignore }),
  schema: z.object({
    kind:   z.enum(['experience', 'education', 'certification']),
    title:  z.string(),
    /** Company, school, or issuing body. */
    org:    z.string(),
    orgUrl: z.string().url().optional(),
    location: z.string().optional(),
    /** YYYY-MM or YYYY. Sorting is by `start`, newest first.
        Coerced, because YAML reads a bare `2024` as a number and nobody
        should have to remember to quote a year in Obsidian. */
    start:  z.coerce.string(),
    /** Omit while the role is current. */
    end:    z.coerce.string().optional(),
    /** Bullets shown on the public CV. Keep them outcome-shaped. */
    highlights: z.array(z.string()).default([]),
    tags:    z.array(z.string()).default([]),
    publish: z.boolean().default(true),
  }),
});

/**
 * Decision log — why the repo or the business is the way it is. Private by
 * default: these are working notes, and only the ones you deliberately mark
 * `publish: true` are rendered at /decisions.
 */
const decisions = defineCollection({
  loader: glob({ pattern: NOTES, base: './src/content/decisions', ignore }),
  schema: z.object({
    title:   z.string(),
    date:    z.coerce.date(),
    status:  z.enum(['proposed', 'accepted', 'superseded', 'rejected']).default('accepted'),
    /** One line: what was decided. The body holds the reasoning. */
    summary: z.string(),
    tags:    z.array(z.string()).default([]),
    publish: z.boolean().default(false),
  }),
});

/**
 * Events worth remembering — a launch, a talk accepted, a contract signed.
 * Private by default, same reasoning as decisions.
 */
const events = defineCollection({
  loader: glob({ pattern: NOTES, base: './src/content/events', ignore }),
  schema: z.object({
    title:   z.string(),
    date:    z.coerce.date(),
    kind:    z.enum(['milestone', 'talk', 'launch', 'client', 'personal', 'other']).default('other'),
    summary: z.string().optional(),
    tags:    z.array(z.string()).default([]),
    publish: z.boolean().default(false),
  }),
});

const videos = defineCollection({
  loader: file('./src/data/videos.json'),
  schema: z.object({
    id:          z.string(),
    title:       z.string(),
    description: z.string(),
    url:         z.string().url(),
    platform:    z.enum(['youtube', 'twitch', 'conference', 'other']).default('youtube'),
    thumbnail:   z.string().optional(),
    publishedAt: z.coerce.date(),
    duration:    z.string().optional(),
    tags:        z.array(z.string()).default([]),
    featured:    z.boolean().default(false),
  }),
});

export const collections = { blog, projects, cv, decisions, events, videos };
