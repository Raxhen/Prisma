#!/usr/bin/env node
// Genera, a partir de tokens/tokens.json:
//   - src/styles/tokens.css → una variable CSS por token (las tres capas).
//   - src/styles/theme.css  → las clases de Tailwind de los tokens semánticos y de componente.
//   - docs/tokens.md        → la tabla token → variable CSS → clase de Tailwind.
//
// Uso:
//   npm run tokens               escribe los tres archivos.
//   npm run tokens -- --check    solo comprueba que están al día; no escribe nada.
//
// No edites a mano los archivos generados: cambia tokens/tokens.json y vuelve a ejecutar
// este script.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = 'tokens/tokens.json'
const OUT = {
  tokens: 'src/styles/tokens.css',
  theme: 'src/styles/theme.css',
  docs: 'docs/tokens.md',
}
const CHECK = process.argv.includes('--check')

const data = JSON.parse(readFileSync(join(ROOT, SOURCE), 'utf8'))

// ---------------------------------------------------------------- utilidades

/** Recorre el árbol y devuelve cada token con su ruta y su $type (heredado del grupo). */
function collect(node, path = [], inheritedType) {
  const type = node.$type ?? inheritedType
  if ('$value' in node) return [{ path, type, token: node }]
  return Object.entries(node)
    .filter(([key, child]) => !key.startsWith('$') && typeof child === 'object')
    .flatMap(([key, child]) => collect(child, [...path, key], type))
}

const all = ['primitive', 'semantic', 'component'].flatMap((layer) =>
  collect(data[layer], [layer]),
)
const byPath = new Map(all.map((t) => [t.path.join('.'), t]))

const varName = (path) => `--${path.join('-')}`
const isAlias = (v) => typeof v === 'string' && /^\{[^}]+\}$/.test(v)
const aliasPath = (v) => v.slice(1, -1)

function aliasVar(alias) {
  const target = aliasPath(alias)
  if (!byPath.has(target)) throw new Error(`Alias roto: ${alias}`)
  return `var(${varName(target.split('.'))})`
}

const GENERIC_FONTS = new Set(['sans-serif', 'serif', 'monospace', 'system-ui', 'ui-sans-serif', 'ui-monospace', 'ui-serif', '-apple-system', 'BlinkMacSystemFont'])

/** Convierte el $value de un token en un valor CSS. */
function cssValue(value, type) {
  if (isAlias(value)) return aliasVar(value)
  switch (type) {
    case 'color': {
      const [a, b, c] = value.components
      const alpha = value.alpha ?? 1
      const suffix = alpha < 1 ? ` / ${alpha}` : ''
      if (value.colorSpace === 'oklch') return `oklch(${a} ${b} ${c}${suffix})`
      return `rgb(${a * 255} ${b * 255} ${c * 255}${suffix})`
    }
    case 'dimension':
      return `${value.value}${value.unit}`
    case 'fontFamily':
      return value.map((f) => (GENERIC_FONTS.has(f) ? f : `'${f}'`)).join(', ')
    case 'fontWeight':
      return String(value)
    case 'shadow':
      return ['offsetX', 'offsetY', 'blur', 'spread', 'color']
        .map((k) => cssValue(value[k], k === 'color' ? 'color' : 'dimension'))
        .join(' ')
    default:
      throw new Error(`Tipo sin soporte: ${type}`)
  }
}

// ---------------------------------------------------------------- tokens.css

function buildTokensCss() {
  const light = all.map(({ path, type, token }) => `  ${varName(path)}: ${cssValue(token.$value, type)};`)
  const dark = all
    .filter(({ token }) => token.$extensions?.['prisma.modes']?.dark)
    .map(({ path, token }) => `  ${varName(path)}: ${aliasVar(token.$extensions['prisma.modes'].dark)};`)
  return `/*
 * ARCHIVO GENERADO por scripts/build-tokens.mjs a partir de tokens/tokens.json.
 * No lo edites a mano: cambia tokens/tokens.json y ejecuta \`npm run tokens\`.
 *
 * Una variable CSS por token. Los semánticos y los de componente son alias
 * (var(...)) al nivel de abajo, igual que en tokens.json.
 *
 * Modo oscuro: se activa poniendo data-theme="dark" en un elemento (por ejemplo,
 * en <html>). Las variables se vuelven a declarar en cada [data-theme] para que
 * los alias se recalculen con los valores de ese modo.
 */

:root,
[data-theme] {
${light.join('\n')}
}

[data-theme='dark'] {
${dark.join('\n')}
}
`
}

// ---------------------------------------------------------------- nombres de clase

