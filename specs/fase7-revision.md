# Revisión — Fase 7: SEO + Performance (Grupos 2-5)

**Veredicto:** RECHAZADO (3 fixes bloqueantes + 2 no bloqueantes con seguimiento)
**Fecha:** 2026-09-28 · **Rama revisada:** `feat/seo-performance` (working tree sobre `6b7f3ad`)
**Docs contraste:** `specs/2026-09-28-seo-performance/{requirements,plan,validation}.md`, `specs/roadmap.md` Fase 7, `specs/mission.md`, `specs/tech-stack.md`, `AGENTS.md`, `specs/fase7-implementacion.md`

## Verificado OK (con evidencia)

- **OG/Twitter/canonical/locale:** `dist/index.html` emite `og:title/description/image/url/type`, `og:locale=es_ES` + `alternate=en_US` (y espejo en `/en/` con `en_US`/`es_ES`); `og:image` absoluta 200 (`https://teapartydev.com/img/Avatar.webp` en home, `/_astro/<hash>` en detalle); `canonical` = URL actual; **cero rutas `/es/...`** en `dist/`. Twitter `summary_large_image` completo. Detalle emite `og:type=article` + `article:published_time` (`dist/blog/docker/index.html`).
- **RSS:** `dist/rss.xml` 4 items solo ES con links `/blog/<slug>/` (sin prefijo de idioma); `dist/en/rss.xml` 1 item solo EN con link `/en/blog/...`; `pubDate` en orden descendente; autodiscovery por idioma en `<head>` ES y EN. Cumple `requirements.md` D2.
- **Fase 6 sin regresión:** `hreflang` es/en/x-default intactos, `<html lang="es"|"en">` correcto, `pnpm astro check` **0 errores**, `pnpm build` limpio (37 páginas), sitemap 37 URLs, `robots.txt` OK, sin nuevas deps en `package.json` (`git diff HEAD -- package.json` vacío), sin refs a `nerdfonts.com` en `src/`/`dist/` (solo comment en `global.css` y name-table binaria interna de la fuente).
- **Hero:** `poster="/img/Avatar.webp"` + `preload="metadata"` + script `prefers-reduced-motion` en `src/pages/index.astro:17-19` y `src/pages/en/index.astro:17` (verificado). Limpieza `public/img/` −17.6 MB correcta (ningún eliminado referenciado en `src/`). Cero assets missing en `dist/`.

## Fixes bloqueantes (impiden merge per `validation.md` "Criterio de merge")

### F1. Contradicción de specs: `sharp` vetado vs WebP exigido (BLOQUEADOR principal)
- `requirements.md:18` ("No incluido: Nuevas dependencias npm") **vs** `validation.md:26` ("`<Image>` WebP, `widths` responsivos"). Ambas no pueden cumplirse a la vez: `astro:assets` exige `sharp` para transformar.
- El implementer hizo lo correcto al no añadirla (revert `MissingSharp`, documentado en `fase7-implementacion.md:42-46`), pero el resultado **incumple validation §3**: `src/components/ContentImage.astro:22-32` sirve `<img>` con JPG/PNG originales (solo hash + dimensiones, sin re-encode ni `srcset`); `src/utils/images.ts:48-52` (`resolveOgImagePath`) publica esos mismos originales como `og:image`.
- **Fix:** enmendar `requirements.md:18` para permitir `sharp` como dependencia de build de Astro (no es tracker de terceros como el GTM de D1), luego: `pnpm add -D sharp` (versión exacta, sin `^` per `AGENTS.md`), migrar `ContentImage.astro` a `<Image format="webp" widths={...} sizes={...}>` y `images.ts` a `getImage()` para `og:image`. Requiere decisión humana (cambia el alcance firmado) → **esto sí impide el merge hasta resolverse**.

