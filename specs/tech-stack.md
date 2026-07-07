# Tech Stack

## Core
| Herramienta | Versión | Uso |
|---|---|---|
| [Astro](https://astro.build) | ^7.0.6 | Framework web, SSG, islands |
| [pnpm](https://pnpm.io) | ^11.10.0 | Package manager |
| Node.js | >= 20 | Runtime |

## Frontend
| Categoría | Opción | Estado |
|---|---|---|
| CSS Framework | **Tailwind CSS** v4 (propuesta) | Pendiente de decisión |
| UI Icons | **Lucide** o **Bootstrap Icons** | Pendiente de decisión |
| Fuentes | Variable fonts locales | Pendiente de decisión |
| Dark/Light | CSS custom properties + `prefers-color-scheme` + toggle | Planificado |

## Contenido
| Tipo | Formato | Ruta |
|---|---|---|
| Posts (blog) | Markdown + frontmatter | `src/content/blog/` |
| Proyectos | Markdown + frontmatter | `src/content/projects/` |
| Páginas estáticas | Astro `.astro` | `src/pages/` |
| Datos de perfil | JSON o YAML | `src/content/profile/` |

## SEO & Performance
- `@astrojs/sitemap` — sitemap automático
- `@astrojs/rss` — feed RSS
- Meta tags Open Graph por página
- Imágenes optimizadas con `astro:assets`
- Partytown para scripts de terceros (GTM)
- Lighthouse target: 90+ en todas las categorías

## Internacionalización (i18n)
- Ruteo basado en subdirectorios: `/es/` y `/en/`
- Content collections separadas por idioma: `src/content/blog/es/`, `src/content/blog/en/`
- Componentes con archivos de traducción (JSON por idioma)

## Despliegue
| Proveedor | Notas |
|---|---|
| **Cloudflare Pages** (propuesto) | Gratuito, global CDN, builds rápidos |
| Alternativa: GitHub Pages | También viable |

## Brechas detectadas (por resolver)
1. **CSS framework** — Tailwind v4 vs CSS modules vs vanilla CSS. The theme WP uses Bootstrap + SCSS; redesign completo da libertad.
2. **Icons** — Lucide (npm) vs Bootstrap Icons (CDN) vs SVG inline.
3. **Fuentes** — Google Fonts vs self-hosted variable fonts.
4. **CMS?** — Por ahora solo MD files. ¿WordPress headless en el futuro? No contemplado en MVP.
5. **Testing** — ¿Playwright para e2e? ¿Vitest para unit? No especificado aún.
