# Bugs pendientes ONIROS

## Media
- favicon.svg no existe → 404 en consola del navegador
  (index.html línea 5, crear /public/favicon.svg)

## Baja
- Contador "7 modelos" en modo oficial pero se muestran 8 (ONIROS incluido)
  (App.jsx línea 414, cambiar a sorted.length o models.length)

- scoreOf() usa `mode` del closure pero useMemo no lo declara como dependencia
  (App.jsx línea 245-250, añadir `mode` al array de deps y quitar el eslint-disable)

- isSelf no definida explícitamente en modelos de Vectara (undefined funciona como falsy pero es frágil)
  (App.jsx línea 190-194, añadir isSelf: false al map)
