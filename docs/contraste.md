# Contraste de los colores

> **Archivo generado** por `scripts/contrast.mjs` a partir de `tokens/tokens.json` y `tokens/contrast-pairs.json`. No lo edites a mano: cambia las reglas o los tokens y ejecuta `npm run contrast`.

Cada regla de `tokens/contrast-pairs.json` junta un tipo de color (por su nombre) con un grupo de fondos. De ahí salen todas las parejas, y cada una se comprueba en **modo claro** y en **modo oscuro**. Los mínimos son 4,5:1 para el texto y 3:1 para iconos, bordes y foco, y 7:1 para `text.neutral.strong`, el de la información médica (ADR-001, P3, y `docs/accesibilidad.md`).

**Exento** quiere decir que la pareja se mide, pero no tiene mínimo: los elementos desactivados y el borde decorativo.

## Resumen

**395 parejas** en total: **362 pasan** en los dos modos, **0 no pasan** en algún modo y **33 están exentas**.

| Regla | Tipo y mínimo | Parejas | Pasan | No pasan | Exentas |
|---|---|---|---|---|---|
| Texto normal sobre fondos claros | text · 4,50:1 | 99 | 88 | 0 | 11 |
| Texto inverse sobre fondos fuertes | text · 4,50:1 | 60 | 60 | 0 | 0 |
| Bordes y foco sobre fondos claros | ui · 3,00:1 | 88 | 77 | 0 | 11 |
| Iconos como el texto: normales sobre claros e inverse sobre fuertes | ui · 3,00:1 | 148 | 137 | 0 | 11 |

## Parejas que no pasan

Ninguna: todas las parejas cumplen su mínimo en los dos modos. ✅

## Las más justas

Pasan, pero por poco: si cambia alguno de sus colores, conviene mirarlas primero. El margen es lo que sobra sobre el mínimo, en el modo más justo.

| Color | Fondo | Mínimo | Claro | Oscuro | Margen |
|---|---|---|---|---|---|
| `text.danger.inverse.rest` | `background.success.default.rest` | 4,50:1 | 4,52:1 ✅ | 9,09:1 ✅ | +0,02 |
| `border.neutral.strong.rest` | `background.neutral.default.active` | 3,00:1 | 3,91:1 ✅ | 3,03:1 ✅ | +0,03 |
| `border.neutral.strong.rest` | `background.neutral.strong.rest` | 3,00:1 | 3,91:1 ✅ | 3,03:1 ✅ | +0,03 |
| `border.primary.default.rest` | `background.neutral.default.active` | 3,00:1 | 3,04:1 ✅ | 5,78:1 ✅ | +0,04 |
| `border.primary.default.rest` | `background.neutral.strong.rest` | 3,00:1 | 3,04:1 ✅ | 5,78:1 ✅ | +0,04 |
| `text.info.inverse.rest` | `background.success.default.rest` | 4,50:1 | 4,54:1 ✅ | 8,31:1 ✅ | +0,04 |
| `border.neutral.strong.rest` | `background.info.subtle.rest` | 3,00:1 | 4,44:1 ✅ | 3,06:1 ✅ | +0,06 |
| `border.neutral.strong.rest` | `background.success.subtle.rest` | 3,00:1 | 4,62:1 ✅ | 3,09:1 ✅ | +0,09 |
| `border.neutral.strong.rest` | `background.primary.subtle.rest` | 3,00:1 | 4,60:1 ✅ | 3,12:1 ✅ | +0,12 |
| `text.warning.inverse.rest` | `background.success.default.rest` | 4,50:1 | 4,66:1 ✅ | 8,80:1 ✅ | +0,16 |

## Grupos de fondos

- **fondos-claros** (11): `background.neutral.default.rest`, `background.neutral.default.hover`, `background.neutral.default.active`, `background.neutral.default.disabled`, `background.neutral.subtle.rest`, `background.neutral.strong.rest`, `background.primary.subtle.rest`, `background.info.subtle.rest`, `background.success.subtle.rest`, `background.warning.subtle.rest`, `background.danger.subtle.rest`
- **fondos-fuertes** (10): `background.neutral.inverse.rest`, `background.primary.default.rest`, `background.primary.default.hover`, `background.primary.default.active`, `background.info.default.rest`, `background.success.default.rest`, `background.warning.default.rest`, `background.danger.default.rest`, `background.danger.default.hover`, `background.danger.default.active`

## Todas las parejas

### Texto normal sobre fondos claros

99 parejas.

