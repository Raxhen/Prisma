import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Texto que explica qué hay que escribir. Es obligatorio y siempre visible: es el nombre
   * del campo para el lector de pantalla (docs/accesibilidad.md, regla 3).
   */
  label: string
  /** Ayuda que aparece debajo del campo. */
  hint?: string
  /** Mensaje de error. Si existe, el campo se marca en rojo. */
  error?: string
  /** Icono que aparece dentro del campo, a la izquierda. Es decorativo: el lector de pantalla no lo lee. */
  icon?: ReactNode
  /** Tamaño del campo. */
  size?: InputSize
}

// Todas las clases de color, espaciado, radio, borde y tipografía salen de los tokens
// de componente de Input (tokens/tokens.json → component.input). La lista completa de
// token → clase está en docs/tokens.md.
// El alto sale del relleno vertical, la altura de línea y el borde: 46, 50 y 62 px.
const sizes: Record<InputSize, string> = {
  sm: 'py-input-padding-y-sm text-input-sm',
  md: 'py-input-padding-y-md text-input-md',
  lg: 'py-input-padding-y-lg text-input-lg',
}

export function Input({
  label,
  hint,
  error,
  icon,
  size = 'md',
  id,
  className = '',
  'aria-describedby': extraDescribedBy,
  ...rest
}: InputProps) {
  const autoId = useId()
  const inputId = id || autoId
  const hintId = `${inputId}-hint`
  const errorId = `${inputId}-error`
  const describedBy =
    [error ? errorId : null, hint ? hintId : null, extraDescribedBy]
      .filter(Boolean)
      .join(' ') || undefined

  return (
    <div className={`flex flex-col gap-input-gap ${className}`}>
      <label
        htmlFor={inputId}
        className="text-input-label text-input-label-text-neutral"
      >
        {label}
        {rest.required && (
          <span
            className="ml-space-2xs text-input-required-text-danger"
            aria-hidden="true"
          >
            *
          </span>
        )}
      </label>

      {/* La caja con borde envuelve el icono y el campo, uno al lado del otro. Cuando el
          campo tiene el foco, la caja muestra el anillo de foco doble. */}
      <div
        className={
          `flex items-center gap-input-icon-gap rounded-input-radius border-width-input bg-input-background-neutral px-input-padding-x ` +
          `has-disabled:cursor-not-allowed has-disabled:bg-input-background-neutral-disabled ` +
          (error
            ? 'border-input-border-danger focus-within:focus-ring-input-danger'
            : 'border-input-border-neutral focus-within:focus-ring-input-primary')
        }
      >
        {icon && (
          <span aria-hidden="true" className="pointer-events-none flex shrink-0 items-center text-input-icon-neutral [&_svg]:size-5">
            {icon}
          </span>
        )}
        <input
          {...rest}
          id={inputId}
          aria-invalid={error ? true : rest['aria-invalid']}
          aria-describedby={describedBy}
          className={
            `min-w-0 flex-1 bg-transparent text-input-text-neutral outline-none placeholder:text-input-placeholder-text-neutral ` +
            `disabled:cursor-not-allowed disabled:text-input-text-neutral-disabled ${sizes[size]}`
          }
        />
      </div>

      {error && (
        <p id={errorId} className="text-input-error text-input-error-text-danger">
          {error}
        </p>
      )}
      {hint && (
        <p id={hintId} className="text-input-hint text-input-hint-text-neutral">
          {hint}
        </p>
      )}
    </div>
  )
}
