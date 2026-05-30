import { useEffect, useRef } from 'react'

/**
 * Custom hook for Intersection Observer based scroll-reveal.
 * Adds 'visible' class when element enters viewport.
 */
export function useReveal(options = {}) {
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('visible')
                    observer.unobserve(el)
                }
            },
            { threshold: 0.15, rootMargin: '-40px', ...options }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return ref
}
