import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.heartwoodchatt.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: {
    build: { cssMinify: false },
    server: { allowedHosts: ['.trycloudflare.com'] },
    preview: { allowedHosts: ['.trycloudflare.com'] },
  },
});
