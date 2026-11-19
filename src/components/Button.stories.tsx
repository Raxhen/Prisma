import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconCheck, IconPlus, IconTrash } from '@tabler/icons-react'
import { Button } from './Button'

const meta = {
  title: 'Componentes/Button',
  component: Button,
  args: {
    children: 'Confirmar cita',
    variant: 'primary',
    size: 'md',
    disabled: false,
    fullWidth: false,
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    iconLeft: { control: false },
    iconRight: { control: false },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/** Botón que puedes cambiar desde el panel de controles. */
export const Playground: Story = {}

/** Los cuatro aspectos del botón. */
export const Variantes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} variant="primary">
        Primario
      </Button>
      <Button {...args} variant="secondary">
        Secundario
      </Button>
      <Button {...args} variant="ghost">
        Sutil
      </Button>
      <Button {...args} variant="danger" iconLeft={<IconTrash />}>
        Borrar nota
      </Button>
    </div>
  ),
}

/** Los tres tamaños. */
export const Tamaños: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="sm">
        Pequeño
      </Button>
      <Button {...args} size="md">
        Mediano
      </Button>
      <Button {...args} size="lg">
        Grande
      </Button>
    </div>
  ),
}

/** Con iconos de Tabler antes o después del texto. */
export const ConIconos: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} iconLeft={<IconPlus />}>
        Nueva cita
      </Button>
      <Button {...args} variant="secondary" iconRight={<IconCheck />}>
        Marcar como tomada
      </Button>
    </div>
  ),
}

export const Desactivado: Story = {
  args: { disabled: true },
}
