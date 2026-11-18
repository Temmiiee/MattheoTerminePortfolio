import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [{
    name: 'shared-navigation',
    transformIndexHtml(html, { filename }) {
      const page = basename(filename, '.html');
      const route = page === 'index' ? '/' : `/${page}`;
      return html.replace(/<!-- site-(header|footer) -->/g, (_, part) => {
        const markup = readFileSync(new URL(`src/${part}.html`, import.meta.url), 'utf8');
        return markup.trimEnd().replaceAll(`href="${route}"`, `href="${route}" aria-current="page"`);
      });
    },
  }],
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
