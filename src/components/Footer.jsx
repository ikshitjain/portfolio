import { useState, useEffect } from 'react'
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi'

export default function Footer() {
    const [isVisible, setIsVisible] = useState(false)

    // Show/hide Back-to-Top button based on scroll position
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <footer className="footer">
            <div className="container">
                <p className="footer-copyright">
                    Built by Ikshit Jain © 2026. All rights reserved.
                </p>
                <p className="footer-subtitle">
                    Building AI, Full-Stack &amp; Intelligent Systems.
                </p>
                <div className="footer-socials">
                    <a 
                        href="https://github.com/ikshitjain" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="GitHub"
                        className="footer-social-btn"
                    >
                        <FiGithub size={18} />
                    </a>
                    <a 
                        href="https://www.linkedin.com/in/ikshit-jain" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="LinkedIn"
                        className="footer-social-btn"
                    >
                        <FiLinkedin size={18} />
                    </a>
                    <a 
                        href="mailto:ikshitsarwadia@gmail.com" 
                        aria-label="Email"
                        className="footer-social-btn"
                    >
                        <FiMail size={18} />
                    </a>
                </div>
            </div>

            {/* Floating Back-to-Top Button */}
            <button
                className={`back-to-top ${isVisible ? 'visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Back to Top"
            >
                <FiArrowUp size={20} />
            </button>
        </footer>
    )
}

