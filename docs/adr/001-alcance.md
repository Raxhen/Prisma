# ADR-001 · Alcance y principios

## Estado

**Aceptado** · 23 de noviembre de 2026 · Creado por **Raxhen**

*Revisado el 23 de noviembre de 2026: los cinco principios se han reescrito para que se puedan comprobar, y se ha añadido una tabla con cómo se comprueba cada uno.*

*Revisado el 24 de noviembre de 2026: los tokens pasan de la carpeta `src/tokens/` al archivo `tokens/tokens.json`, en la raíz del proyecto, porque no son solo de la web: también los usarán la app móvil y la herramienta para profesionales.*

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

Cinco reglas que debe cumplir todo lo que entre en Prisma. Están escritas para que cualquiera, sea una persona o un agente de IA, pueda decir **sí cumple** o **no cumple** sin depender de gustos.

**P1 · Todo valor visual sale de un token.**
Los tokens de color, radio, sombra, tamaño de texto y tamaño de icono viven en un solo archivo, `tokens/tokens.json`, en la raíz del proyecto, y cada uno tiene un nombre que dice para qué sirve, como `primary`, `danger` o `radius-control`.
- Los componentes y las pantallas solo usan clases hechas con esos nombres, como `bg-primary` o `rounded-control`.
- Los espacios usan la escala de Tailwind (`p-4`, `gap-2`…), que sale de un único token, `--spacing`.
- No se permite escribir colores de la paleta de Tailwind (`emerald-700`, `gray-600`…), colores hex (`#0E7C86`) ni valores inventados entre corchetes (`[80%]`, `[13px]`).
- Los selectores entre corchetes, como `[&_svg]:size-4`, sí se permiten si el valor que aplican es un token.

**P2 · Las pantallas usan componentes, no los copian.**
- Todo lo que tiene color, borde, radio o sombra es un componente de `src/components/`, con su historia en Storybook y su fila en `docs/componentes.md`.
- Las pantallas de `src/screens/` solo colocan componentes. Para eso pueden usar clases de colocación: `flex`, `grid`, `gap-*`, `p-*`, `m-*`, `w-*`, `h-*`, `max-w-*` y de posición.
- Si falta una pieza, como una burbuja de mensaje o un estado vacío, se crea primero como componente.

**P3 · Accesible para todo el mundo, más aún con la información médica.**
- **Contraste:** todo cumple **WCAG 2.2 AA**, es decir, al menos 4,5:1 en el texto y 3:1 en iconos, bordes de campos y contornos de foco.
- **Información médica:** son las dosis y pautas de medicación, los resultados y valores de análisis, y las fechas y horas de citas. Se muestran **siempre con el token de texto `text-strong`**, que tiene al menos **7:1 (AAA)** sobre cualquier fondo de Prisma.
- **Teclado:** cada botón, campo y enlace se alcanza con la tecla **Tab** y muestra un **contorno de foco visible**.
- **Tamaño:** cada botón, campo y enlace mide al menos **44 × 44 px**.

**P4 · Todo funciona en modo claro y en modo oscuro.**
- Cada token de color tiene un valor para el modo claro y otro para el oscuro. Los componentes no eligen colores según el modo: lo hacen los tokens.
- Storybook tiene un selector de modo claro y oscuro, y cada historia pasa la revisión de accesibilidad en los dos.

**P5 · Un nombre, un significado.**
Para estas cinco cosas, todos los componentes usan las mismas palabras. Si hace falta una nueva, se añade a esta tabla en la misma PR que la usa. Las demás props (`label`, `title`, `hint`…) no están limitadas por esta tabla.

| Para… | Prop | Valores permitidos |
|---|---|---|
| Elegir el aspecto | `variant` | Énfasis: `primary`, `secondary`, `ghost` · Intención: `neutral`, `info`, `success`, `warning`, `danger` · Superficie: `outlined`, `elevated`, `filled` |
| Elegir el tamaño | `size` | `sm`, `md`, `lg` |
| Poner un icono | `icon` | Cualquier icono de Tabler Icons |
| Colocar el icono | `iconPosition` | `start`, `end` |
| Marcar un error en un campo | `error` | El texto del mensaje, nunca `true` o `false` |

