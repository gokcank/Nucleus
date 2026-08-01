import {
  createContext,
  useContext,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from 'react'

interface RouterContextValue {
  path: string
  navigate: (path: string) => void
}

const RouterContext = createContext<RouterContextValue | null>(null)

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (next: string) => {
    if (next === path) return
    window.history.pushState(null, '', next)
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
      href={to}
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
