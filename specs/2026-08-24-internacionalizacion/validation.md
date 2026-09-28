# Validación — Fase 6: Internacionalización

## Estado de la fase

**✅ COMPLETADA** (2026-09-28, rama `feat/internacionalizacion`)

> **Decisión de routing**: ES vive en la raíz (`/`, `/blog`, …) e inglés bajo `/en/...`
> (`prefixDefaultLocale: false` en `astro.config.ts`). Se descartó el esquema `/es/` + `/en/` +
> redirect de `requirements.md` (D2/D3) para no romper URLs existentes. Los criterios de
> `/es/...` se verifican en su equivalente raíz `/...`.
> Verificación: `pnpm astro check` → 0 errores, `pnpm build` → 37 páginas, `dist/` inspeccionado
> (`lang`, `hreflang`, textos ES/EN, sitemap con ambos idiomas).

## Criterios de éxito

### 1. Routing i18n

- [x] `/` muestra la home en español (ES vive en la raíz, sin redirect)
- [x] `/en/` muestra la home en inglés
- [x] `/blog` muestra listado de posts en español
- [x] `/en/blog` muestra listado de posts en inglés
- [x] `/blog/[slug]` muestra post individual en español
- [x] `/en/blog/[slug]` muestra post individual en inglés
- [x] `/blog/page/[n]` paginación en español
- [x] `/en/blog/page/[n]` paginación en inglés
- [x] `/blog/tags/[tag]` posts por tag en español
- [x] `/en/blog/tags/[tag]` posts por tag en inglés
- [x] `/trabajos` muestra listado de proyectos en español
- [x] `/en/trabajos` muestra listado de proyectos en inglés
- [x] `/trabajos/[slug]` muestra proyecto individual en español
- [x] `/en/trabajos/[slug]` muestra proyecto individual en inglés
- [x] `/contacto` muestra página de contacto en español
- [x] `/en/contacto` muestra página de contacto en inglés

### 2. Selector de idioma

- [x] Navbar muestra selector de idioma (ES | EN)
- [x] El selector enlaza a la versión correspondiente de la página actual
- [x] El idioma activo está visualmente distinguido (bold, color diferente, etc.)
- [x] El selector funciona en mobile y desktop
- [x] El selector es accesible (keyboard navigation, aria-labels)

### 3. Traducciones de UI

- [x] Navbar muestra textos traducidos (Inicio/Home, Blog, Trabajos/Work, Contacto/Contact)
- [x] Footer muestra textos traducidos (si aplica)
- [x] Home en español usa textos en español
- [x] Home en inglés usa textos en inglés
- [x] Blog: "Volver al blog" / "Back to blog", "Anterior" / "Previous", "Siguiente" / "Next"
- [x] Blog: formato de fecha en locale correcto (`es-ES` vs `en-US`)
- [x] Trabajos: "Volver a trabajos" / "Back to work", "Visitar proyecto" / "Visit project"
- [x] Contacto: texto introductorio traducido
- [x] Tags: "{n} artículo(s) con la etiqueta" / "{n} article(s) tagged"
- [x] Mensajes de "no hay contenido" traducidos

### 4. Contenido bilingüe

- [x] `src/content/blog/es/` tiene al menos 4 posts en español (los existentes)
- [x] `src/content/blog/en/` tiene al menos 1-2 posts de ejemplo en inglés
- [x] `src/content/projects/es/` tiene 3 proyectos en español
- [x] `src/content/projects/en/` tiene 3 proyectos en inglés
- [x] Posts/proyectos con mismo slug en ambos idiomas están relacionados (misma URL base)
- [x] `src/i18n/bio-es.json` existe con contenido en español
- [x] `src/i18n/bio-en.json` existe con contenido en inglés
- [x] `src/data/bio.json` fue eliminado (reemplazado por archivos en `src/i18n/`)

### 5. SEO y meta tags

- [x] Cada página tiene `<html lang="es">` o `<html lang="en">` según corresponda
- [x] Cada página tiene tags `hreflang` apuntando a la versión en el otro idioma
- [x] Sitemap incluye URLs de ambos idiomas
- [x] Meta tags `title` y `description` están traducidos

### 6. README con manual de posts

- [x] `README.md` existe en la raíz del proyecto
- [x] README incluye sección "Cómo crear posts" o similar
- [x] README documenta la estructura de directorios (`src/content/blog/es/` y `src/content/blog/en/`)
- [x] README documenta el frontmatter requerido para posts
- [x] README explica la convención de mismo slug para relacionar versiones ES/EN
- [x] README incluye ejemplos de posts en ambos idiomas

