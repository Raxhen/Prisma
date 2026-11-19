import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Texto que explica qué hay que escribir. Siempre visible. */
  label: string
  /** Ayuda que aparece debajo del campo. */
  hint?: string
  /** Mensaje de error. Si existe, el campo se marca en rojo. */
  error?: string
  /** Icono que aparece dentro del campo, a la izquierda. */
  icon?: ReactNode
  /** Tamaño del campo. */
  size?: InputSize
}

const sizes: Record<InputSize, string> = {
  sm: 'h-8 text-sm',
  md: 'h-10 text-base',
  lg: 'h-12 text-lg',
}

export function Input({
  label,
  hint,
  error,
  icon,
  size = 'md',
  id,
  className = '',
  ...rest
}: InputProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const hintId = `${inputId}-hint`
  const errorId = `${inputId}-error`
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') ||
    undefined

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={inputId} className="text-sm font-medium text-gray-900">
        {label}
        {rest.required && (
          <span className="ml-0.5 text-red-700" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500 [&_svg]:size-5">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={
            `w-full rounded-lg border bg-white px-3 text-gray-900 placeholder:text-gray-400 ` +
            `focus:outline-2 focus:outline-offset-0 ` +
            `disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 ` +
            `${sizes[size]} ${icon ? 'pl-10' : ''} ` +
            (error
              ? 'border-red-600 focus:outline-red-600'
              : 'border-gray-300 focus:border-teal-600 focus:outline-teal-600')
          }
          {...rest}
        />
      </div>

      {error && (
        <p id={errorId} className="text-sm text-red-700">
          {error}
        </p>
      )}
      {hint && (
        <p id={hintId} className="text-sm text-gray-600">
          {hint}
        </p>
      )}
    </div>
  )
}
