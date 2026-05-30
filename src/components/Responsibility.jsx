import { useReveal } from '../hooks/useReveal'
import { FiMapPin, FiCalendar } from 'react-icons/fi'

export default function Responsibility() {
    const ref = useReveal()

    return (
        <section id="experience" ref={ref} className="reveal">
            <div className="container">
                <p className="section-label">Experience</p>
                <h2 className="section-title">Beyond Code</h2>

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
                            Aug 2025 – Present
                        </span>
                    </div>

                    <p className="experience-description">
                        Leading the creative vision of the club by designing impactful graphics and
                        managing visual content for events and promotions. Responsible for all club
                        branding and social media assets.
                    </p>
                </div>
            </div>
        </section>
    )
}
