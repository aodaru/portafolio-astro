# Plan — Post-lanzamiento: cierre de pendientes

Plan secuencial. Cada grupo debe completarse antes de pasar al siguiente.
Marcar checkboxes al ejecutar.

> Alcance aprobado: **todo lo pendiente salvo la Fase 10**, que queda en standby
> (ver `specs/roadmap.md` y decisión D1 en `requirements.md`).

## Grupo 1: Sincronizar la documentación del deploy

1. [ ] Mergear (o rebasar) la rama `docs/deploy-changelog` en esta rama de trabajo
   - Trae la entrada "Primer deploy a producción" de `changelog.md` (~76 líneas)
   - Trae `specs/tech-stack.md` con el host, el puerto y el formato de clave reales
   - `AGENTS.md` y `README.md` de esa rama ya están en `main` (entraron en `0064121`): no deben volver a aplicarse
2. [ ] Borrar la rama `docs/fase-9-deploy-real` (local y remota)
   - Su único commit (`5c8aed1`) ya entró en `main` por squash; el diff contra `main` está vacío
3. [ ] Actualizar `specs/roadmap.md` a la realidad
   - Línea 171: "Dominio personalizado y HTTPS" → marcarlo `[x]` (hecho: `adalgarcia.com` responde 200 por HTTPS)
   - Línea 172: "Re-medición de Lighthouse sobre la URL pública" → se queda `[ ]` hasta el Grupo 6
   - Sección "Fase 10: Post-lanzamiento (futuro)" → añadir nota de **standby** (no se elimina)
4. [ ] Ajustar `specs/tech-stack.md` si algún punto cambió (contraste del Grupo 4, 301 del Grupo 7)
5. [ ] Verificar que no queden referencias a "pendiente del dueño" ya resueltas
   - `changelog.md` sección "Pendiente del dueño" de la Fase 9 (ya resuelta por el primer deploy)

## Grupo 2: Bug de fechas en zona horaria

6. [ ] Corregir `formatDate()` en `src/i18n/utils.ts` para fijar `timeZone: 'UTC'`
   - Hoy `date: 2026-01-01` (medianoche UTC) se muestra como 31 de diciembre en UTC-5
7. [ ] Repasar todos los consumidores de `formatDate` para descartar dobles conversiones
   - Listado del blog, post individual, `PostNav`, RSS y páginas de tags
8. [ ] Verificar en navegador que la fecha del post coincide con el frontmatter en ES y EN
   - Comparar con lo que emite el RSS (`/rss.xml`, `/en/rss.xml`)

## Grupo 3: Efecto glass del navbar

9. [ ] Diagnosticar por qué el build deja solo `-webkit-backdrop-filter`
   - Comparar `src/styles/components/navbar.css` con el CSS generado en `dist/`
   - El CSS minificado ya usa sintaxis de Lightning CSS (`@media (width<=991.98px)`): confirmar si el recorte viene de ahí y con qué targets
10. [ ] Corregir la minificación para que se conserve `backdrop-filter` sin prefijo
    - Verificar que el fix no reordene ni descarte otras propiedades del mismo archivo
11. [ ] Devolver el fondo semitransparente del navbar, como el WordPress original
    - El WP usaba `rgba(var(--bs-secondary-bg-rgb), 0.5)`; aquí el fondo es `transparent`, así que el blur no se percibe sobre fondo plano
    - El tinte debe salir de un token de la paleta, no de un valor suelto
12. [ ] Comprobar que el efecto también aparece en footer, `.terminal-card` y `.blog-card`
    - Son los otros selectores afectados por el mismo recorte
13. [ ] Verificar en `dist/` que el CSS contiene `backdrop-filter` **y** `-webkit-backdrop-filter`

## Grupo 4: Contraste en tema claro

14. [ ] Auditar contraste en las rutas fuera del alcance de Lighthouse
    - `/blog`, `/blog/[slug]`, `/blog/tags`, `/blog/tags/[tag]`, `/trabajos`, `/trabajos/[slug]` y sus pares `/en/`
    - Puntos ya identificados: `.blog-card-date` y `.blog-card-title` (`src/styles/components/blog.css`), fechas/títulos/tags en `/trabajos` y tags
