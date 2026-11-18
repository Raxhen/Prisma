# AGENTS.md

Manual de trabajo para este repositorio. Léelo antes de cada tarea.

## Qué es

**Prisma** es el design system de **FullHealth**, una app de salud. En su portal, cada persona ve sus recetas y su medicación, sus análisis y chequeos, y sus citas. También puede grabar sus consultas y tomar notas, hablar con un agente de IA sobre cómo se siente, y marcarse objetivos de revisiones al año, que sigue en un panel de datos y métricas.

Prisma reúne los fundamentos visuales (colores, tipografía, espaciados, iconos), los componentes y los patrones con los que se construye FullHealth. Más contexto en el [README](README.md).

## Tecnología

- **React con TypeScript**, sobre **Vite**.
- **Tailwind CSS** para los estilos.
- **Tabler Icons** para los iconos. No uses otras librerías de iconos.
- **Ninguna librería de componentes** (nada de MUI, Chakra, shadcn/ui, Radix, Headless UI ni similares). Todos los componentes se crean desde cero en este repositorio.

## Cómo trabajamos

- **Idioma:** todo en español: las respuestas, los mensajes de commit, las PR y la documentación.
- **Ramas y PR:** cada cambio va en su propia rama y se propone con una pull request. No subas nada directamente a `main`.
- **Explicaciones sin jerga:** explica qué has cambiado y por qué con palabras sencillas, como si lo contaras a alguien que no programa. Si un término técnico es imprescindible, explícalo en una frase.
- **Dependencias:** si cambias `package.json`, actualiza también `package-lock.json` (con `npm install`) e incluye los dos archivos en la misma PR.