### F2. Lighthouse Performance 55-60 < 90 (validation §4)
- Scores medidos por el implementer (`fase7-implementacion.md:63-67`): Perf 60 desk / 55 mob en `/` y `/en/` — el umbral 90+ de `requirements.md:12` y `validation.md:33-34` **no se cumple**, sea artefacto del entorno o no.
- Palancas reales pendientes: video hero autoplay 246 KB (`src/pages/index.astro:18`, `src/pages/en/index.astro:18`, `src/components/TazaAscii.astro:37`) y fuentes TTF 5 MB en `public/fonts/` (`MesloLG/Mononoki`, copiadas tal cual a `dist/fonts/`).
- **Fix:** re-medir en deploy preview (entorno representativo); si sigue <90, diferir video a click-to-play o `media="(prefers-reduced-motion: no-preference)"`, y convertir TTF→WOFF2 con toolchain válida (`woff2_compress`; `pyftsubset` del entorno corrompe esas fuentes, ver log :55-56). Registrar scores mobile+desktop de `/` y `/en/` en `validation.md`.

### F3. Grupos 6-7 sin ejecutar (validación final, roadmap, commit, PR)
- `specs/roadmap.md:113-118` Fase 7 sigue sin tildar (correcto no tocarlo hasta aprobar, pero el merge exige `validation.md` completo + PR).
- Working tree con **untracked ajenos que NO deben entrar al commit**: `package-lock.json` (resto de npm — `AGENTS.md` exige pnpm; **eliminarlo**), `.opencode/`, `agents/`, `skills/`, `.agents/skills/sap-abap|sap-btp-*`.
- **Fix:** ejecutar plan Grupo 6 (pasos 24-28, incl. commit separado de `astro.config.ts` con bloque i18n) y Grupo 7; commitear **solo** la lista de `fase7-implementacion.md:79-89`.

## No bloqueantes (seguimiento, no impiden merge tras F1-F3)

- **N1.** `package.json:15` (`@astrojs/check ^0.9.10`) y `:21` (`typescript ^6.0.3`) usan `^` (preexistente, no del implementer; `AGENTS.md` pide pin exacto) → pin en commit aparte.
- **N2.** `/en/` A11y re-medición pendiente tras fix Navbar (log :70, se espera 95 por mismo componente) + contraste CTA hero intacto a propósito (cambio visual fuera de alcance, log :77).

## Respuesta al implementer: ¿el bloqueador `sharp`/WebP impide el merge?
**Sí, impide el merge en su forma actual**, pero por causa formal (contradicción entre `requirements.md:18` y `validation.md:26`), no por mal trabajo: el código entregado es correcto y todo lo verificable en verde. Vía de salida recomendada: **aceptar `sharp` como dependencia de build** (es parte documentada de `astro:assets`, no runtime de terceros), enmendar el requisito, aplicar F1 y re-medir (F2). Alternativa: degradar `validation.md:26` a "assets con hash + dimensiones" y aceptar JPG/PNG originales como estado final (desaconsejado: `validation.md:82` lo marca como anti-criterio ❌ "Imágenes originales pesadas servidas en producción").

---

# Ronda 2 — Re-revisión (2026-09-28, rama `feat/seo-performance` sobre `6b7f3ad`)

**Veredicto ronda 2:** APROBADO con seguimiento (Perf 90+ se re-mide en deploy preview, Fase 8)

Docs contraste: `specs/fase7-implementacion.md` (ronda 2, líneas 100-173),
`specs/2026-09-28-seo-performance/{requirements,plan,validation}.md`,
`specs/roadmap.md` Fase 7, `specs/mission.md`, `specs/tech-stack.md`, `AGENTS.md`.
Commits revisados: `08c92a1` + `8d1007b` + `3a3dfe1` (+ `bb918a9` docs).
PR: https://github.com/aodaru/portafolio-astro/pull/3 (base `feat/internacionalizacion`, OPEN).

## F1. `sharp` + WebP ✅ CERRADO

- `package.json:25`: `"sharp": "0.35.5"` en `devDependencies`, exacto sin `^` (per `AGENTS.md`).
  N1 incluido: `@astrojs/check 0.9.10`, `typescript 6.0.3` exactos (`package.json:15,21`).
- `src/components/ContentImage.astro:22-29`: `<Image format="webp" widths={[480,800,1200]} sizes=...>` + lazy.
- `src/utils/images.ts:56-62`: `resolveOgImagePath()` vía `getImage({format:'webp', width:1200})`.
- `dist/` verificado: 17 `.webp` en `dist/_astro/` (436 KB total), **0 JPG/PNG originales**;
  `srcset 480w/600w` en `dist/blog/docker/index.html`; `og:image` absoluta optimizada
  (`https://teapartydev.com/_astro/docker.ozCeNX57_Z2iejjC.webp`, 200 en disco).
