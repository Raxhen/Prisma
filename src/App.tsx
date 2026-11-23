import { useSyncExternalStore } from 'react'
import type { ComponentType } from 'react'
import TailwindPage from './pages/Tailwind'

// Índice del proyecto: un menú arriba y, debajo, la página que toca según la
// dirección (por ejemplo, #/antes).
//
// Cada archivo de src/screens/ se añade solo al menú. Su nombre es la dirección:
// src/screens/antes.tsx → #/antes. Para cambiar el texto del menú, el archivo
// puede exportar `export const title = '...'`.

type Route = { slug: string; title: string; Component: ComponentType }

type ScreenModule = { default: ComponentType; title?: string }

const screenModules = import.meta.glob<ScreenModule>(
  ['./screens/*.tsx', '!./screens/*.stories.tsx'],
  { eager: true },
)

const screens: Route[] = Object.entries(screenModules)
  .map(([path, module]) => {
    const slug = path.replace('./screens/', '').replace('.tsx', '')
    return { slug, title: module.title ?? slug, Component: module.default }
  })
  .sort((a, b) => a.title.localeCompare(b.title, 'es'))

const routes: Route[] = [
  { slug: 'tailwind', title: 'Tailwind', Component: TailwindPage },
  ...screens,
]

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getSlug() {
  return window.location.hash.replace(/^#\/?/, '') || routes[0].slug
}

function App() {
  const slug = useSyncExternalStore(subscribe, getSlug)
  const route = routes.find((r) => r.slug === slug)

  return (
    <div className="flex h-dvh flex-col bg-white">
      <nav
        aria-label="Pantallas"
        className="shrink-0 overflow-x-auto border-b border-gray-200 bg-white"
      >
        <ul className="flex items-center gap-1 px-4 py-2">
          <li className="mr-3 shrink-0 font-bold text-gray-900">Prisma</li>
          {routes.map((r) => {
            const current = r.slug === route?.slug
            return (
              <li key={r.slug} className="shrink-0">
                <a
                  href={`#/${r.slug}`}
                  aria-current={current ? 'page' : undefined}
                  className={`block rounded-full px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                    current
                      ? 'bg-emerald-700 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {r.title}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* key: al cambiar de página, la nueva empieza desde arriba */}
      <main key={slug} className="min-h-0 flex-1 overflow-y-auto">
        {route ? (
          <route.Component />
        ) : (
          <div className="mx-auto max-w-xl px-6 py-16 text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Esta página no existe
            </h1>
            <p className="mt-2 text-gray-600">
              No hay ninguna pantalla en <code>#/{slug}</code>. Elige una del
              menú.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
