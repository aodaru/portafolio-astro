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

### Minificación del CSS y prefijos de vendor
Vite minifica el CSS con **Lightning CSS** y toma los targets de
`vite.build.cssTarget` en `astro.config.ts` (`chrome111`, `firefox128`,
`safari16.4`, los mismos que usa Tailwind v4). Sin targets, Lightning CSS no sabe
qué navegadores siguen necesitando el prefijo y **colapsa las parejas
`propiedad` + `-webkit-propiedad` a una sola declaración**. Por eso:

- los prefijos **no se escriben a mano** en el CSS fuente (`backdrop-filter` va
  sin `-webkit-`): los añade el minificador según los targets;
- si se escribe el prefijo en el fuente, el build puede dejar solo el `-webkit-`
  y el efecto desaparece en Chrome/Firefox.

### Contraste
Los acentos de GruvBox son para bordes, iconos y fondos; como texto sobre el
fondo claro varios no llegan a 4.5:1. Donde el acento es **texto** se usa su
token `*-ink` (en `src/styles/global.css`, por tema): `--gruvbox-yellow-ink`,
`gray-ink`, `blue-ink`, `green-ink`, `orange-ink`, `red-ink`. Los colores base y
los bordes no cambian.

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
- `@astrojs/rss` — feed **por idioma** (`/rss.xml` solo ES, `/en/rss.xml` solo EN)
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
  versiones existan. El emparejamiento ES/EN se hace por **`translationKey`**
  (no por slug: `primer-post` ↔ `first-post`), con el slug como respaldo. Las
  fechas se formatean siempre en **UTC** (`formatDate` en `utils.ts`): las del
  frontmatter son medianoche UTC y sin fijar la zona se renderizaban un día antes.

## Despliegue
| Proveedor | Notas |
|---|---|
| **Hostinger** (elegido) | Plan existente del dueño con SFTP/SSH. Deploy automático desde GitHub Actions (`wlixcc/SFTP-Deploy-Action`) con clave SSH; solo `main` o `workflow_dispatch`. **En producción desde 2026-10-13** |
| Cloudflare Pages (descartado) | Se descartó por añadir un proveedor nuevo cuando el hosting actual ya cubría la necesidad |

Producción: `https://adalgarcia.com` (ES) y `/en/` (EN), servido desde la raíz de
`domains/adalgarcia.com/public_html/` en `127.0.0.1:<SFTP_PORT>`. La clave de deploy
es **RSA en PEM** (el action usa libcrypto y rechaza el formato OpenSSH de
ed25519). Detalle de secretos, formato de clave y secuencia DNS en el README →
Deploy.

## Abierto (no bloquea el MVP)
1. **Testing** — sin suite: ni unit (Vitest) ni e2e (Playwright). La validación
   es `astro check` + build + navegador.
2. **CMS** — solo Markdown; WordPress headless no está contemplado.
3. **Analytics** — Plausible/Umami autohospedado está en Fase 10, junto con
   comentarios (Giscus/Webmentions), buscador interno, `/now` y modo print del CV.
4. **Redirecciones 301** del WordPress anterior: **bloqueadas**. Las reglas van
   versionadas en `public/.htaccess` (nunca a mano en hPanel, se pierden en el
   próximo deploy), pero falta el inventario de URLs indexadas, que solo tiene el
   dueño (Search Console o backup de la base). No se inventan reglas.
5. **Limpieza de hosting** que no se hace desde el repo: `default.php` de
   Hostinger bajo `index.html` (inofensivo, borrable a mano) y la clave ed25519
   antigua que sigue en `authorized_keys` junto a la RSA en uso.
