import { ThemeProvider } from './components/theme-provider'
import { Collection } from './pages/collections/collection'

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="mocha.ui-theme">
      <Collection />
    </ThemeProvider>
  )
}
