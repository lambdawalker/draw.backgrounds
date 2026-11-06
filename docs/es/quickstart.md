# Inicio rápido

<!-- publication-status:start -->
**Ámbito: Desarrollo (`main`).** Estas guías describen la copia del código fuente. Consulta [instalación](../../IMPORT.md) para conocer el estado de publicación confirmado y elige documentación que corresponda a la fuente exacta de tu dependencia.

Para instalar una dependencia de consumidor, la etiqueta histórica de código confirmada se instala así:

```sh
npm install "github:lambdawalker/draw.backgrounds#v0.0.1"
```

El manifiesto de esa etiqueta declara `0.1.0`; el selector Git y la versión del manifiesto difieren. Esto confirma disponibilidad histórica del código, no publicación en npm ni que la documentación de Desarrollo describa esa revisión. Consulta el [README etiquetado](https://github.com/lambdawalker/draw.backgrounds/blob/v0.0.1/README.md). [IMPORT.md](../../IMPORT.md) es la autoridad sobre instalación. Los consumidores de solo SVG pueden omitir dependencias opcionales.
<!-- publication-status:end -->

Las integraciones Node requieren Node.js 22 o posterior y ESM. Los empaquetadores web pueden consumir la entrada SVG raíz; la entrada Canvas nativa es exclusiva de Node.

## Elegir una fuente

Para reproducir los ejemplos del repositorio, descarga la revisión del repositorio que hayas revisado y ejecuta:

```sh
npm ci
node examples/render-svg.mjs /tmp/draw-svg
node examples/render-canvas.mjs /tmp/draw-canvas
```

Los scripts crean SVG o PNG de Texas, Jalisco y Quebec junto con metadatos JSON que registran opciones y hashes. Imprimen el directorio de salida. Elige un directorio nuevo: se sobrescriben los archivos coincidentes. Canvas necesita las dependencias opcionales habilitadas. Estos ejemplos importan `../src/public.js` y `../src/canvas.js` para ejecutar esta copia del código.

## Ejemplo completo de consumidor

Guárdalo como `example.mjs` después de instalar una revisión cuya API hayas comprobado:

```js
import { writeFile } from 'node:fs/promises';
import { render, jurisdictionsByCountry } from '@lambdawalker/draw-backgrounds';

const country = 'mx';
const jurisdiction = 'jalisco';
if (!jurisdictionsByCountry[country].includes(jurisdiction)) {
  throw new Error('Unsupported jurisdiction');
}
const svg = render(jurisdiction, { country, seed: 42, width: 700, height: 440 });
await writeFile('jalisco.svg', svg);
```

Ejecuta `node example.mjs`. El resultado es un SVG independiente de 700 × 440 sin imágenes ni fuentes externas. Ábrelo en un navegador o rasterízalo en tu aplicación. El renderizado no realiza operaciones de archivos. Continúa con las [recetas Canvas y por lotes](recipes.md) y los [límites de la API](api.md).