// Claves que Tailwind ya trae en su tema: ninguna clase nueva puede llamarse igual.
const tailwindTheme = readFileSync(join(ROOT, 'node_modules/tailwindcss/theme.css'), 'utf8')
const TAILWIND_KEYS = new Set(tailwindTheme.match(/--[a-z0-9-]+(?=:)/g))

const ELEMENTS = new Set(['background', 'text', 'icon', 'border', 'focus'])
const COLOR_UTILITY = { background: 'bg', text: 'text', icon: 'text', border: 'border', focus: 'outline' }
const SPACING_UTILITY = { 'padding-x': 'px', 'padding-y': 'py', padding: 'p', gap: 'gap', 'icon-gap': 'gap', 'margin-top': 'mt' }
const drop = (parts) => parts.filter((p) => p !== 'default' && p !== 'rest')

/**
 * Para cada token semántico y de componente, decide:
 *   theme  → la variable del bloque @theme que crea la clase (o null si es una utilidad propia).
 *   cls    → la clase principal de Tailwind.
 *   group  → si varios tokens forman una sola clase (los estilos de texto).
 */
function classFor({ path, type }) {
  const [layer, ...rest] = path
  if (layer === 'primitive') return null

  if (type === 'color') {
    const parts = layer === 'semantic' ? rest.slice(1) : rest // semantic.color.background… → background…
    const element = parts.find((p) => ELEMENTS.has(p))
    const key = drop(parts).join('-')
    return { theme: `--color-${key}`, cls: `${COLOR_UTILITY[element]}-${key}`, key }
  }

  const category = rest.find((p) => ['spacing', 'radius', 'border-width', 'font-size', 'line-height', 'font-weight', 'shadow'].includes(p))
  const before = rest.slice(0, rest.indexOf(category)) // componente y parte
  const after = rest.slice(rest.indexOf(category) + 1) // uso o talla

  if (category === 'spacing') {
    const key = layer === 'semantic' ? `space-${after.join('-')}` : drop([...before, ...after]).join('-')
    const utility = layer === 'semantic' ? 'p' : SPACING_UTILITY[after[0]] ?? 'p'
    return { theme: `--spacing-${key}`, cls: `${utility}-${key}`, key }
  }
  if (category === 'radius') {
    const key = layer === 'semantic' ? `radius-${after.join('-')}` : drop([...before, 'radius', ...after]).join('-')
    return { theme: `--radius-${key}`, cls: `rounded-${key}`, key }
  }
  if (category === 'shadow') {
    const key = drop([...before, ...after]).join('-')
    return { theme: `--shadow-${key}`, cls: `shadow-${key}`, key }
  }
  if (category === 'border-width') {
    const key = layer === 'semantic' ? after.join('-') : drop([...before, ...after]).join('-')
    return { theme: null, cls: `border-width-${key}`, key, utility: 'border-width' }
  }
  // Tipografía: tamaño, altura de línea y peso de una misma pieza forman una sola clase text-*.
  const size = after.join('-')
  const key = layer === 'semantic' ? size : drop([...before, size]).join('-')
  return { theme: `--text-${key}`, cls: `text-${key}`, key, category, typography: true }
}

const mapped = all
  .filter(({ path }) => path[0] !== 'primitive')
  .map((t) => ({ ...t, ...classFor(t) }))

// Estilos de texto: un bloque por pieza, con su tamaño, su altura de línea y su peso.
function typographyGroups() {
  const groups = new Map()
  for (const t of mapped.filter((m) => m.typography)) {
    const [layer, ...rest] = t.path
    const category = t.category
    const before = rest.slice(0, rest.indexOf(category))
    const after = rest.slice(rest.indexOf(category) + 1)
    if (category !== 'font-size') continue
    const key = t.key
    const find = (cat, sizeParts) => byPath.get([layer, ...before, cat, ...sizeParts].join('.'))
    const lineHeight = find('line-height', after)
    // El peso puede ser de la misma talla, de la pieza (default) o, en los componentes, del componente entero.
    const weight =
      find('font-weight', after) ??
      find('font-weight', ['default']) ??
      (layer === 'component' && before.length === 1 ? byPath.get([layer, before[0], 'font-weight', 'default'].join('.')) : undefined)
    groups.set(key, { size: t, lineHeight, weight })
  }
  return groups
}
const TYPO = typographyGroups()

// Las alturas de línea y los pesos usan la clase text-* de su pieza.
for (const m of mapped.filter((x) => x.typography && x.category !== 'font-size')) {
  for (const [key, g] of TYPO) {
    if (g.lineHeight === byPath.get(m.path.join('.')) || g.weight === byPath.get(m.path.join('.'))) {
      m.cls = m.cls === `text-${m.key}` ? `text-${key}` : `${m.cls}, text-${key}`
      m.shared = true
    }
  }
}

