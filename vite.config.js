import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'out',
    rollupOptions: {
      input: [
        'index.html',
        'pre-audit-vs-audit-rgaa.html',
        'accessibilite.html',
        'plan-du-site.html',
        'mentions-legales.html',
        'confidentialite.html',
        '404.html',
      ].map(
        (page) => fileURLToPath(new URL(page, import.meta.url)),
      ),
    },
  },
});
