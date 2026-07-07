# Plan — Fase 2: Layout base + Navegación

## 1. Sistema de colores (CSS custom properties)

| Tarea | Detalle |
|---|---|
| 1.1 Definir paleta en `global.css` | Variables `--color-*` para light y dark con `@media (prefers-color-scheme)` |
| 1.2 Aplicar colores base al `<body>` | `background-color` y `color` usando las variables |
| 1.3 Verificar en navegador | Light mode por defecto, dark mode con `prefers-color-scheme: dark` |

## 2. Layout global (`BaseLayout.astro`)

| Tarea | Detalle |
|---|---|
| 2.1 Actualizar `BaseLayout.astro` | Integrar `<Navbar />`, `<Footer />`, `<slot />`, class en `<html>` para theme |
| 2.2 Meta tags dinámicos | `title`, `description`, `lang` desde props |
| 2.3 Cargar fuentes | `@font-face` para MesloLG-M y Mononoki en `global.css` |

## 3. Navbar

| Tarea | Detalle |
|---|---|
| 3.1 Crear `src/components/Navbar.astro` | Logo + enlaces (Inicio, Blog, Trabajos, Contacto) |
| 3.2 Estilo desktop | Horizontal, sticky top, fondo semitransparente |
| 3.3 Estilo mobile | Hamburguer menu con toggle, menú desplegable |
| 3.4 Estado activo | Clase `active` en el link de la página actual |
| 3.5 Tema toggle | Botón de sol/luna integrado en la barra |

## 4. Theme toggle (dark/light)

| Tarea | Detalle |
|---|---|
| 4.1 Crear `src/components/ThemeToggle.astro` | Botón con icono sol/luna |
| 4.2 Lógica JS | Toggle clase `dark` en `<html>`, persistir en `localStorage` |
| 4.3 Estado inicial | Leer `localStorage` → si no existe, usar `prefers-color-scheme` |
| 4.4 CSS | Variables de color cambian según clase `.dark` en `<html>` |

## 5. Footer

| Tarea | Detalle |
|---|---|
| 5.1 Crear `src/components/Footer.astro` | Copyright dinámico (año actual) |
| 5.2 Redes sociales | Iconos de GitHub, LinkedIn, Twitter/X, correo |
| 5.3 Diseño | Centrado, texto muted, bordes sutiles |

## 6. Páginas placeholder

| Tarea | Detalle |
|---|---|
| 6.1 `src/pages/index.astro` | Mantener minimalista (se expande en Fase 3) |
| 6.2 `src/pages/blog/index.astro` | Título + texto "Próximamente" |
| 6.3 `src/pages/trabajos/index.astro` | Título + texto "Próximamente" |
| 6.4 `src/pages/contacto.astro` | Título + texto "Próximamente" |
| 6.5 Todas usan `BaseLayout` | Layout único para todas las páginas |

## 7. Integración y pulido

| Tarea | Detalle |
|---|---|
| 7.1 Verificar navegación | Links funcionan, active state correcto |
| 7.2 Verificar theme | Toggle funciona, persiste al recargar |
| 7.3 Responsive | Mobile < 768px, tablet 768-1024px, desktop > 1024px |
| 7.4 Build | `pnpm build` sin errores |
