# Cómo se construye un token en Prisma

Este es el manual para crear o cambiar cualquier token de `tokens/tokens.json`. Todo token nuevo sigue esta estructura, sin excepciones. Si algo no encaja, se cambia primero este manual, en la misma PR que el token.

Un **token** es un valor de diseño con nombre propio: un color, una medida, una tipografía… Los componentes no escriben valores sueltos (`#007A55`, `16px`): usan tokens. Así, para cambiar un valor basta con tocarlo en un solo sitio. Es el principio P1 del [ADR-001](../docs/adr/001-alcance.md).

---

## 1. Los tres niveles

Los tokens se organizan en tres niveles. Cada nivel es un grupo de primer nivel dentro de `tokens.json`:

| Nivel | Grupo | Qué guarda | Su valor es… | Ejemplo |
|---|---|---|---|---|
| **1. Primitivo** | `primitive` | Todos los valores disponibles, con un nombre neutro que dice **qué valor es** | Un valor real: un color, una medida… | `primitive.color.gray.900` |
| **2. Semántico** | `semantic` | Los valores con un nombre que dice **para qué sirven** | Un alias a un token **primitivo** | `semantic.color.text.neutral.strong.rest` |
| **3. Componente** | `component` | Los valores de **un componente concreto** | Un alias a un token **semántico** | `component.button.background.primary.default.hover` |

### La regla: cada nivel solo apunta al de abajo

```
component  ──►  semantic  ──►  primitive  ──►  valor real
```

- **Los primitivos** tienen valores reales. Nunca son alias.
- **Los semánticos** solo son alias a primitivos. Nunca tienen un valor real ni apuntan a otro semántico.
- **Los de componente** solo son alias a semánticos. Nunca apuntan a un primitivo ni a un valor real, y nunca a otro token de componente.

**Por qué:**
- Si mañana cambia el verde de la marca, se toca un primitivo y todo lo demás se actualiza solo.
- Si cambia para qué se usa un color, se toca un semántico, sin buscar por todos los componentes.

### Quién usa cada nivel

- **Los componentes de `src/components/`** usan tokens de **componente** o, si no tienen, **semánticos**.
- **Los componentes nunca usan primitivos directamente.**
- **Las pantallas no usan tokens de color**, porque solo colocan componentes (principio P2 del ADR-001).

### Cuándo crear un token de componente

Solo cuando un componente necesita un valor que **no es igual** que el semántico general, o cuando conviene poder cambiarlo sin afectar al resto.

Si un botón usa exactamente el color de fondo principal, no hace falta crear `component.button…`: usa directamente `semantic.color.background.primary.default.rest`.

---

## 2. Cómo se nombran los tokens de color

Los tokens **semánticos** de color siguen siempre esta fórmula, con **las cinco partes y en este orden**:

```
[category].[element].[role].[modifier].[state]
```

| Parte | Qué dice | Valores permitidos |
|---|---|---|
| `category` | De qué tipo es el token | `color` |
| `element` | A qué parte se aplica | `background` (fondo) · `text` (texto) · `icon` (icono) · `border` (borde) · `focus` (contorno de foco) |
| `role` | Qué significa | `neutral` · `primary` (la marca) · `info` · `success` · `warning` · `danger` |
| `modifier` | Cuánto destaca | `default` (el normal) · `subtle` (más suave) · `strong` (más contraste) · `inverse` (para ponerlo sobre un fondo fuerte, como el texto blanco de un botón primario) |
| `state` | En qué momento se usa | `rest` (en reposo, el normal) · `hover` (con el ratón encima) · `active` (al pulsar) · `disabled` (desactivado) · `selected` (seleccionado) |

Los valores de `role` son los mismos que la tabla de P5 del ADR-001, para que el aspecto de un componente (`variant="danger"`) y su color (`…danger…`) se llamen igual.

**Las cinco partes se escriben siempre**, aunque sean las normales (`default` y `rest`). Así todos los nombres tienen la misma forma y se pueden comprobar. Además, en DTCG un token no puede tener otros tokens dentro: si existiera `color.text.neutral` como token, no podría existir también `color.text.neutral.strong`.

