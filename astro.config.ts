import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://adalgarcia.com',
  integrations: [
    // La 404 no debe entrar al sitemap: `/en/404/` se genera como ruta real.
    sitemap({
      filter: (page) => !/\/(en\/)?404\/?$/.test(page),
    }),
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'gruvbox-light-medium',
        dark: 'gruvbox-dark-medium',
      },
      defaultColor: false,
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
