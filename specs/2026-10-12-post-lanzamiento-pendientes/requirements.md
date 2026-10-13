# Requisitos — Post-lanzamiento: cierre de pendientes

## Alcance

Cerrar todo lo que quedó abierto tras el lanzamiento, sin abrir features nuevas.
El sitio está publicado y el deploy funciona; lo que falta es sanear
documentación, corregir dos bugs conocidos, completar el contenido en inglés y
recuperar la deuda de SEO dejada por la migración del WordPress.

### Incluido

- Merge de la documentación del primer deploy (`docs/deploy-changelog`)
- Sincronización de `specs/roadmap.md` y `specs/tech-stack.md` con el estado real
- Corrección del bug de zona horaria en el formateo de fechas
- Fix del efecto glass del navbar: conservar `backdrop-filter` sin prefijo y devolver el fondo semitransparente del WordPress
- Contraste ≥ 4.5:1 en tema claro en `/blog`, `/trabajos` y tags (deuda declarada en la Fase 9)
- Traducción al inglés de los 3 posts que faltan (`docker`, `omarchy`, `terminal`)
- Medición de Lighthouse sobre la URL pública
- Redirecciones 301 desde las URLs indexadas del WordPress anterior
- Limpieza de ramas mergeadas y registro de la limpieza de hosting

### No incluido

- **Fase 10 completa** (comentarios, buscador, `/now`, analytics, modo print del CV): queda **en standby** por decisión del dueño
- Google Tag Manager / Partytown (sigue diferido, decisión D1 de la Fase 7)
- Cambios de identidad visual, paleta o rediseños
- Suite de tests (Vitest/Playwright): la validación sigue siendo `astro check` + build + navegador
- Cambios en el workflow de deploy o en la configuración de secretos
- Migración de contenido distinta de las 3 traducciones

## Decisiones

| ID  | Decisión | Racional | Alternativa descartada |
| --- | -------- | -------- | ---------------------- |
| D1  | La **Fase 10 queda en standby**: no se borra del roadmap, se anota como parada | El dueño no la va a hacer; borrarla perdería el registro de la intención original | Eliminar la sección del roadmap o dejarla como pendiente activa |
| D2  | La documentación del deploy real entra **primero**, antes de tocar código | `changelog.md` y `tech-stack.md` describen hoy un estado que no es el real (dominio "por migrar"); cualquier trabajo posterior se documenta sobre una base falsa | Dejar `docs/deploy-changelog` para el final o descartarla |
| D3  | Se borra `docs/fase-9-deploy-real` **sin mergear** | Su contenido ya está en `main` por squash (`0064121`); no hay nada que aporte | Rebasearla por inercia |
| D4  | Las traducciones EN usan **slug en inglés + `translationKey`**, no el slug español | Es el patrón ya establecido por el par `primer-post` ↔ `first-post`; el `hreflang` se apoya en `translationKey` | Reutilizar el slug español (URLs en inglés con palabras en español) |
| D5  | El contraste se corrige **extendiendo el patrón `*-ink`** de la Fase 9, no cambiando la paleta GruvBox | `--gruvbox-yellow-ink` ya resolvió el mismo problema en la home sin alterar los colores de marca | Ajustar los colores base (afectaría a bordes, iconos y fondos) |
| D6  | El glass se arregla en **dos frentes**: conservar `backdrop-filter` sin prefijo en el build **y** devolver el fondo `rgba` al 50 % del WP | El prefijo solo no basta: el navbar quedó con fondo `transparent` y sobre el fondo plano de `body` el blur no se percibe | Solo recuperar el prefijo (deja el efecto invisible) |
| D7  | Las 301 se implementan en `public/.htaccess` versionado | El repo es la fuente de verdad del hosting: `public/.htaccess` ya se copia en cada deploy, así que editar hPanel a mano se perdería | Escribir las reglas directamente en el hosting |
| D8  | Lighthouse se mide sobre `https://adalgarcia.com` y sus números locales quedan como referencia | El 90+ de Performance depende de servidor y red reales; la Fase 9 solo midió con `pnpm preview` | Dar la fase por cerrada con la medición local |
| D9  | La limpieza de hosting que no se resuelve desde el repo se **documenta**, no se ejecuta a ciegas | Borrar `default.php` o quitar la ed25519 de `authorized_keys` son acciones del dueño sobre el servidor | Tocarlas por SSH sin confirmación |

