#!/usr/bin/env node
// Comprueba el contraste de los colores semánticos de Prisma.
//
// Lee las reglas de tokens/contrast-pairs.json, genera todas las parejas
// (color de delante × fondo) que salen de ellas, calcula el contraste de cada
// una en modo claro y en modo oscuro y escribe el resultado en docs/contraste.md.
//
// Uso: npm run contrast

import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const tokens = JSON.parse(readFileSync(join(ROOT, 'tokens/tokens.json'), 'utf8'))
const config = JSON.parse(readFileSync(join(ROOT, 'tokens/contrast-pairs.json'), 'utf8'))
const OUT = 'docs/contraste.md'
const MODES = ['claro', 'oscuro']

// ------------------------------------------------------------ tokens

/** Todas las rutas de tokens de color semánticos, en el orden de tokens.json. */
function collect(node, path) {
  if ('$value' in node) return [path]
  return Object.entries(node)
    .filter(([k, v]) => !k.startsWith('$') && typeof v === 'object')
    .flatMap(([k, v]) => collect(v, `${path}.${k}`))
}
const ALL = collect(tokens.semantic.color, 'semantic.color')

function node(path) {
  return path.split('.').reduce((n, part) => n?.[part], tokens)
}

/** Sigue los alias hasta el color real, usando el valor de modo oscuro si lo hay. */
function resolve(path, mode) {
  let token = node(path)
  for (;;) {
    let value = token.$value
    const dark = token.$extensions?.['prisma.modes']?.dark
    if (mode === 'oscuro' && dark) value = dark
    if (typeof value === 'string' && value.startsWith('{')) token = node(value.slice(1, -1))
    else return value
  }
}

// ------------------------------------------------------------ patrones

/** Un patrón con * (una parte cualquiera) → expresión regular. */
const toRegExp = (pattern) =>
  new RegExp(`^${pattern.split('.').map((p) => (p === '*' ? '[^.]+' : p.replace(/[-]/g, '\\-'))).join('\\.')}$`)
const matches = (path, patterns = []) => patterns.some((p) => toRegExp(p).test(path))
const select = ({ include = [], exclude = [] }) => ALL.filter((p) => matches(p, include) && !matches(p, exclude))

const groups = Object.fromEntries(Object.entries(config.groups).map(([name, g]) => [name, select(g)]))

// ------------------------------------------------------------ contraste (WCAG 2.x)

function luminance(hex) {
  const channel = (i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5)
}
function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)]
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

// ------------------------------------------------------------ parejas

const exemptReason = (path) =>
  Object.entries(config.exempt.reasons).find(([pattern]) => matches(path, [pattern]))?.[1]

const results = config.rules.map((rule) => {
  const combos = rule.pairs ?? [{ foreground: rule.foreground, background: rule.background, either: rule.either }]
  const pairs = combos.flatMap((combo) =>
    select(combo.foreground).flatMap((fg) =>
      [combo.background].flat().flatMap((g) => groups[g]).map((bg) => {
        const strict = Object.entries(rule.stricter ?? {}).find(([pattern]) => matches(fg, [pattern]))
        const minimum = strict ? strict[1] : config.minimums[rule.kind]
        const exempt = matches(fg, config.exempt.include) ? exemptReason(fg) : null
        const modes = Object.fromEntries(
          MODES.map((mode) => {
            const a = resolve(fg, mode).hex
            const b = resolve(bg, mode).hex
            // Con "either", basta con que uno de los dos colores (los dos anillos del foco) llegue al mínimo.
            const other = combo.either ? contrast(resolve(combo.either, mode).hex, b) : null
            const ratio = Math.max(contrast(a, b), other ?? 0)
            return [mode, { ratio, fg: a, bg: b, ok: exempt ? null : ratio >= minimum }]
          }),
        )
        return { fg: combo.either ? `${fg} + ${combo.either}` : fg, bg, group: combo.background, minimum, exempt, modes }
      }),
    ),
  )
  return { rule, pairs }
})

// ------------------------------------------------------------ informe

const short = (p) => p.replaceAll('semantic.color.', '')
const num = (n) => n.toFixed(2).replace('.', ',')
const cell = (m) => (m.ok === null ? `${num(m.ratio)}:1 · exento` : `${num(m.ratio)}:1 ${m.ok ? '✅' : '❌'}`)
const allPairs = results.flatMap((r) => r.pairs.map((p) => ({ ...p, rule: r.rule })))
const checked = allPairs.filter((p) => !p.exempt)
const failing = checked.filter((p) => MODES.some((m) => !p.modes[m].ok))

