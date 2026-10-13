# Validación — Post-lanzamiento: cierre de pendientes

## Estado de la fase

**⬜ PENDIENTE**

## Criterios de éxito

### 1. Documentación sincronizada

- [ ] `changelog.md` incluye la entrada del primer deploy a producción
- [ ] `specs/tech-stack.md` describe el hosting y el deploy reales (host, puerto, clave RSA en PEM)
- [ ] `specs/roadmap.md`: "Dominio personalizado y HTTPS" marcado como hecho
- [ ] `specs/roadmap.md`: la Fase 10 figura como **standby**, no como pendiente activa
- [ ] `docs/fase-9-deploy-real` borrada (local y remota) sin pérdida de contenido
- [ ] No quedan "pendientes del dueño" de la Fase 9 que ya estén resueltos

### 2. Fechas correctas

- [ ] Un post con `date: 2026-01-01` se muestra como 1 de enero, no como 31 de diciembre
- [ ] El listado del blog, el post individual y el RSS coinciden en la fecha
- [ ] Ocurre igual en ES y en EN

### 3. Glass del navbar

- [ ] El CSS de `dist/` contiene `backdrop-filter` **sin** prefijo, además del `-webkit-`
- [ ] El mismo arreglo alcanza footer, `.terminal-card` y `.blog-card`
- [ ] El navbar tiene fondo semitransparente (no `transparent`) tomado de un token
- [ ] El efecto se percibe al desplazar contenido por debajo del navbar, en ambos temas
- [ ] El contraste de texto del navbar sigue cumpliendo en ambos temas

### 4. Contraste en tema claro

- [ ] Títulos, fechas y tags con ≥ 4.5:1 en tema claro en `/blog`, `/blog/[slug]`, `/blog/tags`, `/blog/tags/[tag]` y `/trabajos`
- [ ] Lo mismo en los pares `/en/`
- [ ] El tema oscuro no se degrada con los tokens nuevos

### 5. Contenido en inglés

- [ ] `/en/blog` lista 4 posts
- [ ] Cada par ES/EN declara el mismo `translationKey`
- [ ] El `hreflang` de cada post apunta solo a los idiomas que existen
- [ ] `sitemap-0.xml` incluye `/en/blog/docker/`, `/en/blog/omarchy/`, `/en/blog/terminal/` (o los slugs elegidos)
- [ ] `/en/rss.xml` publica los 4 posts
- [ ] Sin texto en español ni enlaces a rutas ES dentro de las páginas EN

### 6. Lighthouse en la URL pública

- [ ] Medición mobile y desktop sobre `/` y `/en/`
- [ ] Resultados registrados en la tabla de abajo
- [ ] Las 4 categorías en 90+ (o el desvío documentado con su causa)

| Página | Dispositivo | Performance | A11y | Best Practices | SEO |
| ------ | ----------- | ----------- | ---- | -------------- | --- |
| `/`    | Mobile      |             |      |                |     |
| `/`    | Desktop     |             |      |                |     |
| `/en/` | Mobile      |             |      |                |     |
| `/en/` | Desktop     |             |      |                |     |

### 7. Redirecciones 301

- [ ] Inventario de URLs indexadas del WordPress entregado por el dueño
- [ ] Mapa URL vieja → ruta de Astro documentado
- [ ] Reglas implementadas en `public/.htaccess`
- [ ] Cada URL vieja responde 301 con `Location` a una ruta que devuelve 200
- [ ] Sin bucles ni cadenas de más de un salto
- [ ] Las rutas nuevas (`/blog/*`, `/trabajos/*`, `/en/*`) siguen respondiendo 200
- [ ] La 404 propia sigue funcionando en ambos idiomas

### 8. Limpieza

- [ ] Las 7 ramas locales mergeadas están borradas
- [ ] Sus equivalentes remotos también
- [ ] Queda registrado el pendiente de hosting (`default.php`, ed25519 en `authorized_keys`)

## Cómo verificar

```bash
# Desde la raíz del proyecto (pnpm, sin npm/npx)
pnpm check
pnpm build

# Grupo 3: el prefijo estándar sobrevive a la minificación
grep -o 'backdrop-filter:blur(10px)' dist/_astro/*.css | head
grep -o '\-webkit-backdrop-filter:blur(10px)' dist/_astro/*.css | head

# Grupo 5: rutas y feed en inglés
ls dist/en/blog/*/
grep -o 'hreflang="[^"]*"' dist/en/blog/docker/index.html
grep -c '/en/blog/' dist/sitemap-0.xml
grep -o '<link>[^<]*</link>' dist/en/rss.xml | head

# Grupo 8: ramas ya mergeadas
git branch --merged main

# Grupo 7: redirecciones en producción (sustituir por las URLs reales)
curl -sI https://adalgarcia.com/<url-vieja> | grep -iE 'HTTP/|location'

# Grupo 6: servir el build y medir
pnpm preview
# DevTools → Lighthouse (mobile + desktop) sobre https://adalgarcia.com/ y /en/
```

## Criterio de merge a main

- [ ] Todos los criterios marcados (los de producción, verificados tras el deploy)
- [ ] `pnpm check` y `pnpm build` en verde
- [ ] PR abierto
- [ ] Validación manual ejecutada (build, navegador, Lighthouse)

## Anti-criterios (lo que NO debe pasar)

- ❌ Tocar la Fase 10: se queda en standby, sin implementar ni borrar del roadmap
- ❌ Traducciones que dejen `hreflang` o RSS anunciando un idioma inexistente
- ❌ Reglas 301 que capturen rutas nuevas o rompan la 404 bilingüe
- ❌ Introducir dependencias nuevas de runtime
- ❌ Cero `npm`/`npx` en scripts y comandos
- ❌ Borrar la rama `docs/deploy-changelog` sin antes traer su contenido
- ❌ Degradar el contraste del tema oscuro al introducir los tokens `*-ink`
- ❌ Escribir reglas de `.htaccess` a mano en hPanel (se pierden en el próximo deploy)

## Bloqueos externos

- **Grupo 7** requiere el inventario de URLs indexadas del WordPress (Search Console o backup de la base). Sin él, las reglas no se inventan.
- **Grupo 6** depende de que el sitio esté sirviendo la versión con los cambios del Grupo 3 para medir el estado final.
