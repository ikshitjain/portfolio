import { useReveal } from '../hooks/useReveal'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

const projects = [
    {
        id: '01',
        title: 'Smart Classroom Attention and Behavior Monitoring System',
        category: 'Computer Vision',
        date: 'June 2026',
        description:
            'An AI-powered classroom monitoring system that analyzes student attention, behavior, and engagement in real-time using computer vision and deep learning techniques.',
        tags: ['Python', 'YOLOv8', 'OpenCV', 'TensorFlow', 'Computer Vision'],
        image: '/images/smart_classroom_preview.png',
        github: 'https://github.com/ikshitjain',
    },
    {
        id: '02',
        title: 'Salary Prediction Model',
        category: 'MACHINE LEARNING',
        date: 'June 2025',
        description:
            'An interactive machine learning model predicting salaries based on education, experience, and role. Powered by Scikit-learn and Streamlit.',
        tags: ['Python', 'Scikit-Learn', 'Pandas', 'Streamlit', 'ML'],
        image: '/images/salary_preview.png',
        github: 'https://github.com/ikshitjain',
        demo: 'https://salaryprediction-pqhvfd5kkvpbzebyik.streamlit.app/',
    },
    {
        id: '05',
        title: 'Smart-Insure AI',
        category: 'Artificial Intelligence',
        date: 'May 2026',
        description:
            'An AI-powered insurance platform utilizing machine learning and Retrieval-Augmented Generation (RAG) for claim analysis, fraud detection, and intelligent document search.',
        tags: ['Python', 'LangChain', 'FAISS', 'RAG', 'Streamlit'],
        image: '/images/smart_insure_preview.png',
        github: 'https://github.com/ikshitjain',
        demo: null,
    },
]

function ProjectCard({ project }) {
    return (
        <div className="project-card">
            <div className="project-card-content">
                <div className="project-meta">
                    <span className="project-category">{project.category}</span>
                    <span className="project-date">{project.date}</span>
                </div>

                <h3 className="project-title">{project.title}</h3>

                <p className="project-description">{project.description}</p>

                <div className="project-tags">
                    {project.tags.map((tag) => (
                        <span key={tag} className="project-tag">
                            {tag}
                        </span>
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
                            className="project-link demo-link"
                        >
                            <FiExternalLink size={14} />
                            Live Demo
                        </a>
                    )}
                </div>
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
