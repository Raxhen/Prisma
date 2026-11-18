import type { ReactNode } from 'react'
import {
  IconCalendarEvent,
  IconChartBar,
  IconHeartbeat,
  IconMessageChatbot,
  IconMicrophone,
  IconNotes,
  IconPill,
  IconStethoscope,
} from '@tabler/icons-react'

// Todos los valores de esta página son los que trae Tailwind CSS v4 por
// defecto. Todavía no son los de Prisma.

const colors = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'mauve',
  'olive',
  'mist',
  'taupe',
]

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

// En Tailwind v4 cada paso de espaciado vale 0,25rem (4px): `4` = 1rem = 16px.
const spacing = [
  '0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7',
  '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40',
  '44', '48', '52', '56', '60', '64', '72', '80', '96',
]

function spacingValue(step: string) {
  if (step === 'px') return '1px'
  const rem = Number(step) * 0.25
  return `${rem}rem · ${rem * 16}px`
}

const radii = [
  { name: 'none', value: '0' },
  { name: 'xs', value: '0.125rem · 2px' },
  { name: 'sm', value: '0.25rem · 4px' },
  { name: 'md', value: '0.375rem · 6px' },
  { name: 'lg', value: '0.5rem · 8px' },
  { name: 'xl', value: '0.75rem · 12px' },
  { name: '2xl', value: '1rem · 16px' },
  { name: '3xl', value: '1.5rem · 24px' },
  { name: '4xl', value: '2rem · 32px' },
  { name: 'full', value: 'círculo' },
]

const textSizes = [
  { name: 'xs', value: '0.75rem · 12px' },
  { name: 'sm', value: '0.875rem · 14px' },
  { name: 'base', value: '1rem · 16px' },
  { name: 'lg', value: '1.125rem · 18px' },
  { name: 'xl', value: '1.25rem · 20px' },
  { name: '2xl', value: '1.5rem · 24px' },
  { name: '3xl', value: '1.875rem · 30px' },
  { name: '4xl', value: '2.25rem · 36px' },
  { name: '5xl', value: '3rem · 48px' },
  { name: '6xl', value: '3.75rem · 60px' },
  { name: '7xl', value: '4.5rem · 72px' },
  { name: '8xl', value: '6rem · 96px' },
  { name: '9xl', value: '8rem · 128px' },
]

const icons = [
  { name: 'IconPill', Icon: IconPill },
  { name: 'IconHeartbeat', Icon: IconHeartbeat },
  { name: 'IconStethoscope', Icon: IconStethoscope },
  { name: 'IconCalendarEvent', Icon: IconCalendarEvent },
  { name: 'IconMicrophone', Icon: IconMicrophone },
  { name: 'IconNotes', Icon: IconNotes },
  { name: 'IconMessageChatbot', Icon: IconMessageChatbot },
  { name: 'IconChartBar', Icon: IconChartBar },
]

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 text-2xl font-semibold text-gray-900">{title}</h2>
      {children}
    </section>
  )
}

function App() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 text-gray-700">
      <h1 className="text-4xl font-bold text-gray-900">Tailwind</h1>
      <p className="mt-2">
        Valores que trae Tailwind CSS v4 por defecto. Todavía no son los de
        Prisma.
      </p>

      <Section title="Paleta de color">
        <div className="overflow-x-auto">
          <div className="min-w-3xl space-y-2">
            <div className="flex items-end gap-2 text-xs text-gray-500">
              <span className="w-20 shrink-0" />
              {shades.map((shade) => (
                <span key={shade} className="flex-1 text-center">
                  {shade}
                </span>
              ))}
            </div>
            {colors.map((color) => (
              <div key={color} className="flex items-center gap-2">
                <span className="w-20 shrink-0 text-sm font-medium">
                  {color}
                </span>
                {shades.map((shade) => (
                  <div
                    key={shade}
                    title={`${color}-${shade}`}
                    className={`h-10 flex-1 rounded-md bg-${color}-${shade}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Espaciado">
        <div className="space-y-2">
          {spacing.map((step) => (
            <div key={step} className="flex items-center gap-4">
              <span className="w-10 shrink-0 text-right text-sm font-medium">
                {step}
              </span>
              <span className="w-32 shrink-0 text-xs text-gray-500">
                {spacingValue(step)}
              </span>
              <div className={`h-4 bg-sky-500 w-${step}`} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Radios">
        <div className="flex flex-wrap gap-6">
          {radii.map(({ name, value }) => (
            <div key={name} className="text-center">
              <div
                className={`size-20 border-2 border-sky-500 bg-sky-100 rounded-${name}`}
              />
              <p className="mt-2 text-sm font-medium">rounded-{name}</p>
              <p className="text-xs text-gray-500">{value}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tamaños de texto">
        <div className="space-y-4">
          {textSizes.map(({ name, value }) => (
            <div key={name} className="flex items-baseline gap-4">
              <span className="w-36 shrink-0 text-sm">
                <span className="font-medium">text-{name}</span>
                <span className="block text-xs text-gray-500">{value}</span>
              </span>
              <span className={`truncate text-gray-900 text-${name}`}>
                Tu salud, en un solo sitio
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Iconos (Tabler Icons)">
        <div className="overflow-x-auto">
          <div className="grid min-w-3xl grid-cols-8 gap-4">
            {icons.map(({ name, Icon }) => (
              <div key={name} className="text-center">
                <Icon size={32} stroke={1.5} className="mx-auto text-gray-900" />
                <p className="mt-2 text-xs">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </main>
  )
}

export default App
