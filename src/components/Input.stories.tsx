import type { Meta, StoryObj } from '@storybook/react-vite'
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
