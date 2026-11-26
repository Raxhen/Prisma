# Tokens y clases de Tailwind

> **Archivo generado** por `scripts/build-tokens.mjs` a partir de `tokens/tokens.json`. No lo edites a mano: cambia `tokens/tokens.json` y ejecuta `npm run tokens`.

Esta tabla dice, para cada token semántico y de componente, qué **variable CSS** tiene (en `src/styles/tokens.css`) y con qué **clase de Tailwind** se usa (la crea `src/styles/theme.css`). Los tokens primitivos no tienen clase: los componentes nunca los usan directamente.

## Cómo se forman los nombres de las clases

La clase es **la utilidad de Tailwind + el nombre del token**, sin las partes `default` y `rest`, que son las normales:

| Tipo de token | Utilidad | Ejemplo |
|---|---|---|
| Color de fondo | `bg-` | `semantic.color.background.primary.default.rest` → `bg-background-primary` |
| Color de texto | `text-` | `semantic.color.text.neutral.subtle.rest` → `text-text-neutral-subtle` |
| Color de icono | `text-` (para el icono, `[&_svg]:text-…`) | `semantic.color.icon.neutral.default.rest` → `text-icon-neutral` |
| Color de borde | `border-` | `semantic.color.border.neutral.strong.rest` → `border-border-neutral-strong` |
| Color de foco | `outline-` | `semantic.color.focus.primary.default.rest` → `outline-focus-primary` |
| Estilo de texto (tamaño, altura de línea y peso juntos) | `text-` | `semantic.font-size.heading` → `text-heading` |
| Espaciado | `p-`, `m-`, `gap-`… | `semantic.spacing.md` → `p-space-md`, `gap-space-md`… |
| Radio | `rounded-` | `semantic.radius.md` → `rounded-radius-md` |
| Grosor de borde | `border-width-` y `outline-width-` | `semantic.border-width.default` → `border-width-default` |
| Sombra | `shadow-` | `semantic.shadow.elevation.md` → `shadow-elevation-md` |
| De componente | La misma utilidad, con el componente delante | `component.button.background.primary.default.hover` → `bg-button-background-primary-hover` |

Ninguna clase se llama igual que una de las que ya trae Tailwind, y las escalas de Tailwind (`text-sm`, `p-4`, `rounded-lg`…) no cambian.

**Modo oscuro:** las clases cambian solas cuando un elemento (por ejemplo, `<html>`) tiene `data-theme="dark"`.

## Semánticos

### Colores

