import type { HTMLAttributes, ReactNode } from 'react'

type BadgeVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger'
type BadgeSize = 'sm' | 'md'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Color según el significado: informativo, correcto, aviso o problema. */
  variant?: BadgeVariant
  /** Tamaño de la etiqueta. */
  size?: BadgeSize
  /** Icono que aparece antes del texto. */
  icon?: ReactNode
}

const variants: Record<BadgeVariant, string> = {
  neutral: 'bg-gray-100 text-gray-800 ring-gray-300',
  info: 'bg-sky-50 text-sky-800 ring-sky-300',
  success: 'bg-emerald-50 text-emerald-800 ring-emerald-300',
  warning: 'bg-amber-50 text-amber-900 ring-amber-300',
  danger: 'bg-red-50 text-red-800 ring-red-300',
}

const sizes: Record<BadgeSize, string> = {
  sm: 'h-6 px-2 text-xs [&_svg]:size-3.5',
  md: 'h-7 px-2.5 text-sm [&_svg]:size-4',
}

export function Badge({
  variant = 'neutral',
  size = 'md',
  icon,
  className = '',
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium whitespace-nowrap ring-1 ring-inset ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </span>
  )
}
