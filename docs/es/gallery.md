# Galería renderizada

<!-- publication-status:start -->
**Ámbito: Desarrollo (`main`).** Estas guías describen la copia del código fuente. Consulta [instalación](../../IMPORT.md) para conocer el estado de publicación confirmado y elige documentación que corresponda a la fuente exacta de tu dependencia.
<!-- publication-status:end -->

Son resultados reales del renderizador, no maquetas ni fotografías. Los tres escenarios usan semilla 42 y dimensiones proporcionales. Las imágenes no contienen texto dependiente del idioma y se comparten entre traducciones. Demuestran composición, no validez de credenciales ni rendimiento de entrenamiento.

## Estados Unidos · Texas

![Fondo procedimental de Texas con trazos regionales](../../previews/us/texas.png)

Selecciona `render('texas', { country: 'us', seed: 42 })`. El catálogo contiene 50 estados de US.

## México · Jalisco

![Fondo procedimental de Jalisco con motivos regionales](../../previews/mx/jalisco.png)

Selecciona `render('jalisco', { country: 'mx', seed: 42 })`. Pasa `mx` explícitamente; el valor predeterminado es US. El catálogo contiene 32 entidades federativas mexicanas.

## Canadá · Quebec

![Fondo procedimental de Quebec con motivos regionales](../../previews/ca/quebec.png)

Selecciona `render('quebec', { country: 'ca', seed: 42 })`. El catálogo contiene 13 provincias y territorios canadienses.

Ejecuta los [ejemplos SVG y Canvas](recipes.md) para crear estos escenarios localmente. La galería revisada y sus hashes de código y configuración se mantienen separados de los candidatos generados; los cambios de dibujo exigen revisión visual antes de aceptar nuevas referencias. Consulta [limitaciones](limitations.md) antes de usar las imágenes en un conjunto de datos.
