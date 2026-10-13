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
    build: {
      // Vite minifica el CSS con Lightning CSS y toma los targets de aquí.
      // Sin targets, Lightning CSS no sabe qué navegadores necesitan el
      // prefijo `-webkit-` y colapsa las parejas `backdrop-filter` +
      // `-webkit-backdrop-filter` a una sola declaración. Son los mismos
      // targets que usa Tailwind v4 (Safari 16.4 y iOS 16.4 aún piden el
      // prefijo; Chrome 111 y Firefox 128 no).
      cssTarget: ['chrome111', 'firefox128', 'safari16.4'],
    },
  },
})
