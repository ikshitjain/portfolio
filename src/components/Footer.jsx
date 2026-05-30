import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-socials">
                    <a href="https://github.com/ikshitjain" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <FiGithub size={16} />
                    </a>
                    <a href="https://www.linkedin.com/in/ikshit-jain" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <FiLinkedin size={16} />
                    </a>
                    <a href="mailto:ikshitsarwadia@gmail.com" aria-label="Email">
                        <FiMail size={16} />
                    </a>
                </div>
                <p className="footer-text">
                    Designed & Built by <strong>Ikshit Jain</strong>
                </p>
                <p className="footer-copyright">© 2025 Ikshit Jain. All rights reserved.</p>
            </div>
        </footer>
    )
}
