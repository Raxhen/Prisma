# Accesibilidad en Prisma

La accesibilidad engloba muchos criterios (las pautas WCAG tienen decenas): Prisma cubre **cuatro reglas** que debe cumplir todo componente y toda pantalla. Al final hay una tabla con lo que **todavía no cubre**.

Estas reglas desarrollan el principio P3 del [ADR-001](adr/001-alcance.md). Cada una tiene una explicación, un ejemplo correcto ✅, uno incorrecto ❌ y una lista para revisar una PR.

---

## 1. Contraste

**Qué significa:** el texto, los iconos y los bordes tienen que destacar lo suficiente sobre su fondo para que se lean bien, también con poca vista, con el brillo bajo o al sol. El **contraste** se mide con un número: cuanto más alto, más se distingue. Un texto negro sobre blanco da 21:1; un gris claro sobre blanco puede dar 2:1.

**Los mínimos:**

| Qué | Mínimo |
|---|---|
| Texto | **4,5:1** |
| **Información médica**: dosis y pautas de medicación, resultados de análisis y fechas de citas | **7:1** (token `semantic.color.text.neutral.strong.rest`, ADR-001 P3) |
| Iconos que dicen algo, bordes de los campos y anillo de foco | **3:1** |
| Elementos desactivados y bordes solo decorativos | Sin mínimo |

En Prisma los colores salen de tokens que ya cumplen estos mínimos en modo claro y oscuro. Las combinaciones están en Storybook, en **Fundamentos → Semánticos → Color**. Si usas el texto de un token sobre el fondo para el que está pensado, cumples.

✅ **Correcto:** texto normal sobre el fondo principal: 17:1.

```tsx
<p className="text-text-neutral bg-background-neutral">Ibuprofeno 600 mg</p>
```

❌ **Incorrecto:** un gris claro de la paleta de Tailwind sobre blanco: 2,6:1. Además, no es un token.

```tsx
<p className="text-gray-400 bg-white">Ibuprofeno 600 mg</p>
```

**Checklist:**

- [ ] Todo el texto llega a 4,5:1 sobre su fondo, en modo claro y oscuro.
- [ ] Dosis, resultados y fechas de citas usan `text-text-neutral-strong` (7:1).
- [ ] Iconos con significado, bordes de campos y anillo de foco llegan a 3:1.
- [ ] Solo se usan colores de tokens, nunca de la paleta de Tailwind.
- [ ] La pestaña **Accessibility** de Storybook no da fallos de contraste en ningún modo.

---

## 2. Navegación por teclado

**Qué significa:** hay personas que no usan ratón: navegan con el teclado o con aparatos que funcionan como un teclado. Todo lo que se puede hacer con el ratón se tiene que poder hacer con estas teclas:

| Tecla | Para qué |
|---|---|
| **Tab** (y **Mayúsculas + Tab** para volver) | Ir de un elemento al siguiente |
| **Enter** | Pulsar un botón o un enlace |
| **Espacio** | Pulsar un botón, marcar una casilla |
| **Esc** | Cerrar lo que se ha abierto: un menú, una ventana, un aviso |

**El orden** en que se recorren los elementos con Tab tiene que ser **lógico**: el mismo en que se leen, de arriba abajo y de izquierda a derecha.

**El foco tiene que verse siempre.** El foco es la marca que dice en qué elemento estás. En Prisma es un **anillo doble**, los dos anillos de 2 px:

- **por dentro, pegado al componente, un anillo neutro** (token `focus.neutral`). Es blanco en modo claro y casi negro en modo oscuro: el color del fondo de cada modo;
- **por fuera, un anillo de color** (token `focus.primary`).

Con dos anillos, uno de los dos destaca siempre al menos 3:1 sobre cualquier fondo: el de color sobre los fondos claros, y el neutro sobre los fuertes. Además, el neutro separa el anillo de color del componente, para que se vea también en los componentes de su mismo color, como el botón principal.

En el código, el anillo doble se pone con una sola clase, `focus-ring-*`, que sale de los tokens: por ejemplo, `focus-visible:focus-ring-button-primary`.

