# Cómo escribir un post o un trabajo

Guía para publicar en el blog (`/blog`) y en trabajos (`/trabajos`).
El sitio genera solo varias piezas que **no se escriben en el Markdown**:
tabla de contenidos, relacionados, anterior/siguiente, tiempo de lectura,
páginas de etiquetas, RSS y la imagen social.

Si solo necesitas la plantilla mínima, está en el README. Esta guía explica
**por qué aparece** (o no) cada bloque.

---

## Qué escribes tú y qué sale solo

| Lo escribes tú | Lo genera el sitio |
|---|---|
| El archivo `.md` en la carpeta del idioma | La URL (`/blog/mi-post`, `/trabajos/mi-proyecto`) |
| El frontmatter (título, fecha, tags, imagen…) | El lede, la meta description y Open Graph, a partir de `description` e `image` |
| El cuerpo en Markdown (`##`, listas, código) | La **tabla de contenidos**, si el post tiene 3 o más `##` |
| Los `tags` | Los **relacionados**, el anterior/siguiente y las páginas `/blog/tags/…` |
| La imagen (archivo + registro, ver más abajo) | Tiempo de lectura, contador de palabras, RSS y sitemap |

Los **trabajos no tienen** tabla de contenidos, relacionados ni anterior/siguiente.
Eso solo existe en el detalle de un post del blog.

---

## Dónde va el archivo

La carpeta es el idioma. El nombre del archivo (sin `.md`) es la URL.

```
src/content/blog/es/mi-post.md       →  /blog/mi-post
src/content/blog/en/mi-post.md       →  /en/blog/mi-post

src/content/projects/es/mi-proyecto.md  →  /trabajos/mi-proyecto
src/content/projects/en/mi-proyecto.md  →  /en/trabajos/mi-proyecto
```

Reglas del nombre:

- Minúsculas, guiones, sin espacios ni tildes: `home-lab.md`, no `Home Lab.md`.
- Un archivo plano dentro de `es/` o `en/`. No hace falta crear subcarpetas.
- La versión en inglés, si existe, **tiene que llamarse igual**. El selector
  de idioma y el `hreflang` del blog emparejan por ese nombre, no por un campo
  del frontmatter.

`lang` en el frontmatter tiene que coincidir con la carpeta (`es` dentro de
`es/`, `en` dentro de `en/`). Si no coinciden, el post puede salir en el
listado y dar 404 al abrirlo, o al revés.

---

## Post del blog

Copia esto a `src/content/blog/es/<slug>.md`:

```markdown
---
title: "Título del post"
description: "Una o dos frases. Se ven bajo el título y en Google / redes."
date: 2026-10-12
updated: 2026-10-20
author: "Adal Michael García"
tags: ["Linux", "Docker"]
image: "/img/posts/mi-post.jpg"
draft: false
lang: es
---

Párrafo de apertura. No pongas aquí un `# Título`: el título ya es el `h1`
de la página.

## Primera sección

Texto…

## Segunda sección

Texto…

## Tercera sección

Con tres `##` o más aparece la tabla de contenidos.
```

### Campos

| Campo | Obligatorio | Qué hace |
|---|---|---|
| `title` | sí | Título de la página (`h1`). No lo repitas con un `#` en el cuerpo. |
| `description` | sí | Lede bajo el título, `meta description` y resumen en el listado y el RSS. |
| `date` | sí | Sin comillas: `2026-10-12`. Ordena el listado, el anterior/siguiente y los relacionados. |
| `updated` | no | Si está, al pie del cuerpo sale «Última actualización». |
| `author` | no | Si lo omites, queda `Adal Michael García`. |
| `tags` | no | Etiquetas clicables y la única palanca de los relacionados. Ver más abajo. |
| `image` | no | Imagen hero, tarjeta del listado, miniatura de relacionados y `og:image`. |
| `draft` | no | `true` lo saca del build, del listado, del RSS, del sitemap, de relacionados y de anterior/siguiente. Úsalo mientras escribes. |
| `lang` | sí | `es` o `en`. Tiene que coincidir con la carpeta. |
| `translationKey` | no | Empareja la versión ES y la EN para el `hreflang`. El mismo valor en los dos archivos; si falta, se usa el nombre del archivo. Los slugs **pueden** diferir (`primer-post` ↔ `first-post`). |

