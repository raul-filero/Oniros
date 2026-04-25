# Bugs pendientes ONIROS

## Resueltos (2026-04-25)

- [x] **favicon.svg no existe → 404 en consola del navegador**
  Creado `public/favicon.svg` con el icono triangular de alerta (paleta del proyecto: negro #0a0a0a + rojo #9d0208).

- [x] **Contador "7 modelos" en modo oficial pero se muestran 8 (ONIROS incluido)**
  Cambiado `vectaraData.models.length` → `sorted.length` (App.jsx línea ~435).

- [x] **scoreOf() usa `mode` del closure pero useMemo no lo declara como dependencia**
  Refactor: `scoreOf` ahora es `useCallback` con `[mode]` como dep. El `useMemo` declara `[models, scoreOf]`. Quitado el `eslint-disable`.

- [x] **isSelf no definida explícitamente en modelos de Vectara**
  Añadido `isSelf: false` al map de `vectaraData.models` en `INITIAL_MODELS` (App.jsx línea ~191).

---

## Pendiente

(vacío de momento — añadir aquí nuevos bugs cuando se detecten)

---

## Mejoras futuras (no bugs, anotadas para no perderlas)

- `App.jsx` tiene 970+ líneas. Romper en sub-componentes (`Header`, `Hero`, `RankCard`, `EvidenceGrid`, `ReportModal`) cuando crezca el scope.
- Estilos inline masivos. Migrar a CSS modules o styled-components si se añaden temas o estados de hover complejos.
- Sin tests. Añadir Vitest cuando haya datos reales (Supabase) y la lógica de orden / filtrado merezca cobertura.
- `package.json` sin campo `engines`. Pinnar Node 20+ para evitar inconsistencias entre máquinas.
- Fuentes Google cargadas via `useEffect` en cada componente: si ambos llegan a coexistir momentáneamente, doble carga. Mover a `index.html`.
