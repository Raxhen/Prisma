import type { Meta, StoryObj } from '@storybook/react-vite'
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
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

/** Tarjeta de un medicamento, que puedes cambiar desde el panel de controles. */
export const Playground: Story = {
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
  decorators: [
    (Story) => (
      <div className="w-3xl max-w-full">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <div className="grid gap-6 md:grid-cols-3">
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
