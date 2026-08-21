import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkObsidian from './src/plugins/remark-obsidian.mjs';

export default defineConfig({
  site: 'https://jesusrtech.com',
  server: {
    port: parseInt(process.env.PORT || '4321'),
  },
  markdown: {
    // Notes are authored in Obsidian, so the build has to speak its dialect.
    // mdx() inherits this config by default, so .mdx gets it too.
    remarkPlugins: [remarkObsidian],
  },
  integrations: [
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
