# Migración y ámbito de versiones

<!-- publication-status:start -->
**Desarrollo (`main`).** Estas guías canónicas describen el código actual, no una publicación confirmada en npm. El límite histórico inicial conocido es la etiqueta Git `v0.0.1`, cuyo manifiesto dice `0.1.0`. No equipares estas identidades, muevas la etiqueta ni deduzcas publicación en el registro. Consulta su [README de etiqueta inmutable](https://github.com/lambdawalker/draw.backgrounds/blob/v0.0.1/README.md) para el comportamiento histórico. Estas guías recién escritas no se presentan como documentación que existiera en esa etiqueta.
<!-- publication-status:end -->

## Seleccionar y actualizar deliberadamente

1. Registra el selector Git o versión del registro instalado y el commit resuelto, junto con el lockfile y el entorno nativo.
2. Consulta disponibilidad en [IMPORT.md](../../IMPORT.md) y comprueba la API destino antes de copiar sus ejemplos.
3. Importa SVG y catálogos de la raíz y Canvas de `/canvas`. Sustituye importaciones internas; no tienen garantía de estabilidad.
4. Conserva país, semilla y dimensiones explícitos. Regenera resultados representativos con ambos renderizadores que use tu aplicación.
5. Compara hashes SVG dentro del mismo código y píxeles raster decodificados con herramientas fijadas. Revisa cambios visuales antes de aceptar nuevas referencias del conjunto de datos.

## Integraciones existentes de US

`render('texas')` sigue usando US por defecto y `states` sigue siendo el catálogo exclusivo de US. Para añadir México o Canadá, elige `jurisdictionsByCountry[country]` y pasa `country` explícitamente. No sustituyas `states` por `countries`: uno contiene claves de jurisdicciones y el otro códigos de países.

Las llamadas CLI heredadas sin `--country` conservan salida plana de US y manifiestos versión 1. La selección explícita de país crea subdirectorios y manifiestos versión 2 con campos de país y jurisdicción. Actualiza los lectores para comprobar la versión del manifiesto y conservar rutas relativas en vez de asumir un único directorio plano. Esto describe compatibilidad actual, no un historial exhaustivo de cambios.

## Documentación y traducciones

Los archivos en inglés de `docs/agents/` son canónicos. Las guías españolas de `docs/es/` conservan código ejecutable e identificadores de API. `docs/translations.json` registra el SHA-256 de cada fuente inglesa revisada. Un hash modificado exige revisar la traducción, no actualizar automáticamente el marcador. API, instalación, ejemplos y traducciones históricas deben quedar vinculados a su propia identidad de código; si falta una traducción o está desactualizada, muestra un aviso explícito y la guía inglesa del mismo ámbito.
