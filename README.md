# Prisma

**Prisma** es el design system de **FullHealth**: el conjunto de componentes, estilos y reglas visuales con el que se construye la app.

> **Estado:** 🌱 En fase inicial. El repositorio acaba de crearse y todavía no hay componentes publicados.

---

## Qué es FullHealth

FullHealth es una app de salud. Cada persona entra en su portal y tiene en un solo sitio todo lo relacionado con su salud:

- **Recetas y medicación**: qué medicamentos tiene recetados y cuándo debe tomarlos.
- **Análisis y chequeos**: las pruebas y revisiones que se ha hecho a lo largo del año.
- **Citas**: sus próximas consultas, por ejemplo con el dentista.
- **Grabación de consultas y notas**: puede grabar lo que se habla en la consulta y tomar sus propias notas.
- **Agente de IA**: puede hablar con un asistente sobre cómo se siente.
- **Objetivos de revisiones**: puede marcarse cuántas revisiones quiere hacerse al año (vista, dientes, medicina general).
- **Panel de datos y métricas**: para seguir de un vistazo su evolución y si va cumpliendo sus objetivos.

## Qué es Prisma

Prisma es la base visual y de interfaz de FullHealth. Reúne en un mismo sitio:

- **Fundamentos**: colores, tipografía, espaciados, iconos y otros valores de diseño compartidos.
- **Componentes**: piezas reutilizables de la interfaz (botones, campos de formulario, tarjetas, avisos…).
- **Patrones**: combinaciones de componentes para las partes propias de la app, como la tarjeta de un medicamento, una cita en el calendario o un gráfico del panel de métricas.
- **Documentación**: cómo y cuándo usar cada pieza, con ejemplos que se pueden ver y probar.

Así, toda la app tiene el mismo aspecto, es accesible y se construye más rápido.

## Para quién es

- **Diseño**: para tener una referencia común y saber qué existe ya antes de diseñar algo nuevo.
- **Desarrollo**: para montar pantallas con componentes ya hechos y probados, sin rehacerlos cada vez.
- **Producto y negocio**: para ver de un vistazo qué piezas hay disponibles y cómo se comportan.

Y al final, para las personas que usan FullHealth: una interfaz clara, coherente y fácil de usar, también para quien tenga dificultades de visión, de movilidad o poca costumbre con la tecnología.

## Qué vamos a construir

1. **Fundamentos**: paleta de colores, tipografía, espaciados, sombras, bordes e iconos.
2. **Componentes básicos**: botones, enlaces, campos de texto, selectores, casillas, etiquetas, avisos, ventanas emergentes, pestañas, menús…
3. **Componentes de FullHealth**:
   - Tarjeta de medicamento y recordatorio de toma.
   - Resultado de análisis o chequeo.
   - Cita en lista y en calendario.
   - Grabador de consulta y editor de notas.
   - Conversación con el agente de IA.
   - Objetivo de revisión con su progreso.
   - Gráficos e indicadores para el panel de métricas.
4. **Documentación interactiva** en Storybook, con ejemplos de cada componente.

### Principios

- **Claridad**: la información de salud tiene que entenderse a la primera.
- **Accesibilidad**: contraste suficiente, tamaños de letra legibles y uso completo con teclado y lector de pantalla.
- **Calma y confianza**: un tono visual tranquilo, adecuado para hablar de salud.
- **Coherencia**: cada pieza se ve y se comporta igual en toda la app.

## Tecnología

| Herramienta | Para qué se usa |
|---|---|
| [React](https://react.dev) | Construir los componentes |
| [Vite](https://vite.dev) | Arrancar y compilar el proyecto |
| [Storybook](https://storybook.js.org) | Ver, probar y documentar los componentes |

### Requisitos

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org) en versión LTS, **22.12 o superior** (incluye npm)

Para comprobar las versiones que tienes:

```bash
git --version
```

```bash
node --version
```

## Estado del proyecto

| Fase | Estado |
|---|---|
| Definición del proyecto y README | ✅ Hecho |
| Preparar el proyecto con React, Vite y Storybook | ⏳ Pendiente |
| Fundamentos (colores, tipografía, espaciados) | ⏳ Pendiente |
| Componentes básicos | ⏳ Pendiente |
| Componentes de FullHealth | ⏳ Pendiente |
| Documentación en Storybook | ⏳ Pendiente |

Este README se actualizará a medida que avance el proyecto.