| Token | Variable CSS | Clase de Tailwind |
|---|---|---|
| `semantic.color.background.neutral.default.rest` | `--semantic-color-background-neutral-default-rest` | `bg-background-neutral` |
| `semantic.color.background.neutral.default.hover` | `--semantic-color-background-neutral-default-hover` | `bg-background-neutral-hover` |
| `semantic.color.background.neutral.default.active` | `--semantic-color-background-neutral-default-active` | `bg-background-neutral-active` |
| `semantic.color.background.neutral.default.disabled` | `--semantic-color-background-neutral-default-disabled` | `bg-background-neutral-disabled` |
| `semantic.color.background.neutral.subtle.rest` | `--semantic-color-background-neutral-subtle-rest` | `bg-background-neutral-subtle` |
| `semantic.color.background.neutral.strong.rest` | `--semantic-color-background-neutral-strong-rest` | `bg-background-neutral-strong` |
| `semantic.color.background.neutral.inverse.rest` | `--semantic-color-background-neutral-inverse-rest` | `bg-background-neutral-inverse` |
| `semantic.color.background.primary.default.rest` | `--semantic-color-background-primary-default-rest` | `bg-background-primary` |
| `semantic.color.background.primary.default.hover` | `--semantic-color-background-primary-default-hover` | `bg-background-primary-hover` |
| `semantic.color.background.primary.default.active` | `--semantic-color-background-primary-default-active` | `bg-background-primary-active` |
| `semantic.color.background.primary.subtle.rest` | `--semantic-color-background-primary-subtle-rest` | `bg-background-primary-subtle` |
| `semantic.color.background.info.default.rest` | `--semantic-color-background-info-default-rest` | `bg-background-info` |
| `semantic.color.background.info.subtle.rest` | `--semantic-color-background-info-subtle-rest` | `bg-background-info-subtle` |
| `semantic.color.background.success.default.rest` | `--semantic-color-background-success-default-rest` | `bg-background-success` |
| `semantic.color.background.success.subtle.rest` | `--semantic-color-background-success-subtle-rest` | `bg-background-success-subtle` |
| `semantic.color.background.warning.default.rest` | `--semantic-color-background-warning-default-rest` | `bg-background-warning` |
| `semantic.color.background.warning.subtle.rest` | `--semantic-color-background-warning-subtle-rest` | `bg-background-warning-subtle` |
| `semantic.color.background.danger.default.rest` | `--semantic-color-background-danger-default-rest` | `bg-background-danger` |
| `semantic.color.background.danger.default.hover` | `--semantic-color-background-danger-default-hover` | `bg-background-danger-hover` |
| `semantic.color.background.danger.default.active` | `--semantic-color-background-danger-default-active` | `bg-background-danger-active` |
| `semantic.color.background.danger.subtle.rest` | `--semantic-color-background-danger-subtle-rest` | `bg-background-danger-subtle` |
| `semantic.color.text.neutral.default.rest` | `--semantic-color-text-neutral-default-rest` | `text-text-neutral` |
| `semantic.color.text.neutral.default.disabled` | `--semantic-color-text-neutral-default-disabled` | `text-text-neutral-disabled` |
| `semantic.color.text.neutral.strong.rest` | `--semantic-color-text-neutral-strong-rest` | `text-text-neutral-strong` |
| `semantic.color.text.neutral.subtle.rest` | `--semantic-color-text-neutral-subtle-rest` | `text-text-neutral-subtle` |
| `semantic.color.text.neutral.inverse.rest` | `--semantic-color-text-neutral-inverse-rest` | `text-text-neutral-inverse` |
| `semantic.color.text.primary.default.rest` | `--semantic-color-text-primary-default-rest` | `text-text-primary` |
| `semantic.color.text.primary.inverse.rest` | `--semantic-color-text-primary-inverse-rest` | `text-text-primary-inverse` |
| `semantic.color.text.info.default.rest` | `--semantic-color-text-info-default-rest` | `text-text-info` |
| `semantic.color.text.info.inverse.rest` | `--semantic-color-text-info-inverse-rest` | `text-text-info-inverse` |
| `semantic.color.text.success.default.rest` | `--semantic-color-text-success-default-rest` | `text-text-success` |
| `semantic.color.text.success.inverse.rest` | `--semantic-color-text-success-inverse-rest` | `text-text-success-inverse` |
| `semantic.color.text.warning.default.rest` | `--semantic-color-text-warning-default-rest` | `text-text-warning` |
| `semantic.color.text.warning.inverse.rest` | `--semantic-color-text-warning-inverse-rest` | `text-text-warning-inverse` |
| `semantic.color.text.danger.default.rest` | `--semantic-color-text-danger-default-rest` | `text-text-danger` |
| `semantic.color.text.danger.inverse.rest` | `--semantic-color-text-danger-inverse-rest` | `text-text-danger-inverse` |
| `semantic.color.icon.neutral.default.rest` | `--semantic-color-icon-neutral-default-rest` | `text-icon-neutral` |
| `semantic.color.icon.neutral.default.disabled` | `--semantic-color-icon-neutral-default-disabled` | `text-icon-neutral-disabled` |
| `semantic.color.icon.neutral.subtle.rest` | `--semantic-color-icon-neutral-subtle-rest` | `text-icon-neutral-subtle` |
| `semantic.color.icon.neutral.inverse.rest` | `--semantic-color-icon-neutral-inverse-rest` | `text-icon-neutral-inverse` |
| `semantic.color.icon.primary.default.rest` | `--semantic-color-icon-primary-default-rest` | `text-icon-primary` |
| `semantic.color.icon.primary.inverse.rest` | `--semantic-color-icon-primary-inverse-rest` | `text-icon-primary-inverse` |
| `semantic.color.icon.info.default.rest` | `--semantic-color-icon-info-default-rest` | `text-icon-info` |
| `semantic.color.icon.info.inverse.rest` | `--semantic-color-icon-info-inverse-rest` | `text-icon-info-inverse` |
| `semantic.color.icon.success.default.rest` | `--semantic-color-icon-success-default-rest` | `text-icon-success` |
| `semantic.color.icon.success.inverse.rest` | `--semantic-color-icon-success-inverse-rest` | `text-icon-success-inverse` |
| `semantic.color.icon.warning.default.rest` | `--semantic-color-icon-warning-default-rest` | `text-icon-warning` |
| `semantic.color.icon.warning.inverse.rest` | `--semantic-color-icon-warning-inverse-rest` | `text-icon-warning-inverse` |
| `semantic.color.icon.danger.default.rest` | `--semantic-color-icon-danger-default-rest` | `text-icon-danger` |
| `semantic.color.icon.danger.inverse.rest` | `--semantic-color-icon-danger-inverse-rest` | `text-icon-danger-inverse` |
| `semantic.color.border.neutral.default.rest` | `--semantic-color-border-neutral-default-rest` | `border-border-neutral` |
| `semantic.color.border.neutral.strong.rest` | `--semantic-color-border-neutral-strong-rest` | `border-border-neutral-strong` |
| `semantic.color.border.primary.default.rest` | `--semantic-color-border-primary-default-rest` | `border-border-primary` |
| `semantic.color.border.info.default.rest` | `--semantic-color-border-info-default-rest` | `border-border-info` |
| `semantic.color.border.success.default.rest` | `--semantic-color-border-success-default-rest` | `border-border-success` |
| `semantic.color.border.warning.default.rest` | `--semantic-color-border-warning-default-rest` | `border-border-warning` |
| `semantic.color.border.danger.default.rest` | `--semantic-color-border-danger-default-rest` | `border-border-danger` |
| `semantic.color.focus.primary.default.rest` | `--semantic-color-focus-primary-default-rest` | `outline-focus-primary` |