| Color | Fondo | Mínimo | Claro | Oscuro |
|---|---|---|---|---|
| `text.neutral.default.rest` | `background.neutral.default.rest` | 4,50:1 | 16,98:1 ✅ | 18,30:1 ✅ |
| `text.neutral.default.rest` | `background.neutral.default.hover` | 4,50:1 | 16,13:1 ✅ | 16,13:1 ✅ |
| `text.neutral.default.rest` | `background.neutral.default.active` | 4,50:1 | 14,33:1 ✅ | 13,33:1 ✅ |
| `text.neutral.default.rest` | `background.neutral.default.disabled` | 4,50:1 | 16,13:1 ✅ | 16,13:1 ✅ |
| `text.neutral.default.rest` | `background.neutral.subtle.rest` | 4,50:1 | 16,13:1 ✅ | 16,13:1 ✅ |
| `text.neutral.default.rest` | `background.neutral.strong.rest` | 4,50:1 | 14,33:1 ✅ | 13,33:1 ✅ |
| `text.neutral.default.rest` | `background.primary.subtle.rest` | 4,50:1 | 16,87:1 ✅ | 13,72:1 ✅ |
| `text.neutral.default.rest` | `background.info.subtle.rest` | 4,50:1 | 16,31:1 ✅ | 13,43:1 ✅ |
| `text.neutral.default.rest` | `background.success.subtle.rest` | 4,50:1 | 16,95:1 ✅ | 13,58:1 ✅ |
| `text.neutral.default.rest` | `background.warning.subtle.rest` | 4,50:1 | 16,71:1 ✅ | 14,22:1 ✅ |
| `text.neutral.default.rest` | `background.danger.subtle.rest` | 4,50:1 | 16,22:1 ✅ | 14,69:1 ✅ |
| `text.neutral.default.disabled` | `background.neutral.default.rest` | — | 2,49:1 · exento | 2,66:1 · exento |
| `text.neutral.default.disabled` | `background.neutral.default.hover` | — | 2,36:1 · exento | 2,35:1 · exento |
| `text.neutral.default.disabled` | `background.neutral.default.active` | — | 2,10:1 · exento | 1,94:1 · exento |
| `text.neutral.default.disabled` | `background.neutral.default.disabled` | — | 2,36:1 · exento | 2,35:1 · exento |
| `text.neutral.default.disabled` | `background.neutral.subtle.rest` | — | 2,36:1 · exento | 2,35:1 · exento |
| `text.neutral.default.disabled` | `background.neutral.strong.rest` | — | 2,10:1 · exento | 1,94:1 · exento |
| `text.neutral.default.disabled` | `background.primary.subtle.rest` | — | 2,47:1 · exento | 2,00:1 · exento |
| `text.neutral.default.disabled` | `background.info.subtle.rest` | — | 2,39:1 · exento | 1,96:1 · exento |
| `text.neutral.default.disabled` | `background.success.subtle.rest` | — | 2,49:1 · exento | 1,98:1 · exento |
| `text.neutral.default.disabled` | `background.warning.subtle.rest` | — | 2,45:1 · exento | 2,07:1 · exento |
| `text.neutral.default.disabled` | `background.danger.subtle.rest` | — | 2,38:1 · exento | 2,14:1 · exento |
| `text.neutral.strong.rest` | `background.neutral.default.rest` | 7,00:1 | 19,27:1 ✅ | 19,27:1 ✅ |
| `text.neutral.strong.rest` | `background.neutral.default.hover` | 7,00:1 | 18,30:1 ✅ | 16,98:1 ✅ |
| `text.neutral.strong.rest` | `background.neutral.default.active` | 7,00:1 | 16,26:1 ✅ | 14,04:1 ✅ |
| `text.neutral.strong.rest` | `background.neutral.default.disabled` | 7,00:1 | 18,30:1 ✅ | 16,98:1 ✅ |
| `text.neutral.strong.rest` | `background.neutral.subtle.rest` | 7,00:1 | 18,30:1 ✅ | 16,98:1 ✅ |
| `text.neutral.strong.rest` | `background.neutral.strong.rest` | 7,00:1 | 16,26:1 ✅ | 14,04:1 ✅ |
| `text.neutral.strong.rest` | `background.primary.subtle.rest` | 7,00:1 | 19,13:1 ✅ | 14,45:1 ✅ |
| `text.neutral.strong.rest` | `background.info.subtle.rest` | 7,00:1 | 18,50:1 ✅ | 14,14:1 ✅ |
| `text.neutral.strong.rest` | `background.success.subtle.rest` | 7,00:1 | 19,23:1 ✅ | 14,30:1 ✅ |
| `text.neutral.strong.rest` | `background.warning.subtle.rest` | 7,00:1 | 18,96:1 ✅ | 14,98:1 ✅ |
| `text.neutral.strong.rest` | `background.danger.subtle.rest` | 7,00:1 | 18,41:1 ✅ | 15,47:1 ✅ |
| `text.neutral.subtle.rest` | `background.neutral.default.rest` | 4,50:1 | 7,23:1 ✅ | 7,74:1 ✅ |
| `text.neutral.subtle.rest` | `background.neutral.default.hover` | 4,50:1 | 6,87:1 ✅ | 6,82:1 ✅ |
| `text.neutral.subtle.rest` | `background.neutral.default.active` | 4,50:1 | 6,10:1 ✅ | 5,64:1 ✅ |
| `text.neutral.subtle.rest` | `background.neutral.default.disabled` | 4,50:1 | 6,87:1 ✅ | 6,82:1 ✅ |
| `text.neutral.subtle.rest` | `background.neutral.subtle.rest` | 4,50:1 | 6,87:1 ✅ | 6,82:1 ✅ |
| `text.neutral.subtle.rest` | `background.neutral.strong.rest` | 4,50:1 | 6,10:1 ✅ | 5,64:1 ✅ |
| `text.neutral.subtle.rest` | `background.primary.subtle.rest` | 4,50:1 | 7,18:1 ✅ | 5,80:1 ✅ |
| `text.neutral.subtle.rest` | `background.info.subtle.rest` | 4,50:1 | 6,94:1 ✅ | 5,68:1 ✅ |
| `text.neutral.subtle.rest` | `background.success.subtle.rest` | 4,50:1 | 7,22:1 ✅ | 5,74:1 ✅ |
| `text.neutral.subtle.rest` | `background.warning.subtle.rest` | 4,50:1 | 7,12:1 ✅ | 6,02:1 ✅ |
| `text.neutral.subtle.rest` | `background.danger.subtle.rest` | 4,50:1 | 6,91:1 ✅ | 6,21:1 ✅ |
| `text.primary.default.rest` | `background.neutral.default.rest` | 4,50:1 | 7,36:1 ✅ | 10,21:1 ✅ |
| `text.primary.default.rest` | `background.neutral.default.hover` | 4,50:1 | 6,98:1 ✅ | 9,00:1 ✅ |
| `text.primary.default.rest` | `background.neutral.default.active` | 4,50:1 | 6,21:1 ✅ | 7,44:1 ✅ |
| `text.primary.default.rest` | `background.neutral.default.disabled` | 4,50:1 | 6,98:1 ✅ | 9,00:1 ✅ |
| `text.primary.default.rest` | `background.neutral.subtle.rest` | 4,50:1 | 6,98:1 ✅ | 9,00:1 ✅ |
| `text.primary.default.rest` | `background.neutral.strong.rest` | 4,50:1 | 6,21:1 ✅ | 7,44:1 ✅ |
| `text.primary.default.rest` | `background.primary.subtle.rest` | 4,50:1 | 7,30:1 ✅ | 7,66:1 ✅ |
| `text.primary.default.rest` | `background.info.subtle.rest` | 4,50:1 | 7,06:1 ✅ | 7,50:1 ✅ |
| `text.primary.default.rest` | `background.success.subtle.rest` | 4,50:1 | 7,34:1 ✅ | 7,58:1 ✅ |
| `text.primary.default.rest` | `background.warning.subtle.rest` | 4,50:1 | 7,24:1 ✅ | 7,94:1 ✅ |
| `text.primary.default.rest` | `background.danger.subtle.rest` | 4,50:1 | 7,03:1 ✅ | 8,20:1 ✅ |
| `text.info.default.rest` | `background.neutral.default.rest` | 4,50:1 | 6,54:1 ✅ | 7,63:1 ✅ |
| `text.info.default.rest` | `background.neutral.default.hover` | 4,50:1 | 6,21:1 ✅ | 6,73:1 ✅ |
| `text.info.default.rest` | `background.neutral.default.active` | 4,50:1 | 5,52:1 ✅ | 5,56:1 ✅ |
| `text.info.default.rest` | `background.neutral.default.disabled` | 4,50:1 | 6,21:1 ✅ | 6,73:1 ✅ |
| `text.info.default.rest` | `background.neutral.subtle.rest` | 4,50:1 | 6,21:1 ✅ | 6,73:1 ✅ |
| `text.info.default.rest` | `background.neutral.strong.rest` | 4,50:1 | 5,52:1 ✅ | 5,56:1 ✅ |
| `text.info.default.rest` | `background.primary.subtle.rest` | 4,50:1 | 6,49:1 ✅ | 5,73:1 ✅ |
| `text.info.default.rest` | `background.info.subtle.rest` | 4,50:1 | 6,28:1 ✅ | 5,60:1 ✅ |
| `text.info.default.rest` | `background.success.subtle.rest` | 4,50:1 | 6,53:1 ✅ | 5,66:1 ✅ |
| `text.info.default.rest` | `background.warning.subtle.rest` | 4,50:1 | 6,44:1 ✅ | 5,93:1 ✅ |
| `text.info.default.rest` | `background.danger.subtle.rest` | 4,50:1 | 6,25:1 ✅ | 6,13:1 ✅ |
| `text.success.default.rest` | `background.neutral.default.rest` | 4,50:1 | 6,82:1 ✅ | 11,32:1 ✅ |
| `text.success.default.rest` | `background.neutral.default.hover` | 4,50:1 | 6,48:1 ✅ | 9,98:1 ✅ |
| `text.success.default.rest` | `background.neutral.default.active` | 4,50:1 | 5,76:1 ✅ | 8,25:1 ✅ |
| `text.success.default.rest` | `background.neutral.default.disabled` | 4,50:1 | 6,48:1 ✅ | 9,98:1 ✅ |
| `text.success.default.rest` | `background.neutral.subtle.rest` | 4,50:1 | 6,48:1 ✅ | 9,98:1 ✅ |
| `text.success.default.rest` | `background.neutral.strong.rest` | 4,50:1 | 5,76:1 ✅ | 8,25:1 ✅ |
| `text.success.default.rest` | `background.primary.subtle.rest` | 4,50:1 | 6,78:1 ✅ | 8,49:1 ✅ |
| `text.success.default.rest` | `background.info.subtle.rest` | 4,50:1 | 6,55:1 ✅ | 8,31:1 ✅ |
| `text.success.default.rest` | `background.success.subtle.rest` | 4,50:1 | 6,81:1 ✅ | 8,40:1 ✅ |
| `text.success.default.rest` | `background.warning.subtle.rest` | 4,50:1 | 6,72:1 ✅ | 8,80:1 ✅ |
| `text.success.default.rest` | `background.danger.subtle.rest` | 4,50:1 | 6,52:1 ✅ | 9,09:1 ✅ |
| `text.warning.default.rest` | `background.neutral.default.rest` | 4,50:1 | 7,05:1 ✅ | 8,47:1 ✅ |
| `text.warning.default.rest` | `background.neutral.default.hover` | 4,50:1 | 6,70:1 ✅ | 7,46:1 ✅ |
| `text.warning.default.rest` | `background.neutral.default.active` | 4,50:1 | 5,95:1 ✅ | 6,17:1 ✅ |
| `text.warning.default.rest` | `background.neutral.default.disabled` | 4,50:1 | 6,70:1 ✅ | 7,46:1 ✅ |
| `text.warning.default.rest` | `background.neutral.subtle.rest` | 4,50:1 | 6,70:1 ✅ | 7,46:1 ✅ |
| `text.warning.default.rest` | `background.neutral.strong.rest` | 4,50:1 | 5,95:1 ✅ | 6,17:1 ✅ |
| `text.warning.default.rest` | `background.primary.subtle.rest` | 4,50:1 | 7,00:1 ✅ | 6,35:1 ✅ |
| `text.warning.default.rest` | `background.info.subtle.rest` | 4,50:1 | 6,77:1 ✅ | 6,22:1 ✅ |
| `text.warning.default.rest` | `background.success.subtle.rest` | 4,50:1 | 7,04:1 ✅ | 6,28:1 ✅ |
| `text.warning.default.rest` | `background.warning.subtle.rest` | 4,50:1 | 6,94:1 ✅ | 6,58:1 ✅ |
| `text.warning.default.rest` | `background.danger.subtle.rest` | 4,50:1 | 6,74:1 ✅ | 6,80:1 ✅ |
| `text.danger.default.rest` | `background.neutral.default.rest` | 4,50:1 | 6,14:1 ✅ | 6,97:1 ✅ |
| `text.danger.default.rest` | `background.neutral.default.hover` | 4,50:1 | 5,83:1 ✅ | 6,14:1 ✅ |
| `text.danger.default.rest` | `background.neutral.default.active` | 4,50:1 | 5,19:1 ✅ | 5,08:1 ✅ |
| `text.danger.default.rest` | `background.neutral.default.disabled` | 4,50:1 | 5,83:1 ✅ | 6,14:1 ✅ |
| `text.danger.default.rest` | `background.neutral.subtle.rest` | 4,50:1 | 5,83:1 ✅ | 6,14:1 ✅ |
| `text.danger.default.rest` | `background.neutral.strong.rest` | 4,50:1 | 5,19:1 ✅ | 5,08:1 ✅ |
| `text.danger.default.rest` | `background.primary.subtle.rest` | 4,50:1 | 6,10:1 ✅ | 5,23:1 ✅ |
| `text.danger.default.rest` | `background.info.subtle.rest` | 4,50:1 | 5,90:1 ✅ | 5,12:1 ✅ |
| `text.danger.default.rest` | `background.success.subtle.rest` | 4,50:1 | 6,13:1 ✅ | 5,17:1 ✅ |
| `text.danger.default.rest` | `background.warning.subtle.rest` | 4,50:1 | 6,05:1 ✅ | 5,42:1 ✅ |
| `text.danger.default.rest` | `background.danger.subtle.rest` | 4,50:1 | 5,87:1 ✅ | 5,60:1 ✅ |

