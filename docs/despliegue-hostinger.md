# Cómo desplegamos el portafolio a Hostinger

Manual paso a paso del deploy de `adalgarcia.com`: **GitHub Actions** construye el
sitio estático y lo sube a **Hostinger por SFTP**. Es el registro de lo que
realmente costó ponerlo en verde, no una guía teórica.

El flujo existe y está verificado en producción. Este documento explica **cómo se
montó, por qué cada decisión, y qué falló por el camino** para que se pueda
repetir (o depurar) sin volver a tropezar con lo mismo.

## Regla de oro: credenciales fuera del repositorio

> Nada de este documento lleva valores reales. Host, puerto, usuario, ruta y
> clave aparecen como **placeholders** (`<SFTP_HOST>`, `<SFTP_PORT>`,
> `<SFTP_USERNAME>`, `<SFTP_TARGET_DIR>`, `<SSH_PRIVATE_KEY>`).
>
> Los valores reales viven **solo** en:
> - el gestor de secretos de GitHub (Settings → Secrets and variables → Actions),
>   para el deploy automático;
> - un `.env` local (ignorado por git) para pruebas manuales.
>
> Si algún día una clave privada se filtra (se sube, se pega en un chat, aparece
> en un log), **hay que rotarla**: se genera una nueva, se actualiza el secreto en
> GitHub y se retira la vieja de `~/.ssh/authorized_keys` del hosting. Ver
> [Rotar una clave](#rotar-una-clave).

No se commitea ninguna clave. Para tener claro **qué** variables hacen falta sin
exponer **cuáles** son sus valores, el repo trae [`.env.example`](../.env.example).

---

## 1. Resumen del flujo

```
  push a main  ───┐
                  ├─► GitHub Actions (deploy.yml)
  workflow_dispatch┘         │
                             ├─ pnpm install --frozen-lockfile
                             ├─ pnpm build            → dist/
                             ├─ preflight: ¿existen los secretos?
                             ├─ SFTP: dist/*          → <SFTP_TARGET_DIR>/
                             └─ SFTP: dist/.htaccess  → <SFTP_TARGET_DIR>/   (paso aparte)
                                       │
                                       ▼
                       Hostinger  ~/domains/adalgarcia.com/public_html/
```

- El sitio es **estático**: no hay runtime ni base de datos en el hosting.
- El destino es la **raíz** de `public_html/` del dominio, sin subcarpeta ni
  rewrite.
- La autenticación es por **clave SSH** (SFTP), no por contraseña.

---

## 2. Cómo funciona el workflow

Archivo: [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml).

| Pieza | Por qué |
|---|---|
| Trigger `push: branches: [main]` | Publicar es mergear a `main`. Nada se sube desde otra rama. |
| Trigger `workflow_dispatch` + input `target_dir` | Permite probar a mano otra carpeta (staging) sin tocar secretos. |
| `concurrency: deploy-hostinger` (`cancel-in-progress: false`) | Un solo deploy a la vez; si llega otro push, se **encola**, no se cancela el que corre. |
| `pnpm/action-setup` + `setup-node` con `cache: pnpm` | Se usa **pnpm** en todo el flujo (nunca `npm`/`npx`). Node 22. |
| Paso *Comprobar secretos* | Falla **temprano y con mensaje claro** si falta un secreto, en vez de intentar un deploy a ciegas. Nunca imprime valores: solo comprueba que existan. |
| SFTP de `./dist/*` | Sube el contenido del build. `sftp_only: true`. |
| SFTP de `./dist/.htaccess` en **paso aparte** | El glob de `sftp` **omite los dotfiles de primer nivel**; el `.htaccess` tiene que subirse explícitamente. |
| `delete_remote_files: false` | **Nunca borra** lo que no sube. El hosting tiene archivos que no controlamos (ver [Notas y límites](#notas-y-límites)). |
| `sftpArgs: '-o ConnectTimeout=10'` | Evita que el job se cuelgue si el host no responde. |

---

## 3. Prerrequisitos en el hosting

Antes de esperar que algo funcione, esto tiene que existir **en hPanel** (panel de
Hostinger), no en Cloudflare ni en el repo:

1. **El dominio dado de alta** en hPanel → Dominios. Hostinger crea
   `domains/<dominio>/public_html/`. **Sin esto el vhost responde 403** y no hay
   nada que arreglar desde DNS.
2. **La carpeta destino existente.** El deploy usa `sftp_only: true`, que
   **no crea directorios**: si `<SFTP_TARGET_DIR>` no existe, la subida falla.
3. **Una clave SSH de deploy** cuya parte **pública** esté en
   `~/.ssh/authorized_keys` del usuario de hosting (paso 4).
4. **SSL emitido** para el dominio (paso 6) antes de poner Cloudflare en modo
   proxied.

---

## 4. Paso 1 — Clave SSH de deploy (RSA en PEM)

La clave **tiene que ser RSA en formato PEM**. Una ed25519 generada por defecto
por `ssh-keygen` viene en formato OpenSSH moderno (`BEGIN OPENSSH PRIVATE KEY`):
SSH la acepta, pero la imagen `wlixcc/SFTP-Deploy-Action` la procesa con libcrypto
y **falla**:

```
Load key "../private_key.pem": error in libcrypto
Permission denied (publickey,password).
```

Generar la clave correcta:

```bash
ssh-keygen -t rsa -b 4096 -m PEM -C "github-actions-deploy@<proyecto>" -N "" \
  -f deploy_hostinger_rsa
```

- `-m PEM` → formato `-----BEGIN RSA PRIVATE KEY-----`.
- `-N ""` → sin passphrase (el runner no puede introducirla).

Autorizar la pública en el hosting (usa los datos de conexión reales, que **no**
se escriben aquí):

```bash
cat deploy_hostinger_rsa.pub | ssh -p <SFTP_PORT> <SFTP_USERNAME>@<SFTP_HOST> \
  'cat >> ~/.ssh/authorized_keys'
```

### Por qué no se puede "convertir" una ed25519

- `ssh-keygen -p -m PEM` **no** convierte una ed25519 existente.
- `-m PEM` **rechaza** ed25519 al generar (OpenSSH 10.5).
- La prueba local con `ssh`/`sftp` **pasa** con ed25519: **el fallo solo se ve en
  el runner de GitHub Actions**, no en local. No te fíes del OK local.

---

## 5. Paso 2 — Variables / secretos del repositorio

En GitHub → Settings → **Secrets and variables → Actions → New repository
secret**. Se crean con estos nombres:

| Secreto | Obligatorio | Contenido |
|---|---|---|
| `SFTP_HOST` | sí | Host/IP del hosting. |
| `SFTP_PORT` | no | Puerto SSH (no es el 22 por defecto; usar el que da Hostinger). |
| `SFTP_USERNAME` | sí | Usuario SSH del hosting. |
| `SFTP_SSH_KEY` | sí | Clave privada **RSA en PEM**, **con el salto de línea final**. |
| `SFTP_TARGET_DIR` | sí | Ruta absoluta de la carpeta destino (raíz de `public_html/`). |

El flujo no imprime secretos: el paso de preflight solo verifica su presencia.
Para probar el flujo en local, copia [`.env.example`](../.env.example) a `.env` y
rellena los valores (`.env` está ignorado por git).

---

## 6. Paso 3 — Primer deploy

### Si el workflow nunca ha corrido

Un workflow nuevo **no se puede despachar hasta que está en la rama por defecto.**
Si `deploy.yml` solo vive en una rama feature:

```bash
gh workflow run deploy.yml --ref main
# → workflow deploy.yml not found on the default branch
```

La solución es **mergear a `main`**: ese merge sube `deploy.yml` y **dispara el
deploy automáticamente** (por el trigger de `push`). A partir de ahí,
`workflow_dispatch` ya funciona.

### Publicar normal

1. Commit + push a `main` → el workflow construye y sube. Sin subida manual.

### Desplegar a mano

```bash
gh workflow run deploy.yml --ref main
```

Para probar en una carpeta distinta (staging) sin tocar secretos:

```bash
gh workflow run deploy.yml --ref main -f target_dir=public_html/staging/
```

El input `target_dir` tiene prioridad sobre `SFTP_TARGET_DIR`.

---

## 7. Paso 4 — DNS y SSL

El orden importa. Cloudflare **proxied sin certificado emitido = error 525**.

1. **hPanel → Dominios**: añadir el dominio (crea la carpeta).
2. **hPanel → Seguridad → SSL**: activar/emitir para ese dominio.
3. **Cloudflare**: registro **A** del apex → IP del hosting; **CNAME** de `www` →
   el apex. Mantener el proxy en **gris (DNS only)** hasta tener el SSL emitido.
4. Cuando el SSL esté emitido, se puede pasar el proxy a naranja (proxied).
5. Verificar:

```bash
curl -I https://adalgarcia.com/
```

### 403 vs 525 — no son lo mismo

| Código | Causa | Arreglo |
|---|---|---|
| **403** | El dominio **no existe** en hPanel → Dominios (no hay vhost). | Darlo de alta en hPanel. No se arregla desde Cloudflare. |
| **525** | Cloudflare **proxied** sin certificado en el origen. | Proxy en gris hasta emitir el SSL. |

---

## 8. Verificación

Tras un deploy en verde, comprobar:

- Rutas principales → **200**: `/`, `/blog/`, `/trabajos/`, `/contacto/`, `/en/`,
  `/en/blog/`, `/en/trabajos/`.
- Una ruta inexistente → **404 con el diseño del sitio** (título
  `404 — Teapartydev`), lo que prueba que el `ErrorDocument` funciona. Debe
  responder igual en `/en/`.
- `sitemap-index.xml` y `favicon.svg` → 200.
- Los `.htaccess` (raíz y `/en/`) están en su sitio.

> Los **403 en `/_astro/` y `/fonts/` son correctos**: es `Options -Indexes`
> bloqueando el listado de directorios, no un fallo de deploy.

Detalle del `ErrorDocument` y los `.htaccess` en la sección
[404 en el hosting](#404-en-el-hosting).

---

## 9. Errores encontrados y su solución

| Error | Causa real | Solución |
|---|---|---|
| `error in libcrypto` + `Permission denied` | Clave ed25519 en formato OpenSSH moderno; la acción la procesa con libcrypto y no la entiende. | **RSA 4096 en PEM** (paso 4); añadir la pública a `~/.ssh/authorized_keys`. |
| `workflow deploy.yml not found on the default branch` | El workflow solo existe en una rama feature. | Mergear a `main` (eso lo sube y dispara el primer deploy). |
| `adalgarcia.com` da **525** | Cloudflare proxied sin certificado emitido en el origen. | Proxy en **gris** hasta activar el SSL en hPanel. |
| El dominio da **403** | El dominio no está dado de alta en hPanel → Dominios. | Darlo de alta; Hostinger crea la carpeta. |
| Subida falla por carpeta inexistente | `sftp_only: true` **no crea** directorios. | Crear `<SFTP_TARGET_DIR>` antes de desplegar. |
| `ssh-keygen -p -m PEM` no convierte | No es una herramienta de conversión; `-m PEM` además rechaza ed25519 al generar. | Generar **RSA en PEM** directamente. |

---

## 10. Operación diaria

### Publicar contenido

1. Editar el Markdown en `src/content/{blog,projects}/{es,en}/`
   (ver [`escribir-contenido.md`](./escribir-contenido.md)).
2. `pnpm build` en local para verificar.
3. Commit + push a `main`; el workflow construye y sube. **Sin subida manual.**

### Desplegar a mano

```bash
gh workflow run deploy.yml --ref main
```

### 404 en el hosting

`public/.htaccess` define `ErrorDocument 404 /404.html`, compresión y caché de
estáticos. `public/en/.htaccess` sirve `/en/404/index.html` para rutas
desconocidas bajo `/en/`. El workflow sube el `.htaccess` de la **raíz** en un
paso aparte porque el glob de `sftp` omite los dotfiles de primer nivel.

---

## 11. Rotar una clave

Solo si una clave privada se ha visto comprometida (filtrada, subida por error,
expuesta en un log o un chat). Una clave **nunca commiteada no se rota**.

1. Generar una nueva RSA en PEM (paso 4).
2. Autorizar la nueva pública en el hosting.
3. Actualizar el secreto `SFTP_SSH_KEY` en GitHub con la nueva privada.
4. Quitar la **pública vieja** de `~/.ssh/authorized_keys` del hosting.
5. Lanzar un deploy de prueba y verificar el resultado.

> El `changelog.md` dejó anotado que en `authorized_keys` puede quedar una clave
> ed25519 antigua además de la RSA en uso. Si ya no se necesita, se elimina.

---

## Notas y límites

- **El workflow no borra archivos remotos** (`delete_remote_files: false`): nunca
  elimina lo que no sube. Un borrado se hace a mano y con backup.
- **`default.php` de Hostinger** puede quedar por debajo de `index.html` (el
  `index.html` tiene prioridad). Es inofensivo; se puede borrar a mano.
- **Sitios vecinos del mismo hosting** que **no** son este proyecto (no tocar):
  otro Astro anterior, un Angular SSR y un WordPress en un dominio
  `*.hostingersite.com`. Los `*.hostingersite.com` son placeholders de Hostinger,
  **no** destinos de deploy.
- **Ojo con `.htaccess` heredados.** Si un dominio del hosting tiene un
  `.htaccess` que reescribe todo a una subcarpeta, desplegar en su raíz deja el
  sitio inalcanzable. Este proyecto va en la **raíz** de `adalgarcia.com`, donde
  no aplica ningún rewrite.

## Referencias

- Workflow: [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)
- Variables (sin valores): [`.env.example`](../.env.example)
- Guía de contenido: [`escribir-contenido.md`](./escribir-contenido.md)
- Resumen de deploy en el [`README.md`](../README.md#deploy-hostinger-por-sftp)
- Contexto y veredicto del primer deploy: [`changelog.md`](../changelog.md)