### Tipografía

| Token | Variable CSS | Clase de Tailwind |
|---|---|---|
| `semantic.font-size.display` | `--semantic-font-size-display` | `text-display` |
| `semantic.font-size.heading` | `--semantic-font-size-heading` | `text-heading` |
| `semantic.font-size.title` | `--semantic-font-size-title` | `text-title` |
| `semantic.font-size.body` | `--semantic-font-size-body` | `text-body` |
| `semantic.font-size.label` | `--semantic-font-size-label` | `text-label` |
| `semantic.font-size.caption` | `--semantic-font-size-caption` | `text-caption` |
| `semantic.line-height.display` | `--semantic-line-height-display` | `text-display` |
| `semantic.line-height.heading` | `--semantic-line-height-heading` | `text-heading` |
| `semantic.line-height.title` | `--semantic-line-height-title` | `text-title` |
| `semantic.line-height.body` | `--semantic-line-height-body` | `text-body` |
| `semantic.line-height.label` | `--semantic-line-height-label` | `text-label` |
| `semantic.line-height.caption` | `--semantic-line-height-caption` | `text-caption` |
| `semantic.font-weight.display` | `--semantic-font-weight-display` | `text-display` |
| `semantic.font-weight.heading` | `--semantic-font-weight-heading` | `text-heading` |
| `semantic.font-weight.title` | `--semantic-font-weight-title` | `text-title` |
| `semantic.font-weight.body` | `--semantic-font-weight-body` | `text-body` |
| `semantic.font-weight.label` | `--semantic-font-weight-label` | `text-label` |
| `semantic.font-weight.caption` | `--semantic-font-weight-caption` | `text-caption` |

### Espaciado

