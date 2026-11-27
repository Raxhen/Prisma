import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { expectFocusRing } from '../stories/teclado'
import { IconCheck, IconPlus, IconTrash } from '@tabler/icons-react'
import { Button } from './Button'

/**
 * Botón con esquinas totalmente redondeadas. Sus colores, medidas y tipografía salen
 * de los tokens de componente `component.button` (ver Fundamentos → Tokens de
 * componente → Button), y el texto tiene al menos 4,5:1 de contraste con el fondo en
 * los dos modos.
 */
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

/** Un texto largo en un hueco estrecho: el botón crece en vez de cortar el texto. */
export const TextoLargo: Story = {
  args: { children: 'Marcar todas las tomas de hoy como hechas' },
  decorators: [
    (Story) => (
      <div className="w-56">
        <Story />
      </div>
    ),
  ],
}

export const Desactivado: Story = {
  args: { disabled: true },
}

/**
 * Prueba de teclado: recorre los botones con Tab, comprueba que se ve el anillo de
 * foco doble y que Enter y Espacio los pulsan. El desactivado se salta.
 */
export const Teclado: Story = {
  args: { onClick: fn() },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-space-md">
      <Button {...args} variant="primary">
        Primario
      </Button>
      <Button variant="secondary">Secundario</Button>
      <Button variant="ghost">Sutil</Button>
      <Button variant="danger" iconLeft={<IconTrash />}>
        Borrar nota
      </Button>
      <Button disabled>Desactivado</Button>
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    for (const name of ['Primario', 'Secundario', 'Sutil', 'Borrar nota']) {
      await userEvent.tab()
      const button = canvas.getByRole('button', { name })
      await expect(button).toHaveFocus()
      await expectFocusRing(button)
    }
    await userEvent.tab()
    await expect(canvas.getByRole('button', { name: 'Desactivado' })).not.toHaveFocus()

    canvas.getByRole('button', { name: 'Primario' }).focus()
    await userEvent.keyboard('{Enter}')
    await userEvent.keyboard(' ')
    await expect(args.onClick).toHaveBeenCalledTimes(2)
  },
}

/**
 * Botones con solo un icono. No tienen texto visible, así que llevan un `aria-label`
 * que dice lo que hacen: es lo que oye quien usa un lector de pantalla. Sin él,
 * TypeScript da error. La prueba comprueba el nombre de cada botón, que el icono
 * queda oculto al lector y que ninguno mide menos de 44 × 44 px.
 */
export const SoloIcono: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-space-md">
      <Button aria-label="Añadir cita" iconLeft={<IconPlus />} size="sm" />
      <Button aria-label="Marcar como tomada" variant="secondary" iconLeft={<IconCheck />} />
      <Button aria-label="Borrar nota" variant="danger" iconLeft={<IconTrash />} size="lg" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    for (const name of ['Añadir cita', 'Marcar como tomada', 'Borrar nota']) {
      const button = canvas.getByRole('button', { name })
      await expect(button.querySelector('svg')?.closest('[aria-hidden="true"]')).not.toBeNull()
      // Zona táctil mínima (ADR-001, P3), también sin texto.
      await expect(button.offsetWidth).toBeGreaterThanOrEqual(44)
      await expect(button.offsetHeight).toBeGreaterThanOrEqual(44)
    }
  },
}

