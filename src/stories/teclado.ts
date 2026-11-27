// Ayuda compartida de las pruebas de teclado de Storybook (historia «Teclado» de
// cada componente). Comprueba la regla 2 de docs/accesibilidad.md: el foco se ve,
// con un anillo doble.
import { expect } from 'storybook/test'

/**
 * Comprueba que `element` muestra el anillo de foco doble de Prisma:
 * - por dentro, pegado al componente, un anillo neutro (box-shadow sin difuminar);
 * - por fuera, el anillo de color (outline) de al menos 2 px, separado del componente
 *   justo lo que mide el anillo neutro, para que no quede ningún hueco.
 */
export async function expectFocusRing(element: Element) {
  const style = getComputedStyle(element)
  const outer = parseFloat(style.outlineWidth)
  const gap = parseFloat(style.outlineOffset)
  await expect(style.outlineStyle, 'anillo de color: debe verse').toBe('solid')
  await expect(outer, 'anillo de color: al menos 2 px').toBeGreaterThanOrEqual(2)
  // box-shadow: "<color> 0px 0px 0px <ancho>px". El último número es el ancho del anillo neutro.
  const inner = style.boxShadow.match(/0px 0px 0px (\d+(?:\.\d+)?)px/)
  await expect(inner, 'anillo neutro de dentro: debe existir').not.toBeNull()
  await expect(parseFloat(inner![1]), 'anillo neutro: al menos 2 px').toBeGreaterThanOrEqual(2)
  await expect(gap, 'anillo de color: justo por fuera del neutro, sin hueco').toBe(parseFloat(inner![1]))
}
