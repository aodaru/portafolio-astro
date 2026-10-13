# Requisitos — Fase 9: Polish & Deploy

## Alcance

Cerrar el MVP: pulir detalles visuales y de navegación, desplegar el sitio estático en el hosting Hostinger existente mediante GitHub Actions, y cerrar el pendiente de Lighthouse 90+ de la Fase 7.

### Incluido

- Deploy automático con GitHub Actions al hosting Hostinger existente (subida por FTP/SFTP), reemplazando la subida manual por FTP
- Ajuste de `site` en `astro.config.ts` a `https://adalgarcia.com` (dominio definitivo)
- Página 404 personalizada, bilingüe ES/EN
- View Transitions entre páginas (`ClientRouter` de Astro)
- Animaciones sutiles de entrada y hover, con `prefers-reduced-motion`
- Revisión responsive (mobile, tablet, desktop) en `/`, `/en/`, `/blog`, `/trabajos`, `/contacto` y un post
- Re-medición de Lighthouse mobile + desktop en `/` y `/en/` sobre la URL de despliegue, con objetivo 90+ en las 4 categorías

### No incluido

- Configuración de DNS, dominio y HTTPS: lo hace el dueño manualmente al subir el sitio
- Migración de URLs del WordPress vivo a las rutas de Astro (redirecciones 301 masivas)
- Google Tag Manager (diferido, decisión D1 de Fase 7)
- Comentarios, buscador, página `/now`, analytics (Fase 10)
- Cambios de identidad visual, paleta o contenido

## Decisiones

| ID  | Decisión | Racional | Alternativa descartada |
| --- | -------- | -------- | ---------------------- |
| D1 | Hosting: **Hostinger** existente, con deploy automático desde GitHub Actions por **SFTP con clave SSH** | Aprovecha el plan de hosting ya pagado; el sitio es 100% estático, que es lo que Hostinger permite publicar. El dueño confirmó acceso SFTP/SSH, así que no hace falta FTP con contraseña | Cloudflare Pages (tech-stack.md): gratuito y con preview por PR, pero añade un proveedor nuevo cuando el hosting actual ya cubre la necesidad. FTP-Deploy-Action: descartada al haber SFTP |
| D2 | `site` pasa de `https://teapartydev.com` a `https://adalgarcia.com` | Canonical, sitemap, RSS y OG deben apuntar al dominio definitivo. Hoy el valor no coincide con el dominio del dueño | Mantener `teapartydev.com` (rompería canonical y sitemap en producción) |
| D3 | Deploy solo desde `main` (y disparo manual `workflow_dispatch`) | Evita publicar ramas de trabajo; un solo punto de publicación | Deploy en cada push a cualquier rama |
| D4 | Credenciales SSH en **GitHub Secrets**, nunca en el repo; la clave privada se pasa por `ssh_private_key` y el workflow solo valida su presencia | Requisito de seguridad; `AGENTS.md` y la política de secretos del proyecto | Credenciales en el workflow o en `.env` versionado |
| D5 | 404 bilingüe: `src/pages/404.astro` (ES → `dist/404.html`) y `src/pages/en/404.astro` (EN → `dist/en/404/`) con `noindex`, servidas vía `ErrorDocument` de `.htaccess` (raíz y `/en/`) | Mantiene la i18n del sitio y no requiere lógica en el hosting | 404 única en inglés o español; rewrite del servidor a una sola página |
| D6 | View Transitions con `ClientRouter` de Astro | API nativa de Astro, sin dependencias nuevas; navegación fluida en blog y trabajos | Librerías externas de transición (dependencia nueva) |
| D7 | Animaciones solo con CSS y `IntersectionObserver`; todo bajo `prefers-reduced-motion: reduce` | Reutiliza el patrón de Fase 8; sin dependencias nuevas | Librerías de animación (GSAP, Motion) |
| D8 | Lighthouse se mide sobre la URL de despliegue (o `pnpm preview` si aún no hay URL pública) | El 90+ de Performance depende de servidor y red reales; `pnpm preview` queda como referencia local | Dar Lighthouse por cerrado con medición solo local |
| D9 | Destino del deploy configurable: secreto `SFTP_TARGET_DIR` + input `target_dir` en el disparo manual; `delete_remote_files: false` | Permite probar en una subcarpeta antes de tocar `public_html/` y garantiza que el workflow nunca borre el WordPress vivo | Ruta fija en el YAML y deploy destructivo a la raíz |

## Contexto

- **Hosting**: Hostinger, plan compartido con **acceso SFTP/SSH confirmado por el dueño**. La carpeta destino debe existir (el deploy usa `sftp_only: true`, que no crea directorios).
- **Dominio**: `adalgarcia.com` apunta hoy al WordPress vivo. El dueño cambiará DNS al subir el sitio, fuera de esta fase.
- **Build**: `pnpm build` genera `dist/` (SSG). El deploy sube solo el contenido de `dist/`.
- **Lighthouse baseline (Fase 7, local con `pnpm preview`)**: 90 desktop / 60 mobile en Performance; A11y, Best Practices y SEO en 100. El hero usa video de taza con `poster` y `preload="metadata"`.
- **Peso (Fase 7)**: 2 213 KB totales, de los cuales ~1 980 KB eran las fuentes (Mononoki/MesloLG venían parcheadas con +10 000 codepoints de Nerd Fonts).
- **Fase 8**: home y post rediseñados; `IntersectionObserver` para reveals ya existente; `prefers-reduced-motion` respetado en animaciones nuevas.
- **i18n**: rutas ES en raíz y EN bajo `/en/`; `prefixDefaultLocale: false`.

## Dependencias

- **Fase 7**: Lighthouse pendiente de re-medición en deploy preview; `site` y OG/canonical ya implementados.
- **Fase 8**: home y post rediseñados; deben quedar estables antes del deploy.
- **Fase 6**: i18n necesaria para 404 bilingüe.

## Riesgos identificados

| Riesgo | Mitigación |
| ------ | ---------- |
| Hostinger no admite SFTP/SSH en el plan actual | Usar FTP-Deploy-Action con FTP; validar primero con un deploy de prueba a subcarpeta |
| El deploy borra archivos del hosting (p. ej. el WordPress vivo) al subir a la raíz | Deploy a `public_html/` solo tras confirmar con el dueño; no usar modo "clean slate" sin backup |
| Cambiar DNS a Astro deja sin acceso las URLs antiguas de WordPress | Fuera de alcance; antes del cambio de DNS revisar URLs indexadas y decidir redirecciones |
| View Transitions rompen scripts de inicialización (tema, reveals, video del hero) | Reinicializar en `astro:page-load` y probar navegación entre páginas en ambos temas |
| Lighthouse Performance < 90 en mobile por el video del hero | Ya hay `poster` y `preload="metadata"`; medir en URL real antes de optimizar más; registrar resultado si no se alcanza |
| Credenciales FTP filtradas en logs de Actions | Usar GitHub Secrets; no imprimir variables; revisar logs antes de compartir |
| `site` incorrecto genera canonical y sitemap erróneos | Verificar `dist/sitemap-index.xml`, `<link rel="canonical">` y RSS tras el build |
| El deploy no incluye los `.htaccess` (dotfiles) y la 404 no se sirve en el hosting | El `.htaccess` de la raíz se sube en un paso explícito del workflow, además del glob de `dist/*` |
| Lighthouse mobile < 90 por peso de fuentes y video | Subset de fuentes con `pyftsubset` (−91 %), `poster` del hero y preload del elemento LCP; verificado en la medición local (59 → 97) |
