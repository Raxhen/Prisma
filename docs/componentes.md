# Estado de los componentes

Una fila por componente de `src/components/`. Cuando añadas o cambies un componente, actualiza esta tabla en la misma PR.

| Componente | Storybook | Solo tokens | Teclado |
|---|---|---|---|
| Badge | ✅ | ✅ | ✅ |
| Button | ✅ | ✅ | ✅ |
| Card | ✅ | ✅ | ✅ |
| Input | ✅ | ✅ | ✅ |

**Solo tokens** quiere decir que el componente no usa colores de la paleta de Tailwind (`bg-blue-600`…) ni sus escalas de texto, espaciado, radio, borde o sombra (`text-sm`, `p-4`, `rounded-lg`…). Todo eso sale de sus tokens de componente. Las clases de cada token están en `docs/tokens.md`.

Todavía quedan sin token, porque no existen tokens para ellos, los tamaños de los iconos (`size-4`, `size-5`…) y de la caja del icono de CardHeader (`size-10`).

**Teclado** quiere decir que el componente cumple la regla 2 de `docs/accesibilidad.md` y que su historia **Teclado** de Storybook pasa: recorre con Tab sus partes interactivas, en orden, y comprueba que se ve el anillo de foco doble. Si el componente no es interactivo, como Card o Badge, comprueba que Tab no se para en él.
