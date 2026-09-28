# Validación — Fase 7: SEO + Performance

## Estado de la fase

**✅ MERGEADA con seguimiento (2026-09-28, PR #3 → `feat/internacionalizacion`, merge `2428dcb`).
Pendiente solo: Perf 90+ re-medido en deploy preview (Fase 8).**

## Criterios de éxito

### 1. Meta tags dinámicos

- [x] Cada página emite `og:title`, `og:description`, `og:image` (URL absoluta), `og:url`, `og:type`
- [x] `og:locale` es `es_ES` en ES y `en_US` en EN, con `og:locale:alternate` cruzado
- [x] Twitter Card (`summary_large_image`) presente en todas las páginas
- [x] `<link rel="canonical">` coincide con la URL actual (ES raíz, EN `/en/...`)
- [x] Detalle de blog/trabajo usa la `image` de su frontmatter; resto usa la imagen por defecto

### 2. RSS bilingüe

- [x] `/rss.xml` contiene solo posts `lang: es` con links 200 (sin prefijo de idioma en la URL)
- [x] `/en/rss.xml` contiene solo posts `lang: en` con links 200
- [x] `<head>` incluye autodiscovery RSS del idioma correspondiente
- [x] Fechas `pubDate` válidas y orden descendente

### 3. Imágenes y media

- [x] Imágenes usadas viven en `src/assets/` y se renderizan con `<Image>` (WebP, `widths` responsivos)
- [x] `dist/` no contiene las imágenes originales sin optimizar (salvo favicon)
- [x] Hero con video: tiene `poster` y no descarga el `.webm` en eager
- [x] Sin referencias rotas a `/img/...` tras la migración

### 4. Performance

- [ ] Lighthouse mobile 90+ en las 4 categorías en `/` y `/en/`
- [ ] Lighthouse desktop 90+ en las 4 categorías en `/` y `/en/`
- [x] NerdFonts no bloquea el render (self-host o preload medido)
- [x] `pnpm astro check` 0 errores, `pnpm build` sin warnings nuevos

#### Medición ronda 2 (2026-09-28, `lighthouse@12.8.0`, `pnpm preview` localhost, Chromium headless)

| Página | Perf Desk | Perf Mob | A11y | BP | SEO |
|---|---|---|---|---|---|
| `/` | 83 (↑ de 60) | 56 (↑ de 55) | **100** (↑ de 95) | 100 | 100 |
| `/en/` | 83 (↑ de 60) | 56 (↑ de 55) | **100** (↑ de 90, N2 cerrado) | 100 | 100 |

Fundamentos en verde: TBT 0 ms, CLS 0, documento 0 ms, DOM 136 nodos,
CSS crítico ~8 KB, JS ~0, `font-display: swap` en las 5 `@font-face`.
El gap restante es artefacto del laboratorio (CPU throttled ×4, sin GPU,
red Slow-4G simulada contra localhost: el modelo atribuye "9,15 s de ahorro"
a 8 KB de CSS render-bloqueante; FCP=LCP=SI indica un único paint tardío
bajo throttling, no un recurso bloqueante real).
Palancas reales aplicadas: video hero diferido post-`load` (no descarga en
eager, `poster` + respeta `prefers-reduced-motion`), TTF→WOFF2 con
`woff2_compress` (5 MB→1,9 MB), subset NerdFonts auto-hospedado (1 KB),
imágenes a WebP responsivo. No se aplicó click-to-play al video (coste UX
sin ganancia en FCP/LCP: el video ya está fuera del camino crítico) ni
subset de Mononoki/MesloLG (vetado por decisión humana: `pyftsubset`
corrompe esas fuentes). Pendiente: re-medir en deploy preview para el 90+
real; las casillas 90+ quedan para el revisor.

### 5. SEO existente preservado

- [x] Sitemap incluye ambos idiomas y coincide con canonicals
- [x] `robots.txt` accesible y apunta al sitemap
- [x] `hreflang` es/en/x-default intactos (Fase 6)

## Cómo verificar

```bash
# Desde la raíz del proyecto (rama feat/seo-performance)

# 1. Typecheck y build
pnpm astro check
pnpm build

# 2. Inspeccionar head (ES y EN)
grep -o '<meta property="og:[^>]*>' dist/index.html
grep -o '<meta property="og:[^>]*>' dist/en/index.html
grep -o '<link rel="canonical"[^>]*>' dist/index.html dist/en/index.html

# 3. Feeds
python3 -c "import xml.etree.ElementTree as ET; ..."
curl -s http://localhost:4321/rss.xml | head -20
curl -s http://localhost:4321/en/rss.xml | head -20

# 4. Imágenes optimizadas
ls dist/_astro/ | grep -i -E 'webp|avif'

# 5. Lighthouse (requiere pnpm preview o deploy preview)
# Chrome DevTools → Lighthouse → mobile + desktop sobre / y /en/
```

## Criterio de merge a main

- [ ] Todos los criterios de éxito marcados como completados (pendientes 33-34 hasta deploy preview Fase 8, por orden del revisor)
- [x] Rebase al día con `feat/internacionalizacion` (o main si PR #2 ya mergeó) — verificado en cierre: PR #2 sin cambios (`0fcca17`), merge CLEAN sin rebase
- [x] PR abierto en GitHub (#3, base `feat/internacionalizacion`) — mergeado 2026-09-28 (`2428dcb`)
- [x] Validación manual ejecutada (todos los comandos de "Cómo verificar") — ejecutada post-merge en cierre (ver `specs/fase7-cierre.md`)

## Anti-criterios (lo que NO debe pasar)

- ❌ `og:image` relativa o que devuelva 404
- ❌ Canonicals apuntando a rutas inexistentes (`/es/...`)
- ❌ Feed con links rotos o mezclando idiomas
- ❌ Imágenes originales pesadas servidas en producción
- ❌ Nuevas dependencias npm salvo `sharp` (dependencia de build de Astro, permitida por enmienda F1)
- ❌ Regressión de Fase 6 (selector de idioma, `lang`, traducciones)
