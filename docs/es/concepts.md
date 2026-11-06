# Conceptos y propiedad

<!-- publication-status:start -->
**Ámbito: Desarrollo (`main`).** Estas guías describen la copia del código fuente. Consulta [instalación](../../IMPORT.md) para conocer el estado de publicación confirmado y elige documentación que corresponda a la fuente exacta de tu dependencia.
<!-- publication-status:end -->

La aplicación elige país, clave de jurisdicción, semilla y tamaño; el renderizador dibuja una composición fija con variaciones según la semilla. No requiere servicios externos, autenticación, solicitudes de red ni un ciclo de vida global del renderizador.

## Selección y determinismo

Las claves de país son `us`, `mx`, `ca`. Las claves de jurisdicción son identificadores ASCII en minúsculas del catálogo, no etiquetas traducidas. `countryNames` proporciona nombres de países en inglés, no de jurisdicciones. No deduzcas claves eliminando acentos; búscalas en el catálogo. País y jurisdicción deben coincidir.

La semilla controla detalles procedimentales como las fases de ondas y las crestas. No elige una edición de documento distinta ni reorganiza radicalmente la composición. El mismo código, renderizador, opciones y entorno reproducen el resultado. La igualdad de SVG es determinista; los codificadores raster y las bibliotecas nativas pueden cambiar bytes o suavizado entre entornos. Registra revisión de código, opciones y herramientas con los conjuntos de datos.

El dibujo usa un sistema lógico de coordenadas de 1400 × 880. Ambos ejes se escalan independientemente al tamaño solicitado. Otra relación de aspecto estira el diseño. Usa tamaños proporcionales como 700 × 440 para mantener las proporciones.

## Valores y recursos

`render` reserva y devuelve una cadena SVG independiente. No modifica las opciones del consumidor, guarda archivos ni mantiene una sesión. La aplicación decide cómo mostrarla o conservarla. Los SVG idénticos repetidos pueden contener los mismos identificadores de definiciones; usa documentos de imagen separados en lugar de concatenar directamente el marcado SVG en un documento compartido.

`renderCanvas` reserva una superficie Canvas nativa en cada llamada. El consumidor administra la superficie y sus búferes derivados. `await canvas.encode('png')` produce bytes codificados. Conserva la superficie mientras leas su búfer `data()`, o usa `Buffer.from(canvas.data())` para copiarlo antes de una entrega asíncrona. Los métodos de la superficie pertenecen a la dependencia nativa, no son exportaciones adicionales de draw.backgrounds.

El renderizado es síncrono y bloquea el hilo que lo llama. No hay callbacks de progreso, tokens de cancelación, trabajos en flujo, grupos de workers ni método explícito de liberación de la biblioteca. Limita concurrencia y memoria en la aplicación; usa workers si necesitas aislar CPU. La escritura y la codificación asíncrona pueden fallar independientemente del dibujo. Libera las referencias tras usarlas; no mantengas un lote grande completo en memoria.

Los objetos y arrays del catálogo están congelados. Trátalos como datos de solo lectura; crea una copia antes de ordenarlos o añadir opciones de interfaz. Consulta todas las exportaciones en [API](api.md) y las garantías visuales en [limitaciones](limitations.md).
