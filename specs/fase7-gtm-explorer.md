# Explorer GTM — Fase 7 (reconstruido desde resumen)

> Nota de trazabilidad: contenido reconstruido desde el resumen verificado del
> encargo (sesiones explorer originales no accesibles en disco). Si el revisor
> aporta los literales, se sobrescribe.

## Decisión: GTM vía Partytown queda DIFERIDO (D1)

- `requirements.md:17`: GTM diferido por **falta de ID de contenedor**.
  Sin ID no hay nada que instalar ni medir.
- Estado: **MANTENER DIFERIDO** en Fase 7.

## Prohibiciones (Fase 7)

- **NO** instalar `@astrojs/partytown`.
- **NO** añadir stub/no-op de GTM "por adelanto": sería deuda sin función
  (un stub sin ID no mide nada y contamina la línea base de performance).
- **NO** inyectar scripts de terceros antes de la medición 90+ en deploy
  preview.

## Desbloqueo (futuro, fuera de Fase 7)

1. Humano provee ID de contenedor GTM (requisito formal).
2. Instalar `@astrojs/partytown` con **pin exacto** (AGENTS.md: sin `^`).
3. Migrar el snippet GTM a `type="text/partytown"`.
4. Re-medir Lighthouse y registrar regresión/coste en `validation.md`.

Sin exigencia formal con ID, no hay acción.
