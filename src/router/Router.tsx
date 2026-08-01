import {
  createContext,
  useContext,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from 'react'

// Vite's BASE_URL is '/' locally but '/NucleusWeb/' in the GitHub Pages
// build (see vite.config.ts) — routes below are always app-relative
// ('/', '/roadmap', ...) and this prefix is added/stripped at the edges
// so the rest of the app never has to think about deployment path.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

function toAppPath(pathname: string): string {
  if (BASE && pathname.startsWith(BASE)) {
    const rest = pathname.slice(BASE.length)
    return rest === '' ? '/' : rest
  }
  return pathname
}

function toFullPath(appPath: string): string {
  return appPath === '/' ? `${BASE}/` : `${BASE}${appPath}`
}

interface RouterContextValue {
  path: string
  navigate: (path: string) => void
}

const RouterContext = createContext<RouterContextValue | null>(null)

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => toAppPath(window.location.pathname))

  useEffect(() => {
    const onPopState = () => setPath(toAppPath(window.location.pathname))
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (next: string) => {
    if (next === path) return
    window.history.pushState(null, '', toFullPath(next))
    setPath(next)
  }

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRoute() {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('useRoute must be used within RouterProvider')
  return ctx
}

export function Link({
  to,
  children,
  ...rest
}: { to: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { navigate } = useRoute()

  return (
    <a
      href={toFullPath(to)}
      {...rest}
      onClick={(e) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
          return
        }
        e.preventDefault()
        navigate(to)
      }}
    >
      {children}
    </a>
  )
}
