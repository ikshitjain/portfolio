import { useEffect, useState } from 'react'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const typingTexts = [
    'Full-Stack Developer',
    'ML Enthusiast',
    'CSE Undergraduate @ MediCaps',
    'Graphics Head @ ACM Club',
]

function TypingAnimation() {
    const [textIndex, setTextIndex] = useState(0)
    const [displayed, setDisplayed] = useState('')
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        const current = typingTexts[textIndex]
        let timeout

        if (!deleting && displayed.length < current.length) {
            timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
        } else if (!deleting && displayed.length === current.length) {
            timeout = setTimeout(() => setDeleting(true), 1800)
        } else if (deleting && displayed.length > 0) {
            timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40)
        } else if (deleting && displayed.length === 0) {
            setDeleting(false)
            setTextIndex((prev) => (prev + 1) % typingTexts.length)
        }

        return () => clearTimeout(timeout)
    }, [displayed, deleting, textIndex])

    return (
        <span>
            {displayed}
            <span className="cursor" />
        </span>
    )
}

export default function Hero() {
    return (
        <section id="hero" className="hero">
            <div className="container">
                <div className="hero-content">
                    <p className="hero-greeting">Hello, I'm</p>

                    <h1 className="hero-name">
                        IKSHIT<br />JAIN
                    </h1>

                    <div className="hero-role">
                        <TypingAnimation />
                    </div>

                    <p className="hero-description">
                        Building responsive web apps & ML models.
                        CSE Undergraduate at MediCaps University, Indore.
                    </p>

                    <div className="hero-actions">
                        <a href="#projects" className="btn btn-primary">
                            View Projects
                        </a>
                        <a
                            href="/Ikshit_Jain_CV.pdf"
                            download
                            className="btn btn-outline"
                        >
                            Download CV
                        </a>
                    </div>

                    <div className="hero-socials">
                        <a href="https://github.com/ikshitjain" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <FiGithub size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/ikshit-jain" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FiLinkedin size={20} />
                        </a>
                        <a href="mailto:ikshitsarwadia@gmail.com" aria-label="Email">
                            <FiMail size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
