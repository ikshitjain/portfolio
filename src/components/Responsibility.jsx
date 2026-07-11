import { useReveal } from '../hooks/useReveal'
import { FiMapPin, FiCalendar } from 'react-icons/fi'

export default function Responsibility() {
    const ref = useReveal()

    return (
        <section id="experience" ref={ref} className="reveal">
            <div className="container">
                <p className="section-label">Experience</p>
                <h2 className="section-title">Work & Leadership</h2>

                <div className="experience-list">
                    <div className="experience-card">
                        <div className="experience-header">
                            <h3 className="experience-role">Google AI-ML Intern</h3>
                        </div>

                        <p className="experience-org">Medi-Caps University</p>

                        <div className="experience-meta">
                            <span>
                                <FiMapPin size={13} />
                                Indore, India
                            </span>
                            <span>
                                <FiCalendar size={13} />
                                June 2026 – July 2026
                            </span>
                        </div>

                        <p className="experience-description">
                            Completed a summer internship in AI and Machine Learning with Google, earning 10 digital skill badges through hands-on model development. Built 4 Android applications by training neural network models and deploying them using TensorFlow Lite, achieving up to 97% accuracy across use cases, including plant disease detection, fashion classification, and human–horse recognition.
                        </p>
                    </div>

                    <div className="experience-card">
                        <div className="experience-header">
                            <h3 className="experience-role">Graphics Head</h3>
                        </div>

                        <p className="experience-org">ACM Student Chapter Techno Club</p>

                        <div className="experience-meta">
                            <span>
                                <FiMapPin size={13} />
                                Indore, India
                            </span>
                            <span>
                                <FiCalendar size={13} />
                                Aug 2025 – July 2026
                            </span>
                        </div>

                        <p className="experience-description">
                            Leading the creative vision of the club by designing impactful graphics and
                            managing visual content for events and promotions. Responsible for all club
                            branding and social media assets.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
