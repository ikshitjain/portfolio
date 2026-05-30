import { useEffect, useRef } from 'react'

/**
 * Animated starfield background — creates a deep-space effect
 * with twinkling stars at different sizes and opacities.
 */
export default function StarField() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let animationId
        let stars = []

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = document.documentElement.scrollHeight
            generateStars()
        }

        const generateStars = () => {
            const count = Math.floor((canvas.width * canvas.height) / 2800)
            stars = []

            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.3 + 0.2,
                    opacity: Math.random() * 0.7 + 0.1,
                    twinkleSpeed: Math.random() * 0.02 + 0.005,
                    twinkleOffset: Math.random() * Math.PI * 2,
                })
            }
        }

        const draw = (time) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            for (const star of stars) {
                const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset)
                const opacity = star.opacity + twinkle * 0.25
                const clampedOpacity = Math.max(0.05, Math.min(1, opacity))

                ctx.beginPath()
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255, 255, 255, ${clampedOpacity})`
                ctx.fill()
            }

            animationId = requestAnimationFrame(draw)
        }

        resize()
        animationId = requestAnimationFrame(draw)

        // Re-generate stars on resize and when page height changes
        window.addEventListener('resize', resize)

        const resizeObserver = new ResizeObserver(() => {
            canvas.height = document.documentElement.scrollHeight
            generateStars()
        })
        resizeObserver.observe(document.body)

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', resize)
            resizeObserver.disconnect()
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="starfield"
            aria-hidden="true"
        />
    )
}
