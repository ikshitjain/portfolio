import { useReveal } from '../hooks/useReveal'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

const projects = [
    {
        id: 1,
        title: 'Student Record Management System',
        date: 'Nov 2025',
        description:
            'Web app for managing student data with dynamic CRUD operations. Responsive frontend with HTML, CSS & JavaScript. Backend powered by Django + MongoDB (NoSQL).',
        tags: ['MongoDB', 'Mongoose', 'Django', 'JavaScript', 'HTML', 'CSS'],
        github: 'https://github.com/ikshitjain',
        demo: null,
    },
    {
        id: 2,
        title: 'Salary Prediction Model',
        date: 'June 2025',
        description:
            'ML model to predict salaries based on years of experience, education level, and job title using Scikit-learn. Built with Streamlit UI for interactive predictions.',
        tags: ['Python', 'Pandas', 'Scikit-learn', 'ML', 'Streamlit'],
        github: 'https://github.com/ikshitjain',
        demo: 'https://salaryprediction-pqhvfd5kkvpbzebyik.streamlit.app/',
    },
]

function ProjectCard({ project }) {
    return (
        <div className="project-card">
            <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <span className="project-date">{project.date}</span>
            </div>

            <p className="project-description">{project.description}</p>

            <div className="project-tags">
                {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                ))}
            </div>

            <div className="project-links">
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                >
                    <FiGithub size={14} />
                    Source Code
                </a>
                {project.demo && (
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                    >
                        <FiExternalLink size={14} />
                        Live Demo
                    </a>
                )}
            </div>
        </div>
    )
}

export default function Projects() {
    const ref = useReveal()

    return (
        <section id="projects" ref={ref} className="reveal">
            <div className="container">
                <p className="section-label">Projects</p>
                <h2 className="section-title">Things I've Built</h2>

                <div className="projects-list">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    )
}
