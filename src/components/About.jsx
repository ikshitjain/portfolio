import { useReveal } from '../hooks/useReveal'

const stats = [
    { value: '2+', label: 'Projects' },
    { value: '10+', label: 'Technologies' },
    { value: 'ACM', label: 'Graphics Head' },
]

export default function About() {
    const ref = useReveal()

    return (
        <section id="about" ref={ref} className="reveal">
            <div className="container">
                <p className="section-label">About</p>

                <div className="about-grid">
                    {/* Avatar */}
                    <div className="about-avatar">
                        <span className="initials">IJ</span>
                    </div>

                    {/* Bio */}
                    <div className="about-bio">
                        <h3>I'm a passionate developer who loves building things.</h3>
                        <p>
                            I'm <strong>Ikshit Jain</strong>, a Computer Science Engineering
                            undergraduate at MediCaps University, Indore (2023–2027). I specialize
                            in <strong>Full-Stack Development</strong> and{' '}
                            <strong>Predictive Analytics</strong>, building responsive web
                            applications and machine learning models using Python and MongoDB.
                        </p>
                        <p>
                            Currently serving as <strong>Graphics Head</strong> at ACM Student
                            Chapter Techno Club, leading creative design for events and promotions.
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
