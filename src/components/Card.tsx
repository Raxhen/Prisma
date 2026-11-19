import type { HTMLAttributes, ReactNode } from 'react'

type CardVariant = 'outlined' | 'elevated' | 'filled'
type CardPadding = 'none' | 'sm' | 'md' | 'lg'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Aspecto de la tarjeta: con borde, con sombra o con fondo de color. */
  variant?: CardVariant
  /** Espacio interior de la tarjeta. */
  padding?: CardPadding
}

const variants: Record<CardVariant, string> = {
  outlined: 'border border-gray-200 bg-white',
  elevated: 'bg-white shadow-md',
  filled: 'bg-teal-50',
}

const paddings: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({
  variant = 'outlined',
  padding = 'md',
  className = '',
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={`rounded-2xl ${variants[variant]} ${paddings[padding]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}

export interface CardHeaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Título de la tarjeta. */
  title: ReactNode
  /** Texto corto debajo del título. */
  description?: ReactNode
  /** Icono que aparece a la izquierda del título. */
  icon?: ReactNode
  /** Contenido a la derecha del título, por ejemplo un Badge. */
  action?: ReactNode
}

export function CardHeader({
  title,
  description,
  icon,
  action,
  className = '',
  ...rest
}: CardHeaderProps) {
  return (
    <div className={`flex items-start gap-3 ${className}`} {...rest}>
      {icon && (
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-800 [&_svg]:size-5">
          {icon}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="mt-0.5 text-sm text-gray-600">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export function CardFooter({
  className = '',
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mt-6 flex flex-wrap items-center justify-end gap-3 ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
