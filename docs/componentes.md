# Estado de los componentes

Esta tabla dice en qué punto está cada componente de Prisma. Actualízala en la misma PR cada vez que añadas o cambies un componente.

## Qué significa cada estado

| Estado | Qué significa |
|---|---|
| 💡 Idea | Está pensado, pero todavía no existe. |
| 🚧 Borrador | Existe y se puede usar, pero su aspecto puede cambiar cuando definamos las reglas de Prisma. |
| ✅ Estable | Su aspecto y su forma de uso ya están decididos. |
| ⛔ Obsoleto | Ya no hay que usarlo. Hay otro que lo sustituye. |

## Componentes

| Componente | Estado | Variantes | Tamaños | Historia en Storybook | Accesibilidad | Notas |
|---|---|---|---|---|---|---|
| **Button** (botón) | 🚧 Borrador | `primary`, `secondary`, `ghost`, `danger` | `sm`, `md`, `lg` | ✅ `Componentes/Button` | ✅ Sin fallos | Puede llevar iconos y ocupar todo el ancho. |
| **Input** (campo de texto) | 🚧 Borrador | Normal, con error, desactivado | `sm`, `md`, `lg` | ✅ `Componentes/Input` | ✅ Sin fallos | Siempre con etiqueta visible. Admite ayuda, error, icono y campo obligatorio. |
| **Card** (tarjeta) | 🚧 Borrador | `outlined`, `elevated`, `filled` | Espacio interior: `none`, `sm`, `md`, `lg` | ✅ `Componentes/Card` | ✅ Sin fallos | Se monta con `CardHeader` y `CardFooter`. |
| **Badge** (etiqueta) | 🚧 Borrador | `neutral`, `info`, `success`, `warning`, `danger` | `sm`, `md` | ✅ `Componentes/Badge` | ✅ Sin fallos | Puede llevar icono. |

Todos están en borrador porque los colores, los tamaños y las variantes son una primera propuesta. Todavía no hay reglas de diseño de Prisma.

«Sin fallos» quiere decir que la revisión automática de accesibilidad de Storybook (la pestaña *Accessibility*) no encuentra problemas en ninguna de sus historias. Esa revisión no sustituye a probar el componente con teclado y con lector de pantalla.

## Cómo ver los componentes

En la Terminal, dentro de la carpeta del proyecto:

```bash
npm run storybook
```

Después abre http://localhost:6006 en el navegador.
