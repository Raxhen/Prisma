import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Button } from './Button'
import { expectFocusRing } from '../stories/teclado'
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

/**
 * Prueba de teclado: la etiqueta no es interactiva, así que Tab la salta y pasa
 * del botón de antes al de después.
 */
export const Teclado: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-space-md">
      <Button variant="secondary">Antes</Button>
      <Badge {...args}>Próxima</Badge>
      <Button variant="secondary">Después</Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.tab()
    await expect(canvas.getByRole('button', { name: 'Antes' })).toHaveFocus()
    await userEvent.tab()
    await expect(canvas.getByText('Próxima')).not.toHaveFocus()
    const after = canvas.getByRole('button', { name: 'Después' })
    await expect(after).toHaveFocus()
    await expectFocusRing(after)
  },
}
