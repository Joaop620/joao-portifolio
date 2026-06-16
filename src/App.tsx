import { I18nProvider } from './i18n'
import Background from './components/Background'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Marquee from './components/Marquee'
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
        <Cursor />
        <div className="relative z-10">
          <Nav />
          <main>
            <Hero />
            <Stats />
            <div className="py-6" />
            <Marquee />
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