function checkCollisions() {
  const seen = new Map()
  for (const m of mapped) {
    if (m.theme && TAILWIND_KEYS.has(m.theme)) throw new Error(`${m.path.join('.')} crearía ${m.theme}, que ya existe en Tailwind`)
    const name = m.theme ?? m.cls
    if (!m.shared && seen.has(name) && seen.get(name) !== m.path.join('.'))
      throw new Error(`Dos tokens crean la misma clase (${name}): ${seen.get(name)} y ${m.path.join('.')}`)
    seen.set(name, m.path.join('.'))
  }
}
checkCollisions()

// ---------------------------------------------------------------- theme.css

function buildThemeCss() {
  const lines = []
  const section = (title) => lines.push('', `  /* ${title} */`)
  const value = (m) => `var(${varName(m.path)})`

  section('Colores semánticos → bg-*, text-*, border-*, outline-*')
  mapped.filter((m) => m.path[0] === 'semantic' && m.type === 'color').forEach((m) => lines.push(`  ${m.theme}: ${value(m)};`))
  section('Estilos de texto semánticos → text-display, text-heading, text-body…')
  for (const [key, g] of TYPO) {
    if (g.size.path[0] !== 'semantic') continue
    lines.push(`  --text-${key}: ${value(g.size)};`)
    if (g.lineHeight) lines.push(`  --text-${key}--line-height: var(${varName(g.lineHeight.path)});`)
    if (g.weight) lines.push(`  --text-${key}--font-weight: var(${varName(g.weight.path)});`)
  }
  section('Espaciado semántico → p-space-*, m-space-*, gap-space-*…')
  mapped.filter((m) => m.path[0] === 'semantic' && m.path[1] === 'spacing').forEach((m) => lines.push(`  ${m.theme}: ${value(m)};`))
  section('Radios semánticos → rounded-radius-*')
  mapped.filter((m) => m.path[0] === 'semantic' && m.path[1] === 'radius').forEach((m) => lines.push(`  ${m.theme}: ${value(m)};`))
  section('Sombras semánticas → shadow-elevation-*')
  mapped.filter((m) => m.path[0] === 'semantic' && m.path[1] === 'shadow').forEach((m) => lines.push(`  ${m.theme}: ${value(m)};`))

  for (const component of Object.keys(data.component).filter((k) => !k.startsWith('$'))) {
    const own = mapped.filter((m) => m.path[0] === 'component' && m.path[1] === component)
    section(`Componente: ${component}`)
    own.filter((m) => m.type === 'color').forEach((m) => lines.push(`  ${m.theme}: ${value(m)};`))
    for (const [key, g] of TYPO) {
      if (g.size.path[0] !== 'component' || g.size.path[1] !== component) continue
      lines.push(`  --text-${key}: ${value(g.size)};`)
      if (g.lineHeight) lines.push(`  --text-${key}--line-height: var(${varName(g.lineHeight.path)});`)
      if (g.weight) lines.push(`  --text-${key}--font-weight: var(${varName(g.weight.path)});`)
    }
    own.filter((m) => m.theme && !m.typography && m.type !== 'color').forEach((m) => lines.push(`  ${m.theme}: ${value(m)};`))
  }

  const utilities = mapped
    .filter((m) => m.utility === 'border-width')
    .flatMap((m) => [
      `@utility border-width-${m.key} {\n  border-width: var(${varName(m.path)});\n}`,
      `@utility outline-width-${m.key} {\n  outline-style: solid;\n  outline-width: var(${varName(m.path)});\n}`,
    ])

  return `/*
 * ARCHIVO GENERADO por scripts/build-tokens.mjs a partir de tokens/tokens.json.
 * No lo edites a mano: cambia tokens/tokens.json y ejecuta \`npm run tokens\`.
 *
 * Convierte los tokens semánticos y de componente en clases de Tailwind.
 * Cada clase apunta a la variable de su token (src/styles/tokens.css), así que
 * cambia sola con el modo oscuro. Las escalas que trae Tailwind no se tocan, y
 * ninguna clase nueva se llama igual que una de Tailwind.
 * La lista completa de token → clase está en docs/tokens.md.
 */

@theme inline {${lines.join('\n')}
}

/* Grosores de borde: Tailwind no tiene variables de tema para ellos, así que son utilidades propias. */
${utilities.join('\n\n')}
`
}

// ---------------------------------------------------------------- docs/tokens.md

