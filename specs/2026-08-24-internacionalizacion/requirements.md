# Requisitos — Fase 6: Internacionalización

## Alcance

### Incluido

- Soporte bilingüe completo (español e inglés) para todas las páginas del sitio
- Routing por subdirectorios: `/es/...` y `/en/...`
- Idioma por defecto: español (`/` redirige a `/es/`)
- Archivos de traducción JSON para textos de UI: `src/i18n/es.json`, `src/i18n/en.json`
- Bio por idioma: `src/i18n/bio-es.json`, `src/i18n/bio-en.json`
- Selector de idioma en la barra de navegación
- Blog con posts en ambos idiomas: `src/content/blog/es/` y `src/content/blog/en/`
- Proyectos en ambos idiomas: `src/content/projects/es/` y `src/content/projects/en/`
- Meta tags `hreflang` para SEO bilingüe
- `README.md` con manual de cómo crear posts en ambos idiomas
- Tags de blog en ambos idiomas

### No incluido

- Traducción automática de contenido (todo es manual)
- Detección automática de idioma del navegador (solo routing por URL)
- Cookie o persistencia de preferencia de idioma (cada visita empieza en `/es/`)
- Cambios al diseño visual o layout (solo se agrega i18n)
- Nuevas dependencias npm (Astro 7 ya soporta i18n nativamente)

## Decisiones

| ID | Decisión | Racional | Alternativa descartada |
|----|----------|----------|------------------------|
| D1 | Routing por subdirectorios (`/es/`, `/en/`) | Mejor para SEO, URLs limpias, fácil de entender | Subdominios (`es.teapartydev.com`) — más complejo de configurar |
| D2 | Idioma por defecto: español | El sitio original era en español, audiencia principal hispana | Inglés por defecto — descartado porque el contenido original es en español |
| D3 | Raíz `/` redirige a `/es/` | Consistencia con idioma por defecto, evita contenido duplicado en raíz | Mostrar español sin redirect — descartado por claridad de URL |
| D4 | Astro i18n nativo (config `i18n.routing`) | Soporte oficial en Astro 7, sin dependencias externas | `astro-i18n` u otros paquetes — innecesarios con Astro 7 |
| D5 | Traducciones en JSON (`src/i18n/*.json`) | Simple, fácil de editar, no requiere build step | i18n con imports de módulos — más verboso |
| D6 | Bio como JSON separado por idioma | Claridad, fácil de mantener, sin anidamiento complejo | Un solo `bio.json` con campos `{es: ..., en: ...}` — más difícil de leer |
| D7 | Mismo slug para posts/proyectos en ambos idiomas | Facilita relacionar versiones, URLs predecibles | Slugs diferentes por idioma — dificulta navegar entre versiones |
| D8 | `lang` inferido desde la ruta (no desde frontmatter) | Menos duplicación, la ruta ya indica el idioma | Campo `lang` en frontmatter — redundante con la estructura de directorios |

## Contexto

### Estado actual del contenido

| Archivo/Página | Idioma actual | Acción requerida |
|---|---|---|
| `src/pages/index.astro` (home) | Inglés | Mover a `/es/` y traducir a español; crear `/en/` con contenido actual |
| `src/components/Navbar.astro` | Español | Traducir con `src/i18n/{lang}.json` |
| `src/components/Footer.astro` | Neutral (copyright) | Traducir con `src/i18n/{lang}.json` |
| `src/pages/contacto.astro` | Español | Mover a `/es/contacto`, crear `/en/contact` |
| `src/pages/trabajos.astro` | Español | Mover a `/es/trabajos`, crear `/en/work` |
| `src/pages/blog/index.astro` | Español | Mover a `/es/blog`, crear `/en/blog` |
| `src/pages/blog/[...slug].astro` | Español | Mover a `/es/blog/[slug]`, crear `/en/blog/[slug]` |
| `src/pages/blog/page/[page].astro` | Español | Mover a `/es/blog/page/[page]`, crear `/en/blog/page/[page]` |
| `src/pages/blog/tags/[tag].astro` | Español | Mover a `/es/blog/tags/[tag]`, crear `/en/blog/tags/[tag]` |
| `src/content/blog/es/` | Español (4 posts) | Mantener, ya está en subdirectorio correcto |
| `src/content/blog/en/` | No existe | Crear con al menos 1-2 posts de ejemplo en inglés |
| `src/content/projects/` | Español (3 proyectos) | Mover a `src/content/projects/es/` |
| `src/content/projects/en/` | No existe | Crear con versiones en inglés de los 3 proyectos |
| `src/data/bio.json` | Español | Dividir en `src/i18n/bio-es.json` y `src/i18n/bio-en.json` |
| `src/layouts/BaseLayout.astro` | `lang="es"` hardcodeado | Recibir `lang` como prop |

### Textos a traducir (UI)