| Token | Variable CSS | Clase de Tailwind |
|---|---|---|
| `semantic.spacing.none` | `--semantic-spacing-none` | `p-space-none` |
| `semantic.spacing.2xs` | `--semantic-spacing-2xs` | `p-space-2xs` |
| `semantic.spacing.xs` | `--semantic-spacing-xs` | `p-space-xs` |
| `semantic.spacing.sm` | `--semantic-spacing-sm` | `p-space-sm` |
| `semantic.spacing.md` | `--semantic-spacing-md` | `p-space-md` |
| `semantic.spacing.lg` | `--semantic-spacing-lg` | `p-space-lg` |
| `semantic.spacing.xl` | `--semantic-spacing-xl` | `p-space-xl` |
| `semantic.spacing.2xl` | `--semantic-spacing-2xl` | `p-space-2xl` |
| `semantic.spacing.3xl` | `--semantic-spacing-3xl` | `p-space-3xl` |
| `semantic.spacing.4xl` | `--semantic-spacing-4xl` | `p-space-4xl` |

### Radios

| Token | Variable CSS | Clase de Tailwind |
|---|---|---|
| `semantic.radius.none` | `--semantic-radius-none` | `rounded-radius-none` |
| `semantic.radius.sm` | `--semantic-radius-sm` | `rounded-radius-sm` |
| `semantic.radius.md` | `--semantic-radius-md` | `rounded-radius-md` |
| `semantic.radius.lg` | `--semantic-radius-lg` | `rounded-radius-lg` |
| `semantic.radius.xl` | `--semantic-radius-xl` | `rounded-radius-xl` |
| `semantic.radius.full` | `--semantic-radius-full` | `rounded-radius-full` |

### Grosores de borde

| Token | Variable CSS | Clase de Tailwind |
|---|---|---|
| `semantic.border-width.default` | `--semantic-border-width-default` | `border-width-default` |
| `semantic.border-width.strong` | `--semantic-border-width-strong` | `border-width-strong` |
| `semantic.border-width.focus` | `--semantic-border-width-focus` | `border-width-focus` |

### Sombras

| Token | Variable CSS | Clase de Tailwind |
|---|---|---|
| `semantic.shadow.elevation.sm` | `--semantic-shadow-elevation-sm` | `shadow-elevation-sm` |
| `semantic.shadow.elevation.md` | `--semantic-shadow-elevation-md` | `shadow-elevation-md` |
| `semantic.shadow.elevation.lg` | `--semantic-shadow-elevation-lg` | `shadow-elevation-lg` |

## De componente

### Button

