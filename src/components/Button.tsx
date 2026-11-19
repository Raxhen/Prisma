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
  'inline-flex items-center justify-center gap-2 rounded-lg text-center font-medium transition-colors ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 ' +
  'disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-teal-700 text-white hover:bg-teal-800 active:bg-teal-900',
  secondary:
    'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 active:bg-gray-100',
  ghost: 'text-teal-800 hover:bg-teal-50 active:bg-teal-100',
  danger: 'bg-red-700 text-white hover:bg-red-800 active:bg-red-900',
}

const sizes: Record<ButtonSize, string> = {
  // Altura mínima (y no fija) para que un texto largo no se salga del botón.
  sm: 'min-h-9 px-3 py-1.5 text-sm [&_svg]:size-4',
  md: 'min-h-11 px-4 py-2 text-base [&_svg]:size-5',
  lg: 'min-h-12 px-6 py-2.5 text-lg [&_svg]:size-6',
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
