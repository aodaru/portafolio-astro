# Explorer perf — Fase 7 (reconstruido desde resumen)

> Nota de trazabilidad: contenido reconstruido desde el resumen verificado del
> encargo (sesiones explorer originales `ses_f165960e0ffeNeUtL9eV9NmRkq`,
> `ses_f165960dfffe7jAdvO5OeXC6LC`, `ses_f165960deffei8VPQDtVBGfV9Y` no
> accesibles en disco). Si el revisor aporta los literales, se sobrescribe.

## Medición local (ronda 2, `lighthouse@12.8.0`, `pnpm preview` localhost, Chromium headless)

- Desktop `/` y `/en/`: **83** (↑ de 60). A11y/BP/SEO **100**.
- Mobile `/` y `/en/`: **56** (↑ de 55). A11y/BP/SEO **100**.

## Diagnóstico: el gap móvil es ~80% artefacto de laboratorio

- Lab móvil = CPU throttled ×4 + Slow-4G simulada **contra localhost**.
- El modelo atribuye "9,15 s de ahorro" a **8 KB de CSS render-bloqueante**
  (2 ficheros): físicamente imposible → artefacto del modelo, no recurso real.
- FCP = LCP = SI indica un **único paint tardío bajo throttling**, no un
  bloqueante real.
- Fundamentos en verde: TBT 0 ms, CLS 0, documento 0 ms, DOM 136 nodos,
  CSS crítico ~8 KB, JS ~0, `font-display: swap` en las 5 `@font-face`.

## Pesos reales auditados

- `public/fonts/`: **1,9 MB en 4 WOFF2 completos** (Mononoki Regular/Bold
  ~838 KB c/u, MesloLG Regular/Bold ~150 KB c/u) + subset NerdFonts 1 KB.
  Sin preload. TTF→WOFF2 con `woff2_compress` ya aplicado (5 MB→1,9 MB).
- Video hero `/img/taza-cafe-compressed.webm` **241 KB ya diferido** fuera del
  camino crítico (post-`load`/idle, respeta `prefers-reduced-motion`): no tocar.
- CSS ~8 KB en 2 ficheros bloqueantes (orden de magnitud irrelevante).
- `dist/_astro/`: 436 KB en 17 WebP; **home no carga ninguno**.
- LCP = **texto** (h1 hero). Poster `Avatar.webp` 12 KB sin preload.

## Palancas finas aplicadas (sin cambio visual)

- **P0**: preload `Mononoki-Regular.woff2` (`as="font"`, `crossorigin`) en
  `BaseLayout`. Solo Regular: precargar los 4 costaría ~1,9 MB de preload.
- **P1**: preload `as="image"` de `/img/Avatar.webp` con
  `fetchpriority="high"` (poster hero, LCP).
- **P2** (verificación, sin cambio): `Mononoki-Bold` **sí** participa en el
  LCP above-the-fold (`.hero8-title` `font-weight: 700` en líneas
  "Adal"/"García"; CTA también en 700). No se modifica: regla
  sin-cambio-visual + no tocar contraste CTA. Mitigación vigente:
  `font-display: swap`. Precargar Bold (+839 KB) rechazado por coste.

## Prohibido (vetos vigentes)

- Click-to-play al video: coste UX sin ganancia en FCP/LCP (ya fuera del
  camino crítico).
- Subset de Mononoki/MesloLG: vetado por decisión humana (`pyftsubset` las
  corrompe).
- Inlinear CSS, GTM/Partytown, adaptadores, cambiar `site`/`base`.

## Pendiente

Re-medir 90+ en **deploy preview** (Fase 8). Las casillas 33-34 de
`validation.md` quedan sin marcar hasta entonces.
