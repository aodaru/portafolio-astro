# Plan — Fase 8: Rediseño Home (Terminal Refinado)

> Evolución de la landing manteniendo la home actual como referencia. Estrategia: página temporal `/preview` para comparar, luego aplicar a `index.astro` y eliminar el preview.

## Prioridad 1 — Romper uniformidad de secciones *(mayor impacto)*

**Archivo: `src/styles/pages/home.css`**

- [ ] Quitar `border-top` uniforme de `.sec8`; subir base a `padding: 6rem 0`
- [ ] Añadir `.sec8-about`: tinte verde sutil (`rgba(104, 157, 106, 0.04)`), `padding: 7rem 0`
- [ ] Añadir `.sec8-work`: tinte azul sutil (`rgba(69, 133, 136, 0.04)`), `padding: 7rem 0`, línea decorativa superior azul (`::before`, 60px, centrada)
- [ ] Añadir `.sec8-hobby`: compacta, `padding: 5rem 0`
- [ ] Extender `.sec8-cta`: `padding: 8rem 0`, gradiente decorativo superior (`::before`, yellow→orange→yellow sobre transparente)
- [ ] Ritmo resultante: 7rem → 7rem → 5rem → 8rem

**Archivo: `src/pages/index.astro` (o `preview.astro` durante la comparación)**

- [ ] `<section class="sec8 sec8-about" data-reveal>` (About)
- [ ] `<section class="sec8 sec8-work" data-reveal>` (Work)
- [ ] `<section class="sec8 sec8-hobby" data-reveal>` (Hobbies)
- [ ] CTA ya tiene `sec8-cta`; mantener

## Prioridad 2 — Enriquecer cards de proyecto *(alto impacto)*

**Archivo: `src/styles/pages/home.css`**

- [ ] `.proj8-grid`: de lista horizontal a grid `repeat(auto-fit, minmax(280px, 1fr))`, `gap: 1.5rem`, sin `border-top`
- [ ] `.proj8-card`: vertical (`flex-direction: column`), `border: 1px solid var(--gruvbox-card)`, `border-radius: 10px`, `overflow: hidden`, fondo `var(--gruvbox-card)`; hover `translateY(-4px)` + `box-shadow` + borde yellow
- [ ] `.proj8-thumb`: `aspect-ratio: 16/9`, centrada, con gradiente por posición:
  - `nth-child(1)`: yellow→orange (`rgba(215,153,33,0.15)` → `rgba(214,93,14,0.08)`)
  - `nth-child(2)`: green→blue
  - `nth-child(3)`: blue→gray
- [ ] `.proj8-thumb-icon`: número/badge Mononoki, gray, `opacity: 0.6`
- [ ] `.proj8-body`: `padding: 1.25rem 1.5rem 1.5rem`, columna flexible
- [ ] `.proj8-num`: micro MesloLG uppercase (`0.72rem`, `letter-spacing: 0.12em`, gray)
- [ ] `.proj8-title`: `1.25rem`; hover → yellow
- [ ] `.proj8-desc`: `0.88rem`, gray, `line-height: 1.6`; hover → fg
- [ ] `.proj8-arrow`: footer de card con `border-top`, texto `0.82rem` yellow; hover aumenta `gap` (0.4rem → 0.8rem)

**Markup (preview primero, luego `index.astro`)**

- [ ] Reestructurar cada card: `.proj8-thumb` + `.proj8-body` (num + title + desc) + `.proj8-arrow` ("ver proyecto →")

## Prioridad 3 — Evolucionar hero *(alto impacto)*

**Archivo: `src/styles/pages/home.css`**

- [ ] `.hero8`: `min-height: 90vh`, `padding: 6rem 0 4rem`, full-bleed con `margin: 0 -1.5rem` + padding compensado (en desktop `-3rem`)
- [ ] `.hero8-grid` en desktop: `1.2fr 0.8fr` (columna de taza más estrecha)
- [ ] `.hero8-line`: stagger `fadeUp` con `forwards` (delays 0.1s / 0.25s / 0.4s)
- [ ] `.hero8-line-accent`: añadir `border-left: 3px solid var(--gruvbox-orange)`
- [ ] `.hero8-eyebrow`: color green (antes gray), con `fadeUp` de entrada
- [ ] `.hero8-sub em`: color blue (antes orange)
- [ ] `.hero8-btn-primary`: fondo orange (antes yellow); hover → yellow (intercambio)
- [ ] `.hero8-btn-ghost:hover`: borde + color green (antes yellow)
- [ ] `.hero8-meta-key`: color blue (antes gray)
- [ ] `.hero8-taza`: animación `tazaFloat` 6s loop + `prefers-reduced-motion` la desactiva

## Prioridad 4 — Jerarquía tipográfica *(impacto medio)*

**Archivo: `src/styles/global.css`**

- [ ] Añadir variables: `--fs-hero: clamp(3rem, 8vw, 5.5rem)`, `--fs-section: clamp(2rem, 4.5vw, 3rem)`, `--fs-body: 1.05rem`, `--fs-small: 0.88rem`, `--fs-micro: 0.78rem`

**Archivo: `src/styles/pages/home.css`**

- [ ] `.sec8-h2`: `font-size: var(--fs-section)`, `letter-spacing: -0.03em`, `max-width: 28ch`
- [ ] `.sec8-p`: `line-height: 1.75`, `max-width: 55ch`

## Prioridad 5 — Pulir CTA *(impacto medio)*

**Archivo: `src/styles/pages/home.css`**

- [ ] `.cta8`: `max-width: 700px`, `padding: 4.5rem 2.5rem`, `border-radius: 16px`, fondo gradiente dorado sutil sobre `var(--gruvbox-card)`, borde `rgba(215,153,33,0.2)`
- [ ] `.cta8-h2::after`: cursor `█` yellow `0.7em` con `blink` existente
- [ ] `.cta8-p`: `1.05rem`, `max-width: 45ch` centrada
- [ ] `.cta8-social`: prefijo `→` green, hover → green con desplazamiento

## Prioridad 6 — Microinteracciones *(impacto bajo-medio)*

**Archivo: `src/styles/pages/home.css`**

- [ ] `.hobby8-chip`: hover con `box-shadow` por color; ciclo `nth-child(3n+2)` orange, `nth-child(3n)` yellow, resto blue→green en hover
- [ ] `.sec8-label`: base yellow; `.sec8-work .sec8-label` blue; `.sec8-hobby .sec8-label` green; `.sec8-cta .sec8-label` orange

## Prioridad 7 — Container breathing room *(impacto bajo)*

**Archivo: `src/styles/pages/home.css`**

- [ ] `.inicio8`: `max-width: 1140px` (de 1100); en `min-width: 768px`, padding horizontal `3rem`

## Estrategia de comparación

- [ ] Crear `src/pages/preview.astro` como copia de `index.astro` con prioridades 1-3 aplicadas
- [ ] Comparar `/` vs `/preview` en dev server (light + dark, mobile + desktop)
- [ ] Tras aprobar, portar a `index.astro` (+ `/en/` hereda por i18n) y eliminar `preview.astro`

## Entregable

Home con secciones visualmente distintas, cards de proyecto enriquecidas, hero con stagger + variedad cromática, tipografía jerarquizada, CTA con personalidad terminal y microinteracciones. Sin dependencias nuevas; 3 archivos tocados (`home.css`, `global.css`, `index.astro` vía preview).