**Y además, con el dedo:** todo lo que se pulsa mide al menos **44 × 44 px**, para que se pueda tocar sin fallar, también con temblor o con poca precisión (ADR-001 P3).

✅ **Correcto:** un botón de verdad. Se alcanza con Tab, se pulsa con Enter o Espacio, y muestra el anillo doble.

```tsx
<Button onClick={confirmarCita}>Confirmar cita</Button>
```

❌ **Incorrecto:** un `div` que hace de botón. Con el ratón funciona, pero con Tab no se llega a él y Enter no hace nada.

```tsx
<div onClick={confirmarCita} className="bg-background-primary">Confirmar cita</div>
```

❌ **Incorrecto también:** quitar la marca del foco sin poner otra.

```tsx
<button className="outline-none">Confirmar cita</button>
```

**Checklist:**

- [ ] Recorriendo la pantalla solo con Tab se llega a todo lo que se puede pulsar o rellenar.
- [ ] El orden de Tab sigue el orden de lectura.
- [ ] Enter y Espacio pulsan botones; Esc cierra lo que se haya abierto.
- [ ] En cada elemento con foco se ve el anillo doble (`focus-ring-*`), en modo claro y oscuro.
- [ ] El componente tiene una historia **Teclado** en Storybook, y pasa.
- [ ] Nada que se pulse mide menos de 44 × 44 px.
- [ ] Para pulsar se usan `<button>`, `<a>` o los componentes de Prisma, nunca un `<div>` con `onClick`.

> **Estado en Prisma:** Button e Input tienen el anillo doble. Cada componente tiene en Storybook una historia **Teclado** que lo recorre con Tab y comprueba que se ve el foco.

---

## 3. Nombre accesible

**Qué significa:** un **lector de pantalla** es un programa que lee la pantalla en voz alta a las personas ciegas o con poca vista. Cuando llega a un botón, un campo o un enlace, dice su **nombre**. Si no lo tiene, solo dice «botón», y la persona no sabe para qué sirve.

Cada componente interactivo tiene un nombre que el lector puede leer. Sale de una de estas tres cosas, por este orden de preferencia:

1. **Su texto visible:** `<Button>Confirmar cita</Button>` se llama «Confirmar cita».
2. **Su etiqueta (`label`):** el `Input` de Prisma siempre la pide (`label="Correo electrónico"`).
3. **Un `aria-label`**, solo si no hay texto visible, como en un botón que es solo un icono.

✅ **Correcto:** un botón que solo tiene un icono, con un `aria-label` que dice lo que hace.

```tsx
<Button aria-label="Borrar nota" iconLeft={<IconTrash />} />
```

❌ **Incorrecto:** el mismo botón sin nombre. El lector de pantalla solo dice «botón».

```tsx
<Button iconLeft={<IconTrash />} />
```

❌ **Incorrecto también:** un campo con un texto de ejemplo, pero sin etiqueta. El texto de ejemplo desaparece al escribir y no sirve de nombre.

```tsx
<input placeholder="Correo electrónico" />
```

> **Estado en Prisma:** los componentes no dejan crear elementos sin nombre: TypeScript da error si un `Button` no tiene ni texto ni `aria-label`, si un `Badge` no tiene texto o si un `Input` no tiene `label`. Sus iconos son decorativos y quedan ocultos al lector de pantalla. En Storybook, la historia **Button → SoloIcono** lo comprueba, y el complemento de accesibilidad marca como fallo cualquier historia con un elemento sin nombre.

**Checklist:**

- [ ] Cada botón, enlace y campo tiene un nombre: su texto, su `label` o un `aria-label`.
- [ ] Los botones que son solo un icono tienen `aria-label`.
- [ ] El nombre dice qué hace el elemento («Borrar nota»), no cómo es («Papelera»).
- [ ] Los campos usan el `label` del `Input` de Prisma; nunca solo un texto de ejemplo.
- [ ] La pestaña **Accessibility** de Storybook no da fallos de nombres.

---

## 4. Lectura con lector de pantalla