## Contexto

- **Estado de partida**: `main` = `0064121`, árbol limpio, en sincronía con `origin/main`. El sitio responde 200 en `/`, `/en/`, `/blog/`, `/trabajos/`, `/contacto/` y `/en/`, con 404 propia en ambos idiomas.
- **Hosting**: Hostinger, `89.116.192.41:65002`, usuario `u320789160`, destino `/home/u320789160/domains/adalgarcia.com/public_html/`. DNS por Cloudflare con SSL emitido.
- **Deploy**: GitHub Actions por SFTP (`wlixcc/SFTP-Deploy-Action`), solo `main` o `workflow_dispatch`, `delete_remote_files: false`. La clave debe ser **RSA en PEM** (el action usa libcrypto y rechaza el formato OpenSSH de ed25519).
- **Build**: Astro 7.2.4 (SSG) + Tailwind 4. `pnpm build` genera `dist/`. El CSS se minifica con sintaxis de Lightning CSS (visible en `@media (width<=991.98px)`).
- **i18n**: español en la raíz e inglés bajo `/en/` (`prefixDefaultLocale: false`). Helpers en `src/i18n/utils.ts` (UI) y `src/i18n/content.ts` (contenido).
- **Contenido**: 4 posts ES y 1 EN; 3 proyectos por idioma.
- **Sin suite de tests**: la validación es `astro check`, build y navegador.
- **Gestor de paquetes**: `pnpm`. Nunca `npm`/`npx`.

## Dependencias

- **Fase 7**: deja abiertos el Lighthouse sobre URL pública y el GTM diferido.
- **Fase 9**: dejó como deuda conocida el contraste en tema claro y las 301 del WordPress; el primer deploy resolvió los "pendientes del dueño" de esa fase.
- **Fase 6**: el patrón bilingüe y `translationKey` son la base de las traducciones del Grupo 5.
- **`docs/deploy-changelog`**: sin su merge, la documentación de referencia es incorrecta (ver D2).

## Riesgos identificados

| Riesgo | Mitigación |
| ------ | ---------- |
| El fix de la minificación del CSS reordena o descarta otras propiedades del mismo archivo (`transition` del tema, `mask-icon`, etc.) | Comparar el CSS de `dist/` antes y después; el cambio debe tocar solo el recorte del prefijo |
| Cambiar el fondo del navbar altera el contraste del brand y de los enlaces | Verificar contraste de los textos del navbar en ambos temas tras el cambio (hay precedente de regresión: `--gruvbox-yellow-ink`) |
| Los tokens `*-ink` nuevos rompen el contraste en tema oscuro | El tema oscuro ya cumple; los tokens se definen por tema y se verifica en ambos |
| Las 301 mal escritas generan bucles o secuestran rutas nuevas (`/blog/*`, `/en/*`) | Probar cada regla con `curl -sI`; comprobar los dos saltos y que las rutas nuevas sigan en 200 |
| No hay copia de las URLs indexadas del WordPress en el repositorio | El inventario (paso 27) es un entregable del dueño; sin él, el Grupo 7 se bloquea en lugar de inventar reglas |
| Las traducciones cambian `hreflang`, sitemap y RSS | Verificar los tres tras el build; los pares sin traducción no deben anunciar un idioma inexistente |
| Lighthouse en producción sale por debajo de 90 por red o por el proxy de Cloudflare | Registrar el resultado real; si baja, aislar si es red o sitio antes de tocar código |
| Volver a medir fechas puede exponer otros posts con la misma desviación | Verificar el listado completo en ambos idiomas, no solo un post |
