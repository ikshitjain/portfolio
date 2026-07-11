import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const stats = [
    { value: '3+', label: 'Projects' },
    { value: 'Google', label: 'AI-ML Intern' },
    { value: 'ACM', label: 'Graphics Head' },
]

export default function About() {
    const ref = useReveal()
    const [imageError, setImageError] = useState(false)

    return (
        <section id="about" ref={ref} className="reveal">
            <div className="container">
                <p className="section-label">About</p>

                <div className="about-grid">
                    {/* Avatar */}
                    <div className="about-avatar">
                        {!imageError ? (
                            <img 
                                src="/photo.jpg" 
                                alt="Ikshit Jain" 
                                onError={() => setImageError(true)} 
                            />
                        ) : (
                            <span className="initials">IJ</span>
                        )}
                    </div>

                    {/* Bio */}
                   <div className="about-bio">
                        <h3>Building AI-powered solutions and modern web applications.</h3>

                    <p>
                    I'm <strong>Ikshit Jain</strong>, a Computer Science Engineering
                    undergraduate at <strong>MediCaps University, Indore</strong>
                    (2023–2027). My interests lie at the intersection of <strong>Artificial Intelligence</strong>,
                    <strong> Machine Learning</strong>, and <strong>Computer Vision</strong>.
    </p>

    <p>
        Recently, I completed a summer internship as a <strong>Google AI-ML Intern</strong>, where I developed and deployed neural network models on Android devices using TensorFlow Lite with up to 97% accuracy.
    </p>

    <p>
        I have built projects like the <strong>Smart Classroom Attention and Behavior Monitoring System</strong>,
        <strong>Smart-Insure AI</strong>, and the <strong>Salary Prediction Model</strong>, applying deep learning and predictive analytics to solve real-world problems.
    </p>

    <p>
        Additionally, I serve as the <strong>Graphics Head</strong> at the ACM Student
        Chapter Techno Club, leading creative design initiatives and branding.
    </p>

    <div className="about-stats">
                            {stats.map((s) => (
                                <div key={s.label} className="about-stat">
                                    <div className="stat-value">{s.value}</div>
                                    <div className="stat-label">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
