# Explorer deploy — Fase 7 (reconstruido desde resumen)

> Nota de trazabilidad: contenido reconstruido desde el resumen verificado del
> encargo (sesiones explorer originales no accesibles en disco). Si el revisor
> aporta los literales, se sobrescribe.

## Estado

- SSG puro **sin adapter** (`astro.config.ts`: solo `site` + `sitemap` +
  `tailwindcss` vía Vite). No hay SSR ni funciones edge.
- `requirements.md:22` **excluye el deploy de Fase 7** (es Fase 8).
  `validation.md:33-34` quedan **sin marcar** hasta deploy preview, por orden
  del revisor (ronda 2).

## Prohibiciones (Fase 7)

- **NO** instalar adaptadores (`@astrojs/cloudflare`, `node`, `vercel`, etc.).
- **NO** cambiar `site` ni `base`.
- **NO** añadir GTM/Partytown antes de medir (contaminaría la línea base).

## Vía rápida (Fase 8, informativo — no ejecutar en Fase 7)

1. **Cloudflare Pages dashboard**: conectar repo → build `pnpm build`,
   output `dist/`. Sin cambios de código.
2. Alternativa CLI: `pnpm dlx wrangler` (permitido: `pnpm dlx`, nunca
   `npm`/`npx`).

## Criterio de re-medición

Lighthouse mobile+desktop 90+ en `/` y `/en/` sobre la URL del deploy
preview (red real, sin throttling contra localhost). Registrar tabla en
`specs/2026-09-28-seo-performance/validation.md` §4; solo entonces el
revisor marca 33-34.