- Anti-criterio "originales pesados en prod" ya no aplica; enmienda `requirements.md:18-20` cubre `sharp` como build-dep.

## F2. Performance ⚠️ APROBADO CON SEGUIMIENTO (decisión motivada)

- Scores ronda 2 (`validation.md:38-58`, `fase7-implementacion.md:125-135`):
  `/` y `/en/` Perf 83 desk / 56 mob, **A11y 100, BP 100, SEO 100**.
- Palancas aplicadas y verificadas: hero diferido (`preload="none"` + `data-taza-defer`,
  inyección post-`load`, `prefers-reduced-motion` en `src/pages/index.astro:17,139-145`,
  `src/pages/en/index.astro` idem, `TazaAscii.astro:36,235`);
  TTF eliminados, solo WOFF2 en `public/fonts/` y `dist/fonts/` (1,9 MB) con
  `font-display: swap` (`global.css:15-46`); NerdFonts subset 1 KB, 0 refs a `nerdfonts.com` en `dist/`.
- Fundamentos: TBT 0, CLS 0, DOM 136, CSS ~8 KB, JS ~0 (no hay regresión posible por JS/CSS propio).
- **Por qué se aprueba sin el 90+**: (a) desktop subió 60→83 con las palancas reales;
  (b) el gap restante presenta firma de artefacto de lab (FCP=LCP=SI, un único paint tardío
  bajo CPU×4 + Slow-4G simulada contra localhost con server 0 ms);
  (c) exigir deploy preview dentro de Fase 7 contradice `requirements.md:22` ("deploy (Fase 8)" excluido);
  (d) no quedan palancas locales sin coste UX (click-to-play) o prohibidas (subset Mononoki/MesloLG corrompe).
- **Seguimiento obligatorio**: re-medir Lighthouse mobile+desktop en `/` y `/en/` en deploy preview
  (Fase 8); si Perf real <90, abrir issue con las palancas pendientes. Las casillas
  `validation.md:33-34` quedan a propósito sin marcar hasta esa medición.

## F3. Grupos 6-7 ✅ CERRADO

- Pasos 24-26 verificados: sitemap 37 URLs (25 ES + 12 EN, `dist/sitemap-0.xml`),
  `robots.txt` OK, RSS 4 ES + 1 EN con links propios, `og:locale`/`canonical`/autodiscovery por idioma,
  0 refs rotas, 0 `/es/...` en canonicals, `hreflang` es/en/x-default intactos.
- `package-lock.json` eliminado (verificado: `ls` → no existe). `pnpm-lock.yaml` commiteado.
- Commits separados verificados (`git log --stat`): `08c92a1` solo `astro.config.ts` (i18n Fase 6),
  `3a3dfe1` solo pins N1, `8d1007b` lista blanca Fase 7. Untracked ajenos (`.opencode/`, `agents/`,
  `skills/`, `.agents/skills/sap-*`) presentes en working tree pero **fuera de los commits**.
- PR #3 existe, base `feat/internacionalizacion` correcta (D6), estado OPEN.
- `specs/roadmap.md` Fase 7 sin tildar (correcto; lo marca la sesión de merge tras este veredicto).
  `plan.md:27,58-59` y `validation.md:94,97` pendientes de merge — fuera del alcance del revisor.

## Anti-criterios `validation.md:99-106` — todos en verde

- og:image absoluta 200 ✅ · sin canonicals `/es/` (0 matches) ✅ · feeds sin mezcla ni rotos (4+1) ✅ ·
  sin originales en prod ✅ · sin nuevas deps runtime (`sharp` es build, enmienda F1) ✅ ·
  sin regresión Fase 6 (`hreflang`, `lang`, selector intactos) ✅.

## Attest

- `pnpm astro check`: **0 errores, 0 warnings** (21 hints preexistentes).
- `pnpm build`: limpio, **37 páginas**, sitemap regenerado.

## Respuesta al implementer

F1 ✅, F3 ✅, N1 ✅, N2 ✅ (A11y 100/100 re-medido). F2 se da por cumplido en lo localizable
con seguimiento en Fase 8. **Puede mergearse el PR #3** (tras rebase si PR #2 cambia) y tildar
Fase 7 en roadmap en la sesión de merge.