15. [ ] Extender los tokens de tinta que introdujo la Fase 9 (`--gruvbox-yellow-ink`)
    - Añadir equivalentes legibles para los grises y azules que se usan como texto en tema claro
16. [ ] Sustituir los usos de texto por los tokens nuevos
17. [ ] Verificar contraste ≥ 4.5:1 en ambos temas sobre los elementos corregidos

## Grupo 5: Contenido en inglés

18. [ ] Traducir `src/content/blog/es/docker.md` → `src/content/blog/en/docker.md` (~478 palabras)
19. [ ] Traducir `src/content/blog/es/omarchy.md` → `src/content/blog/en/omarchy.md` (~511 palabras)
20. [ ] Traducir `src/content/blog/es/terminal.md` → `src/content/blog/en/terminal.md` (~384 palabras)
21. [ ] Asignar `translationKey` en cada par ES/EN para que el `hreflang` se genere solo
    - El slug en inglés puede ser distinto del español (`primer-post` ↔ `first-post` es el precedente)
22. [ ] Conservar `tags`, `image` y `date` del original; los tags ya siguen el patrón bilingüe existente
23. [ ] Verificar el resultado
    - `/en/blog` lista 4 posts
    - `hreflang` correcto en cada par (y ausente en los que no tengan par)
    - `sitemap-0.xml` incluye las rutas nuevas y `/en/rss.xml` las publica

## Grupo 6: Lighthouse sobre la URL pública

24. [ ] Medir Lighthouse mobile y desktop sobre `https://adalgarcia.com/` y `https://adalgarcia.com/en/`
25. [ ] Registrar los resultados en `validation.md` (Performance, A11y, Best Practices, SEO)
26. [ ] Si algo queda por debajo de 90, abrir la corrección correspondiente y re-medir

## Grupo 7: Redirecciones 301 del WordPress

27. [ ] Inventariar las URLs indexadas del WordPress anterior
    - Fuentes: Search Console, sitemap del WP, backup de la base, `themeWp/*.html`
    - No hay copia del `sitemap.xml` del WP en el repositorio: la lista la tiene el dueño
28. [ ] Construir el mapa URL vieja → ruta de Astro
    - Ojo con las variantes de slug: los posts ES cambiaron de ruta en la migración
29. [ ] Implementar las reglas en `public/.htaccess`
    - El repo es la fuente de verdad: las reglas van ahí, no a mano en hPanel
    - Colocarlas sin interferir con `ErrorDocument 404` ni con las rutas limpias
30. [ ] Verificar cada redirección contra producción
    - `curl -sI` debe devolver 301 y un `Location` a una ruta que responda 200
    - Comprobar que no hay bucles ni cadenas de más de un salto

## Grupo 8: Limpieza

31. [ ] Borrar las ramas locales ya mergeadas en `main`
    - `backup/fase-8-rediseno-home-20261012`, `feat/fase-5b-exploracion-disenos-home`, `feat/fase-8-port-i18n`, `feat/fase-8-rediseno-home`, `feat/fase-9-polish-deploy`, `feat/internacionalizacion`, `feat/seo-performance`
32. [ ] Borrar las ramas remotas correspondientes ya mergeadas
33. [ ] Dejar registrado el pendiente de hosting que no se resuelve desde el repo
    - `default.php` de Hostinger bajo `index.html` (inofensivo, borrable a mano)
    - La clave ed25519 antigua sigue en `authorized_keys` junto a la RSA en uso

## Grupo 9: Documentación y merge

- [ ] Actualizar `changelog.md` con un review por cambio relevante (fechas, glass, contraste, 301, traducciones)
- [ ] Actualizar el roadmap con lo que quede cerrado y lo que pase a standby
- [ ] `pnpm check` y `pnpm build` en verde
- [ ] Commit de todos los cambios
- [ ] Push de la rama
- [ ] Crear PR
- [ ] Validar criterios de éxito (`validation.md`)
- [ ] Mergear y limpiar
