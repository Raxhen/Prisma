import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Aspecto del botón. `primary` es la acción principal de la pantalla. */
  variant?: ButtonVariant
  /** Tamaño del botón. */
  size?: ButtonSize
  /** Icono que aparece antes del texto. */
  iconLeft?: ReactNode
  /** Icono que aparece después del texto. */
  iconRight?: ReactNode
  /** Ocupa todo el ancho disponible. */
  fullWidth?: boolean
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full text-center font-medium transition-colors ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ' +
  'disabled:cursor-not-allowed disabled:opacity-50'

// Colores elegidos para que el texto tenga al menos 4,5:1 de contraste (WCAG AA):
// blanco sobre emerald-700 = 5,4:1 · blanco sobre red-600 = 4,8:1.
const variants: Record<ButtonVariant, string> = {
  primary: 'bg-emerald-700 text-white hover:bg-emerald-800 active:bg-emerald-900',
  secondary:
    'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 active:bg-gray-100',
  ghost: 'text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
}

const sizes: Record<ButtonSize, string> = {
  // Altura mínima (y no fija) para que un texto largo no se salga del botón.
  sm: 'min-h-9 px-4 py-1.5 text-sm [&_svg]:size-4',
  md: 'min-h-11 px-5 py-2 text-base [&_svg]:size-5',
  lg: 'min-h-12 px-7 py-2.5 text-lg [&_svg]:size-6',
}

export function Button({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth = false,
  type = 'button',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  )
}
