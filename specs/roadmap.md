# Roadmap

> Basado en el análisis del tema WordPress existente y los features solicitados.
> Cada fase es un entregable funcional mínimo.

---

## Fase 1: Scaffolding
**Setup del proyecto y estructura base**

- [x] Inicializar proyecto Astro con TypeScript
- [x] Configurar Tailwind CSS (Tailwind 4 + Vite plugin)
- [x] Estructura de directorios: `src/components`, `src/layouts`, `src/content`, `src/pages`
- [x] Crear `src/content.config.ts` para colecciones (blog, projects)
- [x] Copiar assets estáticos desde `themeWp/` (imágenes, favicon, fuentes)
- [x] Configurar `astro.config.ts` con sitemap
- [x] Endpoint RSS para el blog (`/rss.xml`)

**Entregable**: Proyecto corriendo en `localhost`, build sin errores.

---

## Fase 2: Layout base + Navegación
**Esqueleto visual del sitio**

- [x] Layout global (`BaseLayout.astro`) con `<head>`, meta tags, footer
- [x] Barra de navegación responsive (logo + enlaces: Inicio, Blog, Trabajos, Contacto + GitHub)
- [x] Dark/Light mode toggle funcional (persistencia en localStorage)
- [x] Definir CSS custom properties (paleta GruvBox con variables `--gruvbox-*`, variantes light/dark)
- [x] Footer con copyright y redes sociales (GitHub, Twitter/X, LinkedIn)

**Entregable**: Navegación entre páginas placeholder, dark/light mode funcionando.

---

## Fase 3: Home Page
**Página principal con bio y contenido estático**

- [x] Hero section: avatar + nombre + título profesional
- [x] Sección "Bio" / línea de tiempo profesional (datos desde `src/data/bio.json`)
- [x] Sección "Pasatiempos"
- [x] Sección "Trabajos" — resumen con enlace a página de proyectos
- [x] Sección "Contacto" — redes sociales (GitHub, Twitter/X, LinkedIn)
- [x] Diseño terminal tipo GruvBox con tarjetas estilo ventanas

**Entregable**: Home page completa con diseño terminal GruvBox.

---

## Fase 4: Colecciones de Contenido
**Blog posts y proyectos desde Markdown**

- [x] Blog: crear 2-3 posts de ejemplo en `src/content/blog/es/`
- [x] Frontmatter con: title, date, description, tags, image, draft
- [x] Página `/blog` con listado de posts (tarjetas, paginación básica)
- [x] Página `/blog/[slug]` con layout de post individual
- [x] Tags: taxonomía simple, páginas por tag (`/blog/tags/[tag]`)

- [x] Proyectos: crear 1-2 proyectos de ejemplo adicionales en `src/content/projects/`
- [x] Paginación: implementar rutas `/blog/page/[n]` para navegar entre páginas

**Entregable**: Blog funcional con markdown, listado, detalle y paginación completa.

---

## Fase 5: Página de Proyectos / Trabajos
**Galería de trabajos destacados**

- [x] Página `/trabajos` con listado de proyectos (tarjetas terminal)
- [x] Cada proyecto: thumbnail, título, descripción corta, tags, enlace
- [x] Página individual de proyecto (`/trabajos/[slug]`)
- [x] Migrar datos de `themeWp/Works/` — 3 proyectos creados (intranet, sitios web, portafolio)
- [x] Migrar redes sociales de `themeWp/home.html` — Instagram + email en contacto

**Entregable**: Sección de portafolio completa.

---

## Fase 5B: Exploración de Diseños de Home
**Múltiples variantes de página de inicio para estudiar diseños**

- [ ] Crear ruta `/inicio1` con diseño alternativo (e.g. tarjetas, minimalista)
- [ ] Crear ruta `/inicio2` con diseño alternativo (e.g. landing moderno, hero grande)
- [ ] Crear ruta `/inicio3` con diseño alternativo (e.g. dashboard / grid estilo portafolio)
- [ ] Mantener la home actual (`/`) intacta como referencia
- [ ] Cada variante debe compartir el mismo contenido (bio.json) pero con layout y CSS distintos
- [ ] (Opcional) Enlace desde la barra de navegación para switchear entre variantes en desarrollo

**Entregable**: 3 páginas de inicio alternativas navegables, sin afectar la home actual.

---

## Fase 6: Internacionalización
**Soporte bilingüe español/inglés**

- [ ] Traducciones base (navegación, footer, títulos de secciones)
- [ ] Archivos JSON por idioma: `src/i18n/es.json`, `src/i18n/en.json`
- [ ] Ruteo `/es/...` y `/en/...` para contenido localizado
- [ ] Selector de idioma en navegación
- [ ] Posts en ambos idiomas con relación entre versiones

**Entregable**: Sitio completamente navegable en español e inglés.

---

## Fase 7: SEO + Performance
**Optimización para motores de búsqueda y velocidad**

- [ ] Meta tags dinámicos (title, description, OG) por página
- [x] Sitemap.xml automático (`@astrojs/sitemap`)
- [ ] RSS feed para blog (`@astrojs/rss`)
- [ ] Imágenes optimizadas con `astro:assets` y WebP
- [ ] Lighthouse 90+ (performance, accessibility, SEO, best practices)
- [ ] Google Tag Manager integrado (via Partytown)
- [x] `robots.txt`

**Entregable**: Sitio optimizado y listo para indexación.

---

## Fase 8: Polish & Deploy
**Detalles finales y puesta en producción**

- [ ] Página 404 personalizada
- [ ] Transiciones de página (View Transitions API)
- [ ] Animaciones sutiles (entrada de elementos, hover states)
- [ ] Responsive testing (mobile, tablet, desktop)
- [ ] Deploy a Cloudflare Pages / GitHub Pages
- [ ] Dominio personalizado y HTTPS

**Entregable**: Sitio en producción, accesible públicamente.

---

## Fase 9: Post-lanzamiento (futuro)
Mejoras posteriores al MVP

- [ ] Comentarios en blog (opción: Webmentions, Giscus)
- [ ] Buscador interno de posts
- [ ] Página "Ahora" (/now)
- [ ] Estadísticas con Plausible/Umami (autohosteado)
- [ ] Modo print para CV
