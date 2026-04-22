import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

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
  }),
});

export const collections = { blog, projects };
