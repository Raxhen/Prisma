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
    a11y: {
      // Muestra los problemas de accesibilidad en la pestaña "Accessibility"
      test: 'todo',
    },
  },
  tags: ['autodocs'],
}

export default preview
