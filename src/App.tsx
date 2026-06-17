import { I18nProvider } from './i18n'
import Background from './components/Background'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <I18nProvider>
      <div className="grain relative min-h-screen">
        <Background />
        <div className="relative z-10">
          <Nav />
          <main>
            <Hero />
            <Work />
            <About />
            <Skills />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </I18nProvider>
  )
}
