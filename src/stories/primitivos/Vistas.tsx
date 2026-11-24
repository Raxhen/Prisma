// Piezas visuales de la página Fundamentos/Primitivos de Storybook.
// Solo pintan lo que reciben de tokens/tokens.json: no guardan ningún valor propio.
import type { CSSProperties, ReactNode } from 'react'

type Dimension = { value: number; unit: string }
type Color = { colorSpace: string; components: number[]; alpha?: number; hex?: string }
type Token<T> = { $value: T; $description?: string }
type Group<T> = Record<string, Token<T> | string | undefined>

/** Devuelve solo los tokens de un grupo, sin $type ni $description. */
function entries<T>(group: Group<T>): [string, Token<T>][] {
  return Object.entries(group).filter(
    (entry): entry is [string, Token<T>] =>
      !entry[0].startsWith('$') && typeof entry[1] === 'object',
  )
}

/** Ordena de menor a mayor. Hace falta porque JavaScript pone las claves numéricas
 * (100, 150…) antes que las demás (050), y 050 acabaría al final. */
function byValue(group: Group<Dimension>): [string, Token<Dimension>][] {
  return entries(group).sort((a, b) => a[1].$value.value - b[1].$value.value)
}

const css = (d: Dimension) => `${d.value}${d.unit}`

function cssColor(c: Color) {
  const [a, b, h] = c.components
  const alpha = c.alpha ?? 1
  if (c.colorSpace === 'oklch') return `oklch(${a} ${b} ${h} / ${alpha})`
  return `rgb(${a * 255} ${b * 255} ${h * 255} / ${alpha})`
}

function colorLabel(c: Color) {
  const [a, b, h] = c.components
  if (c.colorSpace === 'oklch') return `oklch(${(a * 100).toFixed(1)}% ${b} ${h})`
  return `${c.hex ?? ''} · ${Math.round((c.alpha ?? 1) * 100)} %`
}

function Name({ children }: { children: ReactNode }) {
  return <code className="text-xs font-semibold text-gray-900">{children}</code>
}

function Value({ children }: { children: ReactNode }) {
  return <span className="block text-xs text-gray-600">{children}</span>
}

function Section({ children }: { children: ReactNode }) {
  return <div className="sb-unstyled my-6 flex flex-col gap-3">{children}</div>
}