### Cómo se ve la página, de arriba a abajo

1. «Volver al blog».
2. Tarjeta: título, `description`, fecha · minutos · palabras · autor, tags, imagen hero, cuerpo y (si hay) «Última actualización».
3. **Tabla de contenidos**, debajo de la tarjeta, no en un lateral. Solo si toca.
4. **Anterior / siguiente**, por fecha, dentro del mismo idioma.
5. **Relacionados**, hasta 3 tarjetas.

---

## Tabla de contenidos

No se escribe. No hay un bloque `[TOC]` ni una lista que mantener.

Al construir la página, Astro lee los encabezados del Markdown. El sitio se
queda **solo con los `##`** (`h2`). Los `###` y más bajos se ven en el
artículo, pero no entran en la tabla.

Aparece si, y solo si, hay **3 o más `##`**.

```
¿El cuerpo tiene 3 o más ## escritos en Markdown?
  sí → tabla de contenidos, un enlace por cada ##
  no → no hay tabla
```

Ejemplos reales:

- `omarchy.md` tiene 4 `##` → sí hay tabla.
- `docker.md` tiene 3 `##` → sí hay tabla.
- Un post con 2 secciones → no hay tabla. Añade una tercera o déjalo así.

Detalles que importan al escribir:

- Usa `## Texto`, no `<h2>`. Un encabezado en HTML no entra en la tabla.
- El enlace (`#el-cambio-de-paradigma-…`) lo fabrica Astro a partir del texto.
  No lo inventes. Si necesitas citarlo desde otro sitio, ábrelo en `pnpm dev`
  y copia el `id` del encabezado.
- Dos `##` con el mismo texto producen anclas distintas (`…-1`). Mejor que
  cada sección tenga un título propio.
- La tabla sale **debajo** del artículo, con la etiqueta `$ toc` (en inglés,
  `$ contents`). No es un índice fijo al empezar a leer.
- Los trabajos no tienen este bloque, da igual cuántos `##` lleven.

---

## Relacionados, anterior y siguiente

Tampoco se eligen a mano. No hay un campo `related:` en el frontmatter.

Solo cuentan posts del **mismo idioma**, con `draft: false`. Un post en
español nunca relaciona ni enlaza uno en inglés, aunque compartan tags.

### Anterior / siguiente

Se ordenan por `date`, del más nuevo al más antiguo.

- **Siguiente** es el más nuevo que este (a la derecha).
- **Anterior** es el más viejo que este (a la izquierda).
- El más nuevo del blog no tiene siguiente. El más viejo no tiene anterior.
- Cambiar la fecha mueve el post en esta cadena y en el listado.

### Relacionados

Un tag cuenta si es **el mismo texto**, mayúsculas incluidas. `Linux` no es
`linux`. `Arch Linux` no es `Arch`.

```
¿Hay otros posts del mismo idioma que compartan al menos un tag exacto?
  sí → hasta 3, los más nuevos entre esos. Si solo hay 1, sale 1.
        No se rellena hasta 3 con posts de otros temas.
  no → los 3 posts más nuevos del mismo idioma (los que existan).
```

No gana el que comparta más tags. Gana el más reciente que comparta
**alguno**. El orden es el de la fecha, no un ranking de afinidad.

Consecuencias prácticas:

- Si quieres que dos posts se relacionen, copia el tag **idéntico**
  (`Linux`, no `linux` en uno y `Linux` en el otro).
- Un tag que solo usa este post no aporta relacionados por tema. Caerá en
  el relleno de «los 3 más nuevos».
