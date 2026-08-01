import { useRoute } from './router/Router'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Roadmap } from './pages/Roadmap'
import { Decisions } from './pages/Decisions'

function App() {
  const { path } = useRoute()

  let page = <Home />
  if (path === '/roadmap') page = <Roadmap />
  else if (path === '/decisions') page = <Decisions />

  return (
    <div className="min-h-svh flex flex-col">
      <Nav />
      <main className="flex-1 flex flex-col items-center">{page}</main>
      <Footer />
    </div>
  )
}

export default App
