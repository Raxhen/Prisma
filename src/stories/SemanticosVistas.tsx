// Piezas visuales de la página Fundamentos/Semánticos de Storybook.
// Solo pintan lo que reciben de tokens/tokens.json: resuelven cada alias hasta su
// primitivo y no guardan ningún valor propio.
import type { CSSProperties, ReactNode } from 'react'
import { IconHeartbeat } from '@tabler/icons-react'

type Dimension = { value: number; unit: string }
type Color = { colorSpace: string; components: number[]; alpha?: number; hex?: string }
type Node = { [key: string]: unknown }
type Token = {
  $value: unknown
  $description?: string
  $extensions?: { 'prisma.modes'?: { dark?: string } }
}
type Mode = 'claro' | 'oscuro'

/** Recorre un grupo y devuelve sus tokens con su ruta completa. */
function flatten(node: Node, prefix: string): [string, Token][] {
  return Object.entries(node).flatMap(([key, child]) => {
    if (key.startsWith('$') || typeof child !== 'object' || child === null) return []
    const path = `${prefix}.${key}`
    return '$value' in child ? [[path, child as Token]] : flatten(child as Node, path)
  })
}

/** Busca el token al que apunta un alias como {primitive.color.gray.50}. */
function lookup(root: Node, alias: string): Token {
  let node: unknown = root
  for (const part of alias.replace(/[{}]/g, '').split('.')) node = (node as Node)[part]
  return node as Token
}

function aliasOf(token: Token, mode: Mode) {
  return mode === 'oscuro'
    ? (token.$extensions?.['prisma.modes']?.dark ?? (token.$value as string))
    : (token.$value as string)
}

function colorOf(root: Node, token: Token, mode: Mode): Color {
  return lookup(root, aliasOf(token, mode)).$value as Color
}

const cssColor = (c: Color) => {
  const [a, b, h] = c.components
  return c.colorSpace === 'oklch'
    ? `oklch(${a} ${b} ${h} / ${c.alpha ?? 1})`
    : `rgb(${a * 255} ${b * 255} ${h * 255} / ${c.alpha ?? 1})`
}

function luminance(hex: string) {
  const channel = (i: number) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5)
}

function contrast(a: Color, b: Color) {
  const [x, y] = [luminance(a.hex ?? '#000000'), luminance(b.hex ?? '#000000')]
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

const css = (d: Dimension) => `${d.value}${d.unit}`
const short = (alias: string) => alias.replace(/[{}]/g, '').replace('primitive.', '')

function Name({ children }: { children: ReactNode }) {
  return <code className="text-xs font-semibold break-all text-gray-900">{children}</code>
}

function Small({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`block text-xs text-gray-600 ${className}`}>{children}</span>
}

function Section({ children }: { children: ReactNode }) {
  return <div className="sb-unstyled my-6 flex flex-col gap-3">{children}</div>
}

function Grid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(19rem,100%),1fr))] gap-3">{children}</div>
  )
}

/** Tarjeta de un token: nombre, descripción y, debajo, una muestra por modo. */
function TokenCard({
  path,
  token,
  children,
}: {
  path: string
  token: Token
  children: ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="p-3">
        <Name>{path}</Name>
        <Small className="mt-1">{token.$description}</Small>
      </div>
      <div className="grid grid-cols-2">{children}</div>
    </div>
  )
}

// ---------- Color ----------

/** Fondo sobre el que tiene sentido enseñar un texto, icono, borde o foco. */
function backgroundFor(path: string) {
  const [, , element, role, modifier] = path.split('.')
  if (element === 'text' || element === 'icon') {
    if (modifier === 'inverse')
      return role === 'neutral'
        ? 'semantic.color.background.neutral.inverse.rest'
        : `semantic.color.background.${role}.default.rest`
  }
  return 'semantic.color.background.neutral.default.rest'
}

const MINIMUM: Record<string, number> = { text: 4.5, icon: 3, border: 3, focus: 3 }

