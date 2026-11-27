import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { expectFocusRing } from '../stories/teclado'
import { IconMail, IconSearch } from '@tabler/icons-react'
import { Input } from './Input'

const meta = {
  title: 'Componentes/Input',
  component: Input,
  args: {
    label: 'Nombre',
    placeholder: 'Escribe tu nombre',
    size: 'md',
    disabled: false,
    required: false,
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    icon: { control: false },
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

/** Campo que puedes cambiar desde el panel de controles. */
export const Playground: Story = {}

export const ConAyuda: Story = {
  args: {
    label: 'Correo electrónico',
    type: 'email',
    placeholder: 'nombre@correo.com',
    hint: 'Te enviaremos los recordatorios aquí.',
    icon: <IconMail />,
    required: true,
  },
}

export const ConError: Story = {
  args: {
    label: 'Fecha de nacimiento',
    defaultValue: '31/02/1990',
    error: 'Esta fecha no existe. Revisa el día y el mes.',
  },
}

/** Los tres tamaños. */
export const Tamaños: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Input {...args} size="sm" label="Pequeño" />
      <Input {...args} size="md" label="Mediano" />
      <Input {...args} size="lg" label="Grande" icon={<IconSearch />} />
    </div>
  ),
}

export const Desactivado: Story = {
  args: {
    label: 'Número de paciente',
    defaultValue: 'FH-00231',
    disabled: true,
  },
}

/**
 * Prueba de teclado: recorre los campos con Tab, comprueba que se ve el anillo de
 * foco doble en la caja del campo y que se puede escribir. El desactivado se salta.
 */
export const Teclado: Story = {
  render: () => (
    <div className="flex flex-col gap-space-lg">
      <Input label="Nombre" />
      <Input label="Fecha de nacimiento" error="Esta fecha no existe." />
      <Input label="Número de paciente" defaultValue="FH-00231" disabled />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    for (const name of ['Nombre', 'Fecha de nacimiento']) {
      await userEvent.tab()
      const field = canvas.getByRole('textbox', { name })
      await expect(field).toHaveFocus()
      // El anillo se pinta en la caja que envuelve el campo y su icono.
      await expectFocusRing(field.parentElement!)
    }
    await userEvent.keyboard('31/12/1990')
    await expect(canvas.getByRole('textbox', { name: 'Fecha de nacimiento' })).toHaveValue('31/12/1990')
    await userEvent.tab()
    await expect(canvas.getByRole('textbox', { name: 'Número de paciente' })).not.toHaveFocus()
  },
}