### Ejemplos

| Token | Para qué |
|---|---|
| `semantic.color.background.primary.default.rest` | Fondo de un botón principal |
| `semantic.color.background.primary.default.hover` | El mismo fondo, con el ratón encima |
| `semantic.color.text.primary.inverse.rest` | Texto blanco sobre ese fondo |
| `semantic.color.text.neutral.default.rest` | Texto normal |
| `semantic.color.text.neutral.subtle.rest` | Texto de apoyo: ayudas, horas… |
| `semantic.color.text.neutral.strong.rest` | **Información médica** (dosis, resultados, fechas de citas). Es el token `text-strong` del principio P3 del ADR-001 y debe tener al menos 7:1 de contraste |
| `semantic.color.border.danger.default.rest` | Borde de un campo con error |
| `semantic.color.focus.primary.default.rest` | Contorno de foco con el teclado |

### Los de componente

Siguen la misma fórmula, pero `category` es **el nombre del componente**:

```
component.[componente].[element].[role].[modifier].[state]
```

Por ejemplo, `component.button.background.primary.default.hover` o `component.input.border.neutral.default.rest`.

### Los primitivos

No siguen la fórmula, porque su nombre dice qué valor es y no para qué sirve: `primitive.color.[familia].[tono]`, como `primitive.color.gray.900` o `primitive.color.brand.700`.

### Los tokens que no son de color

Usan la misma idea, con menos partes: `[category].[uso]` o `[category].[uso].[modifier]`. Por ejemplo:
- `semantic.radius.control` para los botones y los campos;
- `semantic.spacing.inline.default`;
- `semantic.font-size.body`.

Las categorías son las mismas que en los primitivos: `spacing`, `radius`, `border-width`, `font-family`, `font-size`, `font-weight`, `line-height`, `shadow` y `breakpoint`.

### Reglas de escritura

- **En inglés**, en minúsculas y con guiones si hacen falta dos palabras (`border-width`, `font-size`).
- **Solo palabras de las tablas de arriba.** Si hace falta una nueva, se añade a la tabla en la misma PR.
- **Sin sinónimos:** `danger`, nunca `error` ni `destructive`; `subtle`, nunca `muted` ni `light`.

---

## 3. El formato: DTCG

`tokens.json` sigue el formato **DTCG** (*Design Tokens Community Group*), el estándar para guardar tokens. Así otras herramientas, como la futura app móvil, pueden leerlo sin cambios.

### Las cuatro reglas

1. **Cada token tiene `$value` y `$description`.**
   - `$value` es su valor, o un alias.
   - `$description` explica para qué sirve, en español y en una frase.
2. **El `$type` va en el grupo**, no en cada token. Todos los tokens del grupo lo heredan. Los tipos que usamos son `color`, `dimension`, `fontFamily`, `fontWeight` y `shadow`.
3. **Los alias se escriben entre llaves, con la ruta completa del token**, separada por puntos: `"{primitive.color.gray.900}"`. Un alias tiene que apuntar a un token del mismo `$type`.
4. **Los nombres no empiezan por `$`.** Lo que empieza por `$` está reservado para el formato (`$value`, `$type`, `$description`, `$extensions`).

### Cómo se escribe cada tipo de valor

| `$type` | Cómo se escribe `$value` | Ejemplo |
|---|---|---|
| `color` | Espacio de color, componentes y, como ayuda, el hex | `{ "colorSpace": "oklch", "components": [0.21, 0.034, 264.665], "hex": "#101828" }` |
| `dimension` | Número y unidad (`px` o `rem`) | `{ "value": 16, "unit": "px" }` |
| `fontFamily` | Lista de familias, de la preferida a la de respaldo | `["Atkinson Hyperlegible Next", "sans-serif"]` |
| `fontWeight` | Número | `600` |

### Modo claro y modo oscuro

El principio P4 del ADR-001 pide que cada color tenga un valor para cada modo. DTCG todavía no tiene una forma estándar de hacerlo, así que en Prisma se hace así:

