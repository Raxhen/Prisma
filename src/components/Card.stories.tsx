import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { expectFocusRing } from '../stories/teclado'
import { IconCalendarEvent, IconChartBar, IconPill } from '@tabler/icons-react'
import { Badge } from './Badge'
import { Button } from './Button'
import { Card, CardFooter, CardHeader } from './Card'

const meta = {
  title: 'Componentes/Card',
  component: Card,
  args: {
    variant: 'outlined',
    padding: 'md',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['outlined', 'elevated', 'filled'],
    },
    padding: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

const narrow: Story['decorators'] = [
  (Story) => (
    <div className="max-w-sm">
      <Story />
    </div>
  ),
]

/** Tarjeta de un medicamento, que puedes cambiar desde el panel de controles. */
export const Playground: Story = {
  decorators: narrow,
  render: (args) => (
    <Card {...args}>
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
  ),
}

/** Los tres aspectos de la tarjeta. */
export const Variantes: Story = {
  render: (args) => (
    <div className="grid max-w-3xl grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-6">
      <Card {...args} variant="outlined">
        <CardHeader icon={<IconPill />} title="Con borde" description="outlined" />
      </Card>
      <Card {...args} variant="elevated">
        <CardHeader
          icon={<IconCalendarEvent />}
          title="Con sombra"
          description="elevated"
        />
      </Card>
      <Card {...args} variant="filled">
        <CardHeader
          icon={<IconChartBar />}
          title="Con fondo"
          description="filled"
        />
      </Card>
    </div>
  ),
}

/** Una cita con dos acciones. */
export const Cita: Story = {
  args: { variant: 'elevated' },
  decorators: narrow,
  render: (args) => (
    <Card {...args}>
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
  ),
}

/**
 * Tarjetas en un hueco estrecho y con textos largos. Si no cabe, la etiqueta
 * baja a otra línea y las palabras largas se parten: nada se sale de la tarjeta.
 */
export const EspacioEstrecho: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="w-56">
        <Card {...args}>
          <CardHeader
            icon={<IconPill />}
            title="Ibuprofeno 600 mg"
            description="1 comprimido cada 8 horas"
            action={<Badge variant="success">Tomada</Badge>}
          />
          <CardFooter>
            <Button variant="secondary" size="sm">
              Cambiar
            </Button>
            <Button size="sm">Confirmar</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="w-64">
        <Card {...args} variant="elevated">
          <CardHeader
            icon={<IconCalendarEvent />}
            title="Otorrinolaringología pediátrica"
            description="Hospital Universitario Fundación Jiménez Díaz"
            action={<Badge variant="info">Próxima</Badge>}
          />
        </Card>
      </div>
    </div>
  ),
}

/**
 * Prueba de teclado: la tarjeta no es interactiva, así que Tab no se para en ella
 * ni en su etiqueta: va directo a los botones del pie, en orden, y se ve el foco.
 */
export const Teclado: Story = {
  args: { variant: 'elevated' },
  decorators: narrow,
  render: (args) => (
    <Card {...args}>
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
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    for (const name of ['Cambiar', 'Confirmar']) {
      await userEvent.tab()
      const button = canvas.getByRole('button', { name })
      await expect(button).toHaveFocus()
      await expectFocusRing(button)
    }
    await expect(canvas.getByText('Próxima')).not.toHaveFocus()
  },
}
