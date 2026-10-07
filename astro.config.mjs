import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://brandonarmand.com',
  compressHTML: false,
  prefetch: false,
  devToolbar: { enabled: false },
});