| Token | Variable CSS | Clase de Tailwind |
|---|---|---|
| `component.button.background.primary.default.rest` | `--component-button-background-primary-default-rest` | `bg-button-background-primary` |
| `component.button.background.primary.default.hover` | `--component-button-background-primary-default-hover` | `bg-button-background-primary-hover` |
| `component.button.background.primary.default.active` | `--component-button-background-primary-default-active` | `bg-button-background-primary-active` |
| `component.button.background.primary.default.disabled` | `--component-button-background-primary-default-disabled` | `bg-button-background-primary-disabled` |
| `component.button.background.danger.default.rest` | `--component-button-background-danger-default-rest` | `bg-button-background-danger` |
| `component.button.background.danger.default.hover` | `--component-button-background-danger-default-hover` | `bg-button-background-danger-hover` |
| `component.button.background.danger.default.active` | `--component-button-background-danger-default-active` | `bg-button-background-danger-active` |
| `component.button.background.danger.default.disabled` | `--component-button-background-danger-default-disabled` | `bg-button-background-danger-disabled` |
| `component.button.background.secondary.default.rest` | `--component-button-background-secondary-default-rest` | `bg-button-background-secondary` |
| `component.button.background.secondary.default.hover` | `--component-button-background-secondary-default-hover` | `bg-button-background-secondary-hover` |
| `component.button.background.secondary.default.active` | `--component-button-background-secondary-default-active` | `bg-button-background-secondary-active` |
| `component.button.background.secondary.default.disabled` | `--component-button-background-secondary-default-disabled` | `bg-button-background-secondary-disabled` |
| `component.button.background.ghost.default.hover` | `--component-button-background-ghost-default-hover` | `bg-button-background-ghost-hover` |
| `component.button.background.ghost.default.active` | `--component-button-background-ghost-default-active` | `bg-button-background-ghost-active` |
| `component.button.text.primary.default.rest` | `--component-button-text-primary-default-rest` | `text-button-text-primary` |
| `component.button.text.primary.default.disabled` | `--component-button-text-primary-default-disabled` | `text-button-text-primary-disabled` |
| `component.button.text.danger.default.rest` | `--component-button-text-danger-default-rest` | `text-button-text-danger` |
| `component.button.text.danger.default.disabled` | `--component-button-text-danger-default-disabled` | `text-button-text-danger-disabled` |
| `component.button.text.secondary.default.rest` | `--component-button-text-secondary-default-rest` | `text-button-text-secondary` |
| `component.button.text.secondary.default.disabled` | `--component-button-text-secondary-default-disabled` | `text-button-text-secondary-disabled` |
| `component.button.text.ghost.default.rest` | `--component-button-text-ghost-default-rest` | `text-button-text-ghost` |
| `component.button.text.ghost.default.disabled` | `--component-button-text-ghost-default-disabled` | `text-button-text-ghost-disabled` |
| `component.button.icon.primary.default.rest` | `--component-button-icon-primary-default-rest` | `text-button-icon-primary` |
| `component.button.icon.primary.default.disabled` | `--component-button-icon-primary-default-disabled` | `text-button-icon-primary-disabled` |
| `component.button.icon.danger.default.rest` | `--component-button-icon-danger-default-rest` | `text-button-icon-danger` |
| `component.button.icon.danger.default.disabled` | `--component-button-icon-danger-default-disabled` | `text-button-icon-danger-disabled` |
| `component.button.icon.secondary.default.rest` | `--component-button-icon-secondary-default-rest` | `text-button-icon-secondary` |
| `component.button.icon.secondary.default.disabled` | `--component-button-icon-secondary-default-disabled` | `text-button-icon-secondary-disabled` |
| `component.button.icon.ghost.default.rest` | `--component-button-icon-ghost-default-rest` | `text-button-icon-ghost` |
| `component.button.icon.ghost.default.disabled` | `--component-button-icon-ghost-default-disabled` | `text-button-icon-ghost-disabled` |
| `component.button.border.secondary.default.rest` | `--component-button-border-secondary-default-rest` | `border-button-border-secondary` |
| `component.button.border.secondary.default.disabled` | `--component-button-border-secondary-default-disabled` | `border-button-border-secondary-disabled` |
| `component.button.focus.primary.default.rest` | `--component-button-focus-primary-default-rest` | `outline-button-focus-primary` |
| `component.button.spacing.padding-x.sm` | `--component-button-spacing-padding-x-sm` | `px-button-padding-x-sm` |
| `component.button.spacing.padding-x.md` | `--component-button-spacing-padding-x-md` | `px-button-padding-x-md` |
| `component.button.spacing.padding-x.lg` | `--component-button-spacing-padding-x-lg` | `px-button-padding-x-lg` |
| `component.button.spacing.padding-y.sm` | `--component-button-spacing-padding-y-sm` | `py-button-padding-y-sm` |
| `component.button.spacing.padding-y.md` | `--component-button-spacing-padding-y-md` | `py-button-padding-y-md` |
| `component.button.spacing.padding-y.lg` | `--component-button-spacing-padding-y-lg` | `py-button-padding-y-lg` |
| `component.button.spacing.gap` | `--component-button-spacing-gap` | `gap-button-gap` |
| `component.button.font-size.sm` | `--component-button-font-size-sm` | `text-button-sm` |
| `component.button.font-size.md` | `--component-button-font-size-md` | `text-button-md` |
| `component.button.font-size.lg` | `--component-button-font-size-lg` | `text-button-lg` |
| `component.button.line-height.sm` | `--component-button-line-height-sm` | `text-button-sm` |
| `component.button.line-height.md` | `--component-button-line-height-md` | `text-button-md` |
| `component.button.line-height.lg` | `--component-button-line-height-lg` | `text-button-lg` |
| `component.button.font-weight.default` | `--component-button-font-weight-default` | `text-button-sm`, `text-button-md`, `text-button-lg` |
| `component.button.radius.default` | `--component-button-radius-default` | `rounded-button-radius` |
| `component.button.border-width.default` | `--component-button-border-width-default` | `border-width-button` |
| `component.button.border-width.focus` | `--component-button-border-width-focus` | `border-width-button-focus` |

