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
- **Tokens:** si cambias `tokens/tokens.json`, ejecuta `npm run tokens` e incluye en la misma PR los archivos que genera (`src/styles/tokens.css`, `src/styles/theme.css` y `docs/tokens.md`). No edites esos tres archivos a mano. Ejecuta también `npm run contrast` y revisa en `docs/contraste.md` que no haya parejas que no pasen; si añades un fondo, ponlo en su grupo de `tokens/contrast-pairs.json`. En los componentes, usa las clases de sus tokens (están en `docs/tokens.md`), nunca colores de la paleta ni escalas de Tailwind.

## Decisiones

Las decisiones del design system se escriben como ADR, documentos cortos que explican qué se decidió y por qué. Viven en [`docs/adr/`](docs/adr/).

- **Léelas antes de proponer cualquier cambio** que afecte al alcance de Prisma o a sus principios.
- **Nunca las contradigas sin escribir un ADR nuevo** que explique el cambio y por qué. Si una tarea pide algo que choca con un ADR, avisa antes de hacerlo.
- **Cada ADR nuevo se apunta en la lista de abajo**, en la misma PR que lo crea.

| ADR | Qué decide |
|---|---|
| [ADR-001 · Alcance y principios](docs/adr/001-alcance.md) | Qué productos cubre Prisma, que el color principal es `emerald` y los cinco principios que debe cumplir todo: tokens, componentes en vez de copias, accesibilidad (AA, y 7:1 en la información médica), modo claro y oscuro, y un nombre para cada significado. |
