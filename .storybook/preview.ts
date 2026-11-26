import type { Preview } from '@storybook/react-vite'
import '../src/index.css'

const preview: Preview = {
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
