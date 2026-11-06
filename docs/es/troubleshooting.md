# Solución de problemas

<!-- publication-status:start -->
**Ámbito: Desarrollo (`main`).** Estas guías describen la copia del código fuente. Consulta [instalación](../../IMPORT.md) para conocer el estado de publicación confirmado y elige documentación que corresponda a la fuente exacta de tu dependencia.
<!-- publication-status:end -->

Empieza registrando etiqueta o commit exactos, versión de Node, sistema operativo, arquitectura, renderizador, jurisdicción y opciones. Reproduce con una imagen de 700 × 440 antes de investigar un lote.

| Síntoma | Causa que comprobar | Corrección |
| --- | --- | --- |
| `Unknown country` | Nombre visible o `all` pasado a la API | Usa `us`, `mx`, `ca`; enumera para lotes |
| `Unknown state` / `Unknown jurisdiction` | País, mayúsculas o nombre traducido incorrectos | Selecciona la clave exacta de `jurisdictionsByCountry[country]` |
| Error de semilla | Valor negativo, fraccionario, cadena o fuera de rango | Pasa un entero entre 0 y 4294967295 |
| Error de dimensiones | Valor no entero, cero, eje >8192 o producto >40 millones | Valida ambos ejes y su producto |
| `TypeError` con opciones | `null` o entrada mal formada | Omite las opciones o pasa un objeto ordinario |
| Fallo de importación Canvas o enlace nativo | Dependencias opcionales omitidas o plataforma incompatible | Reinstala las dependencias opcionales y revisa compatibilidad; usa SVG raíz si procede |
| El empaquetador web resuelve módulos nativos | Importación de `/canvas` | Usa la entrada SVG raíz en el navegador |
| Subruta del paquete no exportada | Importación profunda de archivos internos | Importa solo raíz o `/canvas` |
| Los bytes PNG difieren entre equipos | Codificador o entorno nativo diferentes | Fija las herramientas; compara píxeles decodificados con tolerancia explícita |
| Imagen estirada | La proporción difiere de 1400:880 | Usa dimensiones proporcionales |
| Archivos de lote sin manifiesto | Fallo de codificación o escritura parcial | Corrige el fallo y repite en un directorio nuevo |
| `npm` informa versión 0.1.0 para v0.0.1 | Discrepancia histórica entre etiqueta y manifiesto | Conserva el selector de etiqueta y registra ambas identidades |

Ejecuta los ejemplos de [recetas](recipes.md). `npm test` comprueba renderizado y validación; las pruebas Canvas necesitan la dependencia nativa opcional y Sharp. Un ejemplo SVG correcto no demuestra compatibilidad Canvas. Un renderizado correcto no demuestra que una escritura o codificación posterior haya terminado bien.

Incluye una llamada mínima, el error exacto y si falla SVG o Canvas en los informes. Evita depurar con importaciones geométricas privadas: no son el contrato público. [API](api.md) detalla límites; [conceptos](concepts.md) explica propiedad.
