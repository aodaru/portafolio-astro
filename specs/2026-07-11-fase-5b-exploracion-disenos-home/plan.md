# Plan — Fase 5B: Exploración de Diseños de Home

> 3 variantes alternativas de página de inicio, manteniendo la home actual (`/`) intacta como referencia.

## Contexto visual investigado

**craftz.dog (Takuya Matsuyama)** — Referencia de "indie developer premium":
- Hero asimétrico con tipografía display enorme + side panel con foto
- Layout 2 columnas: contenido principal (izq) + sidebar con info/bio/contacto (der)
- "I ♥" + "On the web" como bloques secundarios con tipografía marcada
- "Loading..." en la primera carga (state-driven)
- Callouts visuales para productos (YouTube, Inkdrop) con thumbnails grandes
- Newsletter CTA al final con copy tipo "behind the scenes"
- Tipografía: combinación de serif + sans geométrica con peso variable

**adalgarcia.com (actual a migrar)** — Referencia ya base:
- Terminal/CLI aesthetic con GruvBox palette
- Tarjetas tipo ventana (close/min/max dots)
- Línea de tiempo de bio
- Bloques verticales apilados (Trabajos, Bio, Pasatiempos, Contacto)
- Tema GruvBox (yellow/orange/blue/green) con dark mode

## Decisión de diseño

3 variantes que **mezclan ambas referencias** con direcciones distintas, priorizando **enganche para primera visita** y **coherencia con el tema GruvBox**:

---

### Grupo 1 — `/inicio1` "Editorial Craft" (inspirado craftz.dog)

- [ ] Crear `src/pages/inicio1.astro`
- [ ] Layout 2 columnas en desktop (sticky sidebar con avatar + nombre + redes), single column en mobile
- [ ] Hero asimétrico: tipografía display enorme con nombre en serif/display weight, tagline en monospace
- [ ] Sección "Work" con copy de bio + 3 highlights como bloques con borde lateral de color
- [ ] Sección "Bio" como timeline horizontal con años como markers
- [ ] Sección "I ♥" estilo craftz (hobbies como tags con icono Nerd Font)
- [ ] Sección "On the web" como grid de iconos sociales limpios (sin fondo de tarjeta)
- [ ] Sidebar fija con: avatar circular con border GruvBox yellow, nombre, rol, links sociales, theme toggle duplicado
- [ ] CSS scoped en el archivo o archivo `src/styles/inicio1.css`
- [ ] Mantener coherencia GruvBox: paleta yellow/orange/blue/green, monospace en meta-data, dots de colores en acentos

**Aesthetic direction**: Editorial premium, jerarquía tipográfica marcada, mucho espacio negativo, acentos de color precisos.

---

### Grupo 2 — `/inicio2` "Terminal Refinado" (evolución del actual)

- [ ] Crear `src/pages/inicio2.astro`
- [ ] Mantener las tarjetas-terminal (close/min/max) pero con esquinas más suaves y sombras modernas
- [ ] Layout en grid 2x2 en desktop (Trabajos + Bio | Pasatiempos + Contacto), 1 col en mobile
- [ ] Hero minimal: solo nombre grande + rol + línea divisoria GruvBox yellow
- [ ] Tipografía display para nombres de sección, monospace para contenido
- [ ] Microinteracciones: cursor parpadeante en cada terminal-header, hover lift sutil en tarjetas
- [ ] Timeline en formato código (`$ cat bio.md` con output formateado)
- [ ] Redes sociales como "comandos" ejecutables estilo `ssh github.com@aodaru`
- [ ] CSS scoped en `src/styles/inicio2.css`
- [ ] Video taza de café opcional (NO incluir en esta variante — minimalismo manda)

**Aesthetic direction**: Refinamiento del actual, modernizando sin perder la identidad terminal/GruvBox. Para devs que aman el CLI.

---

### Grupo 3 — `/inicio3` "Landing Moderna" (enfoque enganche/reclutadores)

- [ ] Crear `src/pages/inicio3.astro`
- [ ] Hero grande full-width con nombre + rol + CTA primario ("Ver trabajos") + CTA secundario ("Contactar")
- [ ] Avatar flotante con glow animado (animación de pulse sutil)
- [ ] Sección "Sobre mí" con 2-3 frases de impacto + foto a un lado
- [ ] Grid de proyectos destacados (3 cards con thumbnail/icon grande) con hover effect
- [ ] Timeline de experiencia profesional en formato vertical con markers
- [ ] Sección "Stack" como icon-grid (chips con tecnologías)
- [ ] CTA final de contacto con mailto y redes prominentes
- [ ] Scroll-triggered reveals (IntersectionObserver)
- [ ] Sticky mini-header al hacer scroll
- [ ] CSS scoped en `src/styles/inicio3.css`
- [ ] Usar GruvBox yellow como color de acento principal en CTAs, gradientes sutiles con gruvbox-orange

**Aesthetic direction**: Landing moderna tipo SaaS/portfolio premium, conversiones claras, "scroll experience" para enganchar al visitante nuevo.

---

## Grupo transversal

- [ ] Añadir enlaces de navegación a las variantes en `Navbar.astro` (solo en dev, no producción)
  - Links: Inicio1, Inicio2, Inicio3 con icono distintivo
  - Visibles solo cuando `import.meta.env.DEV`
- [ ] Verificar que `/` (home actual) sigue funcionando intacta
- [ ] Validar `pnpm build` sin errores
- [ ] Validar responsive en mobile/tablet/desktop
- [ ] Validar dark/light mode en las 3 variantes
- [ ] Documentar las 3 variantes en `requirements.md` con capturas/decisiones

## Entregable

3 páginas accesibles en `/inicio1`, `/inicio2`, `/inicio3` con diseños distintos, cada una coherente con el tema GruvBox y con animaciones/efectos intencionados. Home actual intacta como referencia.
