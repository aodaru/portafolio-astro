# Plan — Fase 1: Scaffolding

## 1. Inicializar proyecto Astro

| Tarea | Detalle |
|---|---|
| 1.1 Crear `astro.config.ts` | Configuración base: `output: 'static'`, `site: 'https://adalgarcia.com'` |
| 1.2 Crear `tsconfig.json` | Strict mode, paths alias `@/*` → `./src/*` |
| 1.3 Corregir `package.json` | Remover caret `^` de `astro: "^7.0.6"` → `"7.0.6"` |
| 1.4 Agregar scripts | `"dev": "astro dev"`, `"build": "astro build"`, `"check": "astro check"`, `"sync": "astro sync"` |

## 2. Configurar Tailwind CSS v4

| Tarea | Detalle |
|---|---|
| 2.1 Instalar dependencias | `pnpm add @astrojs/tailwind @tailwindcss/vite tailwindcss` |
| 2.2 Configurar Vite en `astro.config.ts` | Agregar plugin `@tailwindcss/vite` |
| 2.3 Crear `src/styles/global.css` | `@import "tailwindcss"` + custom properties base (colores, tipografía) |
| 2.4 Verificar integración | `pnpm dev` sin errores de CSS |

## 3. Estructura de directorios

| Tarea | Detalle |
|---|---|
| 3.1 Crear `src/` | Directorio raíz de código fuente |
| 3.2 Crear subdirectorios | `components/`, `layouts/`, `content/`, `pages/`, `styles/` |
| 3.3 Verificar estructura | `src/` con todos los subdirectorios creados |

## 4. Content collections

| Tarea | Detalle |
|---|---|
| 4.1 Crear `src/content/config.ts` | Schema para colecciones `blog` y `projects` |
| 4.2 Schema `blog` | `title: string`, `date: date`, `description: string`, `tags: string[]`, `image: image()`, `draft: boolean` |
| 4.3 Schema `projects` | `title: string`, `date: date`, `description: string`, `tags: string[]`, `image: image()`, `url: string` (opcional) |
| 4.4 Crear posts de ejemplo | `src/content/blog/es/primer-post.md` y otro |
| 4.5 Crear proyectos de ejemplo | `src/content/projects/proyecto-ejemplo.md` |
| 4.6 Ejecutar sync | `pnpm astro sync` para generar tipos |

## 5. Migrar assets estáticos

| Tarea | Detalle |
|---|---|
| 5.1 Copiar favicons | `themeWp/favicon*.ico`, `img/apple-touch-icon.png` → `public/` |
| 5.2 Copiar imágenes | `themeWp/img/Avatar.*`, `themeWp/img/*.png`, `themeWp/img/*.webp` → `public/img/` |
| 5.3 Copiar fuentes | `themeWp/fonts/*` → `public/fonts/` |
| 5.4 Copiar robots.txt | `themeWp/robots.txt` → `public/` |

## 6. Página de verificación

| Tarea | Detalle |
|---|---|
| 6.1 Crear `src/pages/index.astro` | Página mínima que renderiza "Hola mundo" con clases Tailwind |
| 6.2 Verificar Tailwind | Usar clases como `text-3xl font-bold text-green-600` para confirmar que funciona |
| 6.3 Verificar build | `pnpm build` exitoso, `dist/` generado |
