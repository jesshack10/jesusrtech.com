import type { CollectionEntry } from 'astro:content';

export function sortByDate(
  posts: CollectionEntry<'blog'>[]
): CollectionEntry<'blog'>[] {
  return posts
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export function readingTime(body: string): string {
  const wpm = 200;
  const words = body.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / wpm));
  return `${mins} min read`;
}