export function Colores({ grupo }: { grupo: Record<string, unknown> }) {
  const familias = Object.entries(grupo).filter(([k]) => !k.startsWith('$')) as [
    string,
    Group<Color>,
  ][]
  return (
    <Section>
      {familias.map(([familia, tonos]) => (
        <div key={familia}>
          <p className="mb-2 text-sm font-semibold text-gray-900">
            color.{familia}
            {typeof tonos.$description === 'string' && (
              <span className="ml-2 font-normal text-gray-600">{tonos.$description}</span>
            )}
          </p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-2">
            {entries(tonos).map(([tono, t]) => (
              <div key={tono} className="overflow-hidden rounded-lg border border-gray-200">
                <div className="h-14" style={{ background: cssColor(t.$value) }} />
                <div className="p-2">
                  <Name>
                    {familia}.{tono}
                  </Name>
                  <Value>{t.$value.hex}</Value>
                  <Value>{colorLabel(t.$value)}</Value>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Section>
  )
}

export function Barras({
  grupo,
  prefijo,
  escala = 1,
}: {
  grupo: Group<Dimension>
  prefijo: string
  escala?: number
}) {
  return (
    <Section>
      {byValue(grupo).map(([nombre, t]) => (
        <div key={nombre} className="flex items-center gap-4">
          <span className="w-40 shrink-0">
            <Name>
              {prefijo}.{nombre}
            </Name>
            <Value>{css(t.$value)}</Value>
          </span>
          <div
            className="h-4 rounded-sm bg-blue-500"
            style={{ width: `calc(${css(t.$value)} * ${escala})`, minWidth: 1 }}
          />
        </div>
      ))}
    </Section>
  )
}

export function Radios({ grupo }: { grupo: Group<Dimension> }) {
  return (
    <Section>
      <div className="flex flex-wrap gap-6">
        {byValue(grupo).map(([nombre, t]) => (
          <div key={nombre} className="w-24 text-center">
            <div
              className="mx-auto size-20 border-2 border-blue-500 bg-blue-50"
              style={{ borderRadius: css(t.$value) }}
            />
            <div className="mt-2">
              <Name>radius.{nombre}</Name>
              <Value>{css(t.$value)}</Value>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export function Bordes({ grupo }: { grupo: Group<Dimension> }) {
  return (
    <Section>
      <div className="flex flex-wrap gap-6">
        {byValue(grupo).map(([nombre, t]) => (
          <div key={nombre} className="w-32 text-center">
            <div
              className="mx-auto size-20 rounded-md bg-white"
              style={{ border: `${css(t.$value)} solid #111827` }}
            />
            <div className="mt-2">
              <Name>border-width.{nombre}</Name>
              <Value>{css(t.$value)}</Value>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

const MUESTRA = 'Ibuprofeno 600 mg · 1 comprimido cada 8 horas'

export function Familias({ grupo }: { grupo: Group<string[]> }) {
  return (
    <Section>
      {entries(grupo).map(([nombre, t]) => (
        <div key={nombre} className="rounded-lg border border-gray-200 p-4">
          <Name>font-family.{nombre}</Name>
          <p className="mt-2 text-2xl text-gray-900" style={{ fontFamily: t.$value.map((f) => `"${f}"`).join(', ') }}>
            {MUESTRA} · Il1 O0
          </p>
          <Value>{t.$value.join(', ')}</Value>
        </div>
      ))}
    </Section>
  )
}

export function TamanosTexto({ grupo }: { grupo: Group<Dimension> }) {
  return (
    <Section>
      {entries(grupo).map(([nombre, t]) => (
        <div key={nombre} className="flex items-baseline gap-4">
          <span className="w-32 shrink-0">
            <Name>font-size.{nombre}</Name>
            <Value>{css(t.$value)}</Value>
          </span>
          <span className="truncate text-gray-900" style={{ fontSize: css(t.$value), lineHeight: 1.2 }}>
            {MUESTRA}
          </span>
        </div>
      ))}
    </Section>
  )
}

export function Pesos({ grupo }: { grupo: Group<number> }) {
  return (
    <Section>
      {entries(grupo).map(([nombre, t]) => (
        <div key={nombre} className="flex items-baseline gap-4">
          <span className="w-32 shrink-0">
            <Name>font-weight.{nombre}</Name>
            <Value>{t.$value}</Value>
          </span>
          <span className="text-xl text-gray-900" style={{ fontWeight: t.$value }}>
            {MUESTRA}
          </span>
        </div>
      ))}
    </Section>
  )
}

export function Interlineados({ grupo }: { grupo: Group<Dimension> }) {
  const lineas: CSSProperties = {
    backgroundImage: 'linear-gradient(to bottom, transparent calc(100% - 1px), #93c5fd 1px)',
  }
  return (
    <Section>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-4">
        {byValue(grupo).map(([nombre, t]) => (
          <div key={nombre}>
            <Name>line-height.{nombre}</Name>
            <Value>{css(t.$value)}</Value>
            <p
              className="mt-2 max-w-56 text-base text-gray-900"
              style={{ lineHeight: css(t.$value), ...lineas, backgroundSize: `100% ${css(t.$value)}` }}
            >
              Toma una pastilla por la mañana y otra por la noche, siempre con comida.
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}

type Piezas = {
  offset: Group<Dimension>
  blur: Group<Dimension>
  color: Group<Color>
}

function Caja({ sombra, children }: { sombra: string; children: ReactNode }) {
  return (
    <div className="w-36 text-center">
      <div className="mx-auto mb-3 size-20 rounded-lg bg-white" style={{ boxShadow: sombra }} />
      {children}
    </div>
  )
}

export function Sombras({ grupo }: { grupo: Piezas }) {
  const color10 = cssColor((grupo.color['10'] as Token<Color>).$value)
  const blur800 = css((grupo.blur['800'] as Token<Dimension>).$value)
  const offset400 = css((grupo.offset['400'] as Token<Dimension>).$value)
  return (
    <Section>
      <p className="text-sm text-gray-600">
        Cada muestra cambia solo una pieza. Las demás quedan fijas: offset.400, blur.800 y color.10.
      </p>
      <p className="text-sm font-semibold text-gray-900">shadow.offset (desplazamiento hacia abajo)</p>
      <div className="flex flex-wrap gap-4 rounded-lg bg-gray-50 p-6">
        {byValue(grupo.offset).map(([n, t]) => (
          <Caja key={n} sombra={`0 ${css(t.$value)} ${blur800} ${color10}`}>
            <Name>shadow.offset.{n}</Name>
            <Value>{css(t.$value)}</Value>
          </Caja>
        ))}
      </div>
      <p className="text-sm font-semibold text-gray-900">shadow.blur (difuminado)</p>
      <div className="flex flex-wrap gap-4 rounded-lg bg-gray-50 p-6">
        {byValue(grupo.blur).map(([n, t]) => (
          <Caja key={n} sombra={`0 ${offset400} ${css(t.$value)} ${color10}`}>
            <Name>shadow.blur.{n}</Name>
            <Value>{css(t.$value)}</Value>
          </Caja>
        ))}
      </div>
      <p className="text-sm font-semibold text-gray-900">shadow.color (negro con transparencia)</p>
      <div className="flex flex-wrap gap-4 rounded-lg bg-gray-50 p-6">
        {entries(grupo.color).map(([n, t]) => (
          <Caja key={n} sombra={`0 ${offset400} ${blur800} ${cssColor(t.$value)}`}>
            <Name>shadow.color.{n}</Name>
            <Value>{colorLabel(t.$value)}</Value>
          </Caja>
        ))}
      </div>
    </Section>
  )
}

export function Breakpoints({ grupo }: { grupo: Group<Dimension> }) {
  const lista = byValue(grupo)
  const max = Math.max(...lista.map(([, t]) => t.$value.value))
  return (
    <Section>
      {lista.map(([nombre, t]) => (
        <div key={nombre} className="flex items-center gap-4">
          <span className="w-40 shrink-0">
            <Name>breakpoint.{nombre}</Name>
            <Value>desde {css(t.$value)}</Value>
          </span>
          <div className="min-w-0 flex-1">
            <div
              className="flex h-6 justify-end rounded-sm bg-blue-100"
              style={{ width: `${(t.$value.value / max) * 100}%` }}
            >
              <div className="h-full w-1 rounded-sm bg-blue-500" />
            </div>
          </div>
        </div>
      ))}
    </Section>
  )
}
