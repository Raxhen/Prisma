import type { Decorator, Preview } from '@storybook/react-vite'
import '../src/index.css'

/**
 * Modo claro u oscuro (ADR-001, P4). Cada historia se pinta dentro de una caja con
 * data-theme: los tokens de src/styles/tokens.css cambian solos de valor, así que los
 * componentes no necesitan saber en qué modo están. El fondo y el color de texto de
 * la caja son tokens semánticos.
 */
const withMode: Decorator = (Story, context) => {
  const mode = context.globals.mode === 'dark' ? 'dark' : 'light'
  if (context.viewMode === 'story') {
    // En la vista de una sola historia, todo el lienzo cambia de modo.
    document.documentElement.dataset.theme = mode
    document.body.classList.add('bg-background-neutral')
  }
  return (
    <div
      data-theme={mode}
      className="bg-background-neutral p-space-lg text-text-neutral rounded-radius-md"
    >
      <Story />
    </div>
  )
}

const preview: Preview = {
  globalTypes: {
    mode: {
      description: 'Modo claro u oscuro',
      toolbar: {
        title: 'Modo',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Claro', icon: 'sun' },
          { value: 'dark', title: 'Oscuro', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { mode: 'light' },
  decorators: [withMode],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      // Orden del menú de la izquierda
      storySort: {
        order: [
          'Status',
          'Fundamentos',
          [
            'Primitivos',
            [
              'Introducción',
              'Color',
              'Espaciado',
              'Radios',
              'Tipografía',
              'Bordes',
              'Sombras',
              'Breakpoints',
            ],
            'Semánticos',
            ['Introducción', 'Color', 'Tipografía', 'Espaciado', 'Radios', 'Bordes', 'Sombras'],
            'Tokens de componente',
            ['Introducción', 'Button', 'Input', 'Card', 'Badge'],
          ],
          'Componentes',
        ],
      },
    },
    a11y: {
      // Muestra los problemas de accesibilidad en la pestaña "Accessibility"
      test: 'todo',
    },
  },
  tags: ['autodocs'],
}

export default preview
