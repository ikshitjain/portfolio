import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const stats = [
    { value: '2+', label: 'Projects' },
    { value: '10+', label: 'Technologies' },
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
                    (2023–2027).  My interests include <strong>Artificial Intelligence</strong>,
                    <strong> Machine Learning</strong>, <strong>Computer Vision</strong>.
    </p>

    <p>
        I have developed projects such as <strong>Smart Classroom Attention and Behavior Monitoring System</strong>,
        <strong> Smart-Insure AI</strong>, and <strong>Salary Prediction Model</strong>,
        applying machine learning, computer vision, and predictive analytics to solve real-world problems.
    </p>

    <p>
        Currently serving as <strong>Graphics Head</strong> at the ACM Student
        Chapter Techno Club, where I lead creative design initiatives while
        continuously enhancing my technical and leadership skills.
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
