import { useState, useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { FiTerminal } from 'react-icons/fi'

export default function Terminal() {
    const revealRef = useReveal()
    const terminalBodyRef = useRef(null)
    const inputRef = useRef(null)

    const [inputValue, setInputValue] = useState('')
    const [history, setHistory] = useState([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [logs, setLogs] = useState([])

    // Simulated terminal startup sequence
    useEffect(() => {
        const welcomeLines = [
            'System initializing...',
            'Establishing connection to ikshitjain.dev...',
            'Connection successful.',
            'Welcome to Ikshit\'s Interactive Shell (v1.0.0)',
            'Type "help" to see all available commands.'
        ]

        let currentLine = 0
        const interval = setInterval(() => {
            if (currentLine < welcomeLines.length) {
                setLogs(prev => [...prev, {
                    id: `startup-${currentLine}`,
                    type: 'output',
                    content: welcomeLines[currentLine]
                }])
                currentLine++
            } else {
                clearInterval(interval)
            }
        }, 150)

        return () => clearInterval(interval)
    }, [])

    // Focus input on container click
    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    // Scroll terminal container to bottom when logs update
    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
        }
    }, [logs])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const cmd = inputValue.trim().toLowerCase()
            const inputLogId = `input-${Date.now()}`
            const outputLogId = `output-${Date.now()}`

            const newLogs = [...logs, { id: inputLogId, type: 'input', content: `guest@ikshitjain:~$ ${inputValue}` }]

            if (cmd) {
                // Save to history
                const newHistory = [...history, inputValue]
                setHistory(newHistory)
                setHistoryIndex(-1)

                let output = ''
                switch (cmd) {
                    case 'help':
                        output = (
                            <div className="terminal-help-output">
                                <p>Available commands:</p>
                                <div className="help-grid">
                                    <div><span className="cmd-name">about</span> - Learn who I am</div>
                                    <div><span className="cmd-name">skills</span> - View my tech stack</div>
                                    <div><span className="cmd-name">projects</span> - Check out my projects</div>
                                    <div><span className="cmd-name">experience</span> - See my experience</div>
                                    <div><span className="cmd-name">education</span> - View my academic details</div>
                                    <div><span className="cmd-name">contact</span> - Get my contact info</div>
                                    <div><span className="cmd-name">resume</span> - Open my resume PDF</div>
                                    <div><span className="cmd-name">clear</span> - Clear terminal screen</div>
                                </div>
                            </div>
                        )
                        break
                    case 'about':
                    case 'whoami':
                        output = (
                            <div className="terminal-list-output">
                                <p>→ Ikshit Jain</p>
                                <p>→ AI Engineer & Full Stack Developer</p>
                                <p>→ B.Tech Computer Science Engineering</p>
                            </div>
                        )
                        break
                    case 'skills':
                        output = (
                            <div className="terminal-list-output">
                                <p>→ Python</p>
                                <p>→ Django</p>
                                <p>→ FastAPI</p>
                                <p>→ React</p>
                                <p>→ PostgreSQL</p>
                                <p>→ TensorFlow</p>
                                <p>→ Machine Learning</p>
                                <p>→ Generative AI</p>
                                <p>→ LangChain</p>
                                <p>→ FAISS</p>
                            </div>
                        )
                        break
                    case 'projects':
                        output = (
                            <div className="terminal-list-output">
                                <p>→ AI Insurance System</p>
                                <p>→ Student Management System</p>
                                <p>→ Grade Prediction System</p>
                                <p>→ Property Price Prediction</p>
                                <p>→ SaaS Applications</p>
                            </div>
                        )
                        break
                    case 'experience':
                        output = (
                            <div className="terminal-list-output">
                                <p>→ Graphics Head at ACM Student Chapter Techno Club (Aug 2025 - Present)</p>
                                <p className="indent">- Leading visual branding, graphic design, and social media content for tech events.</p>
                            </div>
                        )
                        break
                    case 'education':
                        output = (
                            <div className="terminal-list-output">
                                <p>→ B.Tech in Computer Science and Engineering</p>
                                <p className="indent">- Medi-Caps University, Indore (2023 - 2027)</p>
                            </div>
                        )
                        break
                    case 'contact':
                        output = (
                            <div className="terminal-list-output">
                                <p>→ Email: <a href="mailto:ikshitsarwadia@gmail.com" className="term-link">ikshitsarwadia@gmail.com</a></p>
                                <p>→ LinkedIn: <a href="https://www.linkedin.com/in/ikshit-jain" target="_blank" rel="noopener noreferrer" className="term-link">linkedin.com/in/ikshit-jain</a></p>
                                <p>→ GitHub: <a href="https://github.com/ikshitjain" target="_blank" rel="noopener noreferrer" className="term-link">github.com/ikshitjain</a></p>
                            </div>
                        )
                        break
                    case 'resume':
                        window.open('/Ikshit_Jain_CV.pdf', '_blank')
                        output = 'Opening resume PDF in a new tab...'
                        break
                    case 'clear':
                        setLogs([])
                        setInputValue('')
                        return
                    default:
                        output = `Command not found: "${cmd}". Type "help" to view all available commands.`
                }

                setLogs([...newLogs, { id: outputLogId, type: 'output', content: output }])
            } else {
                setLogs(newLogs)
            }
            setInputValue('')
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (history.length === 0) return
            const newIndex = historyIndex + 1
            if (newIndex < history.length) {
                setHistoryIndex(newIndex)
                setInputValue(history[history.length - 1 - newIndex])
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            const newIndex = historyIndex - 1
            if (newIndex >= 0) {
                setHistoryIndex(newIndex)
                setInputValue(history[history.length - 1 - newIndex])
            } else {
                setHistoryIndex(-1)
                setInputValue('')
            }
        }
    }

    return (
        <section id="terminal" ref={revealRef} className="reveal">
            <div className="container">
                <p className="section-label">Interactive Shell</p>
                <h2 className="section-title">Try My Terminal</h2>
                <p className="terminal-desc">Explore my profile through terminal commands.</p>

                <div className="terminal-wrapper" onClick={focusInput}>
                    {/* macOS Title Bar */}
                    <div className="terminal-header">
                        <div className="terminal-dots">
                            <span className="dot dot-red"></span>
                            <span className="dot dot-yellow"></span>
                            <span className="dot dot-green"></span>
                        </div>
                        <div className="terminal-title">
                            <FiTerminal size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                            guest@ikshitjain: ~
                        </div>
                        <div className="terminal-header-space"></div>
                    </div>

                    {/* Terminal Display */}
                    <div className="terminal-body" ref={terminalBodyRef}>
                        <div className="terminal-logs">
                            {logs.map((log) => (
                                <div key={log.id} className={`terminal-line ${log.type}`}>
                                    {log.type === 'input' ? (
                                        <span className="line-content">{log.content}</span>
                                    ) : (
                                        <div className="line-content output">{log.content}</div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Interactive Input Prompt */}
                        <div className="terminal-input-line">
                            <span className="terminal-prompt">guest@ikshitjain:~$ </span>
                            <div className="terminal-input-container">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="terminal-input"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    spellCheck="false"
                                />
                                <span className="terminal-typed-text">{inputValue}</span>
                                <span className="terminal-cursor"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
