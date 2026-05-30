import { useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import emailjs from '@emailjs/browser'
import { FiMail, FiLinkedin, FiGithub, FiPhone, FiSend } from 'react-icons/fi'

const socialLinks = [
    {
        icon: <FiMail size={16} />,
        label: 'ikshitsarwadia@gmail.com',
        href: 'mailto:ikshitsarwadia@gmail.com',
    },
    {
        icon: <FiLinkedin size={16} />,
        label: 'linkedin.com/in/ikshit-jain',
        href: 'https://www.linkedin.com/in/ikshit-jain',
    },
    {
        icon: <FiGithub size={16} />,
        label: 'github.com/ikshitjain',
        href: 'https://github.com/ikshitjain',
    },
    {
        icon: <FiPhone size={16} />,
        label: '+91 9251705840',
        href: 'tel:+919251705840',
    },
]

export default function Contact() {
    const sectionRef = useReveal()
    const formRef = useRef()
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setStatus('')

        emailjs
            .sendForm(
                'service_luk20dj',
                'template_0ddsar7',
                formRef.current,
                'qvGXSGJrCxMD4hzIK'
            )
            .then(() => {
                setStatus('success')
                formRef.current.reset()
            })
            .catch(() => {
                setStatus('error')
            })
            .finally(() => setLoading(false))
    }

    return (
        <section id="contact" ref={sectionRef} className="reveal">
            <div className="container">
                <p className="section-label">Contact</p>
                <h2 className="section-title">Let's Connect</h2>

                <div className="contact-grid">
                    {/* Left — Info & Links */}
                    <div className="contact-info">
                        <p>
                            I'm always open to discussing new projects, creative ideas, or
                            opportunities to be part of your vision. Feel free to reach out!
                        </p>

                        <div className="contact-links">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-link"
                                >
                                    <span className="link-icon">{link.icon}</span>
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right — Form */}
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="contact-form"
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows={5}
                            required
                        />

                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Sending...' : (
                                <>Send Message <FiSend size={14} /></>
                            )}
                        </button>

                        {status === 'success' && (
                            <p className="form-status success">✓ Message sent successfully!</p>
                        )}
                        {status === 'error' && (
                            <p className="form-status error">
                                ✕ Failed to send. Please try again.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    )
}
