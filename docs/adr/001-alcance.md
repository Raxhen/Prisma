# ADR-001 · Alcance y principios

## Estado

**Aceptado** · 23 de noviembre de 2026 · Creado por **Raxhen**

Un ADR (*Architecture Decision Record*) es un documento corto que deja por escrito una decisión importante y por qué se tomó. Este es el primero de Prisma: dice qué cubre el design system y qué reglas tiene que cumplir todo lo que se haga con él.

## Contexto

**FullHealth** es una app de salud. Cada persona entra en su portal y ve:
- sus recetas y la medicación que tiene que tomar;
- sus análisis y chequeos del año;
- sus citas.

También puede grabar sus consultas, tomar notas, hablar con un agente de IA sobre cómo se siente y seguir sus objetivos de revisiones en un panel de datos y métricas.

**Prisma** es su design system:
- Se hace para la web, con React y TypeScript sobre Vite.
- Los estilos van con Tailwind CSS v4 y los iconos con Tabler Icons.
- No usa ninguna librería de componentes: todos los componentes son propios.

Hoy tiene cuatro componentes (Button, Input, Card y Badge), una historia de Storybook por cada uno y una pantalla de prueba, la del asistente.

La auditoría (`docs/audit.md`) muestra que, **sin reglas**, el sistema ya se está desordenando:

- **No hay tokens.** Un token es un valor de diseño con nombre propio, como «color principal» o «espacio mediano». Todos los colores, espacios y radios son valores de Tailwind escritos a mano dentro de cada componente.
- **Hay dos verdes principales mezclados**: `emerald` en Button y `teal` en Input y Card.
- **Un mismo significado tiene varios tonos.** El rojo de error, por ejemplo, aparece en tres: `red-600`, `red-700` y `red-800`.
- **Las medidas no encajan entre sí.** En tamaño mediano, Button mide 44 px de alto e Input 40 px, así que no quedan alineados.
- **Los nombres no son coherentes.** Card usa `padding` donde los demás usan `size`. Button dice `danger` y Input dice `error` para la misma idea.
- **La pantalla de prueba** (sección 5 de la auditoría) tiene más de 60 clases escritas a mano, copia componentes en lugar de usarlos y tiene la jerarquía de títulos al revés.

Además, Prisma va a tener que servir para más de un producto y para información médica, donde un error de lectura importa más que en otras apps. Hace falta decidir **qué cubre** y **qué reglas comprobables** tiene que cumplir.

## Decisión

### 1. Alcance

**Entra en Prisma:**

| Producto | Ahora o más adelante |
|---|---|
| El portal de cada persona en FullHealth, también el panel de datos y métricas | Ahora |
| La web pública de la marca FullHealth (presentación, precios…) | Ahora |
| Una futura **app móvil nativa** de FullHealth | Más adelante, con los mismos tokens |
| Una futura **herramienta interna para profesionales sanitarios** | Más adelante, con los mismos tokens |
| **Modo oscuro** en todos los productos | Ahora |
| **Gráficos del panel de métricas**, como componentes propios de Prisma | Ahora |

**Se queda fuera por ahora:**

- **Otros idiomas.** Todo se escribe en español. Si se añade otro idioma, hará falta un ADR nuevo.
- **Librerías de componentes y de gráficos.** Los gráficos también se hacen desde cero, como el resto de componentes. No se usa ninguna librería de gráficos.

### 2. Marca

- **El color principal de FullHealth es `emerald`**, el verde de los botones.
- **`teal` deja de usarse.**

### 3. Principios

Cinco reglas que debe cumplir todo lo que entre en Prisma. Cada una se puede comprobar con una revisión de la PR o con una herramienta, sin depender de opiniones.

