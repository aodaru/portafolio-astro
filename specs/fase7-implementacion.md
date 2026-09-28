# Log de implementación — Fase 7: SEO + Performance (Grupos 2-5)

Rama: `feat/seo-performance` · Fecha: 2026-09-28 · Agente: implementer

## Grupo 2 — Meta tags dinámicos bilingües ✅

- `src/layouts/BaseLayout.astro`: nuevas props `image?`, `type?` (`website`|`article`), `publishedDate?`.
  - OG: `og:title/description/image/url/type/locale` + `og:locale:alternate` (`es_ES`↔`en_US` según `lang`).
  - Twitter `summary_large_image` (title/description/image).
  - `<link rel="canonical">` = URL actual (ES raíz, EN `/en/...`; coherente con `prefixDefaultLocale: false`, D3).
  - `article:published_time` cuando `type="article"` + fecha.
  - `og:image` por defecto `/img/Avatar.webp` (D4); en detalle usa `image` del frontmatter resuelta a absoluta vía `src/utils/images.ts`.
- Detalle blog/trabajos ES+EN (`src/pages/blog/[...slug].astro`, `src/pages/trabajos/[...slug].astro`,
  `src/pages/en/blog/[...slug].astro`, `src/pages/en/trabajos/[...slug].astro`):
  pasan `image`, `type="article"`, `publishedDate` y renderizan `<ContentImage>`.

## Grupo 3 — RSS bilingüe ✅

- `src/pages/rss.xml.ts`: filtra `lang: es`, links `/blog/<slug>/` (antes `/blog/es/<slug>` rotos).
- `src/pages/en/rss.xml.ts` (nuevo): filtra `lang: en`, links `/en/blog/<slug>/`.
- Autodiscovery en `<head>` por idioma (`/rss.xml` ES, `/en/rss.xml` EN) desde `BaseLayout`.
- `README.md`: nueva sección "Imágenes de contenido e feeds RSS".

Verificado en `dist/`: ES 4 items links 200 OK (`/blog/omarchy/` etc.), EN 1 item (`/en/blog/first-post/`).

## Grupo 4 — Imágenes ✅ parcial (bloqueador `sharp` documentado)

- Movidos a `src/assets/` (vía `git mv`): `posts/docker.jpg`, `posts/omarchy.png`, `posts/primer-post.jpg`,
  `works/Intranet1_1.png`, `works/WebPage_8.png`. GIFs (`terminal.gif`, `portafolio.gif`) quedan en
  `public/img/` para conservar animación; `Avatar.webp` queda en `public/` como OG por defecto (D5).
- Nuevo `src/utils/images.ts`: mapa ruta-histórica→asset importado (Vite emite `/_astro/<hash>`,
  expone `width/height` para CLS), `resolveOgImagePath()`; `src/env.d.ts` (`astro/client`) para tipos.
- Nuevo `src/components/ContentImage.astro`: `<img>` lazy + dimensiones explícitas; fallback `<img>` clásico para GIF.
- Hero video (ES+EN `index.astro`): `poster="/img/Avatar.webp"` (12 KB) + `preload="metadata"` +
  script que pausa/quita autoplay con `prefers-reduced-motion: reduce`.
- Limpieza `public/img/`: 19M → 1.4M (eliminados `TazaCafeASCIIOld.mp4` 6.8M, `Tazacafeascii.mp4`,
  `TazaCafeASCII.webm`/`taza-cafe.webm` duplicados idénticos md5, `terminal-mov.webm`,
  `TazaCafeASCII.gif`, `termianl.gif`, `Works/TazacafeasciiBlender_11.mp4` — ninguno referenciado en `src/`).
- Verificado: 0 referencias rotas en `dist/` (12 assets `/img|/_astro|/fonts` chequeados, ninguna missing);
  `dist/_astro/` contiene los hash de contenido; sitemap 37 URLs (25 ES + 12 EN); `robots.txt` OK.

> ⛔ **Bloqueador**: `<Image>` con WebP + `widths` requiere `sharp`, no instalado y vetado como nueva
> dependencia npm en esta fase (D1/exclusiones). Se intentó usarlo → build falla (`MissingSharp`).
> Revertido a `<img>` con asset hasheado + dimensiones (cache-busting y CLS, sin re-encode).
> **Pendiente**: `pnpm add sharp` (decisión del revisor) y migrar `ContentImage` a `<Image format="webp" widths>`
> + `getImage()` para `og:image`.

## Grupo 5 — Performance ⚠️ parcial

