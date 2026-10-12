# Portafolio

Sitio estático con **Astro 7** + Tailwind CSS 4. Estructura, comandos y guías
para agregar contenido.

> Documentación de proceso (roadmap, specs por fase): [`specs/`](specs/)
> Reglas para agentes: [`AGENTS.md`](AGENTS.md)

---

## Comandos

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Servidor de desarrollo en `localhost:4321` |
| `pnpm build` | Build estático a `dist/` |
| `pnpm preview` | Sirve `dist/` para verificar el build |
| `pnpm check` | Typecheck (`astro check`) |
| `pnpm sync` | Regenera los tipos de `astro:content` |

Usar **pnpm**. El proyecto es ESM (`"type": "module"`).

---

## Estructura

```
src/
├── components/     # Navbar, Footer, TazaAscii, PostNav, BlogPostList
├── content/
│   ├── blog/       # es/<slug>.md  (carpets = idioma)
│   └── projects/   # <slug>.md
├── i18n/
│   ├── content.ts  # helpers de contenido (rutas, fechas, hreflang)
│   ├── ui.ts       # textos de navegación
│   └── bio-*.json  # bio por idioma
├── layouts/        # BaseLayout.astro (head, SEO, navbar, footer)
├── pages/          # rutas
└── styles/         # global.css + components/ + pages/
```

---

## Escribir un post

Crear `src/content/blog/es/<slug>.md`. **La carpeta es el idioma**: `es/` o `en/`.
La URL se deriva del slug, sin la carpeta: `es/docker.md` → `/blog/docker`
(en inglés: `en/docker.md` → `/en/blog/docker`).

```markdown
---
title: "Título del post"
description: "Se muestra como lede bajo el título y como meta description."
date: 2025-12-24
tags: ["Docker", "Linux"]
image: "/img/posts/docker.jpg"
draft: false
---

## Sección

Contenido...
```

| Campo | Obligatorio | Notas |
|---|---|---|
| `title` | sí | |
| `description` | sí | Se usa de lede y de `meta description` |
| `date` | sí | |
| `tags` | no | Lista; cada tag genera `/blog/tags/<tag>` |
| `image` | no | Si falta, el listado usa un emoji según el título |
| `draft` | no | `true` lo excluye del build, del RSS y del sitemap |
| `updated` | no | Si está, se muestra "Última actualización" al pie |
| `author` | no | Por defecto `Adal Michael García` |

Code fences se resaltan con Shiki (temas GruvBox claro/oscuro, vía `data-theme`).

---

## Escribir un proyecto

Crear `src/content/projects/<slug>.md`.

```markdown
---
title: "Nombre del proyecto"
description: "Resumen de una línea."
date: 2024-10-15
tags: ["PHP", "MySQL"]
image: "/img/Works/Intranet1_1.png"
url: "https://ejemplo.com"
repo: "https://github.com/usuario/repo"
draft: false
---

Descripción larga del proyecto...
```

| Campo | Obligatorio | Notas |
|---|---|---|
| `title` | sí | |
| `description` | sí | |
| `date` | sí | |
| `tags` | sí | Lista de stacks |
| `image` | no | |
| `url` | no | Botón **"Visitar proyecto"**. Vacío si es privado |
| `repo` | no | Botón **"Ver código"**. Vacío si es privado |
| `draft` | no | |

`url` y `repo` son opcionales e **independientes**: un proyecto puede tener solo
uno, los dos o ninguno. Si el repositorio es privado, **dejar el campo vacío o
omitirlo** — no enlazar a un repo inaccesible.

---

## SEO

`BaseLayout.astro` genera automáticamente:

- `canonical` absoluto (usa el prop `path`, si no, la ruta actual)
- `hreflang` por idioma — **solo para idiomas que existen de verdad**. Con un
  único idioma queda `es` + `x-default`. Al agregar `src/content/blog/en/`,
  los pares aparecen solos, no hay que tocar el layout.
- Open Graph y Twitter Card (`og:title`, `og:description`, `og:image`, ...)
- `<meta name="author">`

Para pasar `path`, `image` o `alternates`, ver los props en `layouts/BaseLayout.astro`.

> **Pendiente:** la Fase 7 marca OG y hreflang como completada; se implementaron
> en este ciclo. Lo que sigue sin existir es la variante en inglés
> (`src/pages/en/`). Ver `specs/roadmap.md`.