### Texto inverse sobre fondos fuertes

60 parejas.

| Color | Fondo | Mínimo | Claro | Oscuro |
|---|---|---|---|---|
| `text.neutral.inverse.rest` | `background.neutral.inverse.rest` | 4,50:1 | 16,98:1 ✅ | 16,98:1 ✅ |
| `text.neutral.inverse.rest` | `background.primary.default.rest` | 4,50:1 | 5,13:1 ✅ | 9,00:1 ✅ |
| `text.neutral.inverse.rest` | `background.primary.default.hover` | 4,50:1 | 7,36:1 ✅ | 11,61:1 ✅ |
| `text.neutral.inverse.rest` | `background.primary.default.active` | 4,50:1 | 9,26:1 ✅ | 13,79:1 ✅ |
| `text.neutral.inverse.rest` | `background.info.default.rest` | 4,50:1 | 6,54:1 ✅ | 6,73:1 ✅ |
| `text.neutral.inverse.rest` | `background.success.default.rest` | 4,50:1 | 4,73:1 ✅ | 9,98:1 ✅ |
| `text.neutral.inverse.rest` | `background.warning.default.rest` | 4,50:1 | 5,00:1 ✅ | 7,46:1 ✅ |
| `text.neutral.inverse.rest` | `background.danger.default.rest` | 4,50:1 | 6,14:1 ✅ | 6,14:1 ✅ |
| `text.neutral.inverse.rest` | `background.danger.default.hover` | 4,50:1 | 8,00:1 ✅ | 9,25:1 ✅ |
| `text.neutral.inverse.rest` | `background.danger.default.active` | 4,50:1 | 9,59:1 ✅ | 12,21:1 ✅ |
| `text.primary.inverse.rest` | `background.neutral.inverse.rest` | 4,50:1 | 16,87:1 ✅ | 14,45:1 ✅ |
| `text.primary.inverse.rest` | `background.primary.default.rest` | 4,50:1 | 5,10:1 ✅ | 7,66:1 ✅ |
| `text.primary.inverse.rest` | `background.primary.default.hover` | 4,50:1 | 7,30:1 ✅ | 9,88:1 ✅ |
| `text.primary.inverse.rest` | `background.primary.default.active` | 4,50:1 | 9,19:1 ✅ | 11,74:1 ✅ |
| `text.primary.inverse.rest` | `background.info.default.rest` | 4,50:1 | 6,49:1 ✅ | 5,73:1 ✅ |
| `text.primary.inverse.rest` | `background.success.default.rest` | 4,50:1 | 4,70:1 ✅ | 8,49:1 ✅ |
| `text.primary.inverse.rest` | `background.warning.default.rest` | 4,50:1 | 4,96:1 ✅ | 6,35:1 ✅ |
| `text.primary.inverse.rest` | `background.danger.default.rest` | 4,50:1 | 6,10:1 ✅ | 5,23:1 ✅ |
| `text.primary.inverse.rest` | `background.danger.default.hover` | 4,50:1 | 7,94:1 ✅ | 7,87:1 ✅ |
| `text.primary.inverse.rest` | `background.danger.default.active` | 4,50:1 | 9,53:1 ✅ | 10,39:1 ✅ |
| `text.info.inverse.rest` | `background.neutral.inverse.rest` | 4,50:1 | 16,31:1 ✅ | 14,14:1 ✅ |
| `text.info.inverse.rest` | `background.primary.default.rest` | 4,50:1 | 4,93:1 ✅ | 7,50:1 ✅ |
| `text.info.inverse.rest` | `background.primary.default.hover` | 4,50:1 | 7,06:1 ✅ | 9,67:1 ✅ |
| `text.info.inverse.rest` | `background.primary.default.active` | 4,50:1 | 8,89:1 ✅ | 11,49:1 ✅ |
| `text.info.inverse.rest` | `background.info.default.rest` | 4,50:1 | 6,28:1 ✅ | 5,60:1 ✅ |
| `text.info.inverse.rest` | `background.success.default.rest` | 4,50:1 | 4,54:1 ✅ | 8,31:1 ✅ |
| `text.info.inverse.rest` | `background.warning.default.rest` | 4,50:1 | 4,80:1 ✅ | 6,22:1 ✅ |
| `text.info.inverse.rest` | `background.danger.default.rest` | 4,50:1 | 5,90:1 ✅ | 5,12:1 ✅ |
| `text.info.inverse.rest` | `background.danger.default.hover` | 4,50:1 | 7,68:1 ✅ | 7,70:1 ✅ |
| `text.info.inverse.rest` | `background.danger.default.active` | 4,50:1 | 9,21:1 ✅ | 10,17:1 ✅ |
| `text.success.inverse.rest` | `background.neutral.inverse.rest` | 4,50:1 | 16,95:1 ✅ | 14,30:1 ✅ |
| `text.success.inverse.rest` | `background.primary.default.rest` | 4,50:1 | 5,12:1 ✅ | 7,58:1 ✅ |
| `text.success.inverse.rest` | `background.primary.default.hover` | 4,50:1 | 7,34:1 ✅ | 9,78:1 ✅ |
| `text.success.inverse.rest` | `background.primary.default.active` | 4,50:1 | 9,24:1 ✅ | 11,61:1 ✅ |
| `text.success.inverse.rest` | `background.info.default.rest` | 4,50:1 | 6,53:1 ✅ | 5,66:1 ✅ |
| `text.success.inverse.rest` | `background.success.default.rest` | 4,50:1 | 4,72:1 ✅ | 8,40:1 ✅ |
| `text.success.inverse.rest` | `background.warning.default.rest` | 4,50:1 | 4,99:1 ✅ | 6,28:1 ✅ |
| `text.success.inverse.rest` | `background.danger.default.rest` | 4,50:1 | 6,13:1 ✅ | 5,17:1 ✅ |
| `text.success.inverse.rest` | `background.danger.default.hover` | 4,50:1 | 7,98:1 ✅ | 7,79:1 ✅ |
| `text.success.inverse.rest` | `background.danger.default.active` | 4,50:1 | 9,58:1 ✅ | 10,28:1 ✅ |
| `text.warning.inverse.rest` | `background.neutral.inverse.rest` | 4,50:1 | 16,71:1 ✅ | 14,98:1 ✅ |
| `text.warning.inverse.rest` | `background.primary.default.rest` | 4,50:1 | 5,05:1 ✅ | 7,94:1 ✅ |
| `text.warning.inverse.rest` | `background.primary.default.hover` | 4,50:1 | 7,24:1 ✅ | 10,24:1 ✅ |
| `text.warning.inverse.rest` | `background.primary.default.active` | 4,50:1 | 9,11:1 ✅ | 12,17:1 ✅ |
| `text.warning.inverse.rest` | `background.info.default.rest` | 4,50:1 | 6,44:1 ✅ | 5,93:1 ✅ |
| `text.warning.inverse.rest` | `background.success.default.rest` | 4,50:1 | 4,66:1 ✅ | 8,80:1 ✅ |
| `text.warning.inverse.rest` | `background.warning.default.rest` | 4,50:1 | 4,92:1 ✅ | 6,58:1 ✅ |
| `text.warning.inverse.rest` | `background.danger.default.rest` | 4,50:1 | 6,05:1 ✅ | 5,42:1 ✅ |
| `text.warning.inverse.rest` | `background.danger.default.hover` | 4,50:1 | 7,87:1 ✅ | 8,16:1 ✅ |
| `text.warning.inverse.rest` | `background.danger.default.active` | 4,50:1 | 9,44:1 ✅ | 10,77:1 ✅ |
| `text.danger.inverse.rest` | `background.neutral.inverse.rest` | 4,50:1 | 16,22:1 ✅ | 15,47:1 ✅ |
| `text.danger.inverse.rest` | `background.primary.default.rest` | 4,50:1 | 4,90:1 ✅ | 8,20:1 ✅ |
| `text.danger.inverse.rest` | `background.primary.default.hover` | 4,50:1 | 7,03:1 ✅ | 10,58:1 ✅ |
| `text.danger.inverse.rest` | `background.primary.default.active` | 4,50:1 | 8,84:1 ✅ | 12,56:1 ✅ |
| `text.danger.inverse.rest` | `background.info.default.rest` | 4,50:1 | 6,25:1 ✅ | 6,13:1 ✅ |
| `text.danger.inverse.rest` | `background.success.default.rest` | 4,50:1 | 4,52:1 ✅ | 9,09:1 ✅ |
| `text.danger.inverse.rest` | `background.warning.default.rest` | 4,50:1 | 4,77:1 ✅ | 6,80:1 ✅ |
| `text.danger.inverse.rest` | `background.danger.default.rest` | 4,50:1 | 5,87:1 ✅ | 5,60:1 ✅ |
| `text.danger.inverse.rest` | `background.danger.default.hover` | 4,50:1 | 7,64:1 ✅ | 8,42:1 ✅ |
| `text.danger.inverse.rest` | `background.danger.default.active` | 4,50:1 | 9,16:1 ✅ | 11,12:1 ✅ |