- Sin `tags`, o con una lista vacía, siempre cae en ese relleno.
- Como máximo hay 3 tarjetas. El resto de coincidencias no se muestra.
- La miniatura de la tarjeta es el `image` de ese otro post. Si ese archivo
  no está registrado (ver imágenes), la miniatura se rompe igual que el hero.

Los trabajos no tienen relacionados ni anterior/siguiente.

---

## Tiempo de lectura, palabras y etiquetas

No se rellenan. Salen del cuerpo:

- Se cuentan palabras del Markdown, sin bloques de código, sin código en
  línea, sin enlaces ni imágenes Markdown y sin etiquetas HTML.
- Minutos = palabras / 200, redondeado, mínimo 1. Se muestra como
  `8 min de lectura`.

Cada tag del blog genera una página:

- `/blog/tags/Linux` y, en inglés, `/en/blog/tags/Linux`
- Solo lista posts de ese idioma.
- El tag es la URL tal cual, espacios incluidos (`Arch Linux` es válido, pero
  el enlace queda feo). Mejor una o dos palabras, y siempre la misma grafía.

En la ficha de un trabajo los tags solo se muestran. No abren una página
de etiqueta y no relacionan proyectos entre sí.

En el listado de trabajos, el icono de la tarjeta (no la ficha) depende de
un tag **exacto** y en minúsculas:

| Si algún tag es exactamente | Icono |
|---|---|
| `web` | 🌐 |
| `intranet` | 🏢 |
| `astro` | 🚀 |
| cualquier otra cosa | 📄 |

`Intranet` (con mayúscula) no activa el icono de intranet. En el blog, si
falta `image`, el listado pone un emoji según palabras del **título**
(`docker`, `linux`, `terminal`…). Con imagen, ese emoji no se usa.

El listado del blog pagina de 5 en 5. No hay nada que configurar.

---

## Trabajo (proyecto)

Copia esto a `src/content/projects/es/<slug>.md` y, si hay versión inglesa,
el mismo nombre en `en/`:

```markdown
---
title: "Nombre del proyecto"
description: "Resumen de una línea. Sale bajo el título y en la tarjeta."
date: 2026-10-12
tags: ["PHP", "MySQL"]
image: "/img/Works/mi-proyecto.png"
url: "https://ejemplo.com"
repo: ""
draft: false
lang: es
---

De qué va, en un párrafo.

## Qué hace

- **Una función** — una línea de para qué sirve

## Stack

- **PHP** — backend
```

| Campo | Obligatorio | Qué hace |
|---|---|---|
| `title` | sí | Título de la ficha. |
| `description` | sí | Bajada y texto de la tarjeta del listado. |
| `date` | sí | Orden del listado (más nuevo primero) y fecha en la ficha. |
| `tags` | no en el esquema, sí en la práctica | Chips `#tag`. También eligen el icono del listado (tabla de arriba). |
| `image` | no | Imagen de la ficha y `og:image`. El listado **no** usa esta imagen: usa el icono. |
| `url` | no | Si tiene un valor no vacío, aparece el botón «Visitar proyecto». Si es privado, `url: ""` u omítelo. |
| `repo` | no | El esquema lo acepta, pero **la ficha todavía no pinta un botón de código**. Déjalo vacío si el repo es privado; no enlaces un repo inaccesible. |
| `draft` | no | `true` lo excluye del listado y de la URL. |
| `lang` | sí | Tiene que coincidir con la carpeta. |

No hay `author`, `updated` ni `translationKey` en trabajos.

La ficha muestra: volver, fecha, título, descripción, tags, botón de visita
(si hay `url`), imagen y el Markdown dentro de la tarjeta de terminal.
Nada más.

---

## Imágenes

El frontmatter no apunta al archivo real. Guarda una **ruta histórica**:

- Posts: `/img/posts/nombre.jpg`
- Trabajos: `/img/Works/nombre.png` (la W va en mayúscula; tiene que coincidir)

