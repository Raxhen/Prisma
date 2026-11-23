# Auditoría del design system Prisma

Fecha: 23 de noviembre de 2026 · Revisado: `main` en el commit `d388297`.

**Alcance:** los componentes de `src/components/`: `Button.tsx`, `Input.tsx`, `Card.tsx` y `Badge.tsx`. Quedan fuera las historias (`*.stories.tsx`), la página de ejemplo (`src/App.tsx`) y la configuración.

**Resumen:**

- Hay **4 componentes**. Card se monta con dos piezas más: `CardHeader` y `CardFooter`.
- **No hay tokens propios**: `src/index.css` no tiene `@theme`. Todos los colores, espacios y radios son los que trae Tailwind por defecto, escritos a mano en cada componente.
- **No hay colores hex ni medidas en px** dentro de los componentes.
- **Hay dos colores principales mezclados**: `emerald` en Button y `teal` en Input y Card.

Equivalencias para leer las tablas: en Tailwind, cada paso de espaciado vale 4 px (`4` = 16 px). Los colores van del `50` (el más claro) al `950` (el más oscuro).

---

## 1. Inventario de componentes

| Componente | Variantes (`variant`) | Por defecto | Tamaños | Por defecto | Otras opciones |
|---|---|---|---|---|---|
| **Button** | `primary`, `secondary`, `ghost`, `danger` | `primary` | `size`: `sm`, `md`, `lg` | `md` | `iconLeft`, `iconRight`, `fullWidth`, `disabled` |
| **Input** | No tiene. El estado de error se activa con `error` | — | `size`: `sm`, `md`, `lg` | `md` | `label` (obligatorio), `hint`, `error`, `icon`, `required`, `disabled` |
| **Card** | `outlined`, `elevated`, `filled` | `outlined` | `padding`: `none`, `sm`, `md`, `lg` | `md` | Piezas: `CardHeader` y `CardFooter` |
| ↳ **CardHeader** | — | — | — | — | `title` (obligatorio), `description`, `icon`, `action` |
| ↳ **CardFooter** | — | — | — | — | Solo `children` |
| **Badge** | `neutral`, `info`, `success`, `warning`, `danger` | `neutral` | `size`: `sm`, `md` | `md` | `icon` |

**Medidas reales de cada tamaño:**

| Componente | `sm` | `md` | `lg` |
|---|---|---|---|
| Button (altura mínima) | 36 px | 44 px | 48 px |
| Input (altura fija) | 32 px | 40 px | 48 px |
| Badge (altura fija) | 24 px | 28 px | — |
| Card (espacio interior) | 16 px | 24 px | 32 px |

**Observaciones:**

- **Button e Input no miden lo mismo** en `sm` (36 y 32 px) ni en `md` (44 y 40 px). Puestos uno al lado del otro, por ejemplo en un buscador con botón, no quedan alineados.
- **Badge no tiene tamaño `lg`**, a diferencia de Button e Input.
- **Card usa `padding`** para su tamaño. Los demás componentes usan `size`.

---

## 2. Colores, espaciados y radios de Tailwind por componente

### Button (`src/components/Button.tsx`)

| Tipo | Valores |
|---|---|
| **Colores** | `primary`: fondo `emerald-700` (→ `emerald-800` al pasar el ratón, → `emerald-900` al pulsar), texto `white` · `secondary`: fondo `white` (→ `gray-50`, → `gray-100`), borde `gray-300`, texto `gray-900` · `ghost`: texto `emerald-700`, fondo al pasar el ratón `emerald-50` (→ `emerald-100` al pulsar) · `danger`: fondo `red-600` (→ `red-700`, → `red-800`), texto `white` · contorno de foco: `emerald-600` |
| **Espaciado** | Separación icono-texto `gap-2` (8 px) · `sm`: `px-4 py-1.5` (16 × 6 px) · `md`: `px-5 py-2` (20 × 8 px) · `lg`: `px-7 py-2.5` (28 × 10 px) · contorno de foco separado `outline-offset-2` (2 px) |
| **Radios** | `rounded-full` (forma de píldora) |
| **Texto** | `text-sm` / `text-base` / `text-lg` según el tamaño · `font-medium` |
| **Otros** | Desactivado: `opacity-50` · contorno de foco `outline-2` (2 px) |