- **NerdFonts CDN eliminado**: subset auto-hospedado `public/fonts/nerd-symbols-subset.woff2` (1008 bytes,
  solo U+F0D9E tea + U+F09B github, generado con `pyftsubset` + `brotli` del entorno mise —tooling del
  sistema, no dependencia npm—). `@font-face` + clases `.nf*` en `src/styles/global.css` (escapes `\f0d9e`/`\f09b`);
  fuera de `BaseLayout` todo rastro del CDN. `dist/` sin refs a `nerdfonts.com` (solo name-table interna de la fuente).
  Ahorro: ~82 KB CSS + woff2 completo 1.2 MB + conexión TLS a tercero.
- TTF→WOFF2 de Mononoki/MesloLG (5 MB) **no posible**: `pyftsubset` de este entorno emite 1 glifo sin cmap
  con esas fuentes (verificado) y se descartó para no corromper. **Pendiente** (requiere `woff2_compress` u otra toolchain).
- A11y Navbar (sin cambio visual): `aria-label` en link home (solo icono) + quitado `aria-label="GitHub"`
  discordante (el nombre accesible sale del texto visible "Repo"); `aria-hidden` en el icono.
- `pnpm astro check`: 0 errores. `pnpm build`: limpio, 37 páginas.

### Scores Lighthouse (lighthouse@12.8.0 dlx, Chromium headless local, `pnpm preview`)

| Página | Perf Desk | Perf Mob | A11y | BP | SEO |
|---|---|---|---|---|---|
| `/` (antes) | 60 | 55 | 90 | 100 | 100 |
| `/` (final) | 60 | 55 | **95** | 100 | 100 |
| `/en/` | 60 | 55 | 90* | 100 | 100 |
| `/blog/docker/` | 80 | — | 91 | 100 | 100 |

\* `/en/` no re-medido tras el fix Navbar (mismo componente; se espera 95).

**Por qué Performance no llega a 90 aquí**: TBT 0 ms, CLS ~0, DOM 136 nodos, CSS 34 KB, JS ~0 —
los fundamentos están bien; el FCP/LCP de laboratorio (4.1 s desktop / 25 s mobile simulado con servidor
local respondiendo en <1 ms) es artefacto del entorno (Chromium headless sin GPU, CPU throttled).
Quedan como palancas reales (fuera de alcance o pendientes): hero video autoplay 246 KB (decisión Fase 5B),
fuentes TTF 5 MB (pendiente WOFF2), y re-medir en entorno representativo (deploy preview).
El contraste insuficiente del CTA hero se deja intacto (cambiarlo sería cambio visual).

## Archivos tocados

Modificados: `src/layouts/BaseLayout.astro`, `src/components/Navbar.astro`,
`src/styles/global.css`, `src/pages/index.astro`, `src/pages/en/index.astro`,
`src/pages/blog/[...slug].astro`, `src/pages/trabajos/[...slug].astro`,
`src/pages/en/blog/[...slug].astro`, `src/pages/en/trabajos/[...slug].astro`,
`src/pages/rss.xml.ts`, `README.md`.
Creados: `src/utils/images.ts`, `src/components/ContentImage.astro`, `src/env.d.ts`,
`src/pages/en/rss.xml.ts`, `public/fonts/nerd-symbols-subset.woff2`,
`src/assets/posts/{docker.jpg,omarchy.png,primer-post.jpg}`, `src/assets/works/{Intranet1_1.png,WebPage_8.png}`.
Eliminados: 8 medios no referenciados en `public/img/` (~17.6 MB), 5 imágenes migradas a `src/assets/`.

## Pendientes para el revisor

1. Decidir `pnpm add sharp` → migrar `ContentImage` a `<Image>` WebP + `widths` (criterio validation 3).
2. Conversión WOFF2 de Mononoki/MesloLG (otra toolchain) o aceptar TTF + `display=swap`.
3. Re-medir Lighthouse en deploy preview para el 90+ real de Performance.
4. Grupo 6/7 (validación final, roadmap, commit, PR) — no incluidos en este encargo.

---

# Ronda 2 — Fixes del revisor (2026-09-28, veredicto RECHAZADO → F1/F2/F3 + N1/N2)

Decisiones humanas aplicadas sin preguntar (enmienda F1 ya reflejada en
`requirements.md:18-20` y `validation.md:83` por la sesión anterior).

## F1. `sharp` como dependencia de build ✅ (código ya migrado, verificado en build)