### Bordes y foco sobre fondos claros

88 parejas.

| Color | Fondo | Mínimo | Claro | Oscuro |
|---|---|---|---|---|
| `border.neutral.default.rest` | `background.neutral.default.rest` | — | 1,18:1 · exento | 1,37:1 · exento |
| `border.neutral.default.rest` | `background.neutral.default.hover` | — | 1,13:1 · exento | 1,21:1 · exento |
| `border.neutral.default.rest` | `background.neutral.default.active` | — | 1,00:1 · exento | 1,00:1 · exento |
| `border.neutral.default.rest` | `background.neutral.default.disabled` | — | 1,13:1 · exento | 1,21:1 · exento |
| `border.neutral.default.rest` | `background.neutral.subtle.rest` | — | 1,13:1 · exento | 1,21:1 · exento |
| `border.neutral.default.rest` | `background.neutral.strong.rest` | — | 1,00:1 · exento | 1,00:1 · exento |
| `border.neutral.default.rest` | `background.primary.subtle.rest` | — | 1,18:1 · exento | 1,03:1 · exento |
| `border.neutral.default.rest` | `background.info.subtle.rest` | — | 1,14:1 · exento | 1,01:1 · exento |
| `border.neutral.default.rest` | `background.success.subtle.rest` | — | 1,18:1 · exento | 1,02:1 · exento |
| `border.neutral.default.rest` | `background.warning.subtle.rest` | — | 1,17:1 · exento | 1,07:1 · exento |
| `border.neutral.default.rest` | `background.danger.subtle.rest` | — | 1,13:1 · exento | 1,10:1 · exento |
| `border.neutral.strong.rest` | `background.neutral.default.rest` | 3,00:1 | 4,63:1 ✅ | 4,16:1 ✅ |
| `border.neutral.strong.rest` | `background.neutral.default.hover` | 3,00:1 | 4,39:1 ✅ | 3,67:1 ✅ |
| `border.neutral.strong.rest` | `background.neutral.default.active` | 3,00:1 | 3,91:1 ✅ | 3,03:1 ✅ |
| `border.neutral.strong.rest` | `background.neutral.default.disabled` | 3,00:1 | 4,39:1 ✅ | 3,67:1 ✅ |
| `border.neutral.strong.rest` | `background.neutral.subtle.rest` | 3,00:1 | 4,39:1 ✅ | 3,67:1 ✅ |
| `border.neutral.strong.rest` | `background.neutral.strong.rest` | 3,00:1 | 3,91:1 ✅ | 3,03:1 ✅ |
| `border.neutral.strong.rest` | `background.primary.subtle.rest` | 3,00:1 | 4,60:1 ✅ | 3,12:1 ✅ |
| `border.neutral.strong.rest` | `background.info.subtle.rest` | 3,00:1 | 4,44:1 ✅ | 3,06:1 ✅ |
| `border.neutral.strong.rest` | `background.success.subtle.rest` | 3,00:1 | 4,62:1 ✅ | 3,09:1 ✅ |
| `border.neutral.strong.rest` | `background.warning.subtle.rest` | 3,00:1 | 4,56:1 ✅ | 3,24:1 ✅ |
| `border.neutral.strong.rest` | `background.danger.subtle.rest` | 3,00:1 | 4,42:1 ✅ | 3,34:1 ✅ |
| `border.primary.default.rest` | `background.neutral.default.rest` | 3,00:1 | 3,60:1 ✅ | 7,93:1 ✅ |
| `border.primary.default.rest` | `background.neutral.default.hover` | 3,00:1 | 3,42:1 ✅ | 6,99:1 ✅ |
| `border.primary.default.rest` | `background.neutral.default.active` | 3,00:1 | 3,04:1 ✅ | 5,78:1 ✅ |
| `border.primary.default.rest` | `background.neutral.default.disabled` | 3,00:1 | 3,42:1 ✅ | 6,99:1 ✅ |
| `border.primary.default.rest` | `background.neutral.subtle.rest` | 3,00:1 | 3,42:1 ✅ | 6,99:1 ✅ |
| `border.primary.default.rest` | `background.neutral.strong.rest` | 3,00:1 | 3,04:1 ✅ | 5,78:1 ✅ |
| `border.primary.default.rest` | `background.primary.subtle.rest` | 3,00:1 | 3,58:1 ✅ | 5,94:1 ✅ |
| `border.primary.default.rest` | `background.info.subtle.rest` | 3,00:1 | 3,46:1 ✅ | 5,82:1 ✅ |
| `border.primary.default.rest` | `background.success.subtle.rest` | 3,00:1 | 3,60:1 ✅ | 5,88:1 ✅ |
| `border.primary.default.rest` | `background.warning.subtle.rest` | 3,00:1 | 3,55:1 ✅ | 6,16:1 ✅ |
| `border.primary.default.rest` | `background.danger.subtle.rest` | 3,00:1 | 3,44:1 ✅ | 6,36:1 ✅ |
| `border.info.default.rest` | `background.neutral.default.rest` | 3,00:1 | 5,02:1 ✅ | 5,35:1 ✅ |
| `border.info.default.rest` | `background.neutral.default.hover` | 3,00:1 | 4,77:1 ✅ | 4,72:1 ✅ |
| `border.info.default.rest` | `background.neutral.default.active` | 3,00:1 | 4,24:1 ✅ | 3,90:1 ✅ |
| `border.info.default.rest` | `background.neutral.default.disabled` | 3,00:1 | 4,77:1 ✅ | 4,72:1 ✅ |
| `border.info.default.rest` | `background.neutral.subtle.rest` | 3,00:1 | 4,77:1 ✅ | 4,72:1 ✅ |
| `border.info.default.rest` | `background.neutral.strong.rest` | 3,00:1 | 4,24:1 ✅ | 3,90:1 ✅ |
| `border.info.default.rest` | `background.primary.subtle.rest` | 3,00:1 | 4,99:1 ✅ | 4,01:1 ✅ |
| `border.info.default.rest` | `background.info.subtle.rest` | 3,00:1 | 4,82:1 ✅ | 3,93:1 ✅ |
| `border.info.default.rest` | `background.success.subtle.rest` | 3,00:1 | 5,01:1 ✅ | 3,97:1 ✅ |
| `border.info.default.rest` | `background.warning.subtle.rest` | 3,00:1 | 4,94:1 ✅ | 4,16:1 ✅ |
| `border.info.default.rest` | `background.danger.subtle.rest` | 3,00:1 | 4,80:1 ✅ | 4,30:1 ✅ |
| `border.success.default.rest` | `background.neutral.default.rest` | 3,00:1 | 4,73:1 ✅ | 9,08:1 ✅ |
| `border.success.default.rest` | `background.neutral.default.hover` | 3,00:1 | 4,49:1 ✅ | 8,00:1 ✅ |
| `border.success.default.rest` | `background.neutral.default.active` | 3,00:1 | 3,99:1 ✅ | 6,62:1 ✅ |
| `border.success.default.rest` | `background.neutral.default.disabled` | 3,00:1 | 4,49:1 ✅ | 8,00:1 ✅ |
| `border.success.default.rest` | `background.neutral.subtle.rest` | 3,00:1 | 4,49:1 ✅ | 8,00:1 ✅ |
| `border.success.default.rest` | `background.neutral.strong.rest` | 3,00:1 | 3,99:1 ✅ | 6,62:1 ✅ |
| `border.success.default.rest` | `background.primary.subtle.rest` | 3,00:1 | 4,70:1 ✅ | 6,81:1 ✅ |
| `border.success.default.rest` | `background.info.subtle.rest` | 3,00:1 | 4,54:1 ✅ | 6,67:1 ✅ |
| `border.success.default.rest` | `background.success.subtle.rest` | 3,00:1 | 4,72:1 ✅ | 6,74:1 ✅ |
| `border.success.default.rest` | `background.warning.subtle.rest` | 3,00:1 | 4,66:1 ✅ | 7,06:1 ✅ |
| `border.success.default.rest` | `background.danger.subtle.rest` | 3,00:1 | 4,52:1 ✅ | 7,29:1 ✅ |
| `border.warning.default.rest` | `background.neutral.default.rest` | 3,00:1 | 5,00:1 ✅ | 6,97:1 ✅ |
| `border.warning.default.rest` | `background.neutral.default.hover` | 3,00:1 | 4,75:1 ✅ | 6,15:1 ✅ |
| `border.warning.default.rest` | `background.neutral.default.active` | 3,00:1 | 4,22:1 ✅ | 5,08:1 ✅ |
| `border.warning.default.rest` | `background.neutral.default.disabled` | 3,00:1 | 4,75:1 ✅ | 6,15:1 ✅ |
| `border.warning.default.rest` | `background.neutral.subtle.rest` | 3,00:1 | 4,75:1 ✅ | 6,15:1 ✅ |
| `border.warning.default.rest` | `background.neutral.strong.rest` | 3,00:1 | 4,22:1 ✅ | 5,08:1 ✅ |
| `border.warning.default.rest` | `background.primary.subtle.rest` | 3,00:1 | 4,96:1 ✅ | 5,23:1 ✅ |
| `border.warning.default.rest` | `background.info.subtle.rest` | 3,00:1 | 4,80:1 ✅ | 5,12:1 ✅ |
| `border.warning.default.rest` | `background.success.subtle.rest` | 3,00:1 | 4,99:1 ✅ | 5,17:1 ✅ |
| `border.warning.default.rest` | `background.warning.subtle.rest` | 3,00:1 | 4,92:1 ✅ | 5,42:1 ✅ |
| `border.warning.default.rest` | `background.danger.subtle.rest` | 3,00:1 | 4,77:1 ✅ | 5,60:1 ✅ |
| `border.danger.default.rest` | `background.neutral.default.rest` | 3,00:1 | 4,56:1 ✅ | 5,29:1 ✅ |
| `border.danger.default.rest` | `background.neutral.default.hover` | 3,00:1 | 4,33:1 ✅ | 4,66:1 ✅ |
| `border.danger.default.rest` | `background.neutral.default.active` | 3,00:1 | 3,85:1 ✅ | 3,85:1 ✅ |
| `border.danger.default.rest` | `background.neutral.default.disabled` | 3,00:1 | 4,33:1 ✅ | 4,66:1 ✅ |
| `border.danger.default.rest` | `background.neutral.subtle.rest` | 3,00:1 | 4,33:1 ✅ | 4,66:1 ✅ |
| `border.danger.default.rest` | `background.neutral.strong.rest` | 3,00:1 | 3,85:1 ✅ | 3,85:1 ✅ |
| `border.danger.default.rest` | `background.primary.subtle.rest` | 3,00:1 | 4,53:1 ✅ | 3,97:1 ✅ |
| `border.danger.default.rest` | `background.info.subtle.rest` | 3,00:1 | 4,38:1 ✅ | 3,88:1 ✅ |
| `border.danger.default.rest` | `background.success.subtle.rest` | 3,00:1 | 4,56:1 ✅ | 3,92:1 ✅ |
| `border.danger.default.rest` | `background.warning.subtle.rest` | 3,00:1 | 4,49:1 ✅ | 4,11:1 ✅ |
| `border.danger.default.rest` | `background.danger.subtle.rest` | 3,00:1 | 4,36:1 ✅ | 4,25:1 ✅ |
| `focus.primary.default.rest` | `background.neutral.default.rest` | 3,00:1 | 5,13:1 ✅ | 10,21:1 ✅ |
| `focus.primary.default.rest` | `background.neutral.default.hover` | 3,00:1 | 4,87:1 ✅ | 9,00:1 ✅ |
| `focus.primary.default.rest` | `background.neutral.default.active` | 3,00:1 | 4,33:1 ✅ | 7,44:1 ✅ |
| `focus.primary.default.rest` | `background.neutral.default.disabled` | 3,00:1 | 4,87:1 ✅ | 9,00:1 ✅ |
| `focus.primary.default.rest` | `background.neutral.subtle.rest` | 3,00:1 | 4,87:1 ✅ | 9,00:1 ✅ |
| `focus.primary.default.rest` | `background.neutral.strong.rest` | 3,00:1 | 4,33:1 ✅ | 7,44:1 ✅ |
| `focus.primary.default.rest` | `background.primary.subtle.rest` | 3,00:1 | 5,10:1 ✅ | 7,66:1 ✅ |
| `focus.primary.default.rest` | `background.info.subtle.rest` | 3,00:1 | 4,93:1 ✅ | 7,50:1 ✅ |
| `focus.primary.default.rest` | `background.success.subtle.rest` | 3,00:1 | 5,12:1 ✅ | 7,58:1 ✅ |
| `focus.primary.default.rest` | `background.warning.subtle.rest` | 3,00:1 | 5,05:1 ✅ | 7,94:1 ✅ |
| `focus.primary.default.rest` | `background.danger.subtle.rest` | 3,00:1 | 4,90:1 ✅ | 8,20:1 ✅ |