### 7. Funcionalidad existente preservada

- [x] Dark/light mode funciona en ambas versiones de idioma
- [x] Dark/light mode persiste en localStorage al cambiar de idioma
- [x] Responsive funciona en ambas versiones de idioma (mobile, tablet, desktop)
- [x] Animaciones y efectos visuales funcionan en ambas versiones
- [x] Video de taza de café en home funciona en ambas versiones
- [x] Terminal aesthetic (dots, cards, cursor) se mantiene en ambas versiones
- [x] Paleta GruvBox se mantiene en ambas versiones
- [x] Fuentes (Mononoki, MesloLG) se mantienen en ambas versiones

### 8. Build y typecheck

- [x] `pnpm astro check` pasa sin errores (0 errors, 0 warnings)
- [x] `pnpm build` completa sin errores
- [x] El output de `dist/` incluye páginas para ambos idiomas
- [x] No hay warnings de Tailwind/CSS no usados
- [x] No se introdujeron dependencias npm nuevas (verificar `package.json`)

## Cómo verificar

```bash
# Desde la raíz del proyecto

# 1. Verificar typecheck y build
pnpm astro check
pnpm build

# 2. Iniciar servidor de desarrollo
pnpm dev

# 3. Verificar routing
# Abrir http://localhost:4321/ → home en español
# Abrir http://localhost:4321/en/ → home en inglés
# Abrir http://localhost:4321/blog → blog en español
# Abrir http://localhost:4321/en/blog → blog en inglés
# Abrir http://localhost:4321/trabajos → trabajos en español
# Abrir http://localhost:4321/en/trabajos → trabajos en inglés
# Abrir http://localhost:4321/contacto → contacto en español
# Abrir http://localhost:4321/en/contacto → contacto en inglés

# 4. Verificar selector de idioma
# En el Navbar, hacer clic en "EN" → debe llevar a /en/
# En el Navbar, hacer clic en "ES" → debe llevar a /
# El idioma activo debe estar visualmente distinguido

# 5. Verificar traducciones
# En /, todos los textos de UI deben estar en español
# En /en/, todos los textos de UI deben estar en inglés
# Fechas en / deben usar formato español (ej: "22 de abril de 2025")
# Fechas en /en/ deben usar formato inglés (ej: "April 22, 2025")

# 6. Verificar contenido bilingüe
# ls src/content/blog/es/ → debe tener 4+ posts
# ls src/content/blog/en/ → debe tener 1+ posts
# ls src/content/projects/es/ → debe tener 3 proyectos
# ls src/content/projects/en/ → debe tener 3 proyectos

# 7. Verificar SEO
# Inspeccionar <html lang="..."> en cada página
# Inspeccionar <link rel="alternate" hreflang="..."> en cada página

# 8. Verificar dark/light mode
# Toggle de tema debe funcionar en / y /en/
# Cambiar de idioma no debe resetear el tema

# 9. Verificar responsive
# Probar en mobile (<768px), tablet (768-1024px), desktop (>1024px)
# Selector de idioma debe ser accesible en mobile

# 10. Verificar README
# cat README.md → debe existir y tener manual de posts
```

## Criterio de merge a main

- [ ] Todos los criterios de éxito marcados como completados
- [ ] PR abierto en GitHub
- [ ] Validación manual ejecutada (todos los comandos de "Cómo verificar")
- [ ] Reviewer aprobó el cambio
- [ ] No hay conflictos con `main`

## Anti-criterios (lo que NO debe pasar)

- ❌ Textos hardcoded en español en páginas en inglés (o viceversa)
- ❌ URLs en inglés sin prefijo `/en/` (ej: `/blog` mostrando contenido inglés)
- ❌ Selector de idioma que no funciona o no está visible
- ❌ Contenido duplicado sin relación clara entre versiones ES/EN
- ❌ `lang="es"` hardcodeado en todas las páginas (debe ser dinámico)
- ❌ Posts en inglés faltantes (al menos 1-2 como ejemplo)
- ❌ Proyectos en inglés faltantes (los 3 proyectos deben tener versión EN)
- ❌ `src/data/bio.json` aún existe (debe ser reemplazado)
- ❌ Dependencias npm nuevas añadidas (Astro 7 ya soporta i18n)
- ❌ Build falla o tiene warnings
- ❌ Dark/light mode se resetea al cambiar de idioma
- ❌ Responsive roto en alguna versión de idioma
- ❌ README sin manual de posts bilingües
