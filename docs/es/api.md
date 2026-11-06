# Referencia de API pública

<!-- publication-status:start -->
**Ámbito: Desarrollo (`main`).** Estas guías describen la copia del código fuente. Consulta [instalación](../../IMPORT.md) para conocer el estado de publicación confirmado y elige documentación que corresponda a la fuente exacta de tu dependencia.
<!-- publication-status:end -->

Solo ESM. Las exportaciones públicas se definen en `package.json` y `src/public.js`; `drawJurisdiction`, los destinos de dibujo y los auxiliares geométricos son internos, aunque los archivos de código los exporten.

```js
import {
  render, states, countries, countryNames, jurisdictionsByCountry,
} from '@lambdawalker/draw-backgrounds';
import { renderCanvas } from '@lambdawalker/draw-backgrounds/canvas';
```

## Contratos de los renderizadores

| Declaración | Resultado | Entorno |
| --- | --- | --- |
| `render(jurisdiction, options = {})` | `string` SVG independiente | Node o empaquetador web |
| `renderCanvas(state, options = {})` | Superficie Canvas nativa recién reservada | Node con `@napi-rs/canvas` |

`state` en la declaración Canvas significa cualquier jurisdicción compatible, no solo un estado estadounidense. Ambas llamadas aceptan las mismas opciones y renderizan una imagen síncronamente. Ninguna escribe archivos ni devuelve una Promise. La codificación Canvas es una operación asíncrona separada.

| Entrada | Valor predeterminado | Contrato |
| --- | --- | --- |
| `jurisdiction` / `state` | Ninguno | Cadena exacta del catálogo del país seleccionado |
| `options.country` | `'us'` | `'us'`, `'mx'` o `'ca'`; `'all'` es exclusivo de la CLI |
| `options.seed` | `42` | Entero entre 0 y 4294967295 |
| `options.width` | `1400` | Entero entre 1 y 8192 |
| `options.height` | `880` | Entero entre 1 y 8192 |

Ancho × alto debe ser además como máximo 40.000.000. Las cadenas no se convierten a números. Omite las opciones o pasa un objeto; `null` no es un valor admitido. Las propiedades desconocidas no son controles de personalización. El renderizador por jurisdicción no expone opciones de paleta, motivo, margen, fuente ni superposición de imágenes.

Un país desconocido, una jurisdicción desconocida o incompatible, una semilla inválida y dimensiones inválidas lanzan `RangeError` síncronamente. Los errores de US dicen `Unknown state`; los demás dicen `Unknown jurisdiction for ...`. Formas incorrectas de opciones pueden producir `TypeError` de JavaScript; la biblioteca no normaliza errores de carga nativa, reserva ni codificación. Valida los datos externos antes de llamar y captura por separado errores de renderizado y codificación.

## Composiciones sin jurisdicción

`createComposition(options)` devuelve de forma síncrona una receta versionada compatible con JSON. Acepta la semilla y las dimensiones de la tabla anterior, así como `photoIdBoundingBox`, un rectángulo opcional en coordenadas normalizadas con origen arriba a la izquierda. El rectángulo debe tener dimensiones positivas y caber dentro de la tarjeta. Omítelo o pasa `null` para un diseño sin foto. El objeto opcional `colorScheme` contiene cuatro colores RGB hexadecimales de seis dígitos: `paper`, `primary`, `secondary` y `accent`. Omítelo para usar el esquema predeterminado.

La semilla varía las texturas, la selección y ubicación de los motivos y los colores derivados. Los motivos principales quedan fuera del rectángulo de la foto, mientras que una textura de baja opacidad puede continuar detrás. Si la foto ocupa toda la tarjeta, solo se dibujan la base y la textura. La biblioteca no recibe ni dibuja la foto. Guarda la receta para reproducirla con `renderComposition(recipe)` (SVG) o `renderCompositionCanvas(recipe)` (Canvas para Node). La reproducción valida la versión de la receta, las dimensiones, los colores y la posición de los motivos. Conserva una versión compatible de la biblioteca junto con las recetas guardadas.

El punto de entrada compatible con el navegador `@lambdawalker/draw-backgrounds/color` exporta `mixColors(from, to, amount)`, una mezcla RGB con una proporción entre 0 y 1, además de `rgb(hex)` y `related(hex, rng, alpha)`. La función HSLuv espera un objeto con `range(min, max)` y devuelve una cadena CSS RGBA.

## Catálogos

| Exportación | Valor y significado |
| --- | --- |
| `countries` | Array congelado `['us', 'mx', 'ca']` |
| `countryNames` | Objeto congelado `{ us: 'United States', mx: 'Mexico', ca: 'Canada' }` |
| `states` | Lista congelada de 50 claves de jurisdicciones de US; alias heredado |
| `jurisdictionsByCountry` | Objeto congelado de arrays congelados: 50 `us`, 32 `mx`, 13 `ca` |

`jurisdictionsByCountry.us === states`. Las claves mexicanas y canadienses están ordenadas. Lee los arrays en vez de mantener un catálogo duplicado. Los catálogos contienen solo claves: no hay una API pública de metadatos por diseño ni consulta de procedencia de referencias.

## Garantías del resultado

El SVG declara ancho, alto, `viewBox="0 0 1400 880"` y `preserveAspectRatio="none"`. Las definiciones y la geometría son independientes; el dibujo generado no tiene texto, fotos, scripts ni referencias a recursos externos. Canvas comparte geometría y tratamiento de semillas, pero no garantiza igualdad de píxeles con un rasterizador SVG. Consulta [propiedad](concepts.md), [recetas](recipes.md) y [limitaciones](limitations.md).

Código: [exportaciones públicas](../../src/public.js), [implementación SVG](../../src/index.js), [implementación Canvas](../../src/canvas.js), [pruebas de paridad](../../test/canvas.test.js). Estos enlaces al código corresponden a la revisión de documentación seleccionada.
