# Tech Stack

> Estado real a 2026-10-12 (cierre de Fase 9). Las decisiones que estaban
> "pendientes" se resolvieron durante la implementación; abajo queda lo que se
> usa de verdad y lo que sigue abierto.

## Core
| Herramienta | Versión | Uso |
|---|---|---|
| [Astro](https://astro.build) | 7.2.4 (pin) | Framework web, SSG estático |
| [pnpm](https://pnpm.io) | 11.10.0 (`packageManager`) | Package manager |
| Node.js | >= 20 (CI usa 22) | Runtime |
| TypeScript | 6.0.3 (pin) | Tipado; typecheck con `astro check` |

## Frontend
| Categoría | Opción | Estado |
|---|---|---|
| CSS | **Tailwind CSS 4** vía `@tailwindcss/vite`, más CSS propio por componente en `src/styles/` | Implementado |
| UI Icons | **SVG inline** + subset Nerd Fonts autohospedado (`nerd-symbols-subset.woff2`, 2 glifos) | Implementado |
| Fuentes | **Autohospedadas y subseteadas** (Mononoki, MesloLG) con `pyftsubset` | Implementado |
| Dark/Light | CSS custom properties + `prefers-color-scheme` + toggle con persistencia | Implementado |
| Animación | CSS + `IntersectionObserver` y `ClientRouter` (View Transitions de Astro) | Implementado |

## Contenido
| Tipo | Formato | Ruta |
|---|---|---|
| Posts (blog) | Markdown + frontmatter | `src/content/blog/{es,en}/` |
| Proyectos | Markdown + frontmatter | `src/content/projects/{es,en}/` |
| Páginas estáticas | Astro `.astro` | `src/pages/` (ES) y `src/pages/en/` |
| Bio de la home | JSON por idioma | `src/i18n/bio-{es,en}.json` |

Esquemas en `src/content.config.ts`; guía de frontmatter en el README.

## SEO & Performance
- `@astrojs/sitemap` — sitemap automático (la 404 excluida por `filter`)
- `@astrojs/rss` — feed por idioma (`/rss.xml`, `/en/rss.xml`)
- Meta tags OG/Twitter, canonical y `hreflang` por página (`BaseLayout.astro`)
- Imágenes optimizadas con `astro:assets` (`sharp`); los estáticos de contenido
  viven en `src/assets/` y se resuelven con `resolveImageUrl()` / `ContentImage`
- Hero con video diferido (`preload="none"` + `poster` WebP)
- Lighthouse objetivo 90+ en las 4 categorías: **100 desktop / 97 mobile** con
  `pnpm preview` (A11y/BP/SEO 100). Re-medición pendiente sobre la URL pública
- Partytown para scripts de terceros (GTM): **diferido** (decisión D1 de Fase 7)

## Internacionalización (i18n)
- Ruteo con `prefixDefaultLocale: false`: español en la raíz, inglés bajo `/en/`
  (se descartó `/es/...` para no romper URLs ya indexadas)
- Content collections separadas por idioma (`src/content/blog/es`, `.../en`)
- Diccionarios de UI en `src/i18n/ui.ts`; helpers en `utils.ts` y `content.ts`
- `hreflang` y `<html lang>` automáticos; en posts es condicional según qué
  versiones existan

## Despliegue
| Proveedor | Notas |
|---|---|
| **Hostinger** (elegido) | Plan existente del dueño con SFTP/SSH. Deploy automático desde GitHub Actions (`wlixcc/SFTP-Deploy-Action`) con clave SSH; solo `main` o `workflow_dispatch` |
| Cloudflare Pages (descartado) | Se descartó por añadir un proveedor nuevo cuando el hosting actual ya cubría la necesidad |

Dominio definitivo: `adalgarcia.com`. DNS y HTTPS los gestiona el dueño al
migrar. Detalle de secretos y flujo en el README → Deploy.

## Abierto (no bloquea el MVP)
1. **Testing** — sin suite: ni unit (Vitest) ni e2e (Playwright). La validación
   es `astro check` + build + navegador.
2. **CMS** — solo Markdown; WordPress headless no está contemplado.
3. **Analytics** — Plausible/Umami autohospedado está en Fase 10, junto con
   comentarios (Giscus/Webmentions), buscador interno, `/now` y modo print del CV.
4. **Redirecciones 301** del WordPress vivo a las rutas de Astro: fuera del
   alcance de la Fase 9; hay que revisar las URLs indexadas antes del cambio de DNS.
5. **Contraste tema claro** fuera de `/` y `/en/`: títulos de post, fechas y tags
   en `/blog`, `/trabajos` y tags siguen por debajo de 4.5:1.
