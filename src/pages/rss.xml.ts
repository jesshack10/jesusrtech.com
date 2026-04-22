import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { sortByDate } from '../utils/sortPosts';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = sortByDate(await getCollection('blog'));
  return rss({
    title: 'jesusrtech — Blog',
    description: 'Articles on software engineering, tooling, and things I find worth writing about.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
  });
}