// Las que pasan por menos margen: un cambio pequeño de color las haría fallar.
const tightest = checked
  .filter((p) => MODES.every((m) => p.modes[m].ok))
  .map((p) => ({ ...p, margin: Math.min(...MODES.map((m) => p.modes[m].ratio)) - p.minimum }))
  .sort((a, b) => a.margin - b.margin)
  .slice(0, 10)
const tightTable = [
  '| Color | Fondo | Mínimo | Claro | Oscuro | Margen |',
  '|---|---|---|---|---|---|',
  ...tightest.map((p) => `| \`${short(p.fg)}\` | \`${short(p.bg)}\` | ${num(p.minimum)}:1 | ${cell(p.modes.claro)} | ${cell(p.modes.oscuro)} | +${num(p.margin)} |`),
].join('\n')

const summary = results
  .map(({ rule, pairs }) => {
    const c = pairs.filter((p) => !p.exempt)
    const fails = c.filter((p) => MODES.some((m) => !p.modes[m].ok)).length
    return `| ${rule.name} | ${rule.kind} · ${num(config.minimums[rule.kind])}:1 | ${pairs.length} | ${c.length - fails} | ${fails} | ${pairs.length - c.length} |`
  })
  .join('\n')

const failTable = failing.length
  ? [
      '| Color | Fondo | Mínimo | Claro | Oscuro |',
      '|---|---|---|---|---|',
      ...failing.map((p) => `| \`${short(p.fg)}\` | \`${short(p.bg)}\` | ${num(p.minimum)}:1 | ${cell(p.modes.claro)} | ${cell(p.modes.oscuro)} |`),
    ].join('\n')
  : 'Ninguna: todas las parejas cumplen su mínimo en los dos modos. ✅'

const detail = results
  .map(({ rule, pairs }) => {
    const rows = pairs.map(
      (p) =>
        `| \`${short(p.fg)}\` | \`${short(p.bg)}\` | ${p.exempt ? '—' : `${num(p.minimum)}:1`} | ${cell(p.modes.claro)} | ${cell(p.modes.oscuro)} |`,
    )
    return `### ${rule.name}\n\n${pairs.length} parejas.\n\n| Color | Fondo | Mínimo | Claro | Oscuro |\n|---|---|---|---|---|\n${rows.join('\n')}`
  })
  .join('\n\n')

const groupList = Object.entries(groups)
  .map(([name, list]) => `- **${name}** (${list.length}): ${list.map((p) => `\`${short(p)}\``).join(', ')}`)
  .join('\n')

const md = `# Contraste de los colores

> **Archivo generado** por \`scripts/contrast.mjs\` a partir de \`tokens/tokens.json\` y \`tokens/contrast-pairs.json\`. No lo edites a mano: cambia las reglas o los tokens y ejecuta \`npm run contrast\`.

Cada regla de \`tokens/contrast-pairs.json\` junta un tipo de color (por su nombre) con un grupo de fondos. De ahí salen todas las parejas, y cada una se comprueba en **modo claro** y en **modo oscuro**. Los mínimos son 4,5:1 para el texto y 3:1 para iconos, bordes y foco (en el anillo de foco doble basta con que uno de sus dos anillos llegue a 3:1), y 7:1 para \`text.neutral.strong\`, el de la información médica (ADR-001, P3, y \`docs/accesibilidad.md\`).

**Exento** quiere decir que la pareja se mide, pero no tiene mínimo: los elementos desactivados y el borde decorativo.

## Resumen

**${allPairs.length} parejas** en total: **${checked.length - failing.length} pasan** en los dos modos, **${failing.length} no pasan** en algún modo y **${allPairs.length - checked.length} están exentas**.

| Regla | Tipo y mínimo | Parejas | Pasan | No pasan | Exentas |
|---|---|---|---|---|---|
${summary}

## Parejas que no pasan

${failTable}

## Las más justas

Pasan, pero por poco: si cambia alguno de sus colores, conviene mirarlas primero. El margen es lo que sobra sobre el mínimo, en el modo más justo.

${tightTable}

## Grupos de fondos

${groupList}

## Todas las parejas

${detail}
`

writeFileSync(join(ROOT, OUT), md)
console.log(`✓ ${OUT} generado: ${allPairs.length} parejas, ${failing.length} no pasan, ${allPairs.length - checked.length} exentas.`)
for (const p of failing)
  console.log(
    `  ✗ ${short(p.fg)} sobre ${short(p.bg)} (mín. ${p.minimum}:1): ${MODES.map((m) => `${m} ${num(p.modes[m].ratio)}:1`).join(' · ')}`,
  )