- `package.json`: `sharp 0.35.5` exacto en `devDependencies` (sin `^`, per `AGENTS.md`).
- `src/components/ContentImage.astro`: `<Image format="webp" widths={[480,800,1200]} sizes=...>` + lazy.
- `src/utils/images.ts`: `resolveOgImagePath()` vía `getImage({format:'webp', width:1200})`;
  `BaseLayout.astro:27` lo espera con `await` y emite `og:image` absoluta.
- Verificado en `dist/`: 17 WebP en `dist/_astro/`, **0 JPG/PNG originales**;
  `srcset` 480w/600w en detalle; `og:image` = `/_astro/<hash>.webp` absoluta
  (`docker`, `first-post` comprobados); `dist/_astro/` total 436 KB.

## F2. Performance re-medido ✅ parcial (scores registrados, 90+ bloqueado por entorno)

- Hero ya diferido (ronda anterior): `preload="none"` + `data-taza-defer`, inyección
  del `<source>` post-`load`/idle, respeta `prefers-reduced-motion` (ES+EN `index.astro`,
  `TazaAscii.astro` variante `webm`). No se pasó a click-to-play: coste UX sin
  ganancia en FCP/LCP (el video ya está fuera del camino crítico;
  `efficient-animated-content` en verde).
- Fuentes: TTF→WOFF2 con `woff2_compress` (5 MB→1,9 MB en `dist/fonts/`;
  TTFs eliminados, `global.css` apunta a `.woff2` con `font-display: swap`).
  Sin subset de Mononoki/MesloLG (vetado: `pyftsubset` corrompe esas fuentes).
- Scores ronda 2 (`lighthouse@12.8.0` vía `pnpm dlx`, `pnpm preview`, Chromium):

| Página | Perf Desk | Perf Mob | A11y | BP | SEO |
|---|---|---|---|---|---|
| `/` | 83 (↑23) | 56 (↑1) | 100 (↑5) | 100 | 100 |
| `/en/` | 83 (↑23) | 56 (↑1) | 100 (↑10) | 100 | 100 |

- Fundamentos: TBT 0, CLS 0, server 0 ms, DOM 136, CSS ~8 KB, JS ~0.
  Gap restante = artefacto del lab (throttling CPU ×4 + Slow-4G simulada vs
  localhost). Registrado en `validation.md` §4; casillas 90+ pendientes de
  deploy preview (criterio del revisor).

## F3. Grupos 6-7 ✅

- Pasos 24-26 verificados post-build: sitemap 37 URLs (25 ES + 12 EN),
  `robots.txt` + canonicals OK, RSS 4 ES + 1 EN con links propios,
  `og:locale`/`canonical`/`autodiscovery` por idioma, 0 refs rotas a `/img/`,
  0 refs a `nerdfonts.com` en `dist/`.
- `package-lock.json` eliminado (`AGENTS.md` exige pnpm).
- Commits separados: (A) `astro.config.ts` bloque i18n (resto Fase 6),
  (B) N1 pins `package.json`, (C) Fase 7 lista blanca.
  Excluidos untracked ajenos: `.opencode/`, `agents/`, `skills/`,
  `.agents/skills/sap-abap|sap-btp-*`.
- Push + PR (ver URL abajo). Roadmap sin tildar (lo valida el reviewer).

## N1. Pins exactos ✅ (commit aparte)

- `@astrojs/check ^0.9.10`→`0.9.10`, `typescript ^6.0.3`→`6.0.3`
  (versiones instaladas verificadas en `node_modules`).

## N2. A11y `/en/` ✅

- Re-medido tras fix Navbar: **100** (desktop y mobile, ambas páginas).
  Contraste CTA hero intacto a propósito (cambio visual fuera de alcance).

## Verificación final ronda 2

- `pnpm astro check`: 0 errores, 0 warnings. `pnpm build`: limpio, 37 páginas.
- Archivos tocados (ronda 2, sobre ronda 1): `package.json` (+`sharp`, pins),
  `pnpm-lock.yaml`, `public/fonts/*.woff2` (nuevos) + `*.ttf` (eliminados),
  `src/components/ContentImage.astro`, `src/utils/images.ts`, `src/env.d.ts`,
  `src/pages/index.astro` + `en/index.astro` (hero diferido),
  `src/components/TazaAscii.astro`, `specs/2026-09-28-seo-performance/{requirements,plan,validation}.md`,
  más lista blanca ronda 1 (`BaseLayout`, `Navbar`, `global.css`, detalle
  blog/trabajos ES+EN, `rss.xml.ts` + `en/rss.xml.ts`, `README.md`,
  `src/assets/**`, limpieza `public/img/` −17,6 MB).
