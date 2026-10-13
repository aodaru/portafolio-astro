# Validación — Fase 9: Polish & Deploy

## Estado de la fase

**🟡 IMPLEMENTADA — pendiente de merge, de los secretos del hosting y de la re-medición tras el DNS**

## Criterios de éxito

### 1. Configuración

- [x] `site` en `astro.config.ts` es `https://adalgarcia.com`
- [x] `sitemap-index.xml`, canonical y RSS usan `https://adalgarcia.com`
      (+ `robots.txt` y el JSON-LD `Person` corregidos en el mismo paso)

### 2. Página 404

- [x] `/ruta-inexistente` muestra 404 en español con enlace a `/` y a `/en/404/`
- [x] `/en/404/` muestra 404 en inglés (en local vía URL directa; en el hosting,
      `public/en/.htaccess` la sirve para cualquier ruta bajo `/en/`)
- [x] Textos en `src/i18n/ui.ts`, sin hardcodear
- [x] `noindex, follow` en ambas 404 y `/en/404/` fuera del sitemap

### 3. View Transitions y animaciones

- [x] Navegación entre páginas sin recarga completa (`ClientRouter` activo;
      `window` sobrevive a la navegación y el `<html>` se reemplaza por swap)
- [x] Tema dark/light persiste y se aplica tras navegar (probado: toggle →
      navegar → el tema y el icono siguen correctos)
- [x] Reveals y video de la taza funcionan tras navegar (7/7 `data-reveal`
      visibles y `<video>` en `readyState 4` reproduciendo)
- [x] Animaciones nuevas visibles en light y dark
- [x] `prefers-reduced-motion: reduce` desactiva las animaciones nuevas
      (`src/styles/motion.css`, y el JS marca los reveals visibles sin observer)

### 4. Responsive

- [x] 375px: sin overflow horizontal en `/`, `/en/`, `/blog`, `/trabajos`,
      `/contacto`, un post y un proyecto
- [x] 768px: sin overflow horizontal en las mismas rutas
- [x] 1280px: sin overflow horizontal en las mismas rutas
- [x] Tab navega en orden lógico con foco visible (outline ámbar 2px)

### 5. Deploy

- [ ] El workflow `.github/workflows/deploy.yml` corre en verde desde `main` y con `workflow_dispatch`
      → **no verificable desde local**: requiere que el dueño cargue los 4
      secretos (`SFTP_HOST`, `SFTP_USERNAME`, `SFTP_SSH_KEY`, `SFTP_TARGET_DIR`)
      y la clave pública en `authorized_keys` del hosting
- [x] Credenciales solo en GitHub Secrets; el workflow las valida por presencia y
      nunca imprime valores; `delete_remote_files: false` (sin borrado remoto)
- [ ] El sitio desplegado carga `/` y `/en/` correctamente → depende del primer deploy
- [ ] `404.html` se sirve en rutas desconocidas → depende del primer deploy

### 6. Lighthouse (medición local con `pnpm preview`)

| Página | Dispositivo | Performance | A11y | Best Practices | SEO |
| ------ | ----------- | ----------- | ---- | -------------- | --- |
| `/`    | Mobile      | 97          | 100  | 100            | 100 |
| `/`    | Desktop     | 100         | 100  | 100            | 100 |
| `/en/` | Mobile      | 97          | 100  | 100            | 100 |
| `/en/` | Desktop     | 100         | 100  | 100            | 100 |

- [x] Las 4 categorías en 90+ en las 4 mediciones
- [x] Sin auditorías binarias fallidas en ninguna medición
- [ ] Re-medición sobre la URL pública tras el cambio de DNS (apuntada en el roadmap)

Métricas de la medición mobile (`/`): FCP 2,0 s · LCP 2,3 s · TBT 0 ms · CLS 0 ·
Speed Index 2,0 s · peso total 479 KB. Antes de las optimizaciones de esta fase:
Performance 59, FCP 6,8 s, LCP 11,4 s, peso 2 213 KB.

## Cómo verificar

```bash
# Desde la raíz del proyecto (pnpm, sin npm/npx)
pnpm check
pnpm build

# Verificar dominio, 404 y sitemap
grep -o 'https://adalgarcia.com' dist/sitemap-index.xml | head -1
test -f dist/404.html && test -f dist/en/404/index.html && echo "404 OK"
grep -o 'rel="canonical"[^>]*' dist/index.html
grep -c 404 dist/sitemap-0.xml        # debe ser 0

# Servir el build y probar
pnpm preview
# Abrir http://localhost:4321/ y /en/, /ruta-inexistente, /en/404/
# DevTools: responsive (375 / 768 / 1280), emular prefers-reduced-motion
# Lighthouse: mobile + desktop sobre / y /en/
```

## Criterio de merge a main

- [x] Criterios de código/UI marcados (los de deploy requieren el hosting)
- [x] PR abierto
- [x] Validación manual ejecutada (build, navegador, Lighthouse)

## Anti-criterios (lo que NO debe pasar)

- ✅ Sin credenciales FTP/SFTP en el repo, `.env` versionado ni logs de Actions
- ✅ Deploy sin borrado remoto (`delete_remote_files: false`), WordPress intacto
- ✅ `site` = `https://adalgarcia.com` en producción
- ✅ 404 bilingüe con textos en `ui.ts` (sin hardcodear)
- ✅ Animaciones nuevas bajo `prefers-reduced-motion`
- ✅ Cero `npm`/`npx` en scripts y workflow (solo `pnpm`)
- ✅ Sin dependencias nuevas de runtime: la única adición es la acción de deploy,
      que la fase permite explícitamente

## Deuda conocida (fuera de alcance, documentada)

- **Contraste en tema claro**: quedan textos con `--gruvbox-yellow`/`--gruvbox-blue`
  sobre fondos claros en páginas fuera del alcance de Lighthouse (`/blog`,
  `/trabajos`, tags): títulos de post, fechas y tags quedan por debajo de 4.5:1.
  Se corrigió lo que audita Lighthouse (`/` y `/en/`, ambos temas) con el token
  `--gruvbox-yellow-ink` y ajustes de encabezados.
- **PHP/redirecciones del WordPress vivo**: migrar URLs indexadas del WP a las
  rutas de Astro (301) queda fuera de la fase.
- **Google Tag Manager**: diferido (decisión D1 de Fase 7).