Esa ruta, escrita tal cual, **da 404** en jpg/png. Esos archivos viven en
`src/assets/` y hay que registrarlos. Los GIF animados son la excepción:
viven en `public/` y no se registran.

### JPG o PNG (hero, tarjeta, relacionados, og:image)

1. Guarda el archivo en `src/assets/posts/` o `src/assets/works/`.
   Ejemplo: `src/assets/posts/mi-post.jpg`.
2. Regístralo en `src/utils/images.ts`: un import y una línea en `assetsMap`.
   La clave tiene que ser **exactamente** la ruta del frontmatter.

```ts
import miPostImg from '../assets/posts/mi-post.jpg'

const assetsMap: Record<string, ImageMetadata> = {
  // …las que ya están
  '/img/posts/mi-post.jpg': miPostImg,
}
```

3. En el Markdown: `image: "/img/posts/mi-post.jpg"`.

Ese único registro alimenta el hero del post, la tarjeta del listado, la
miniatura de «relacionados» y la imagen de redes. El sitio la convierte a
WebP. No copies el jpg a `public/`.

### GIF animado

1. Guárdalo en `public/img/posts/nombre.gif` (o `public/img/Works/`).
2. En el frontmatter, la ruta pública: `image: "/img/posts/nombre.gif"`.
3. **No** lo metas en `assetsMap`. Si entra en el mapa, se convierte a WebP
   y pierde la animación.

Así están `terminal.gif` y `portafolio.gif`.

### Imágenes dentro del cuerpo

Un `![texto](/img/...)` del Markdown **no** pasa por `images.ts`. Solo
funciona si el archivo está de verdad en `public/` (los GIF, o png/jpg que
ya vivan ahí, como varias capturas en `public/img/Works/`).

La imagen del frontmatter y las del cuerpo son cosas distintas. La primera
es el hero. Las segundas van donde las pongas en el texto, con borde, y no
sustituyen al hero.

Sin `image`, el post se publica igual. En el listado del blog verás un emoji;
en la ficha, no hay hero; en redes, el avatar por defecto.

---

## Versión en inglés

1. El archivo en `en/` con el **mismo `translationKey`** (el nombre del archivo
   puede ser distinto: `es/primer-post.md` ↔ `en/first-post.md`).
2. `lang: en`.
3. Traduce `title`, `description` y el cuerpo. La fecha puede ser la misma.
4. Traduce también los tags si el término cambia (`portafolio` → `portfolio`).
   Los relacionados en inglés solo miran posts en inglés, así que los tags
   ingleses no tienen que coincidir con los españoles.
5. La `image` puede ser la misma ruta (el registro en `images.ts` es único).

Si el otro idioma no existe, no inventes el archivo. En el blog, el
`hreflang` solo anuncia idiomas que de verdad tienen ese `translationKey`. El
botón de idioma de la barra, en cambio, siempre apunta a la misma ruta con el
otro prefijo: si falta el archivo, ese botón da 404. Por eso, o están los dos,
o aceptas que el cambio de idioma en esa ficha no tenga destino.

---

## Markdown que el sitio sabe pintar