### Iconos como el texto: normales sobre claros e inverse sobre fuertes

148 parejas.

| Color | Fondo | Mínimo | Claro | Oscuro |
|---|---|---|---|---|
| `icon.neutral.default.rest` | `background.neutral.default.rest` | 3,00:1 | 16,98:1 ✅ | 18,30:1 ✅ |
| `icon.neutral.default.rest` | `background.neutral.default.hover` | 3,00:1 | 16,13:1 ✅ | 16,13:1 ✅ |
| `icon.neutral.default.rest` | `background.neutral.default.active` | 3,00:1 | 14,33:1 ✅ | 13,33:1 ✅ |
| `icon.neutral.default.rest` | `background.neutral.default.disabled` | 3,00:1 | 16,13:1 ✅ | 16,13:1 ✅ |
| `icon.neutral.default.rest` | `background.neutral.subtle.rest` | 3,00:1 | 16,13:1 ✅ | 16,13:1 ✅ |
| `icon.neutral.default.rest` | `background.neutral.strong.rest` | 3,00:1 | 14,33:1 ✅ | 13,33:1 ✅ |
| `icon.neutral.default.rest` | `background.primary.subtle.rest` | 3,00:1 | 16,87:1 ✅ | 13,72:1 ✅ |
| `icon.neutral.default.rest` | `background.info.subtle.rest` | 3,00:1 | 16,31:1 ✅ | 13,43:1 ✅ |
| `icon.neutral.default.rest` | `background.success.subtle.rest` | 3,00:1 | 16,95:1 ✅ | 13,58:1 ✅ |
| `icon.neutral.default.rest` | `background.warning.subtle.rest` | 3,00:1 | 16,71:1 ✅ | 14,22:1 ✅ |
| `icon.neutral.default.rest` | `background.danger.subtle.rest` | 3,00:1 | 16,22:1 ✅ | 14,69:1 ✅ |
| `icon.neutral.default.disabled` | `background.neutral.default.rest` | — | 2,49:1 · exento | 2,66:1 · exento |
| `icon.neutral.default.disabled` | `background.neutral.default.hover` | — | 2,36:1 · exento | 2,35:1 · exento |
| `icon.neutral.default.disabled` | `background.neutral.default.active` | — | 2,10:1 · exento | 1,94:1 · exento |
| `icon.neutral.default.disabled` | `background.neutral.default.disabled` | — | 2,36:1 · exento | 2,35:1 · exento |
| `icon.neutral.default.disabled` | `background.neutral.subtle.rest` | — | 2,36:1 · exento | 2,35:1 · exento |
| `icon.neutral.default.disabled` | `background.neutral.strong.rest` | — | 2,10:1 · exento | 1,94:1 · exento |
| `icon.neutral.default.disabled` | `background.primary.subtle.rest` | — | 2,47:1 · exento | 2,00:1 · exento |
| `icon.neutral.default.disabled` | `background.info.subtle.rest` | — | 2,39:1 · exento | 1,96:1 · exento |
| `icon.neutral.default.disabled` | `background.success.subtle.rest` | — | 2,49:1 · exento | 1,98:1 · exento |
| `icon.neutral.default.disabled` | `background.warning.subtle.rest` | — | 2,45:1 · exento | 2,07:1 · exento |
| `icon.neutral.default.disabled` | `background.danger.subtle.rest` | — | 2,38:1 · exento | 2,14:1 · exento |
| `icon.neutral.subtle.rest` | `background.neutral.default.rest` | 3,00:1 | 7,23:1 ✅ | 7,74:1 ✅ |
| `icon.neutral.subtle.rest` | `background.neutral.default.hover` | 3,00:1 | 6,87:1 ✅ | 6,82:1 ✅ |
| `icon.neutral.subtle.rest` | `background.neutral.default.active` | 3,00:1 | 6,10:1 ✅ | 5,64:1 ✅ |
| `icon.neutral.subtle.rest` | `background.neutral.default.disabled` | 3,00:1 | 6,87:1 ✅ | 6,82:1 ✅ |
| `icon.neutral.subtle.rest` | `background.neutral.subtle.rest` | 3,00:1 | 6,87:1 ✅ | 6,82:1 ✅ |
| `icon.neutral.subtle.rest` | `background.neutral.strong.rest` | 3,00:1 | 6,10:1 ✅ | 5,64:1 ✅ |
| `icon.neutral.subtle.rest` | `background.primary.subtle.rest` | 3,00:1 | 7,18:1 ✅ | 5,80:1 ✅ |
| `icon.neutral.subtle.rest` | `background.info.subtle.rest` | 3,00:1 | 6,94:1 ✅ | 5,68:1 ✅ |
| `icon.neutral.subtle.rest` | `background.success.subtle.rest` | 3,00:1 | 7,22:1 ✅ | 5,74:1 ✅ |
| `icon.neutral.subtle.rest` | `background.warning.subtle.rest` | 3,00:1 | 7,12:1 ✅ | 6,02:1 ✅ |
| `icon.neutral.subtle.rest` | `background.danger.subtle.rest` | 3,00:1 | 6,91:1 ✅ | 6,21:1 ✅ |
| `icon.primary.default.rest` | `background.neutral.default.rest` | 3,00:1 | 5,13:1 ✅ | 10,21:1 ✅ |
| `icon.primary.default.rest` | `background.neutral.default.hover` | 3,00:1 | 4,87:1 ✅ | 9,00:1 ✅ |
| `icon.primary.default.rest` | `background.neutral.default.active` | 3,00:1 | 4,33:1 ✅ | 7,44:1 ✅ |
| `icon.primary.default.rest` | `background.neutral.default.disabled` | 3,00:1 | 4,87:1 ✅ | 9,00:1 ✅ |
| `icon.primary.default.rest` | `background.neutral.subtle.rest` | 3,00:1 | 4,87:1 ✅ | 9,00:1 ✅ |
| `icon.primary.default.rest` | `background.neutral.strong.rest` | 3,00:1 | 4,33:1 ✅ | 7,44:1 ✅ |
| `icon.primary.default.rest` | `background.primary.subtle.rest` | 3,00:1 | 5,10:1 ✅ | 7,66:1 ✅ |
| `icon.primary.default.rest` | `background.info.subtle.rest` | 3,00:1 | 4,93:1 ✅ | 7,50:1 ✅ |
| `icon.primary.default.rest` | `background.success.subtle.rest` | 3,00:1 | 5,12:1 ✅ | 7,58:1 ✅ |
| `icon.primary.default.rest` | `background.warning.subtle.rest` | 3,00:1 | 5,05:1 ✅ | 7,94:1 ✅ |
| `icon.primary.default.rest` | `background.danger.subtle.rest` | 3,00:1 | 4,90:1 ✅ | 8,20:1 ✅ |
| `icon.info.default.rest` | `background.neutral.default.rest` | 3,00:1 | 6,54:1 ✅ | 7,63:1 ✅ |
| `icon.info.default.rest` | `background.neutral.default.hover` | 3,00:1 | 6,21:1 ✅ | 6,73:1 ✅ |
| `icon.info.default.rest` | `background.neutral.default.active` | 3,00:1 | 5,52:1 ✅ | 5,56:1 ✅ |
| `icon.info.default.rest` | `background.neutral.default.disabled` | 3,00:1 | 6,21:1 ✅ | 6,73:1 ✅ |
| `icon.info.default.rest` | `background.neutral.subtle.rest` | 3,00:1 | 6,21:1 ✅ | 6,73:1 ✅ |
| `icon.info.default.rest` | `background.neutral.strong.rest` | 3,00:1 | 5,52:1 ✅ | 5,56:1 ✅ |
| `icon.info.default.rest` | `background.primary.subtle.rest` | 3,00:1 | 6,49:1 ✅ | 5,73:1 ✅ |
| `icon.info.default.rest` | `background.info.subtle.rest` | 3,00:1 | 6,28:1 ✅ | 5,60:1 ✅ |
| `icon.info.default.rest` | `background.success.subtle.rest` | 3,00:1 | 6,53:1 ✅ | 5,66:1 ✅ |
| `icon.info.default.rest` | `background.warning.subtle.rest` | 3,00:1 | 6,44:1 ✅ | 5,93:1 ✅ |
| `icon.info.default.rest` | `background.danger.subtle.rest` | 3,00:1 | 6,25:1 ✅ | 6,13:1 ✅ |
| `icon.success.default.rest` | `background.neutral.default.rest` | 3,00:1 | 6,82:1 ✅ | 11,32:1 ✅ |
| `icon.success.default.rest` | `background.neutral.default.hover` | 3,00:1 | 6,48:1 ✅ | 9,98:1 ✅ |
| `icon.success.default.rest` | `background.neutral.default.active` | 3,00:1 | 5,76:1 ✅ | 8,25:1 ✅ |
| `icon.success.default.rest` | `background.neutral.default.disabled` | 3,00:1 | 6,48:1 ✅ | 9,98:1 ✅ |
| `icon.success.default.rest` | `background.neutral.subtle.rest` | 3,00:1 | 6,48:1 ✅ | 9,98:1 ✅ |
| `icon.success.default.rest` | `background.neutral.strong.rest` | 3,00:1 | 5,76:1 ✅ | 8,25:1 ✅ |
| `icon.success.default.rest` | `background.primary.subtle.rest` | 3,00:1 | 6,78:1 ✅ | 8,49:1 ✅ |
| `icon.success.default.rest` | `background.info.subtle.rest` | 3,00:1 | 6,55:1 ✅ | 8,31:1 ✅ |
| `icon.success.default.rest` | `background.success.subtle.rest` | 3,00:1 | 6,81:1 ✅ | 8,40:1 ✅ |
| `icon.success.default.rest` | `background.warning.subtle.rest` | 3,00:1 | 6,72:1 ✅ | 8,80:1 ✅ |
| `icon.success.default.rest` | `background.danger.subtle.rest` | 3,00:1 | 6,52:1 ✅ | 9,09:1 ✅ |
| `icon.warning.default.rest` | `background.neutral.default.rest` | 3,00:1 | 7,05:1 ✅ | 8,47:1 ✅ |
| `icon.warning.default.rest` | `background.neutral.default.hover` | 3,00:1 | 6,70:1 ✅ | 7,46:1 ✅ |
| `icon.warning.default.rest` | `background.neutral.default.active` | 3,00:1 | 5,95:1 ✅ | 6,17:1 ✅ |
| `icon.warning.default.rest` | `background.neutral.default.disabled` | 3,00:1 | 6,70:1 ✅ | 7,46:1 ✅ |
| `icon.warning.default.rest` | `background.neutral.subtle.rest` | 3,00:1 | 6,70:1 ✅ | 7,46:1 ✅ |
| `icon.warning.default.rest` | `background.neutral.strong.rest` | 3,00:1 | 5,95:1 ✅ | 6,17:1 ✅ |
| `icon.warning.default.rest` | `background.primary.subtle.rest` | 3,00:1 | 7,00:1 ✅ | 6,35:1 ✅ |
| `icon.warning.default.rest` | `background.info.subtle.rest` | 3,00:1 | 6,77:1 ✅ | 6,22:1 ✅ |
| `icon.warning.default.rest` | `background.success.subtle.rest` | 3,00:1 | 7,04:1 ✅ | 6,28:1 ✅ |
| `icon.warning.default.rest` | `background.warning.subtle.rest` | 3,00:1 | 6,94:1 ✅ | 6,58:1 ✅ |
| `icon.warning.default.rest` | `background.danger.subtle.rest` | 3,00:1 | 6,74:1 ✅ | 6,80:1 ✅ |
| `icon.danger.default.rest` | `background.neutral.default.rest` | 3,00:1 | 6,14:1 ✅ | 6,97:1 ✅ |
| `icon.danger.default.rest` | `background.neutral.default.hover` | 3,00:1 | 5,83:1 ✅ | 6,14:1 ✅ |
| `icon.danger.default.rest` | `background.neutral.default.active` | 3,00:1 | 5,19:1 ✅ | 5,08:1 ✅ |
| `icon.danger.default.rest` | `background.neutral.default.disabled` | 3,00:1 | 5,83:1 ✅ | 6,14:1 ✅ |
| `icon.danger.default.rest` | `background.neutral.subtle.rest` | 3,00:1 | 5,83:1 ✅ | 6,14:1 ✅ |
| `icon.danger.default.rest` | `background.neutral.strong.rest` | 3,00:1 | 5,19:1 ✅ | 5,08:1 ✅ |
| `icon.danger.default.rest` | `background.primary.subtle.rest` | 3,00:1 | 6,10:1 ✅ | 5,23:1 ✅ |
| `icon.danger.default.rest` | `background.info.subtle.rest` | 3,00:1 | 5,90:1 ✅ | 5,12:1 ✅ |
| `icon.danger.default.rest` | `background.success.subtle.rest` | 3,00:1 | 6,13:1 ✅ | 5,17:1 ✅ |
| `icon.danger.default.rest` | `background.warning.subtle.rest` | 3,00:1 | 6,05:1 ✅ | 5,42:1 ✅ |
| `icon.danger.default.rest` | `background.danger.subtle.rest` | 3,00:1 | 5,87:1 ✅ | 5,60:1 ✅ |
| `icon.neutral.inverse.rest` | `background.neutral.inverse.rest` | 3,00:1 | 16,98:1 ✅ | 16,98:1 ✅ |
| `icon.neutral.inverse.rest` | `background.primary.default.rest` | 3,00:1 | 5,13:1 ✅ | 9,00:1 ✅ |
| `icon.neutral.inverse.rest` | `background.primary.default.hover` | 3,00:1 | 7,36:1 ✅ | 11,61:1 ✅ |
| `icon.neutral.inverse.rest` | `background.primary.default.active` | 3,00:1 | 9,26:1 ✅ | 13,79:1 ✅ |
| `icon.neutral.inverse.rest` | `background.info.default.rest` | 3,00:1 | 6,54:1 ✅ | 6,73:1 ✅ |
| `icon.neutral.inverse.rest` | `background.success.default.rest` | 3,00:1 | 4,73:1 ✅ | 9,98:1 ✅ |
| `icon.neutral.inverse.rest` | `background.warning.default.rest` | 3,00:1 | 5,00:1 ✅ | 7,46:1 ✅ |
| `icon.neutral.inverse.rest` | `background.danger.default.rest` | 3,00:1 | 6,14:1 ✅ | 6,14:1 ✅ |
| `icon.neutral.inverse.rest` | `background.danger.default.hover` | 3,00:1 | 8,00:1 ✅ | 9,25:1 ✅ |
| `icon.neutral.inverse.rest` | `background.danger.default.active` | 3,00:1 | 9,59:1 ✅ | 12,21:1 ✅ |
| `icon.primary.inverse.rest` | `background.neutral.inverse.rest` | 3,00:1 | 16,87:1 ✅ | 14,45:1 ✅ |
| `icon.primary.inverse.rest` | `background.primary.default.rest` | 3,00:1 | 5,10:1 ✅ | 7,66:1 ✅ |
| `icon.primary.inverse.rest` | `background.primary.default.hover` | 3,00:1 | 7,30:1 ✅ | 9,88:1 ✅ |
| `icon.primary.inverse.rest` | `background.primary.default.active` | 3,00:1 | 9,19:1 ✅ | 11,74:1 ✅ |
| `icon.primary.inverse.rest` | `background.info.default.rest` | 3,00:1 | 6,49:1 ✅ | 5,73:1 ✅ |
| `icon.primary.inverse.rest` | `background.success.default.rest` | 3,00:1 | 4,70:1 ✅ | 8,49:1 ✅ |
| `icon.primary.inverse.rest` | `background.warning.default.rest` | 3,00:1 | 4,96:1 ✅ | 6,35:1 ✅ |
| `icon.primary.inverse.rest` | `background.danger.default.rest` | 3,00:1 | 6,10:1 ✅ | 5,23:1 ✅ |
| `icon.primary.inverse.rest` | `background.danger.default.hover` | 3,00:1 | 7,94:1 ✅ | 7,87:1 ✅ |
| `icon.primary.inverse.rest` | `background.danger.default.active` | 3,00:1 | 9,53:1 ✅ | 10,39:1 ✅ |
| `icon.info.inverse.rest` | `background.neutral.inverse.rest` | 3,00:1 | 16,31:1 ✅ | 14,14:1 ✅ |
| `icon.info.inverse.rest` | `background.primary.default.rest` | 3,00:1 | 4,93:1 ✅ | 7,50:1 ✅ |
| `icon.info.inverse.rest` | `background.primary.default.hover` | 3,00:1 | 7,06:1 ✅ | 9,67:1 ✅ |
| `icon.info.inverse.rest` | `background.primary.default.active` | 3,00:1 | 8,89:1 ✅ | 11,49:1 ✅ |
| `icon.info.inverse.rest` | `background.info.default.rest` | 3,00:1 | 6,28:1 ✅ | 5,60:1 ✅ |
| `icon.info.inverse.rest` | `background.success.default.rest` | 3,00:1 | 4,54:1 ✅ | 8,31:1 ✅ |
| `icon.info.inverse.rest` | `background.warning.default.rest` | 3,00:1 | 4,80:1 ✅ | 6,22:1 ✅ |
| `icon.info.inverse.rest` | `background.danger.default.rest` | 3,00:1 | 5,90:1 ✅ | 5,12:1 ✅ |
| `icon.info.inverse.rest` | `background.danger.default.hover` | 3,00:1 | 7,68:1 ✅ | 7,70:1 ✅ |
| `icon.info.inverse.rest` | `background.danger.default.active` | 3,00:1 | 9,21:1 ✅ | 10,17:1 ✅ |
| `icon.success.inverse.rest` | `background.neutral.inverse.rest` | 3,00:1 | 16,95:1 ✅ | 14,30:1 ✅ |
| `icon.success.inverse.rest` | `background.primary.default.rest` | 3,00:1 | 5,12:1 ✅ | 7,58:1 ✅ |
| `icon.success.inverse.rest` | `background.primary.default.hover` | 3,00:1 | 7,34:1 ✅ | 9,78:1 ✅ |
| `icon.success.inverse.rest` | `background.primary.default.active` | 3,00:1 | 9,24:1 ✅ | 11,61:1 ✅ |
| `icon.success.inverse.rest` | `background.info.default.rest` | 3,00:1 | 6,53:1 ✅ | 5,66:1 ✅ |
| `icon.success.inverse.rest` | `background.success.default.rest` | 3,00:1 | 4,72:1 ✅ | 8,40:1 ✅ |
| `icon.success.inverse.rest` | `background.warning.default.rest` | 3,00:1 | 4,99:1 ✅ | 6,28:1 ✅ |
| `icon.success.inverse.rest` | `background.danger.default.rest` | 3,00:1 | 6,13:1 ✅ | 5,17:1 ✅ |
| `icon.success.inverse.rest` | `background.danger.default.hover` | 3,00:1 | 7,98:1 ✅ | 7,79:1 ✅ |
| `icon.success.inverse.rest` | `background.danger.default.active` | 3,00:1 | 9,58:1 ✅ | 10,28:1 ✅ |
| `icon.warning.inverse.rest` | `background.neutral.inverse.rest` | 3,00:1 | 16,71:1 ✅ | 14,98:1 ✅ |
| `icon.warning.inverse.rest` | `background.primary.default.rest` | 3,00:1 | 5,05:1 ✅ | 7,94:1 ✅ |
| `icon.warning.inverse.rest` | `background.primary.default.hover` | 3,00:1 | 7,24:1 ✅ | 10,24:1 ✅ |
| `icon.warning.inverse.rest` | `background.primary.default.active` | 3,00:1 | 9,11:1 ✅ | 12,17:1 ✅ |
| `icon.warning.inverse.rest` | `background.info.default.rest` | 3,00:1 | 6,44:1 ✅ | 5,93:1 ✅ |
| `icon.warning.inverse.rest` | `background.success.default.rest` | 3,00:1 | 4,66:1 ✅ | 8,80:1 ✅ |
| `icon.warning.inverse.rest` | `background.warning.default.rest` | 3,00:1 | 4,92:1 ✅ | 6,58:1 ✅ |
| `icon.warning.inverse.rest` | `background.danger.default.rest` | 3,00:1 | 6,05:1 ✅ | 5,42:1 ✅ |
| `icon.warning.inverse.rest` | `background.danger.default.hover` | 3,00:1 | 7,87:1 ✅ | 8,16:1 ✅ |
| `icon.warning.inverse.rest` | `background.danger.default.active` | 3,00:1 | 9,44:1 ✅ | 10,77:1 ✅ |
| `icon.danger.inverse.rest` | `background.neutral.inverse.rest` | 3,00:1 | 16,22:1 ✅ | 15,47:1 ✅ |
| `icon.danger.inverse.rest` | `background.primary.default.rest` | 3,00:1 | 4,90:1 ✅ | 8,20:1 ✅ |
| `icon.danger.inverse.rest` | `background.primary.default.hover` | 3,00:1 | 7,03:1 ✅ | 10,58:1 ✅ |
| `icon.danger.inverse.rest` | `background.primary.default.active` | 3,00:1 | 8,84:1 ✅ | 12,56:1 ✅ |
| `icon.danger.inverse.rest` | `background.info.default.rest` | 3,00:1 | 6,25:1 ✅ | 6,13:1 ✅ |
| `icon.danger.inverse.rest` | `background.success.default.rest` | 3,00:1 | 4,52:1 ✅ | 9,09:1 ✅ |
| `icon.danger.inverse.rest` | `background.warning.default.rest` | 3,00:1 | 4,77:1 ✅ | 6,80:1 ✅ |
| `icon.danger.inverse.rest` | `background.danger.default.rest` | 3,00:1 | 5,87:1 ✅ | 5,60:1 ✅ |
| `icon.danger.inverse.rest` | `background.danger.default.hover` | 3,00:1 | 7,64:1 ✅ | 8,42:1 ✅ |
| `icon.danger.inverse.rest` | `background.danger.default.active` | 3,00:1 | 9,16:1 ✅ | 11,12:1 ✅ |
