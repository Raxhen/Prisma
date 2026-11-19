import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconAlertTriangle, IconCheck } from '@tabler/icons-react'
import { Badge } from './Badge'

const meta = {
  title: 'Componentes/Badge',
  component: Badge,
  args: {
    children: 'Próxima',
    variant: 'info',
    size: 'md',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['neutral', 'info', 'success', 'warning', 'danger'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    icon: { control: false },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

/** Etiqueta que puedes cambiar desde el panel de controles. */
export const Playground: Story = {}

/** Los cinco colores, según lo que significa la etiqueta. */
export const Variantes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge {...args} variant="neutral">
        Neutral
      </Badge>
      <Badge {...args} variant="info">
        Informativo
      </Badge>
      <Badge {...args} variant="success" icon={<IconCheck />}>
        Correcto
      </Badge>
      <Badge {...args} variant="warning" icon={<IconAlertTriangle />}>
        Aviso
      </Badge>
      <Badge {...args} variant="danger">
        Problema
      </Badge>
    </div>
  ),
}

/** Los dos tamaños. */
export const Tamaños: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge {...args} size="sm">
        Pequeño
      </Badge>
      <Badge {...args} size="md">
        Mediano
      </Badge>
    </div>
  ),
}
