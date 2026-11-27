import type { HTMLAttributes, ReactNode } from 'react'

type CardVariant = 'outlined' | 'elevated' | 'filled'
type CardPadding = 'none' | 'sm' | 'md' | 'lg'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Aspecto de la tarjeta: con borde, con sombra o con fondo de color. */
  variant?: CardVariant
  /** Espacio interior de la tarjeta. */
  padding?: CardPadding
}

// Todas las clases de color, espaciado, radio, borde, tipografía y sombra salen de los
// tokens de componente de Card (tokens/tokens.json → component.card). La lista completa
// de token → clase está en docs/tokens.md.
const variants: Record<CardVariant, string> = {
  outlined: 'border-width-card border-card-border-outlined bg-card-background-outlined',
  elevated: 'bg-card-background-elevated shadow-card-elevated',
  filled: 'bg-card-background-filled',
}

const paddings: Record<CardPadding, string> = {
  none: 'p-card-padding-none',
  sm: 'p-card-padding-sm',
  md: 'p-card-padding-md',
  lg: 'p-card-padding-lg',
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
      className={`min-w-0 rounded-card-radius ${variants[variant]} ${paddings[padding]} ${className}`}
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
  /** Icono que aparece a la izquierda del título. Es decorativo: el lector de pantalla no lo lee. */
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
    // flex-wrap: si no hay sitio, la etiqueta de la derecha (action) baja a otra línea
    // en vez de montarse sobre el título.
    <div className={`flex flex-wrap items-start gap-card-header-gap ${className}`} {...rest}>
      {icon && (
        <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-card-header-icon-radius bg-card-header-icon-background-primary text-card-header-icon-icon-primary [&_svg]:size-5">
          {icon}
        </span>
      )}
      {/* basis-24: el texto necesita al menos 6rem; hyphens-auto y wrap-anywhere: las palabras
          largas se parten (con guion si se puede) en vez de salirse de la tarjeta. */}
      <div className="min-w-0 flex-1 basis-24 hyphens-auto">
        <h3 className="text-card-title wrap-anywhere text-card-title-text-neutral">
          {title}
        </h3>
        {description && (
          <p className="mt-space-2xs text-card-description wrap-anywhere text-card-description-text-neutral">
            {description}
          </p>
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
      className={`mt-card-footer-margin-top flex flex-wrap items-center justify-end gap-card-footer-gap ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
