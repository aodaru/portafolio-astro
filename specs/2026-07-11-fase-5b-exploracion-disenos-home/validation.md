# Validation — Fase 5B: Exploración de Diseños de Home

## Verificación manual

### Cada variante (`/inicio1`, `/inicio2`, `/inicio3`)

- [ ] La página carga sin errores en consola del navegador
- [ ] Muestra contenido completo: nombre, rol, trabajos, bio/timeline, hobbies, contacto
- [ ] Las animaciones se ejecutan en el primer load (hero entrance, reveals, etc.)
- [ ] Hover states visibles en CTAs, links, tarjetas
- [ ] Dark mode funciona (toggle cambia la paleta)
- [ ] Light mode funciona
- [ ] El toggle persiste tras recargar (localStorage)
- [ ] En mobile (<768px): layout colapsa correctamente, todo el contenido es accesible
- [ ] En tablet (768-1024px): layout intermedio funcional
- [ ] En desktop (>1024px): layout completo visible
- [ ] Tab key navega por todos los elementos interactivos en orden lógico
- [ ] Foco visible en todos los elementos
- [ ] Contraste de texto cumple WCAG AA (inspeccionar con DevTools)
- [ ] Con `prefers-reduced-motion: reduce` activo, las animaciones se reducen/desactivan

### `/` (home actual)

- [ ] Sigue funcionando idéntica a antes
- [ ] Mismos estilos, mismas animaciones, misma estructura

### Navbar

- [ ] Muestra enlaces a las 3 variantes (solo en `pnpm dev`)
- [ ] En build de producción no muestra los enlaces de variantes

## Verificación técnica

- [ ] `pnpm astro check` pasa sin errores TypeScript
- [ ] `pnpm astro build` completa sin errores
- [ ] El output de `dist/` incluye las 3 páginas nuevas
- [ ] No hay warnings de Tailwind/CSS no usados
- [ ] No se introdujeron dependencias npm nuevas (verificar `package.json` y `pnpm-lock.yaml`)

## Criterios de aceptación

1. Las 3 variantes son **visualmente distintas** entre sí (no solo cambios de color)
2. Las 3 son **coherentes con el tema GruvBox** (paleta cálida, identidad visual mantenida)
3. Las 3 tienen **animaciones con propósito** (no decoración gratuita)
4. La home actual **sigue intacta**
5. **Responsive** funcional en mobile/tablet/desktop
6. **Accesibilidad** básica (foco, contraste, reduced-motion)

## Cómo validar

```bash
# Desde la raíz del proyecto
pnpm dev
# Abrir http://localhost:4321/
# Navegar a /inicio1, /inicio2, /inicio3
# Probar toggle de tema
# Inspeccionar responsive con DevTools
# Probar con prefers-reduced-motion activado en DevTools

# Verificar typecheck y build
pnpm astro check
pnpm build
```

## Checklist final antes de merge

- [ ] Spec revisada y aprobada
- [ ] Código sin comentarios innecesarios (solo los estrictamente requeridos)
- [ ] Versiones de dependencias sin caret (per AGENTS.md)
- [ ] Sin secrets en código
- [ ] Sin TODOs/placeholders
- [ ] Commit messages claros con prefijo `feat:` / `style:`
