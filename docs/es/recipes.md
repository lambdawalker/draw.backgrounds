# Recetas y ejemplos ejecutables

<!-- publication-status:start -->
**Ámbito: Desarrollo (`main`).** Estas guías describen la copia del código fuente. Consulta [instalación](../../IMPORT.md) para conocer el estado de publicación confirmado y elige documentación que corresponda a la fuente exacta de tu dependencia.
<!-- publication-status:end -->

Todos los comandos siguientes se ejecutan desde la raíz del repositorio después de `npm ci` en Node.js 22+. Usa un directorio nuevo para evitar sobrescribir resultados anteriores.

## Planear un fondo alrededor de la foto

Los renderizadores SVG y Canvas para Node reproducen la misma receta. El ejemplo escribe un SVG, un PNG y la receta JSON. Ejecuta `node examples/render-composition.mjs /tmp/draw-composition`.

```js
import { createComposition, renderComposition } from '@lambdawalker/draw-backgrounds';
import { renderCompositionCanvas } from '@lambdawalker/draw-backgrounds/canvas';

const recipe = createComposition({
  seed: 2081,
  width: 700,
  height: 440,
  photoIdBoundingBox: { x: 0.06, y: 0.24, width: 0.28, height: 0.6 },
  colorScheme: {
    paper: '#F4F0E7', primary: '#386A73',
    secondary: '#718A67', accent: '#B67B57',
  },
});
const svg = renderComposition(recipe);
const canvas = renderCompositionCanvas(recipe);
```

## Demostraciones SVG y Canvas

| Ejemplo | Ejecución | Resultado esperado |
| --- | --- | --- |
| [Código SVG](../../examples/render-svg.mjs) | `node examples/render-svg.mjs /tmp/draw-svg` | Tres SVG de 700 × 440 y un manifiesto de metadatos |
| [Código Canvas](../../examples/render-canvas.mjs) | `node examples/render-canvas.mjs /tmp/draw-canvas` | Tres PNG de 700 × 440 y un manifiesto de metadatos |

Ambos cubren `us/texas`, `mx/jalisco`, `ca/quebec` con semilla 42. Ejecútalos dos veces y compara hashes en el mismo entorno. Cambia una semilla para observar variación procedimental; cambia el país sin cambiar la clave para probar la validación. Los fallos de carga Canvas suelen indicar dependencias nativas opcionales ausentes; usa el ejemplo SVG mientras resuelves la compatibilidad de plataforma.

## Codificar un PNG

Script ESM completo para consumidores, después de instalar una revisión compatible cuya API hayas revisado:

```js
import { writeFile } from 'node:fs/promises';
import { renderCanvas } from '@lambdawalker/draw-backgrounds/canvas';

const canvas = renderCanvas('quebec', {
  country: 'ca', seed: 42, width: 700, height: 440,
});
await writeFile('quebec.png', await canvas.encode('png'));
```

El canvas permanece accesible hasta terminar la codificación. Para píxeles sin codificar, copia `Buffer.from(canvas.data())` si el consumidor vive más que la superficie. Los bytes PNG y RGBA sin codificar son formatos distintos.

## Enumerar todos los diseños

Este fragmento usa el catálogo raíz; procesa resultados secuencialmente o con concurrencia limitada:

```js
import { countries, jurisdictionsByCountry, render } from '@lambdawalker/draw-backgrounds';

for (const country of countries) {
  for (const jurisdiction of jurisdictionsByCountry[country]) {
    const svg = render(jurisdiction, { country, seed: 42 });
    console.log(country, jurisdiction, svg.length);
  }
}
```

## CLI por lotes del repositorio

La CLI es una herramienta del repositorio, no un ejecutable publicado del paquete. Sharp es una dependencia de desarrollo para rasterizar PNG en la CLI; ese proceso no usa el renderizador Canvas.

```sh
npm run generate -- --country all --state all --seed 42 --format both --out /tmp/draw-all
npm run generate -- --country mx --state jalisco --count 3 --seed 100 --format svg --out /tmp/draw-jalisco
npm run generate -- --help
```

Los valores predeterminados son US, todos los estados, cantidad 1, semilla 42, 1400 × 880 y ambos formatos. `--count` es por jurisdicción, acepta 1–10000 e incrementa la semilla para cada variación; el rango completo debe caber en uint32. `--country` explícito produce subdirectorios por país y un manifiesto versión 2. Omitirlo conserva la salida plana de US y manifiestos versión 1. `--country all` requiere `--state all`. Los formatos son `svg`, `png`, `both`. El manifiesto registra semillas, nombres relativos y hashes SHA-256. Los archivos se escriben secuencialmente y pueden quedar tras un fallo; el manifiesto solo se escribe después de generar todo correctamente.

## Visualización web y composición

Usa la entrada SVG raíz con un empaquetador ESM. Para un elemento de imagen, crea un Blob con la cadena SVG, asigna una URL de objeto y revócala cuando la aplicación ya no la necesite. La biblioteca no suministra interfaz web ni ciclo de vida DOM. Añade etiquetas, fotos, máscaras o metadatos sintéticos en la capa de composición de la aplicación; no son opciones del renderizador. Consulta [limitaciones](limitations.md).
