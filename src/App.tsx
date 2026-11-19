import type { ReactNode } from 'react'
import {
  IconAlertTriangle,
  IconCalendarEvent,
  IconCheck,
  IconMail,
  IconPlus,
  IconSearch,
  IconChartBar,
  IconHeartbeat,
  IconMessageChatbot,
  IconMicrophone,
  IconNotes,
  IconPill,
  IconStethoscope,
} from '@tabler/icons-react'
import { Badge, Button, Card, CardFooter, CardHeader, Input } from './components'

// Los valores de las secciones de Tailwind son los que trae Tailwind CSS v4
// por defecto. Todavía no son los de Prisma.

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
      <h1 className="text-4xl font-bold text-gray-900">Prisma</h1>
      <p className="mt-2">
        Primeros componentes de Prisma y, debajo, los valores que trae Tailwind
        CSS v4 por defecto.
      </p>

      <Section title="Button">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primario</Button>
            <Button variant="secondary">Secundario</Button>
            <Button variant="ghost">Sutil</Button>
            <Button variant="danger">Peligro</Button>
            <Button disabled>Desactivado</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Pequeño</Button>
            <Button size="md">Mediano</Button>
            <Button size="lg">Grande</Button>
            <Button iconLeft={<IconPlus />}>Nueva cita</Button>
            <Button variant="secondary" iconRight={<IconCheck />}>
              Marcar como tomada
            </Button>
          </div>
        </div>
      </Section>

      <Section title="Input">
        <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
          <Input label="Nombre" placeholder="Escribe tu nombre" />
          <Input
            label="Correo electrónico"
            type="email"
            icon={<IconMail />}
            placeholder="nombre@correo.com"
            hint="Te enviaremos los recordatorios aquí."
            required
          />
          <Input
            label="Buscar medicamento"
            icon={<IconSearch />}
            placeholder="Paracetamol…"
            size="lg"
          />
          <Input
            label="Fecha de nacimiento"
            defaultValue="31/02/1990"
            error="Esta fecha no existe. Revisa el día y el mes."
          />
          <Input label="Número de paciente" defaultValue="FH-00231" disabled />
        </div>
      </Section>

      <Section title="Card">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader
              icon={<IconPill />}
              title="Ibuprofeno 600 mg"
              description="1 comprimido cada 8 horas"
              action={<Badge variant="success">Tomada</Badge>}
            />
            <CardFooter>
              <Button variant="ghost" size="sm">
                Ver receta
              </Button>
            </CardFooter>
          </Card>
          <Card variant="elevated">
            <CardHeader
              icon={<IconCalendarEvent />}
              title="Revisión del dentista"
              description="Martes 24, 10:30"
              action={<Badge variant="info">Próxima</Badge>}
            />
            <CardFooter>
              <Button variant="secondary" size="sm">
                Cambiar
              </Button>
              <Button size="sm">Confirmar</Button>
            </CardFooter>
          </Card>
          <Card variant="filled">
            <CardHeader
              icon={<IconChartBar />}
              title="Objetivos del año"
              description="2 de 3 revisiones hechas"
            />
          </Card>
        </div>
      </Section>

      <Section title="Badge">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Neutral</Badge>
          <Badge variant="info">Informativo</Badge>
          <Badge variant="success" icon={<IconCheck />}>
            Correcto
          </Badge>
          <Badge variant="warning" icon={<IconAlertTriangle />}>
            Aviso
          </Badge>
          <Badge variant="danger">Problema</Badge>
          <Badge variant="success" size="sm">
            Pequeño
          </Badge>
        </div>
      </Section>

      <Section title="Paleta de color (Tailwind)">
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

      <Section title="Espaciado (Tailwind)">
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

      <Section title="Radios (Tailwind)">
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

      <Section title="Tamaños de texto (Tailwind)">
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