### Input

| Token | Variable CSS | Clase de Tailwind |
|---|---|---|
| `component.input.background.neutral.default.rest` | `--component-input-background-neutral-default-rest` | `bg-input-background-neutral` |
| `component.input.background.neutral.default.disabled` | `--component-input-background-neutral-default-disabled` | `bg-input-background-neutral-disabled` |
| `component.input.text.neutral.default.rest` | `--component-input-text-neutral-default-rest` | `text-input-text-neutral` |
| `component.input.text.neutral.default.disabled` | `--component-input-text-neutral-default-disabled` | `text-input-text-neutral-disabled` |
| `component.input.icon.neutral.default.rest` | `--component-input-icon-neutral-default-rest` | `text-input-icon-neutral` |
| `component.input.border.neutral.default.rest` | `--component-input-border-neutral-default-rest` | `border-input-border-neutral` |
| `component.input.border.danger.default.rest` | `--component-input-border-danger-default-rest` | `border-input-border-danger` |
| `component.input.focus.primary.default.rest` | `--component-input-focus-primary-default-rest` | `outline-input-focus-primary` |
| `component.input.focus.danger.default.rest` | `--component-input-focus-danger-default-rest` | `outline-input-focus-danger` |
| `component.input.placeholder.text.neutral.default.rest` | `--component-input-placeholder-text-neutral-default-rest` | `text-input-placeholder-text-neutral` |
| `component.input.label.text.neutral.default.rest` | `--component-input-label-text-neutral-default-rest` | `text-input-label-text-neutral` |
| `component.input.label.font-size.default` | `--component-input-label-font-size-default` | `text-input-label` |
| `component.input.label.line-height.default` | `--component-input-label-line-height-default` | `text-input-label` |
| `component.input.label.font-weight.default` | `--component-input-label-font-weight-default` | `text-input-label` |
| `component.input.required.text.danger.default.rest` | `--component-input-required-text-danger-default-rest` | `text-input-required-text-danger` |
| `component.input.hint.text.neutral.default.rest` | `--component-input-hint-text-neutral-default-rest` | `text-input-hint-text-neutral` |
| `component.input.hint.font-size.default` | `--component-input-hint-font-size-default` | `text-input-hint` |
| `component.input.hint.line-height.default` | `--component-input-hint-line-height-default` | `text-input-hint` |
| `component.input.hint.font-weight.default` | `--component-input-hint-font-weight-default` | `text-input-hint` |
| `component.input.error.text.danger.default.rest` | `--component-input-error-text-danger-default-rest` | `text-input-error-text-danger` |
| `component.input.error.font-size.default` | `--component-input-error-font-size-default` | `text-input-error` |
| `component.input.error.line-height.default` | `--component-input-error-line-height-default` | `text-input-error` |
| `component.input.error.font-weight.default` | `--component-input-error-font-weight-default` | `text-input-error` |
| `component.input.spacing.padding-y.sm` | `--component-input-spacing-padding-y-sm` | `py-input-padding-y-sm` |
| `component.input.spacing.padding-y.md` | `--component-input-spacing-padding-y-md` | `py-input-padding-y-md` |
| `component.input.spacing.padding-y.lg` | `--component-input-spacing-padding-y-lg` | `py-input-padding-y-lg` |
| `component.input.spacing.padding-x` | `--component-input-spacing-padding-x` | `px-input-padding-x` |
| `component.input.spacing.icon-gap` | `--component-input-spacing-icon-gap` | `gap-input-icon-gap` |
| `component.input.spacing.gap` | `--component-input-spacing-gap` | `gap-input-gap` |
| `component.input.font-size.sm` | `--component-input-font-size-sm` | `text-input-sm` |
| `component.input.font-size.md` | `--component-input-font-size-md` | `text-input-md` |
| `component.input.font-size.lg` | `--component-input-font-size-lg` | `text-input-lg` |
| `component.input.line-height.sm` | `--component-input-line-height-sm` | `text-input-sm` |
| `component.input.line-height.md` | `--component-input-line-height-md` | `text-input-md` |
| `component.input.line-height.lg` | `--component-input-line-height-lg` | `text-input-lg` |
| `component.input.radius.default` | `--component-input-radius-default` | `rounded-input-radius` |
| `component.input.border-width.default` | `--component-input-border-width-default` | `border-width-input` |
| `component.input.border-width.focus` | `--component-input-border-width-focus` | `border-width-input-focus` |

