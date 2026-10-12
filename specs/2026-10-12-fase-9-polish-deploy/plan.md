# Plan — Fase 9: Polish & Deploy

Plan secuencial. Cada grupo debe completarse antes de pasar al siguiente.
Marcar checkboxes al ejecutar.

## Grupo 1: Configuración del sitio

1. [x] Cambiar `site` en `astro.config.ts` de `https://teapartydev.com` a `https://adalgarcia.com`
2. [x] Verificar en `pnpm build`: `dist/sitemap-index.xml`, canonical y RSS apuntan a `adalgarcia.com`
3. [x] Confirmar con el dueño el acceso del hosting: **SFTP/SSH**, destino configurable por secreto (`public_html/` o subcarpeta), WordPress actual se conserva (deploy sin borrado)

> Extra del paso 2: `robots.txt` seguía apuntando a `teapartydev.com` y el JSON-LD
> `Person.url` también; ambos se corrigieron. Se excluyó `/en/404/` del sitemap.

## Grupo 2: Página 404 bilingüe

4. [x] Crear `src/pages/404.astro` (ES) usando `BaseLayout`, con mensaje, enlace a inicio y enlace a `/en/404/`
5. [x] Crear `src/pages/en/404.astro` (EN) con las mismas piezas en inglés
6. [x] Textos en `src/i18n/ui.ts` (sin texto hardcodeado)
7. [x] Verificar que `dist/404.html` se genera y que `/ruta-inexistente` muestra la página con el estilo del sitio

> Extra: la 404 lleva `noindex` (nuevo prop de `BaseLayout`) y `alternates` propios
> (`/404.html` ↔ `/en/404/`) en vez de hreflang calculado desde la ruta inexistente.

## Grupo 3: View Transitions y animaciones

8. [x] Añadir `<ClientRouter />` en `BaseLayout.astro`
9. [x] Reinicializar en `astro:page-load` los scripts de tema (dark/light), reveals (`IntersectionObserver`) y control del video de la taza
10. [x] Verificar que el toggle de tema persiste al navegar entre páginas
11. [x] Animación de entrada sutil en secciones y cards (utilidad `.stagger-in` con `--reveal-delay`, dentro de `src/styles/motion.css`)
12. [x] Hover states consistentes en cards de blog, trabajos y chips
13. [x] Envolver todas las animaciones nuevas en `@media (prefers-reduced-motion: reduce)` que las desactive

> Hallazgo corregido: el video de la taza **nunca cargaba**. La Fase 8 reescribió
> `index.astro` y perdió el script que inyectaba el `<source>` de
> `data-taza-defer`, dejando el hero vacío. Ahora el defer vive en `BaseLayout`
> (con `poster`, `preload` de metadatos y respeto a `prefers-reduced-motion`).
>
> Astro reemplaza los atributos de `<html>` en cada navegación (verificado en
> `astro/dist/transitions/swap-functions.js`), por lo que el script inline del
> tema necesita `data-astro-rerun`.

## Grupo 4: Responsive testing

14. [x] Revisar `/`, `/en/`, `/blog`, `/trabajos`, `/contacto`, un post y un proyecto en 375px, 768px y 1280px
15. [x] Corregir overflow horizontal, tipografía y espaciados encontrados
16. [x] Verificar tab order y foco visible tras los cambios de navegación

> Sin overflow horizontal en las 21 combinaciones (7 rutas × 3 anchos). Tab order
> lógico (brand → nav → GitHub → idioma → tema → contenido) con `:focus-visible`
> ámbar de 2 px en todos los elementos.
>
> Defectos encontrados y corregidos en esta revisión:
> - Imágenes 404 en las tarjetas del blog, el hero del post y los "relacionados"
>   (el frontmatter apunta a rutas públicas pero los jpg/png viven en
>   `src/assets/`); se resolvió con `resolveImageUrl()`.
> - `PostNav` y el `aria-label` del TOC tenían texto en español fijo en las
>   páginas `/en/`; ahora usan `ui.ts`.
> - Contraste insuficiente en tema claro (`.wp-role`, `.wp-card-subtitle`,
>   encabezados de card, brand del navbar) y nombres accesibles que no contenían
>   el texto visible (brand e idioma).

## Grupo 5: Deploy con GitHub Actions a Hostinger

17. [x] Crear `.github/workflows/deploy.yml`: trigger en `push` a `main` y `workflow_dispatch`; `pnpm install --frozen-lockfile`, `pnpm build`, subida de `dist/`
18. [x] Usar la acción de SFTP (`wlixcc/SFTP-Deploy-Action@v1.2.6`) con host, usuario, clave SSH y ruta como GitHub Secrets
19. [x] Configurar `pnpm` con `pnpm/action-setup` (lee `packageManager`), sin usar `npm`
20. [x] Deploy de prueba a subcarpeta: el destino se controla por secreto (`SFTP_TARGET_DIR`) o por el input `target_dir` del disparo manual
21. [x] Añadir `.htaccess` (raíz + `/en/`) para que la 404 se sirva por idioma
22. [x] Confirmar que el workflow no imprime secretos (los valida por presencia; `delete_remote_files: false`)

> Nota: el workflow sube el `.htaccess` de la raíz en un paso aparte porque el
> glob de `sftp` no incluye los dotfiles de primer nivel. El primero corre en
> verde cuando el dueño añada los secretos (no se puede probar desde local).

## Grupo 6: Lighthouse 90+

23. [x] Correr Lighthouse mobile y desktop sobre `/` y `/en/` (con `pnpm preview`, aún sin URL pública)
24. [x] Registrar scores en `validation.md` (Performance, A11y, Best Practices, SEO)
25. [x] Optimizar Performance: subset de fuentes (−91 % de peso), poster del hero y preload del elemento LCP
26. [x] Registrar la medición con `pnpm preview` y dejar marcado el pendiente de re-medir tras el DNS

## Grupo 7: Documentación y merge

- [x] Actualizar `specs/roadmap.md` (Fase 9 con los checks completados)
- [x] Actualizar `README.md` con el flujo de deploy (cómo publicar un post)
- [x] Commit de todos los cambios con prefijo `feat:`
- [x] Push de la rama
- [x] Crear PR
- [x] Validar criterios de éxito
- [ ] Mergear y limpiar (queda a decisión del dueño; el deploy se dispara al mergear)