function ColorSample({ root, path, token, mode }: { root: Node; path: string; token: Token; mode: Mode }) {
  const element = path.split('.')[2]
  const color = colorOf(root, token, mode)
  const alias = aliasOf(token, mode)

  if (element === 'background') {
    const onDark = luminance(color.hex ?? '#ffffff') < 0.18
    return (
      <div className="p-3" style={{ background: cssColor(color) }}>
        <span className={`text-xs font-semibold ${onDark ? 'text-white' : 'text-gray-900'}`}>{mode}</span>
        <span className={`mt-6 block text-[11px] leading-tight ${onDark ? 'text-gray-200' : 'text-gray-700'}`}>
          → {short(alias)} · {color.hex}
        </span>
      </div>
    )
  }

  const bgPath = backgroundFor(path)
  const bg = colorOf(root, lookup(root, `{${bgPath}}`), mode)
  const ratio = contrast(color, bg)
  const disabled = path.includes('.disabled')
  // El borde neutro normal solo separa zonas: no tiene contraste mínimo.
  const decorative = path === 'semantic.color.border.neutral.default.rest'
  const minimum = path === 'semantic.color.text.neutral.strong.rest' ? 7 : MINIMUM[element]
  const ok = ratio >= minimum
  const sample: CSSProperties = { background: cssColor(bg) }
  const labelColor = luminance(bg.hex ?? '#ffffff') < 0.18 ? 'text-gray-300' : 'text-gray-600'

  return (
    <div className="p-3" style={sample}>
      <span className={`text-xs font-semibold ${labelColor}`}>{mode}</span>
      <div className="mt-2 flex h-10 items-center">
        {element === 'text' && (
          <span className="text-base font-medium" style={{ color: cssColor(color) }}>
            Ibuprofeno 600 mg
          </span>
        )}
        {element === 'icon' && <IconHeartbeat size={28} stroke={1.75} style={{ color: cssColor(color) }} />}
        {element === 'border' && (
          <span className="block h-8 w-full rounded-md" style={{ border: `2px solid ${cssColor(color)}` }} />
        )}
        {element === 'focus' && (
          <span
            className="block h-8 w-24 rounded-md bg-white"
            style={{ outline: `2px solid ${cssColor(color)}`, outlineOffset: 2 }}
          />
        )}
      </div>
      <span className={`mt-1 block text-[11px] leading-tight ${labelColor}`}>
        → {short(alias)} · {color.hex}
        <br />
        {`${ratio.toFixed(1).replace('.', ',')}:1 `}
        {disabled ? '· desactivado, sin mínimo' : decorative ? '· decorativo, sin mínimo' : `${ok ? '✅' : '❌'} mínimo ${minimum}:1`}
      </span>
    </div>
  )
}

export function Colores({ root, element }: { root: Node; element: string }) {
  const color = (root.semantic as Node).color as Node
  const tokens = flatten(color[element] as Node, `semantic.color.${element}`)
  return (
    <Section>
      <Grid>
        {tokens.map(([path, token]) => (
          <TokenCard key={path} path={path} token={token}>
            <ColorSample root={root} path={path} token={token} mode="claro" />
            <ColorSample root={root} path={path} token={token} mode="oscuro" />
          </TokenCard>
        ))}
      </Grid>
    </Section>
  )
}

// ---------- Tipografía ----------

export function Tipografia({ root }: { root: Node }) {
  const sem = root.semantic as Node
  const sizes = sem['font-size'] as Node
  const family = ((root.primitive as Node)['font-family'] as Node).sans as Token
  const styles = Object.keys(sizes).filter((k) => !k.startsWith('$'))
  return (
    <Section>
      {styles.map((style) => {
        const parts = (['font-size', 'line-height', 'font-weight'] as const).map((group) => {
          const token = (sem[group] as Node)[style] as Token
          return { group, alias: token.$value as string, value: lookup(root, token.$value as string).$value }
        })
        const [size, height, weight] = parts
        return (
          <div key={style} className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <Name>{style}</Name>
              <Small>{((sem['font-size'] as Node)[style] as Token).$description?.split(': ').slice(1).join(': ')}</Small>
            </div>
            <p
              className="mt-2 text-gray-900"
              style={{
                fontFamily: (family.$value as string[]).map((f) => `"${f}"`).join(', '),
                fontSize: css(size.value as Dimension),
                lineHeight: css(height.value as Dimension),
                fontWeight: weight.value as number,
              }}
            >
              Tu próxima revisión de la vista es el martes 24 a las 10:30.
            </p>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
              {parts.map((p) => (
                <Small key={p.group}>
                  semantic.{p.group}.{style} → {short(p.alias)} ·{' '}
                  {typeof p.value === 'number' ? p.value : css(p.value as Dimension)}
                </Small>
              ))}
            </div>
          </div>
        )
      })}
    </Section>
  )
}