**Qué significa:** las personas que usan un lector de pantalla no ven la página de un vistazo. La recorren **saltando de encabezado en encabezado**, como si leyeran un índice, y oyen lo que dicen las imágenes y los iconos. Por eso:

- **Los encabezados van en orden:** un solo `h1` por pantalla, con el título de la pantalla; dentro, `h2` para las secciones; dentro de estas, `h3`. No se salta ningún nivel, por ejemplo de `h1` a `h4`. El nivel dice **cómo se organiza** el contenido, no el tamaño de la letra: el tamaño lo pone el estilo de texto (`text-heading`, `text-title`…).
- **Cada icono o imagen con significado tiene texto alternativo:** una frase que diga lo mismo que la imagen.
- **Los iconos e imágenes decorativos se ocultan** al lector, porque solo añaden ruido. Por ejemplo, un icono que va al lado de un texto que ya dice lo mismo.

✅ **Correcto:** el icono de aviso dice algo, así que tiene texto alternativo. El de la píldora es decorativo, porque el texto ya dice «Ibuprofeno», así que se oculta.

```tsx
<h1>Mi medicación</h1>
<h2>Hoy</h2>
<IconAlertTriangle role="img" aria-label="Toma pendiente" />
<IconPill aria-hidden="true" /> Ibuprofeno 600 mg
```

❌ **Incorrecto:** se salta de `h1` a `h4` porque «se veía mejor más pequeño». El icono de aviso no dice nada al lector, y el de la píldora se lee sin aportar nada.

```tsx
<h1>Mi medicación</h1>
<h4>Hoy</h4>
<IconAlertTriangle />
<IconPill /> Ibuprofeno 600 mg
```

**Checklist:**

- [ ] Cada pantalla tiene un solo `h1`.
- [ ] Los encabezados siguen el orden `h1`, `h2`, `h3`… sin saltar niveles.
- [ ] El tamaño del encabezado lo pone el estilo de texto, no el nivel.
- [ ] Cada icono o imagen con significado tiene texto alternativo (`alt` o `aria-label`).
- [ ] Los iconos e imágenes decorativos tienen `aria-hidden="true"` (o `alt=""` en una imagen).

---

## Lo que todavía no se cubre

Estos criterios también son de accesibilidad, pero Prisma **todavía no los tiene como regla**: no se comprueban en las PR. Están aquí para no olvidarlos.

| Criterio | Qué es |
|---|---|
| **No depender solo del color** | La información no se da solo con un color. Por ejemplo, un error no se marca solo en rojo: también lleva un texto o un icono, para quien no distingue colores. |
| **Texto ampliable al 200 %** | Si alguien amplía el texto al doble con el navegador, todo se sigue leyendo y usando, sin que nada se corte ni se monte encima de otra cosa. |
| **Pantallas estrechas sin scroll horizontal** | En una pantalla de 320 px de ancho, como un móvil pequeño o una ventana muy ampliada, no hay que desplazarse de lado para leer. |
| **Movimiento reducido** | Si la persona ha pedido en su dispositivo que haya menos movimiento, las animaciones se quitan o se suavizan, porque pueden marear. |
| **Tiempo suficiente** | Nada se cierra ni caduca sin avisar, o se puede pedir más tiempo. Por ejemplo, una sesión que caduca mientras alguien escribe una nota. |
| **Subtítulos y transcripciones** | Los vídeos tienen subtítulos, y los audios, como las consultas grabadas, tienen su texto escrito. |
| **Idioma de la página** | La página dice en qué idioma está (`lang="es"`), para que el lector de pantalla pronuncie bien. |
| **Lenguaje sencillo** | Los textos usan palabras de uso común y frases cortas, sin jerga médica innecesaria. |
| **Sin destellos** | Nada parpadea más de tres veces por segundo, porque puede provocar crisis en personas con epilepsia. |
| **Ayuda con los errores** | Cuando algo falla, se dice qué ha pasado y cómo arreglarlo, y se evitan los errores en lo importante. Por ejemplo, se pide confirmación antes de borrar. |