### Card

| Token | Variable CSS | Clase de Tailwind |
|---|---|---|
| `component.card.background.outlined.default.rest` | `--component-card-background-outlined-default-rest` | `bg-card-background-outlined` |
| `component.card.background.elevated.default.rest` | `--component-card-background-elevated-default-rest` | `bg-card-background-elevated` |
| `component.card.background.filled.default.rest` | `--component-card-background-filled-default-rest` | `bg-card-background-filled` |
| `component.card.border.outlined.default.rest` | `--component-card-border-outlined-default-rest` | `border-card-border-outlined` |
| `component.card.shadow.elevated` | `--component-card-shadow-elevated` | `shadow-card-elevated` |
| `component.card.border-width.default` | `--component-card-border-width-default` | `border-width-card` |
| `component.card.radius.default` | `--component-card-radius-default` | `rounded-card-radius` |
| `component.card.spacing.padding.none` | `--component-card-spacing-padding-none` | `p-card-padding-none` |
| `component.card.spacing.padding.sm` | `--component-card-spacing-padding-sm` | `p-card-padding-sm` |
| `component.card.spacing.padding.md` | `--component-card-spacing-padding-md` | `p-card-padding-md` |
| `component.card.spacing.padding.lg` | `--component-card-spacing-padding-lg` | `p-card-padding-lg` |
| `component.card.header-icon.background.primary.default.rest` | `--component-card-header-icon-background-primary-default-rest` | `bg-card-header-icon-background-primary` |
| `component.card.header-icon.icon.primary.default.rest` | `--component-card-header-icon-icon-primary-default-rest` | `text-card-header-icon-icon-primary` |
| `component.card.header-icon.radius.default` | `--component-card-header-icon-radius-default` | `rounded-card-header-icon-radius` |
| `component.card.header.spacing.gap` | `--component-card-header-spacing-gap` | `gap-card-header-gap` |
| `component.card.title.text.neutral.default.rest` | `--component-card-title-text-neutral-default-rest` | `text-card-title-text-neutral` |
| `component.card.title.font-size.default` | `--component-card-title-font-size-default` | `text-card-title` |
| `component.card.title.line-height.default` | `--component-card-title-line-height-default` | `text-card-title` |
| `component.card.title.font-weight.default` | `--component-card-title-font-weight-default` | `text-card-title` |
| `component.card.description.text.neutral.default.rest` | `--component-card-description-text-neutral-default-rest` | `text-card-description-text-neutral` |
| `component.card.description.font-size.default` | `--component-card-description-font-size-default` | `text-card-description` |
| `component.card.description.line-height.default` | `--component-card-description-line-height-default` | `text-card-description` |
| `component.card.description.font-weight.default` | `--component-card-description-font-weight-default` | `text-card-description` |
| `component.card.footer.spacing.margin-top` | `--component-card-footer-spacing-margin-top` | `mt-card-footer-margin-top` |
| `component.card.footer.spacing.gap` | `--component-card-footer-spacing-gap` | `gap-card-footer-gap` |

