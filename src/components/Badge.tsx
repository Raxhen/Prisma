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

// Todas las clases de color, espaciado, radio, borde y tipografía salen de los tokens
// de componente de Badge (tokens/tokens.json → component.badge). La lista completa de
// token → clase está en docs/tokens.md.
const variants: Record<BadgeVariant, string> = {
  neutral: 'border-badge-border-neutral bg-badge-background-neutral text-badge-text-neutral [&_svg]:text-badge-icon-neutral',
  info: 'border-badge-border-info bg-badge-background-info text-badge-text-info [&_svg]:text-badge-icon-info',
  success: 'border-badge-border-success bg-badge-background-success text-badge-text-success [&_svg]:text-badge-icon-success',
  warning: 'border-badge-border-warning bg-badge-background-warning text-badge-text-warning [&_svg]:text-badge-icon-warning',
  danger: 'border-badge-border-danger bg-badge-background-danger text-badge-text-danger [&_svg]:text-badge-icon-danger',
}

// Los iconos todavía no tienen tokens de tamaño.
const sizes: Record<BadgeSize, string> = {
  sm: 'px-badge-padding-x-sm py-badge-padding-y-sm text-badge-sm [&_svg]:size-3.5',
  md: 'px-badge-padding-x-md py-badge-padding-y-md text-badge-md [&_svg]:size-4',
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
      className={`inline-flex items-center gap-badge-gap rounded-badge-radius border-width-badge whitespace-nowrap ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </span>
  )
}
