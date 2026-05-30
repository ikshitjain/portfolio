import { useReveal } from '../hooks/useReveal'
import {
    SiPython, SiJavascript, SiHtml5, SiMysql, SiMongodb,
    SiDjango, SiPandas, SiStreamlit, SiGit
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'

const skillCategories = [
    {
        title: 'Languages',
        skills: [
            { name: 'Python', icon: <SiPython /> },
            { name: 'Java', icon: <FaJava /> },
            { name: 'JavaScript', icon: <SiJavascript /> },
            { name: 'HTML/CSS', icon: <SiHtml5 /> },
            { name: 'MySQL', icon: <SiMysql /> },
            { name: 'MongoDB', icon: <SiMongodb /> },
        ],
    },
    {
        title: 'Frameworks & Libraries',
        skills: [
            { name: 'Django', icon: <SiDjango /> },
            { name: 'Streamlit', icon: <SiStreamlit /> },
            { name: 'Pandas', icon: <SiPandas /> },
            { name: 'Scikit-learn', icon: null },
            { name: 'Matplotlib', icon: null },
            { name: 'Mongoose', icon: <SiMongodb /> },
        ],
    },
    {
        title: 'Tools & Platforms',
        skills: [
            { name: 'VS Code', icon: null },
            { name: 'IntelliJ', icon: null },
            { name: 'MongoDB Compass', icon: <SiMongodb /> },
            { name: 'Git / GitHub', icon: <SiGit /> },
        ],
    },
]

export default function Skills() {
    const ref = useReveal()

    return (
        <section id="skills" ref={ref} className="reveal">
            <div className="container">
                <p className="section-label">Skills</p>
                <h2 className="section-title">Technologies I work with</h2>

                {skillCategories.map((cat) => (
                    <div key={cat.title} className="skills-category">
                        <h3 className="skills-category-title">{cat.title}</h3>
                        <div className="skills-grid">
                            {cat.skills.map((skill) => (
                                <div key={skill.name} className="skill-tag">
                                    {skill.icon && (
                                        <span className="skill-icon">{skill.icon}</span>
                                    )}
                                    {skill.name}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