| Escribes | Se ve como |
|---|---|
| `## Sección` | Título amarillo. Entra en la tabla de contenidos (blog, si hay ≥ 3). |
| `### Subsección` | Título naranja. No entra en la tabla. |
| `# Título` en el cuerpo | Otro `h1` además del de la página. No lo uses. |
| Párrafo | Texto normal. Una línea en blanco separa párrafos. |
| `- ítem` | Lista con `▸`. No añadas el `▸` tú: saldría duplicado. |
| `1. ítem` | Lista numerada. |
| `**negrita**` | Amarillo. |
| `` `código` `` | Verde, en línea. |
| Bloque ` ```bash ` | Resaltado Shiki, tema Gruvbox claro/oscuro, con salto de línea. Pon el idioma (`bash`, `php`, `ts`…). |
| `[texto](https://…)` | Enlace azul. |
| `> cita` | Cita con barra lateral. |
| Tabla Markdown | Tabla con cabecera amarilla (naranja en trabajos). |
| `---` | Separador. |
| `![alt](/img/…)` | Imagen del cuerpo. Solo si el archivo está en `public/`. |

El resaltado de código cambia solo con el tema claro/oscuro de la página.
No hace falta un bloque por tema.

---

## Publicar

1. Escribe el `.md`. Si hay jpg/png nuevo, regístralo en `images.ts`.
2. `pnpm dev` y abre la URL (`/blog/<slug>` o `/trabajos/<slug>`).
3. Revisa: ¿hay tabla solo si querías 3 secciones? ¿los relacionados son los
   que esperabas por los tags? ¿la imagen carga?
4. `draft: false` (o borra la línea).
5. `pnpm build` si quieres el mismo resultado que en producción.
6. Commit y push a `main`. El deploy sube el sitio; no hay que copiar HTML
   a mano.

Un error de frontmatter (fecha entre comillas raras, `lang: español`, un
campo que no existe con un tipo inválido) rompe `pnpm dev` con un mensaje
de esquema. El cuerpo Markdown no se valida: un `##` mal cerrado simplemente
no será un encabezado.

---

## Checklist

**Blog**

- [ ] Archivo en `src/content/blog/es/<slug>.md` (y `en/<otro-slug>.md` si hay traducción, con el mismo `translationKey`).
- [ ] `lang` igual a la carpeta.
- [ ] `title`, `description`, `date` sin comillas.
- [ ] Cuerpo sin `#`. Secciones con `##`.
- [ ] ¿Quiero tabla de contenidos? Entonces 3 o más `##`.
- [ ] Tags copiados exactamente de otros posts si quiero relacionarlos.
- [ ] Imagen: GIF en `public/`, o jpg/png en `src/assets/` **y** en `assetsMap`.
- [ ] `draft: false` cuando esté listo.
- [ ] Visto en `pnpm dev`: hero, tabla, anterior/siguiente, relacionados.

**Trabajo**

- [ ] Archivo en `src/content/projects/es/<slug>.md` (y el par `en/` con el mismo nombre).
- [ ] `url` vacío si no es público. `repo` vacío si es privado (además, hoy no se muestra).
- [ ] No espero tabla de contenidos ni relacionados: no existen en esta ficha.
- [ ] Imagen registrada igual que en el blog, con ruta `/img/Works/…`.
- [ ] Visto en `pnpm dev`.

---

## Errores frecuentes

| Lo que parece un bug | Qué está pasando |
|---|---|
| No sale la tabla de contenidos | Hay menos de 3 `##`, o los encabezados son `###` / HTML. En un trabajo nunca sale. |
| La tabla no incluye una subsección | Solo entran los `##`. |
| Relacionados «que no tienen que ver» | No compartes ningún tag exacto con nadie, así que salen los 3 más nuevos. |
| No se relaciona con un post que sí habla de lo mismo | El tag no es idéntico (`Linux` ≠ `linux`) o ese post es de otro idioma o está en `draft`. |
| Solo sale 1 relacionado | Así es la regla: si hay coincidencias, no se rellena hasta 3. |
| La imagen del hero (o de relacionados) da 404 | El jpg/png no está en `assetsMap`, o la ruta del frontmatter no coincide carácter a carácter con la clave. |
| El GIF no se anima | Entró en `assetsMap` y se convirtió a WebP. Sácalo del mapa y déjalo en `public/`. |
| Una imagen del cuerpo da 404 | El Markdown no usa `images.ts`. El archivo tiene que estar en `public/`. |
| El botón de idioma da 404 | Falta la versión del otro idioma. |
| El `hreflang` no anuncia el otro idioma | El `translationKey` no coincide en los dos archivos (o falta en uno). |
| Puse `repo` y no hay botón «Ver código» | El campo se guarda, pero la ficha no lo pinta. |
| El icono del trabajo no es el que esperaba | El tag tiene que ser exactamente `web`, `intranet` o `astro`, en minúsculas. |