function buildDocs() {
  const row = (m) => `| \`${m.path.join('.')}\` | \`${varName(m.path)}\` | ${m.cls.split(', ').map((c) => `\`${c}\``).join(', ')} |`
  const table = (items) => ['| Token | Variable CSS | Clase de Tailwind |', '|---|---|---|', ...items.map(row)].join('\n')
  const semantic = mapped.filter((m) => m.path[0] === 'semantic')
  const sections = [
    ['Colores', semantic.filter((m) => m.type === 'color')],
    ['Tipografía', semantic.filter((m) => m.typography)],
    ['Espaciado', semantic.filter((m) => m.path[1] === 'spacing')],
    ['Radios', semantic.filter((m) => m.path[1] === 'radius')],
    ['Grosores de borde', semantic.filter((m) => m.path[1] === 'border-width')],
    ['Sombras', semantic.filter((m) => m.path[1] === 'shadow')],
  ]
  const components = Object.keys(data.component).filter((k) => !k.startsWith('$'))
  return `# Tokens y clases de Tailwind

> **Archivo generado** por \`scripts/build-tokens.mjs\` a partir de \`tokens/tokens.json\`. No lo edites a mano: cambia \`tokens/tokens.json\` y ejecuta \`npm run tokens\`.

Esta tabla dice, para cada token semántico y de componente, qué **variable CSS** tiene (en \`src/styles/tokens.css\`) y con qué **clase de Tailwind** se usa (la crea \`src/styles/theme.css\`). Los tokens primitivos no tienen clase: los componentes nunca los usan directamente.

## Cómo se forman los nombres de las clases

La clase es **la utilidad de Tailwind + el nombre del token**, sin las partes \`default\` y \`rest\`, que son las normales:

| Tipo de token | Utilidad | Ejemplo |
|---|---|---|
| Color de fondo | \`bg-\` | \`semantic.color.background.primary.default.rest\` → \`bg-background-primary\` |
| Color de texto | \`text-\` | \`semantic.color.text.neutral.subtle.rest\` → \`text-text-neutral-subtle\` |
| Color de icono | \`text-\` (para el icono, \`[&_svg]:text-…\`) | \`semantic.color.icon.neutral.default.rest\` → \`text-icon-neutral\` |
| Color de borde | \`border-\` | \`semantic.color.border.neutral.strong.rest\` → \`border-border-neutral-strong\` |
| Color de foco | \`outline-\` | \`semantic.color.focus.primary.default.rest\` → \`outline-focus-primary\` |
| Estilo de texto (tamaño, altura de línea y peso juntos) | \`text-\` | \`semantic.font-size.heading\` → \`text-heading\` |
| Espaciado | \`p-\`, \`m-\`, \`gap-\`… | \`semantic.spacing.md\` → \`p-space-md\`, \`gap-space-md\`… |
| Radio | \`rounded-\` | \`semantic.radius.md\` → \`rounded-radius-md\` |
| Grosor de borde | \`border-width-\` y \`outline-width-\` | \`semantic.border-width.default\` → \`border-width-default\` |
| Sombra | \`shadow-\` | \`semantic.shadow.elevation.md\` → \`shadow-elevation-md\` |
| De componente | La misma utilidad, con el componente delante | \`component.button.background.primary.default.hover\` → \`bg-button-background-primary-hover\` |

Ninguna clase se llama igual que una de las que ya trae Tailwind, y las escalas de Tailwind (\`text-sm\`, \`p-4\`, \`rounded-lg\`…) no cambian.

**Modo oscuro:** las clases cambian solas cuando un elemento (por ejemplo, \`<html>\`) tiene \`data-theme="dark"\`.

## Semánticos

${sections.map(([title, items]) => `### ${title}\n\n${table(items)}`).join('\n\n')}

## De componente

${components.map((c) => `### ${c[0].toUpperCase()}${c.slice(1)}\n\n${table(mapped.filter((m) => m.path[0] === 'component' && m.path[1] === c))}`).join('\n\n')}
`
}

// ---------------------------------------------------------------- escribir o comprobar

const outputs = { [OUT.tokens]: buildTokensCss(), [OUT.theme]: buildThemeCss(), [OUT.docs]: buildDocs() }
let stale = 0
for (const [file, content] of Object.entries(outputs)) {
  const full = join(ROOT, file)
  const current = existsSync(full) ? readFileSync(full, 'utf8') : null
  if (CHECK) {
    if (current !== content) {
      stale++
      console.error(`✗ ${file} no está al día con ${SOURCE}.`)
    } else console.log(`✓ ${file} está al día.`)
  } else if (current !== content) {
    mkdirSync(dirname(full), { recursive: true })
    writeFileSync(full, content)
    console.log(`✓ ${file} generado.`)
  } else console.log(`✓ ${file} ya estaba al día.`)
}
if (CHECK && stale) {
  console.error(`\nEjecuta \`npm run tokens\` para volver a generarlos.`)
  process.exit(1)
}
console.log(`\n${mapped.length} tokens con clase de Tailwind.`)
