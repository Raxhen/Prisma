import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Aspecto del botón. `primary` es la acción principal de la pantalla. */
  variant?: ButtonVariant
  /** Tamaño del botón. */
  size?: ButtonSize
  /** Icono que aparece antes del texto. Es decorativo: el lector de pantalla no lo lee. */
  iconLeft?: ReactNode
  /** Icono que aparece después del texto. Es decorativo: el lector de pantalla no lo lee. */
  iconRight?: ReactNode
  /** Ocupa todo el ancho disponible. */
  fullWidth?: boolean
}

/**
 * Nombre accesible (docs/accesibilidad.md, regla 3): un botón tiene texto visible o,
 * si es solo un icono, un `aria-label` que diga lo que hace. TypeScript da error si
 * falta los dos.
 */
export type ButtonProps = ButtonBaseProps &
  (
    | {
        /** Texto del botón. Es también su nombre para el lector de pantalla. */
        children: ReactNode
      }
    | {
        children?: never
        /** Obligatorio si el botón no tiene texto: dice lo que hace, como «Borrar nota». */
        'aria-label': string
      }
  )

// Todas las clases de color, espaciado, radio, borde y tipografía salen de los tokens
// de componente de Button (tokens/tokens.json → component.button). La lista completa
// de token → clase está en docs/tokens.md.
const base =
  'inline-flex items-center justify-center gap-button-gap rounded-button-radius border-width-button text-center transition-colors ' +
  // Anillo de foco doble (docs/accesibilidad.md, regla 2): solo al llegar con el teclado.
  'focus-visible:focus-ring-button-primary ' +
  'disabled:cursor-not-allowed'

const variants: Record<ButtonVariant, string> = {
  primary:
    'border-transparent bg-button-background-primary text-button-text-primary [&_svg]:text-button-icon-primary ' +
    'enabled:hover:bg-button-background-primary-hover enabled:active:bg-button-background-primary-active ' +
    'disabled:bg-button-background-primary-disabled disabled:text-button-text-primary-disabled disabled:[&_svg]:text-button-icon-primary-disabled',
  secondary:
    'border-button-border-secondary bg-button-background-secondary text-button-text-secondary [&_svg]:text-button-icon-secondary ' +
    'enabled:hover:bg-button-background-secondary-hover enabled:active:bg-button-background-secondary-active ' +
    'disabled:border-button-border-secondary-disabled disabled:bg-button-background-secondary-disabled disabled:text-button-text-secondary-disabled disabled:[&_svg]:text-button-icon-secondary-disabled',
  ghost:
    'border-transparent text-button-text-ghost [&_svg]:text-button-icon-ghost ' +
    'enabled:hover:bg-button-background-ghost-hover enabled:active:bg-button-background-ghost-active ' +
    'disabled:text-button-text-ghost-disabled disabled:[&_svg]:text-button-icon-ghost-disabled',
  danger:
    'border-transparent bg-button-background-danger text-button-text-danger [&_svg]:text-button-icon-danger ' +
    'enabled:hover:bg-button-background-danger-hover enabled:active:bg-button-background-danger-active ' +
    'disabled:bg-button-background-danger-disabled disabled:text-button-text-danger-disabled disabled:[&_svg]:text-button-icon-danger-disabled',
}

// El alto sale del relleno vertical, la altura de línea y el borde: 46, 50 y 62 px.
// Los iconos todavía no tienen tokens de tamaño.
const sizes: Record<ButtonSize, string> = {
  sm: 'px-button-padding-x-sm py-button-padding-y-sm text-button-sm [&_svg]:size-4',
  md: 'px-button-padding-x-md py-button-padding-y-md text-button-md [&_svg]:size-5',
  lg: 'px-button-padding-x-lg py-button-padding-y-lg text-button-lg [&_svg]:size-6',
}

const iconOnlySizes: Record<ButtonSize, string> = {
  sm: 'px-button-padding-y-sm',
  md: 'px-button-padding-y-md',
  lg: 'px-button-padding-y-lg',
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
  // Un botón con solo un icono es redondo: el relleno de los lados es igual que el de arriba.
  const iconOnly = children === undefined || children === null
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${iconOnly ? iconOnlySizes[size] : ''} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {/* Los iconos son decorativos: el nombre sale del texto o del aria-label. Si el botón
          solo tiene un icono, su caja es un cuadrado del alto de una línea de texto (h-lh), para que el botón
          mida lo mismo que uno con texto: nunca menos de 44 px. */}
      {iconLeft && (
        <span aria-hidden="true" className={iconOnly ? 'flex aspect-square h-lh items-center justify-center' : 'contents'}>
          {iconLeft}
        </span>
      )}
      {children}
      {iconRight && <span aria-hidden="true" className="contents">{iconRight}</span>}
    </button>
  )
}