// ---------- Medidas ----------

function dimensions(root: Node, group: string) {
  const node = (root.semantic as Node)[group] as Node
  return flatten(node, `semantic.${group}`).map(([path, token]) => ({
    path,
    token,
    alias: token.$value as string,
    value: lookup(root, token.$value as string).$value as Dimension,
  }))
}

function Label({ path, alias, value }: { path: string; alias: string; value: Dimension }) {
  return (
    <span className="block w-56 shrink-0">
      <Name>{path}</Name>
      <Small>
        → {short(alias)} · {css(value)}
      </Small>
    </span>
  )
}

export function Espaciado({ root }: { root: Node }) {
  return (
    <Section>
      {dimensions(root, 'spacing').map(({ path, token, alias, value }) => (
        <div key={path} className="flex items-center gap-4" title={token.$description}>
          <Label path={path} alias={alias} value={value} />
          <div className="h-4 rounded-sm bg-emerald-600" style={{ width: css(value), minWidth: 1 }} />
          <Small className="hidden md:block">{token.$description}</Small>
        </div>
      ))}
    </Section>
  )
}

export function Radios({ root }: { root: Node }) {
  return (
    <Section>
      <Grid>
        {dimensions(root, 'radius').map(({ path, token, alias, value }) => (
          <div key={path} className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-3">
            <div
              className="size-16 shrink-0 border-2 border-emerald-600 bg-emerald-50"
              style={{ borderRadius: value.value >= 9999 ? 9999 : css(value) }}
            />
            <div className="min-w-0">
              <Name>{path}</Name>
              <Small>
                → {short(alias)} · {css(value)}
              </Small>
              <Small className="mt-1">{token.$description}</Small>
            </div>
          </div>
        ))}
      </Grid>
    </Section>
  )
}

export function Bordes({ root }: { root: Node }) {
  const color = (path: string) => cssColor(colorOf(root, lookup(root, `{${path}}`), 'claro'))
  const line = color('semantic.color.text.neutral.default.rest')
  const focus = color('semantic.color.focus.primary.default.rest')
  const soft = color('semantic.color.border.neutral.default.rest')
  return (
    <Section>
      <Grid>
        {dimensions(root, 'border-width').map(({ path, token, alias, value }) => (
          <div key={path} className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-3">
            <div
              className="size-16 shrink-0 rounded-md bg-white"
              style={
                path.endsWith('focus')
                  ? { outline: `${css(value)} solid ${focus}`, outlineOffset: 2, border: `1px solid ${soft}` }
                  : { border: `${css(value)} solid ${line}` }
              }
            />
            <div className="min-w-0">
              <Name>{path}</Name>
              <Small>
                → {short(alias)} · {css(value)}
              </Small>
              <Small className="mt-1">{token.$description}</Small>
            </div>
          </div>
        ))}
      </Grid>
    </Section>
  )
}

export function Sombras({ root }: { root: Node }) {
  const node = ((root.semantic as Node).shadow as Node).elevation as Node
  return (
    <Section>
      <div className="flex flex-wrap gap-8 rounded-lg bg-gray-50 p-8">
        {flatten(node, 'semantic.shadow.elevation').map(([path, token]) => {
          const v = token.$value as Record<string, string>
          const d = (k: string) => css(lookup(root, v[k]).$value as Dimension)
          const shadow = `${d('offsetX')} ${d('offsetY')} ${d('blur')} ${d('spread')} ${cssColor(lookup(root, v.color).$value as Color)}`
          return (
            <div key={path} className="w-56">
              <div className="mb-4 h-24 rounded-xl bg-white" style={{ boxShadow: shadow }} />
              <Name>{path}</Name>
              <Small className="mt-1">{token.$description}</Small>
              {(['offsetY', 'blur', 'color'] as const).map((k) => (
                <Small key={k}>
                  {k}: → {short(v[k])}
                </Small>
              ))}
            </div>
          )
        })}
      </div>
    </Section>
  )
}

