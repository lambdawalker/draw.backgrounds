# Limitaciones y compatibilidad

<!-- publication-status:start -->
**Ámbito: Desarrollo (`main`).** Estas guías describen la copia del código fuente. Consulta [instalación](../../IMPORT.md) para conocer el estado de publicación confirmado y elige documentación que corresponda a la fuente exacta de tu dependencia.

Aquí no se confirma publicación alguna en npm. Una etiqueta Git solo confirma disponibilidad del código. Usa [instalación](../../IMPORT.md) y [migración](migration.md) para seleccionar una revisión comprobada.
<!-- publication-status:end -->

Los dibujos son fondos originales estilizados inspirados en referencias públicas y estudios regionales. No son réplicas, declaraciones sobre formatos vigentes, sellos oficiales, datos codificados ni documentos de identidad completos. La cobertura de referencias varía; la revisión visual no demuestra precisión de OCR ni detectores. Evalúa los conjuntos de datos con imágenes reales reservadas para tu tarea concreta.

El renderizado por jurisdicción admite los 95 diseños del catálogo y conserva sus motivos y paletas principales al cambiar la semilla. La API de composición independiente acepta colores base y un rectángulo opcional para la foto. Incluye un conjunto fijo de motivos procedimentales y no analiza imágenes ni distribuye texto. No simula distorsión de cámara, impresión, desgaste, iluminación ni aumentos fotográficos.

Node requiere versión 22 o posterior. Los empaquetadores web pueden usar la entrada SVG ESM raíz. Canvas es exclusivo de Node y depende de una instalación nativa opcional compatible de `@napi-rs/canvas`. No se declara entrada CommonJS, adaptador Canvas web ni ejecutable CLI del paquete. Sharp pertenece a las herramientas del repositorio, no al entorno público SVG.

El SVG es determinista para un código y entradas concretos. Los bytes raster dependen del entorno. SVG y Canvas comparten geometría pero difieren en suavizado y composición; las pruebas de paridad comparan error visual, no exigen píxeles exactos. Los límites de tamaño evitan algunas reservas inválidas, pero no garantizan que un renderizado o lote grande quepa en memoria. El renderizado bloquea su hilo y no ofrece cancelación ni eventos de progreso.

La biblioteca administra únicamente el dibujo del fondo. La aplicación administra validación en fronteras de confianza, contenido superpuesto, accesibilidad de interfaz, almacenamiento, planificación, limpieza y evaluación de datos. Los fondos no contienen texto, por lo que compartir imágenes entre idiomas de documentación no representa una interfaz traducida.