### Input (`src/components/Input.tsx`)

| Tipo | Valores |
|---|---|
| **Colores** | Campo: fondo `white`, texto `gray-900`, borde `gray-300`, texto de ejemplo (placeholder) `gray-500` · foco: borde y contorno `teal-600` · error: borde y contorno `red-600`, mensaje `red-700` · desactivado: fondo `gray-100`, texto `gray-500` · etiqueta `gray-900` · asterisco de obligatorio `red-700` · icono `gray-500` · ayuda `gray-600` |
| **Espaciado** | Separación entre etiqueta, campo y textos `gap-1.5` (6 px) · relleno lateral `px-3` (12 px), `pl-10` (40 px) si hay icono · icono a `left-3` (12 px) del borde · asterisco `ml-0.5` (2 px) · alturas `h-8` / `h-10` / `h-12` |
| **Radios** | `rounded-lg` (8 px) |
| **Texto** | Campo `text-sm` / `text-base` / `text-lg` según el tamaño · etiqueta, ayuda y error `text-sm` · etiqueta `font-medium` |
| **Otros** | Contorno de foco `outline-2` (2 px), sin separación (`outline-offset-0`) |

### Card (`src/components/Card.tsx`)

| Tipo | Valores |
|---|---|
| **Colores** | `outlined`: fondo `white`, borde `gray-200` · `elevated`: fondo `white` y sombra `shadow-md` · `filled`: fondo `teal-50` · CardHeader: fondo del icono `teal-100`, icono `teal-800`, título `gray-900`, descripción `gray-600` |
| **Espaciado** | Relleno `p-4` / `p-6` / `p-8` (16 / 24 / 32 px), o ninguno con `none` · CardHeader: separación `gap-3` (12 px), caja del icono `size-10` (40 px), ancho mínimo del texto `basis-24` (96 px), descripción `mt-0.5` (2 px) · CardFooter: margen superior `mt-6` (24 px), separación `gap-3` (12 px) |
| **Radios** | Tarjeta `rounded-2xl` (16 px) · caja del icono `rounded-xl` (12 px) |
| **Texto** | Título `text-lg font-semibold` (etiqueta `h3`) · descripción `text-sm` |
| **Sombras** | `shadow-md`, solo en `elevated` |

### Badge (`src/components/Badge.tsx`)

| Tipo | Valores |
|---|---|
| **Colores** | Siempre un fondo `-50`, un texto `-800` y un borde interior `-300` de la misma familia: `neutral` → `gray` (fondo `gray-100`, el único que no usa el `-50`) · `info` → `sky` · `success` → `emerald` · `warning` → `amber` (texto `amber-900`, el único que no usa el `-800`) · `danger` → `red` |
| **Espaciado** | Separación icono-texto `gap-1` (4 px) · `sm`: `px-2` (8 px), altura `h-6` (24 px) · `md`: `px-2.5` (10 px), altura `h-7` (28 px) |
| **Radios** | `rounded-full` |
| **Texto** | `text-xs` / `text-sm` según el tamaño · `font-medium` · nunca se parte en dos líneas (`whitespace-nowrap`) |
| **Otros** | Borde interior `ring-1 ring-inset` (1 px) |

### Familias de color en uso

| Familia | Dónde se usa |
|---|---|
| `emerald` | Button (`primary`, `ghost`, foco) · Badge (`success`) |
| `teal` | Input (foco) · Card (`filled` y el icono de CardHeader) |
| `gray` | Todos: textos, bordes y fondos neutros |
| `red` | Button (`danger`) · Input (error y asterisco) · Badge (`danger`) |
| `sky` | Badge (`info`) |
| `amber` | Badge (`warning`) |