- **`$value` es el valor del modo claro.**
- **El valor del modo oscuro** va en `$extensions`, dentro de `prisma.modes.dark`.

Los dos valores siguen la regla de los niveles: un semántico apunta a un primitivo también en modo oscuro.

```json
"strong": {
  "rest": {
    "$value": "{primitive.color.gray.900}",
    "$description": "Información médica: dosis, resultados y fechas de citas. Contraste mínimo 7:1.",
    "$extensions": {
      "prisma.modes": { "dark": "{primitive.color.gray.50}" }
    }
  }
}
```

Solo los **semánticos de color** llevan modo oscuro. Los primitivos no cambian con el modo, y los de componente lo heredan del semántico al que apuntan.

### Ejemplo completo, de un nivel al siguiente

```json
{
  "primitive": {
    "color": {
      "$type": "color",
      "brand": {
        "700": {
          "$value": { "colorSpace": "oklch", "components": [0.5128, 0.11, 163.565], "hex": "#007A55" },
          "$description": "Verde de la marca FullHealth, paso 700."
        }
      }
    }
  },
  "semantic": {
    "color": {
      "$type": "color",
      "background": {
        "primary": {
          "default": {
            "rest": {
              "$value": "{primitive.color.brand.700}",
              "$description": "Fondo de la acción principal.",
              "$extensions": { "prisma.modes": { "dark": "{primitive.color.brand.400}" } }
            }
          }
        }
      }
    }
  },
  "component": {
    "button": {
      "$type": "color",
      "background": {
        "primary": {
          "default": {
            "rest": {
              "$value": "{semantic.color.background.primary.default.rest}",
              "$description": "Fondo del botón primario."
            }
          }
        }
      }
    }
  }
}
```

---

## 4. Paso a paso para añadir un token

1. **Busca si ya existe.** Mira primero en `semantic` y después en `primitive`. Si existe uno con el mismo significado, úsalo.
2. **Elige el nivel:**
   - ¿Es un valor nuevo de la paleta? → `primitive`.
   - ¿Es un uso nuevo de un valor que ya existe? → `semantic`.
   - ¿Solo lo necesita un componente y es distinto del semántico? → `component`.
3. **Ponle nombre** con la fórmula de la sección 2, usando solo palabras de las tablas.
4. **Escribe su `$value`:** un valor real si es primitivo, o un alias al nivel de abajo si no lo es.
5. **Escribe su `$description`:** una frase en español que diga para qué sirve.
6. **Si es un semántico de color**, añade su valor de modo oscuro en `$extensions`.
7. **Comprueba el contraste** si es un color de texto, icono, borde o foco: al menos 4,5:1 en el texto, 3:1 en iconos, bordes y foco, y 7:1 en `text.neutral.strong`. Hazlo en los dos modos (principio P3).
8. **Mira que se vea en Storybook,** en **Fundamentos**.

## 5. Lista para revisar una PR con tokens

- [ ] Cada token tiene `$value` y `$description`.
- [ ] Cada grupo con tokens tiene su `$type`.
- [ ] Los primitivos tienen valores reales; los semánticos, alias a primitivos; los de componente, alias a semánticos.
- [ ] Los alias van entre llaves, con la ruta completa, y apuntan a un token que existe y es del mismo `$type`.
- [ ] Los semánticos de color tienen las cinco partes del nombre, con palabras de las tablas.
- [ ] Los semánticos de color tienen valor de modo oscuro en `$extensions`.
- [ ] Los contrastes cumplen el principio P3 en los dos modos.

---

## Estado actual

- **`primitive`:** existe y cumple el manual: cada token tiene su `$value` y su `$description`.
- **`semantic`:** existe. Cumple el manual: cada token tiene `$description`, es un alias a un primitivo y, si es de color, tiene sus cinco partes y su valor de modo oscuro. Se ve en Storybook, en **Fundamentos → Semánticos**.
- **`component`:** todavía no existe. Se creará cuando los componentes pasen a usar tokens.