**Navbar:**
- Inicio, Blog, Trabajos, Contacto

**Home:**
- Hero: eyebrow, título, subtítulo, CTAs ("View my work", "Get in touch"), meta labels
- Sección About: label, título, descripción, link
- Sección Selected work: label, título, subtítulo, títulos y descripciones de 3 proyectos
- Sección Things I like: label, título, descripción
- Sección CTA: título, descripción, botón "Say hello"
- Taza caption: "currently brewing"

**Blog:**
- "Volver al blog" / "Back to blog"
- "Anterior" / "Previous", "Siguiente" / "Next"
- "Ver todos los tags" / "View all tags"
- "No hay artículos publicados todavía" / "No articles published yet"
- Formato de fecha (locale `es-ES` vs `en-US`)

**Trabajos:**
- "Volver a trabajos" / "Back to work"
- "Visitar proyecto" / "Visit project"
- "No hay proyectos publicados todavía" / "No projects published yet"
- Formato de fecha

**Contacto:**
- Texto introductorio
- "Email"

**Tags:**
- "{n} artículo(s) con la etiqueta" / "{n} article(s) tagged"
- "No hay artículos con esta etiqueta" / "No articles with this tag"

**Footer:**
- Copyright (año + nombre, sin traducción)

### Estructura de archivos de traducción

```
src/i18n/
├── es.json          # Traducciones de UI en español
├── en.json          # Traducciones de UI en inglés
├── bio-es.json      # Bio en español (movido de src/data/bio.json)
└── bio-en.json      # Bio en inglés
```

**`src/i18n/es.json` (ejemplo):**
```json
{
  "nav": {
    "home": "Inicio",
    "blog": "Blog",
    "work": "Trabajos",
    "contact": "Contacto"
  },
  "home": {
    "eyebrow": "— Hola, soy un {role} en Panamá",
    "subtitle": "Construyo <em>sistemas digitales</em> que respetan al operador.",
    "ctaWork": "Ver mis trabajos",
    "ctaContact": "Contactar",
    "currentlyBrewing": "preparando café"
  },
  "blog": {
    "backToBlog": "Volver al blog",
    "previous": "← Anterior",
    "next": "Siguiente →",
    "viewAllTags": "Ver todos los tags #",
    "noPosts": "No hay artículos publicados todavía.",
    "noTagPosts": "No hay artículos con esta etiqueta.",
    "articlesWithTag": "{count} artículo{plural} con la etiqueta"
  },
  "work": {
    "backToWork": "Volver a trabajos",
    "visitProject": "Visitar proyecto",
    "noProjects": "No hay proyectos publicados todavía."
  },
  "contact": {
    "intro": "Puedes encontrarme en las siguientes redes sociales o enviarme un correo electrónico."
  }
}
```

### Helper de i18n

```typescript
// src/lib/i18n.ts
import es from '../i18n/es.json'
import en from '../i18n/en.json'

const translations = { es, en } as const

export type Locale = 'es' | 'en'

export function getTranslation(locale: Locale) {
  return translations[locale]
}

export function getLocaleFromUrl(url: URL): Locale {
  const path = url.pathname
  if (path.startsWith('/en/')) return 'en'
  return 'es'
}
```

## Dependencias

- **Fase 1**: Scaffolding completado
- **Fase 2**: Layout base + navegación completado
- **Fase 3**: Home page completada
- **Fase 4**: Colecciones de contenido completadas
- **Fase 5**: Página de proyectos completada
- **Fase 5B**: Exploración de diseños completada (home actual es el diseño final)

## Riesgos identificados

| Riesgo | Mitigación |
|--------|------------|
| URLs existentes cambian (breaking change para bookmarks) | Redirects de URLs antiguas a nuevas rutas `/es/...` |
| Contenido duplicado (ES/EN) sin relación clara | Convención de mismo slug en ambos idiomas |
| Build time se duplica (2x páginas) | Aceptable para sitio estático pequeño (~60 páginas) |
| Posts en inglés no existen aún | Crear al menos 1-2 posts de ejemplo en inglés como plantilla |
| Selector de idioma puede ser confuso | UI clara: "ES | EN" como links, idioma activo resaltado |
| `content.config.ts` necesita cambios para soportar subdirectorios | Usar `glob` con patrón `**/*.md` y filtrar por idioma en las páginas |
| `bio.json` actual se usa en `index.astro` | Actualizar imports para usar `src/i18n/bio-{lang}.json` |

## Referencias

- `specs/mission.md` — propósito del sitio, audiencia, valores de diseño
- `specs/tech-stack.md` — decisiones técnicas, i18n planificado con subdirectorios
- `specs/roadmap.md` — Fase 6 original
- [Astro i18n docs](https://docs.astro.build/en/guides/internationalization/) — routing, config
- [Astro content collections](https://docs.astro.build/en/guides/content-collections/) — organizar contenido por idioma