**No se permiten sinónimos** de estas palabras: `padding` o `scale` por `size`; `destructive` o `error` como valor de `variant`; `leftIcon`, `iconLeft` o `startIcon` por `icon` con `iconPosition`.

**Los tokens no dependen de Tailwind.** Como Prisma también servirá para la futura app móvil nativa, `tokens/tokens.json` está fuera de `src/`, la carpeta de la web, y usa el formato estándar DTCG (*Design Tokens Community Group*), que se puede usar fuera de la web. Tailwind los lee, pero no es su origen.

#### Cómo se comprobará cada principio

| Principio | Revisando el código | Mirándolo en Storybook |
|---|---|---|
| **P1** · Todo valor visual sale de un token | ✅ Una búsqueda en `src/components/` y `src/screens/` no encuentra colores de la paleta (como `-emerald-700` o `-gray-600`), ni `#` seguido de un color, ni corchetes con un número o porcentaje (como `[80%]` o `[13px]`). Cada clase de color, radio, sombra y texto usa un nombre definido en `tokens/tokens.json`. | — |
| **P2** · Las pantallas usan componentes, no los copian | ✅ En `src/screens/` no hay clases de color (`bg-`, `text-` con color, `border-` con color), de radio (`rounded-`) ni de sombra (`shadow-`). Cada componente de `src/components/` tiene su archivo `.stories.tsx` y su fila en `docs/componentes.md`. | ✅ Cada componente aparece en el menú de Storybook y en la página **Status**. |
| **P3** · Accesible, y 7:1 en la información médica | ✅ Las dosis, los resultados y las fechas de citas usan `text-strong`. La tabla de contrastes de `tokens/tokens.json` da al menos 7:1 para `text-strong` y 4,5:1 para el resto de textos, en los dos modos. Los botones, campos y enlaces tienen una altura mínima de 44 px (`min-h-11` o más). | ✅ La pestaña **Accessibility** no muestra fallos en ninguna historia. Recorriendo cada historia con **Tab**, todos los elementos se alcanzan y se ve su contorno de foco. |
| **P4** · Modo claro y modo oscuro | ✅ Cada token de color de `tokens/tokens.json` tiene valor claro y oscuro. Ningún componente usa clases `dark:`. | ✅ Con el selector de modo de Storybook, la pestaña **Accessibility** no muestra fallos en ninguna historia, ni en modo claro ni en modo oscuro. |
| **P5** · Un nombre, un significado | ✅ En los tipos de las props de cada componente, el aspecto, el tamaño, el icono, su posición y el error se eligen con las palabras y los valores de la tabla de P5, sin sinónimos. Si aparece una palabra nueva, esa misma PR la añade a la tabla. | ✅ En el panel de controles de cada historia, `variant`, `size` e `iconPosition` solo ofrecen valores de la tabla. |

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
| P2 | `CardHeader` siempre usa un `h3`, así que no se puede elegir el nivel del título. Por eso la pantalla del asistente lo copió en vez de usarlo. | `Card.tsx:75` |
| P3 | No existe el token `text-strong` para la información médica. | — |
| P4 | Storybook no tiene selector de modo claro y oscuro. | `.storybook/preview.ts` |
| P4 | No hay modo oscuro. | Todo el proyecto |
| P5 | Card usa `padding` en vez de `size`. El icono de Button se pasa con `iconLeft` e `iconRight`, en vez de `icon` con `iconPosition`. | `Card.tsx:10`, `Button.tsx:12–14` |
| Marca | `teal` sigue en Input y Card. | `Input.tsx:75`, `Card.tsx:16` y `Card.tsx:68` |

La rama **`antes`** guarda Prisma tal y como está hoy, antes de aplicar este ADR, para comparar el resultado cuando se cumplan las reglas.