| # | Principio | Cómo se comprueba |
|---|---|---|
| **P1** | **Todo valor visual sale de un token.** Colores, espacios, radios, tamaños de texto, sombras y tamaños de icono se definen una sola vez, con un nombre que dice para qué sirven, como `primary`, `danger` o `space-md`. Ningún componente ni pantalla escribe un color de la paleta de Tailwind, un color hex ni un valor entre corchetes. | Una búsqueda en `src/components/` y `src/screens/` no encuentra ninguna clase de la paleta (como `bg-emerald-700` o `text-gray-600`), ningún `#` con un color ni ningún valor como `[80%]`. |
| **P2** | **Las pantallas usan componentes, no los copian.** Si falta una pieza, como una burbuja de mensaje o un estado vacío, se crea en `src/components/` y no dentro de la pantalla. Las pantallas solo colocan componentes: no les dan color, borde, radio ni sombra. | Cada componente de `src/components/` tiene su historia en Storybook y su fila en `docs/componentes.md`. En `src/screens/` no hay clases de color, borde, radio ni sombra. |
| **P3** | **Accesible para todo el mundo, más aún con la información médica.** Todo cumple **WCAG 2.2 AA**: contraste de al menos 4,5:1 en el texto y de 3:1 en iconos y bordes, y todo se puede usar con teclado. Los textos con información médica (dosis, resultados, fechas de citas) llegan a **7:1 (AAA)**. Todo lo que se pulsa mide al menos **44 × 44 px**. | La revisión de accesibilidad de Storybook no da fallos en ninguna historia. Los tokens de color se comprueban con una tabla de contrastes. Ningún botón, campo ni enlace mide menos de 44 px de alto. |
| **P4** | **Todo funciona en modo claro y en modo oscuro.** Cada token de color tiene un valor para cada modo, y los componentes no eligen colores según el modo: lo hacen los tokens. | Cada historia de Storybook se puede ver en los dos modos y pasa la revisión de accesibilidad en ambos. Ningún componente usa clases `dark:`. |
| **P5** | **Un nombre, un significado.** Todos los componentes usan las mismas palabras:<br>– el aspecto se elige con `variant`;<br>– el tamaño se elige con `size`, con los valores `sm`, `md` y `lg`;<br>– las intenciones son `primary`, `neutral`, `info`, `success`, `warning` y `danger`;<br>– el icono se pasa con `icon`.<br>Si un componente necesita una palabra nueva, se añade aquí primero. | Al revisar los tipos de las props de cada componente, todos usan este vocabulario. No hay sinónimos, como `padding` en vez de `size` o `error` en vez de `danger` para elegir un aspecto. |

**Los tokens no dependen de Tailwind.** Como Prisma también servirá para la futura app móvil nativa, los tokens se guardan en un formato que se pueda usar fuera de la web. Tailwind los lee, pero no es su origen.

### 4. Cómo se decide un cambio

- **Cada cambio en Prisma va en su propia rama y con una pull request.**
- **Raxhen revisa y aprueba cada PR** antes de fusionarla.
- **Si un cambio necesita saltarse uno de los cinco principios,** se escribe un ADR nuevo que explique por qué.

## Consecuencias

### Lo que ganamos

- **Un solo color principal y tokens con nombre:** la app se ve igual en todas las pantallas. Para cambiar un color, basta con cambiarlo en un sitio.
- **Reglas que se pueden comprobar:** una revisión, sea de una persona o de un agente de IA, puede decir si algo cumple o no, sin discutir gustos.
- **Información médica más legible**, gracias al contraste de 7:1.
- **Los mismos tokens servirán para la app móvil** y la herramienta para profesionales: no habrá que rehacer las decisiones de diseño.

### Lo que cuesta

- **Más trabajo antes de crear pantallas:** hay que definir los tokens y el modo oscuro primero.
- **Hacer los gráficos desde cero** lleva más tiempo que usar una librería, sobre todo para que sean accesibles. Por ejemplo, cada gráfico necesita una alternativa en texto o en tabla.
- **El 7:1 limita los colores** que se pueden usar en los textos médicos. Por ejemplo, el blanco sobre `emerald-700` da 5,4:1: vale para un botón, pero no para un resultado de análisis.

### Lo que hay que cambiar en lo que ya existe

Según la auditoría, hoy Prisma **no cumple** estos principios en varios puntos:

| Principio | Qué no cumple hoy | Dónde |
|---|---|---|
| P1 | Todos los colores, espacios y radios están escritos a mano, y no hay tokens. | Los cuatro componentes (`docs/audit.md`, sección 3) |
| P1, P2 | La pantalla del asistente tiene más de 60 clases escritas a mano y cinco piezas copiadas. | `src/screens/antes.tsx` (`docs/audit.md`, sección 5) |
| P2 | Faltan componentes que la pantalla tuvo que inventar: cabecera de pantalla, estado vacío, burbuja de mensaje y divisor. | `src/screens/antes.tsx` |
| P3 | Hay elementos que se pulsan y miden menos de 44 px: Button `sm` (36 px) e Input `sm` y `md` (32 y 40 px). | `Button.tsx:36`, `Input.tsx:21–22` |
| P3 | `CardHeader` siempre usa un `h3`, así que no se puede elegir el nivel del título. | `Card.tsx:75` |
| P4 | No hay modo oscuro. | Todo el proyecto |
| P5 | Card usa `padding` en vez de `size`. Input marca el error con `error` y Button con `danger`. El icono de Button se llama `iconLeft`/`iconRight` y el de los demás, `icon`. | `Card.tsx:10`, `Input.tsx:13`, `Button.tsx:12–14` |
| Marca | `teal` sigue en Input y Card. | `Input.tsx:75`, `Card.tsx:16` y `Card.tsx:68` |

La rama **`antes`** guarda Prisma tal y como está hoy, antes de aplicar este ADR, para comparar el resultado cuando se cumplan las reglas.