`emerald` y `teal` son dos verdes distintos. Button pasó a `emerald` en [Raxhen/Prisma#5](https://github.com/Raxhen/Prisma/pull/5), pero Input y Card siguen en `teal`.

---

## 3. Valores escritos a mano dentro de los componentes

### Colores hex

**Ninguno** dentro de `src/components/`.

Fuera de los componentes, el icono de la pestaña (`public/favicon.svg`) tiene dos: `#0E7C86` en la línea 2 y `#5FC4C9` en la línea 3. No corresponden a ningún color de Tailwind.

### Medidas en px, rem o valores entre corchetes

- **No hay medidas en px ni en rem** escritas directamente. La palabra «6rem» de `Card.tsx:72` está en un comentario, no en el código.
- **El tamaño de los iconos se fija con un selector entre corchetes**, `[&_svg]:size-*`, que se aplica a cualquier icono que se meta dentro del componente:

| Archivo | Línea | Valor | Tamaño del icono |
|---|---|---|---|
| `Button.tsx` | 36 | `[&_svg]:size-4` | 16 px (`sm`) |
| `Button.tsx` | 37 | `[&_svg]:size-5` | 20 px (`md`) |
| `Button.tsx` | 38 | `[&_svg]:size-6` | 24 px (`lg`) |
| `Input.tsx` | 59 | `[&_svg]:size-5` | 20 px (todos los tamaños) |
| `Card.tsx` | 68 | `[&_svg]:size-5` | 20 px |
| `Badge.tsx` | 24 | `[&_svg]:size-3.5` | 14 px (`sm`) |
| `Badge.tsx` | 25 | `[&_svg]:size-4` | 16 px (`md`) |

- **Medidas que dependen unas de otras.** Si cambias una, tienes que cambiar también la otra:

| Archivo | Línea | Valor | Depende de |
|---|---|---|---|
| `Input.tsx` | 59 | `left-3` (posición del icono) | `pl-10` de la línea 72 |
| `Input.tsx` | 72 | `pl-10` (hueco para el icono) | El tamaño del icono, `size-5`, de la línea 59 |
| `Input.tsx` | 59 | `[&_svg]:size-5` | El icono es igual de grande en los tres tamaños del campo |
| `Card.tsx` | 74 | `basis-24` | El ancho mínimo que necesita el título antes de que la etiqueta baje de línea |

### Colores de Tailwind escritos a mano

Todos los colores de los componentes son clases de Tailwind escritas directamente, sin un nombre con significado (como «color principal» o «color de error») que las agrupe.

| Archivo | Línea | Clases de color | Para qué |
|---|---|---|---|
| `Button.tsx` | 21 | `focus-visible:outline-emerald-600` | Contorno de foco |
| `Button.tsx` | 27 | `bg-emerald-700` `text-white` `hover:bg-emerald-800` `active:bg-emerald-900` | `primary` |
| `Button.tsx` | 29 | `border-gray-300` `bg-white` `text-gray-900` `hover:bg-gray-50` `active:bg-gray-100` | `secondary` |
| `Button.tsx` | 30 | `text-emerald-700` `hover:bg-emerald-50` `active:bg-emerald-100` | `ghost` |
| `Button.tsx` | 31 | `bg-red-600` `text-white` `hover:bg-red-700` `active:bg-red-800` | `danger` |
| `Input.tsx` | 48 | `text-gray-900` | Etiqueta |
| `Input.tsx` | 51 | `text-red-700` | Asterisco de obligatorio |
| `Input.tsx` | 59 | `text-gray-500` | Icono |
| `Input.tsx` | 69 | `bg-white` `text-gray-900` `placeholder:text-gray-500` | Campo |
| `Input.tsx` | 71 | `disabled:bg-gray-100` `disabled:text-gray-500` | Campo desactivado |
| `Input.tsx` | 74 | `border-red-600` `focus:outline-red-600` | Campo con error |
| `Input.tsx` | 75 | `border-gray-300` `focus:border-teal-600` `focus:outline-teal-600` | Campo normal y foco |
| `Input.tsx` | 81 | `text-red-700` | Mensaje de error |
| `Input.tsx` | 86 | `text-gray-600` | Ayuda |
| `Card.tsx` | 14 | `border-gray-200` `bg-white` | `outlined` |
| `Card.tsx` | 15 | `bg-white` | `elevated` |
| `Card.tsx` | 16 | `bg-teal-50` | `filled` |
| `Card.tsx` | 68 | `bg-teal-100` `text-teal-800` | Caja del icono de CardHeader |
| `Card.tsx` | 75 | `text-gray-900` | Título |
| `Card.tsx` | 79 | `text-gray-600` | Descripción |
| `Badge.tsx` | 16 | `bg-gray-100` `text-gray-800` `ring-gray-300` | `neutral` |
| `Badge.tsx` | 17 | `bg-sky-50` `text-sky-800` `ring-sky-300` | `info` |
| `Badge.tsx` | 18 | `bg-emerald-50` `text-emerald-800` `ring-emerald-300` | `success` |
| `Badge.tsx` | 19 | `bg-amber-50` `text-amber-900` `ring-amber-300` | `warning` |
| `Badge.tsx` | 20 | `bg-red-50` `text-red-800` `ring-red-300` | `danger` |

**El mismo significado con tonos distintos según el componente:**

- **Rojo de error o peligro:** `red-600` (fondo de Button `danger` y borde de Input con error), `red-700` (mensaje de error y asterisco de Input) y `red-800` (texto de Badge `danger`).
- **Texto secundario:** `gray-600` (ayuda de Input y descripción de Card) y `gray-500` (placeholder e icono de Input).
- **Borde neutro:** `gray-300` (Button `secondary` e Input) y `gray-200` (Card `outlined`).

---

## 4. Nombres de props y variantes que un agente no adivinaría

Son nombres o comportamientos que alguien (una persona o un agente de IA) usaría mal si se guiara por lo habitual en otras librerías.

### Button

| Lo que hay | Lo que se suele esperar | Por qué confunde |
|---|---|---|
| `variant="ghost"` | `"tertiary"`, `"text"`, `"link"` | En la página de ejemplo se llama «Sutil», no «ghost». |
| `variant="danger"` | `"destructive"`, `"error"` | En Input, el mismo concepto se llama `error`. |
| `iconLeft` / `iconRight` | `leftIcon`, `startIcon`, `icon` | Los demás componentes usan una sola prop, `icon`. |
| `fullWidth` | `block`, `width="full"` | — |
| Por defecto `type="button"` | `type="submit"`, lo normal en HTML | Dentro de un formulario, el botón no lo envía si no se escribe `type="submit"`. |
| No hay `loading`, `href` ni `asChild` | Que exista alguna de ellas | No hay estado de carga ni botón que funcione como enlace. |

### Input

| Lo que hay | Lo que se suele esperar | Por qué confunde |
|---|---|---|
| `className` va a la caja que envuelve el campo, no al campo | Que dé estilo al `<input>` | Un `className="w-64"` cambia el ancho del conjunto, no solo el del campo. |
| `error` es un texto, no `true`/`false` | `error={true}` o `invalid` | Para marcar el campo en rojo hay que escribir el mensaje. `error={true}` no compila. |
| `hint` | `helperText`, `description`, `help` | — |
| `label` es obligatorio y solo admite texto | Opcional, o que admita un elemento | No se puede poner un enlace ni un icono dentro de la etiqueta. |
| `size` es `sm` / `md` / `lg` | El `size` de HTML, que es un número de caracteres | El `size` original de `<input>` no se puede usar. |
| `icon` siempre va a la izquierda | `iconLeft` / `iconRight`, como en Button | No hay forma de poner un icono a la derecha. |

### Card

| Lo que hay | Lo que se suele esperar | Por qué confunde |
|---|---|---|
| `padding` para el tamaño | `size`, como en los demás | Es el único componente que no usa `size`. |
| `variant`: `outlined`, `elevated`, `filled` | `bordered`, `shadow`, `flat` | — |
| `CardHeader` lleva `title`, `description`, `icon` y `action` | Piezas separadas: `CardTitle`, `CardDescription` | No existen `CardTitle`, `CardDescription`, `CardBody` ni `CardContent`. El contenido central se escribe directamente dentro de `Card`. |
| `action` es el hueco de la derecha de la cabecera | `extra`, `aside`, `trailing` | Pensado para un Badge o un botón pequeño. |
| `title` sustituye al atributo `title` de HTML | Que muestre la información emergente del navegador | En `CardHeader`, `title` es el texto visible del título. |
| El título siempre es un `h3` | Poder elegir el nivel del título | No se puede cambiar el nivel aunque la tarjeta esté bajo un `h1` o un `h4`. |
| `CardFooter` empuja los botones a la derecha (`justify-end`) y deja 24 px arriba (`mt-6`) | Que no traiga posición ni margen | Para cambiarlo hay que sobrescribirlo con `className`. |
| No se exporta el tipo `CardFooterProps` | Que esté, como los demás | `index.ts` exporta `CardProps` y `CardHeaderProps`, pero no el del pie. |

### Badge

| Lo que hay | Lo que se suele esperar | Por qué confunde |
|---|---|---|
| Por defecto `variant="neutral"` | `"default"`, `"primary"` | No hay variante con el color principal de la marca. |
| `success` / `warning` / `danger` | `positive` / `caution` / `error` | `danger` coincide con Button, pero no con el `error` de Input. |
| Solo `sm` y `md` | También `lg`, como en Button e Input | `size="lg"` da error. |

### En todos los componentes

- **Se importan desde `src/components`**, por ejemplo `import { Button } from './components'`. No hay un paquete `@prisma/...`. Además, el nombre «Prisma» coincide con el de una herramienta muy conocida de bases de datos, y un agente puede confundirlos.
- **`className` se añade al final, pero no gana siempre.** Si pasas una clase que choca con una del componente, por ejemplo `className="rounded-none"` en un Button, cuál se aplica depende del orden interno de Tailwind, no del orden en que se escriben.
- **No hay tokens con significado**, como `primary` o `danger` en `@theme`. Un agente que intente usar `bg-primary` o `text-danger` no encontrará esas clases, porque no existen.

---

## 5. Prueba sin reglas

Revisado: `src/screens/antes.tsx` en `main`, en el commit `7807f1e`.

Esta pantalla (la del asistente, `#/antes`) se hizo con los componentes de Prisma y **sin reglas de diseño** que dijeran cómo usarlos. Esta sección recoge lo que ha salido mal, para compararlo cuando haya reglas.

**Resumen:**

- **Más de 60 clases de Tailwind distintas escritas a mano** en la propia pantalla, fuera de los componentes. Una de ellas lleva un valor entre corchetes (`max-w-[80%]`).
- **Cinco piezas copiadas o inventadas** en vez de usar un componente: la cabecera, el estado vacío, la burbuja de mensaje, el aviso de «escribiendo» y el contorno de foco.
- **Los dos verdes vuelven a mezclarse**: `teal` en los iconos y `emerald` en las burbujas y el foco.
- **La jerarquía de títulos está al revés**: el `h2` se ve más grande que el `h1`.

### 5.1 Valores escritos a mano

Colores, tamaños, espacios y radios escritos directamente en la pantalla, en lugar de venir de un componente. Las líneas de **abajo del todo** son números y textos fijos que no son estilos.

| Línea | Valor | Qué es | Problema |
|---|---|---|---|
| 42 | `size-14` `rounded-2xl` `bg-white` `text-teal-800` | Caja del icono del estado vacío | Ningún componente usa `size-14`. La caja del icono de `CardHeader` (`Card.tsx:68`) es `size-10 rounded-xl bg-teal-100`: misma idea, otros valores. |
| 43 | `size-7` | Icono del estado vacío (28 px) | Ningún componente usa iconos de 28 px. Los tamaños de icono del sistema son 14, 16, 20 y 24 px (sección 3). |
| 45 | `text-xl font-semibold text-gray-900` | Título del estado vacío (`h2`) | Es **más grande que el `h1`** de la línea 135 (`text-lg`). Además, ningún componente usa `text-xl`. |
| 48 | `text-sm text-gray-600` | Texto del estado vacío | Copia el estilo de la descripción de `CardHeader` (`Card.tsx:79`). |
| 51 | `mt-6 gap-2` | Separación de las sugerencias | `gap-2` (8 px) no coincide con el `gap-3` (12 px) que usa `CardFooter` para separar botones. |
| 68 | `max-w-[80%]` | Ancho máximo de la burbuja | **Valor entre corchetes**: no es un valor de la escala de Tailwind. |
| 68 | `rounded-2xl px-4 py-3` | Forma y relleno de la burbuja | El relleno `px-4 py-3` (16 × 12 px) no coincide con ningún `padding` de Card (`p-4`, `p-6`, `p-8`). |
| 70 | `rounded-br-sm bg-emerald-700 text-white` | Burbuja de tus mensajes | Copia el color de Button `primary` (`Button.tsx:27`). La esquina recortada `rounded-br-sm` no existe en ningún componente. |
| 71 | `rounded-bl-sm border border-gray-200 bg-white text-gray-900` | Burbuja del asistente | Copia Card `outlined` (`Card.tsx:14`). |
| 77 | `text-xs` `text-emerald-50` / `text-gray-500` | Hora del mensaje | `text-emerald-50` no aparece en ningún componente. |
| 128 | `max-w-3xl` | Ancho máximo de la pantalla | Medida de página que no está definida en ningún sitio. |
| 130 | `gap-3 border-b border-gray-200 px-4 py-3` | Cabecera | Línea divisoria escrita a mano. Ningún componente tiene divisores. |
| 131 | `size-10 rounded-xl bg-teal-100 text-teal-800` | Caja del icono de la cabecera | Copia exacta de `Card.tsx:68`. |
| 132 | `size-5` | Icono de la cabecera | Copia el `[&_svg]:size-5` de `Card.tsx:68`, pero escrito directamente en el icono. |
| 134 | `basis-32` | Ancho mínimo del título | `CardHeader` usa `basis-24` (`Card.tsx:74`): la misma regla, con otro número. |
| 135 | `text-lg font-semibold text-gray-900` | Título de la pantalla (`h1`) | Copia el título de `CardHeader` (`Card.tsx:75`). Un `h1` con el tamaño de un título de tarjeta. |
| 136 | `text-sm text-gray-600` | Subtítulo | Copia `Card.tsx:79`. |
| 160 | `bg-gray-50` | Fondo del historial | `gray-50` solo aparece en el `hover` de Button `secondary`. |
| 160 | `focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-emerald-600` | Contorno de foco del historial | Copia el foco de Button (`Button.tsx:21`), pero hacia dentro (`-outline-offset-2`) en vez de hacia fuera. |
| 165 | `gap-3 p-4` | Separación entre mensajes | — |
| 171 | `rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-500` | Aviso «El asistente está escribiendo…» | Tercera copia del estilo de burbuja, y **no coincide** con la de la línea 71: le falta la esquina `rounded-bl-sm`. |
| 183 | `items-end gap-2 border-t border-gray-200 bg-white p-4` | Barra para escribir | `items-end` intenta tapar que Input (40 px, `Input.tsx:22`) y Button (44 px, `Button.tsx:37`) no miden lo mismo: se alinean por abajo, pero la parte de arriba no queda a la misma altura. |
| 32 | `'es-ES'` y `'2-digit'` | Formato de la hora | El idioma y el formato están fijados en la pantalla. |
| 107 | `900` | Lo que tarda en responder el asistente (ms) | Número fijo sin nombre. |

### 5.2 Componentes copiados en vez de usados

| Líneas | Qué se ha hecho | Componente que ya existía | Por qué pasó |
|---|---|---|---|
| 129–137 | La cabecera se ha escrito a mano: caja de icono, título y subtítulo. | `CardHeader` (`Card.tsx:55–87`) | `CardHeader` siempre pone el título en un `h3`, y la pantalla necesitaba un `h1` (sección 4). Al copiarlo, la copia ya ha cambiado: `basis-32` en vez de `basis-24`, y el tamaño del icono está escrito en el icono, no en la caja. |
| 42–50 | El estado vacío repite la estructura de `CardHeader` (icono, título y texto), pero centrada y con otros tamaños. | `CardHeader` | No hay un componente de estado vacío ni una variante centrada de `CardHeader`. |
| 63–84 | `MessageBubble`: una burbuja de mensaje creada dentro de la pantalla. | Card (`Card.tsx:26–41`) y los colores de Button `primary` | No hay componente de burbuja. La del asistente es, en la práctica, una Card `outlined` con otro relleno y otra esquina. |
| 169–175 | El aviso de «escribiendo» es una tercera burbuja, escrita aparte. | La propia `MessageBubble` de la línea 63 | No se reutilizó ni la burbuja de la propia pantalla, y por eso ha salido distinta. |
| 160 | El contorno de foco del historial se ha copiado de Button. | El foco de Button (`Button.tsx:21`) | No hay una clase ni un token de «foco» que reutilizar. |
| 130 y 183 | Las líneas que separan la cabecera, el historial y la barra para escribir se han hecho con bordes sueltos. | — | No hay componente divisor. |

`EmptyState` y `MessageBubble` (líneas 38 y 63) viven dentro de la pantalla: no están en `src/components/`, no tienen historia en Storybook y no aparecen en `docs/componentes.md`.

### 5.3 Nombres distintos de los de mis componentes

| Línea | En la pantalla | En los componentes | Qué pasa |
|---|---|---|---|
| 16, 64 | `author: 'user' \| 'assistant'` y una variable `mine` para elegir el aspecto de la burbuja | `variant` | Los componentes eligen su aspecto con `variant`; la burbuja lo hace con `author` y un `true`/`false`. |
| 38 | `onPick` | No hay ninguna prop de este tipo | React usa `onClick` o `onSelect`. `onPick` es un nombre inventado. |
| 89 | `thinking` | No existe `loading` en Button (sección 4) | La pantalla tiene que desactivar el botón a mano (líneas 144 y 196), porque Button no tiene estado de carga. |
| 12 | `export const title` | `title` es también una prop de `CardHeader` | La misma palabra significa dos cosas: el texto del menú y el título de una tarjeta. |
| 139–147 | «Borrar conversación» con `variant="ghost"` | `danger` es la variante para borrar (lo dice la descripción de Button en la PR #3) | La acción borra algo y no se puede deshacer, pero usa el botón más discreto en vez de `danger`. |
| 41 | `<Card variant="filled">` para destacar el estado vacío | `filled` significa «con fondo de color» | Se usa por cómo se ve, no por lo que significa. No hay nada que diga cuándo usar cada variante. |
| 42 y 131 frente a 70 y 160 | `teal` en las cajas de icono, `emerald` en las burbujas y el foco | Button usa `emerald`, Card usa `teal` | La pantalla hereda la mezcla de los dos verdes (sección 2) y la reparte entre sus propias piezas. |
| 45 y 135 | `h2` en `text-xl` y `h1` en `text-lg` | `CardHeader` usa `h3` en `text-lg` | No hay una escala de títulos: cada pieza elige su tamaño, y aquí el título secundario es más grande que el principal. |

### Qué nos dice esta prueba

- **Sin tokens**, la pantalla copia colores, tamaños y radios de los componentes, y cada copia se desvía un poco (`basis-32` en vez de `basis-24`, una burbuja sin su esquina recortada).
- **Cuando un componente no encaja**, como `CardHeader` con su `h3` fijo, se copia en lugar de ampliarlo, y la copia ya no recibe los arreglos que se hagan en el original.
- **Faltan piezas** que una app de salud con asistente va a necesitar: estado vacío, burbuja de mensaje, divisor y una escala de títulos.
