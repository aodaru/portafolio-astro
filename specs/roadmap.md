# Roadmap

> Basado en el análisis del tema WordPress existente y los features solicitados.
> Cada fase es un entregable funcional mínimo.

---

## Fase 1: Scaffolding
**Setup del proyecto y estructura base**

- [ ] Inicializar proyecto Astro con TypeScript
- [ ] Configurar Tailwind CSS (u otro framework decidido)
- [ ] Estructura de directorios: `src/components`, `src/layouts`, `src/content`, `src/pages`
- [ ] Crear `src/content/config.ts` para colecciones (blog, projects)
- [ ] Copiar assets estáticos desde `themeWp/` (imágenes, favicon)
- [ ] Configurar `astro.config.ts` con sitemap y RSS

**Entregable**: Proyecto corriendo en `localhost`, build sin errores.

---

## Fase 2: Layout base + Navegación
**Esqueleto visual del sitio**

- [ ] Layout global (`BaseLayout.astro`) con `<head>`, meta tags, footer
- [ ] Barra de navegación responsive (logo + enlaces: Inicio, Blog, Trabajos, Contacto)
- [ ] Dark/Light mode toggle funcional (persistencia en localStorage)
- [ ] Definir CSS custom properties para el sistema de colores (paleta nueva — rediseño completo)
- [ ] Footer con copyright y redes sociales

**Entregable**: Navegación entre páginas placeholder, dark/light mode funcionando.

---

## Fase 3: Home Page
**Página principal con bio y contenido estático**

- [ ] Hero section: avatar + nombre + título profesional
- [ ] Sección "Bio" / línea de tiempo profesional (datos desde YAML/JSON)
- [ ] Sección "Pasatiempos"
- [ ] Sección "Trabajos" — resumen con enlace a página de proyectos
- [ ] Sección "Contacto" — redes sociales (GitHub, Twitter, LinkedIn, etc.)

**Entregable**: Home page similar en contenido a la actual `index.html` pero con nuevo diseño.

---

## Fase 4: Colecciones de Contenido
**Blog posts y proyectos desde Markdown**

- [ ] Blog: crear 2-3 posts de ejemplo en `src/content/blog/es/`
- [ ] Proyectos: crear 2-3 proyectos de ejemplo en `src/content/projects/`
- [ ] Frontmatter con: title, date, description, tags, image, draft
- [ ] Página `/blog` con listado de posts (tarjetas, paginación básica)
- [ ] Página `/blog/[slug]` con layout de post individual
- [ ] Tags: taxonomía simple, páginas por tag (`/blog/tags/[tag]`)

**Entregable**: Blog funcional con markdown, listado y detalle.

---

## Fase 5: Página de Proyectos / Trabajos
**Galería de trabajos destacados**

- [ ] Página `/trabajos` (o `/projects`) con grid de proyectos
- [ ] Cada proyecto: thumbnail, título, descripción corta, tags, enlace
- [ ] Página individual de proyecto (`/trabajos/[slug]`)
- [ ] Migrar datos de `themeWp/trabajos.html` y `themeWp/Works/`

**Entregable**: Sección de portafolio completa.

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
- [ ] Sitemap.xml automático (`@astrojs/sitemap`)
- [ ] RSS feed para blog (`@astrojs/rss`)
- [ ] Imágenes optimizadas con `astro:assets` y WebP
- [ ] Lighthouse 90+ (performance, accessibility, SEO, best practices)
- [ ] Google Tag Manager integrado (via Partytown)
- [ ] `robots.txt`

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
