import FuturisticBackground from './components/FuturisticBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Responsibility from './components/Responsibility'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
    return (
        <div className="app">
            {/* Animated space background */}
            <FuturisticBackground />

            <Navbar />
            <main>
                <Hero />
                <hr className="section-divider" />
                <About />
                <hr className="section-divider" />
                <Skills />
                <hr className="section-divider" />
                <Projects />
                <hr className="section-divider" />
                <Responsibility />
                <hr className="section-divider" />
                <Contact />
            </main>
            <Footer />
        </div>
    )
}