### Badge

| Token | Variable CSS | Clase de Tailwind |
|---|---|---|
| `component.badge.background.neutral.default.rest` | `--component-badge-background-neutral-default-rest` | `bg-badge-background-neutral` |
| `component.badge.background.info.default.rest` | `--component-badge-background-info-default-rest` | `bg-badge-background-info` |
| `component.badge.background.success.default.rest` | `--component-badge-background-success-default-rest` | `bg-badge-background-success` |
| `component.badge.background.warning.default.rest` | `--component-badge-background-warning-default-rest` | `bg-badge-background-warning` |
| `component.badge.background.danger.default.rest` | `--component-badge-background-danger-default-rest` | `bg-badge-background-danger` |
| `component.badge.text.neutral.default.rest` | `--component-badge-text-neutral-default-rest` | `text-badge-text-neutral` |
| `component.badge.text.info.default.rest` | `--component-badge-text-info-default-rest` | `text-badge-text-info` |
| `component.badge.text.success.default.rest` | `--component-badge-text-success-default-rest` | `text-badge-text-success` |
| `component.badge.text.warning.default.rest` | `--component-badge-text-warning-default-rest` | `text-badge-text-warning` |
| `component.badge.text.danger.default.rest` | `--component-badge-text-danger-default-rest` | `text-badge-text-danger` |
| `component.badge.icon.neutral.default.rest` | `--component-badge-icon-neutral-default-rest` | `text-badge-icon-neutral` |
| `component.badge.icon.info.default.rest` | `--component-badge-icon-info-default-rest` | `text-badge-icon-info` |
| `component.badge.icon.success.default.rest` | `--component-badge-icon-success-default-rest` | `text-badge-icon-success` |
| `component.badge.icon.warning.default.rest` | `--component-badge-icon-warning-default-rest` | `text-badge-icon-warning` |
| `component.badge.icon.danger.default.rest` | `--component-badge-icon-danger-default-rest` | `text-badge-icon-danger` |
| `component.badge.border.neutral.default.rest` | `--component-badge-border-neutral-default-rest` | `border-badge-border-neutral` |
| `component.badge.border.info.default.rest` | `--component-badge-border-info-default-rest` | `border-badge-border-info` |
| `component.badge.border.success.default.rest` | `--component-badge-border-success-default-rest` | `border-badge-border-success` |
| `component.badge.border.warning.default.rest` | `--component-badge-border-warning-default-rest` | `border-badge-border-warning` |
| `component.badge.border.danger.default.rest` | `--component-badge-border-danger-default-rest` | `border-badge-border-danger` |
| `component.badge.spacing.padding-x.sm` | `--component-badge-spacing-padding-x-sm` | `px-badge-padding-x-sm` |
| `component.badge.spacing.padding-x.md` | `--component-badge-spacing-padding-x-md` | `px-badge-padding-x-md` |
| `component.badge.spacing.padding-y.sm` | `--component-badge-spacing-padding-y-sm` | `py-badge-padding-y-sm` |
| `component.badge.spacing.padding-y.md` | `--component-badge-spacing-padding-y-md` | `py-badge-padding-y-md` |
| `component.badge.spacing.gap` | `--component-badge-spacing-gap` | `gap-badge-gap` |
| `component.badge.font-size.sm` | `--component-badge-font-size-sm` | `text-badge-sm` |
| `component.badge.font-size.md` | `--component-badge-font-size-md` | `text-badge-md` |
| `component.badge.line-height.sm` | `--component-badge-line-height-sm` | `text-badge-sm` |
| `component.badge.line-height.md` | `--component-badge-line-height-md` | `text-badge-md` |
| `component.badge.font-weight.default` | `--component-badge-font-weight-default` | `text-badge-sm`, `text-badge-md` |
| `component.badge.radius.default` | `--component-badge-radius-default` | `rounded-badge-radius` |
| `component.badge.border-width.default` | `--component-badge-border-width-default` | `border-width-badge` |
