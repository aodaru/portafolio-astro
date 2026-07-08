# Validation: contenido-pendiente

## Manual checks
- Visitar `/blog` y confirmar que el listado de posts se renderiza correctamente
- Visitar `/blog/page/1` y confirmar que es idéntico a `/blog`
- Si hay más de 5 posts publicados, visitar `/blog/page/2` y ver la segunda página
- Probar los enlaces "Anterior" / "Siguiente" en la navegación de páginas
- Visitar `/trabajos` y ver los nuevos proyectos en la grid
- Visitar `/trabajos/[slug]` de cada nuevo proyecto y confirmar que renderiza

## Build checks
```bash
pnpm astro build    # debe compilar sin errores
pnpm astro check    # typecheck pasa
```

## Acceptance criteria
- [ ] `/blog/page/[n]` funciona para cualquier `n >= 1`
- [ ] `/blog` redirige o muestra el mismo contenido que `/blog/page/1`
- [ ] Los enlaces "Anterior" aparecen solo cuando `page > 1`
- [ ] Los enlaces "Siguiente" aparecen solo cuando hay más páginas
- [ ] Los posts individuales en `/blog/[...slug]` siguen funcionando
- [ ] Los nuevos proyectos aparecen en `/trabajos` y en la home
- [ ] `pnpm astro build` y `pnpm astro check` pasan sin errores
