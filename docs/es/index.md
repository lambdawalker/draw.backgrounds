# Integrar draw.backgrounds

<!-- publication-status:start -->
**Ámbito: Desarrollo (`main`).** Estas guías no confirman ninguna publicación en npm. [Instalación](../../IMPORT.md) distingue las etiquetas de código de los paquetes publicados. Los consumidores históricos deben consultar el README de su etiqueta exacta.
<!-- publication-status:end -->

Genera fondos sintéticos originales para 50 estados de Estados Unidos, 32 entidades federativas mexicanas y 13 provincias y territorios canadienses. La aplicación añade texto, fotos y datos. Es una biblioteca de dibujo, no un generador de credenciales, validador de documentos ni servicio de agentes autónomos.

| Tarea | Entrada pública | Siguiente lectura |
| --- | --- | --- |
| Producir un SVG independiente en Node o un empaquetador web | `render` del paquete raíz | [Inicio rápido](quickstart.md) |
| Producir píxeles o PNG en Node | `renderCanvas` de `/canvas` | [Recetas](recipes.md) |
| Descubrir claves válidas de países y jurisdicciones | Exportaciones del catálogo raíz | [API](api.md) |
| Reproducir y comparar un resultado | Semilla y dimensiones explícitas | [Conceptos](concepts.md) |
| Diagnosticar un fallo de integración | Validación y comprobaciones del entorno | [Solución de problemas](troubleshooting.md) |

Ambos renderizadores son síncronos, usan US, semilla 42 y 1400 × 880 por defecto, y validan identificadores y límites numéricos. La codificación Canvas es asíncrona. El consumidor administra resultados, escritura de archivos, concurrencia y limpieza. `states` solo contiene estados de US; usa `jurisdictionsByCountry` para todos los países. Usa las entradas públicas del paquete, nunca módulos internos de geometría.

[Inicio rápido](quickstart.md) · [Conceptos y propiedad](concepts.md) · [Contratos de API](api.md) · [Recetas y demostraciones](recipes.md) · [Galería](gallery.md) · [Limitaciones](limitations.md) · [Solución de problemas](troubleshooting.md) · [Migración](migration.md)
