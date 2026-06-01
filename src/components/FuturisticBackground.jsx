import { useEffect, useRef } from 'react'

/**
 * Google Antigravity-Style Interactive Background
 * Features:
 * - A 3D perspective floor grid that warps upward (anti-gravity bulge) and glows neon-cyan near the cursor.
 * - Weightless 3D geometric wireframe shapes (cubes, tetrahedrons, octahedrons) that drift upwards,
 *   rotate dynamically, and warp/repel around the mouse cursor.
 * - Translucent glass-like shaded faces on the 3D shapes for a premium crystalline look.
 * - Floating ambient stardust and soft neon-blue/purple nebulae highlights.
 */
export default function FuturisticBackground() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let animationId

        // Mouse interaction state
        const mouse = {
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0,
            active: false,
        }

        let width = window.innerWidth
        let height = window.innerHeight
        let dpr = window.devicePixelRatio || 1

        // Particles and 3D shapes
        let floatingShapes = []
        let ambientStars = []

        // Define 3D geometries (vertices and faces/edges)
        const geometries = {
            cube: {
                vertices: [
                    { x: -1, y: -1, z: -1 }, { x: 1, y: -1, z: -1 },
                    { x: 1, y: 1, z: -1 }, { x: -1, y: 1, z: -1 },
                    { x: -1, y: -1, z: 1 }, { x: 1, y: -1, z: 1 },
                    { x: 1, y: 1, z: 1 }, { x: -1, y: 1, z: 1 }
                ],
                edges: [
                    [0, 1], [1, 2], [2, 3], [3, 0], // Back face
                    [4, 5], [5, 6], [6, 7], [7, 4], // Front face
                    [0, 4], [1, 5], [2, 6], [3, 7]  // Connectors
                ],
                faces: [
                    [0, 1, 2, 3], // Back
                    [4, 5, 6, 7], // Front
                    [0, 1, 5, 4], // Bottom
                    [2, 3, 7, 6], // Top
                    [0, 3, 7, 4], // Left
                    [1, 2, 6, 5]  // Right
                ]
            },
            tetra: {
                vertices: [
                    { x: 1, y: 1, z: 1 }, { x: -1, y: -1, z: 1 },
                    { x: -1, y: 1, z: -1 }, { x: 1, y: -1, z: -1 }
                ],
                edges: [
                    [0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]
                ],
                faces: [
                    [0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]
                ]
            },
            octa: {
                vertices: [
                    { x: 0, y: 1.2, z: 0 },   // Top
                    { x: 1.2, y: 0, z: 0 },   // Right
                    { x: 0, y: 0, z: 1.2 },   // Front
                    { x: -1.2, y: 0, z: 0 },  // Left
                    { x: 0, y: 0, z: -1.2 },  // Back
                    { x: 0, y: -1.2, z: 0 }   // Bottom
                ],
                edges: [
                    [0, 1], [0, 2], [0, 3], [0, 4], // Top pyramid
                    [5, 1], [5, 2], [5, 3], [5, 4], // Bottom pyramid
                    [1, 2], [2, 3], [3, 4], [4, 1]  // Equatorial ring
                ],
                faces: [
                    [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1],
                    [5, 1, 2], [5, 2, 3], [5, 3, 4], [5, 4, 1]
                ]
            }
        }

        const shapeColors = [
            'rgba(0, 240, 255, ',   // Neon Cyan
            'rgba(138, 43, 226, ',  // Neon Purple
            'rgba(0, 180, 255, ',   // Neon Light Blue
            'rgba(100, 120, 255, ', // Violet Blue
        ]

        // 3D rotation functions
        const rotate3D = (x, y, z, pitch, yaw, roll) => {
            // Z-axis (Roll)
            const cosR = Math.cos(roll), sinR = Math.sin(roll)
            const x1 = x * cosR - y * sinR
            const y1 = x * sinR + y * cosR
            const z1 = z

            // X-axis (Pitch)
            const cosP = Math.cos(pitch), sinP = Math.sin(pitch)
            const x2 = x1
            const y2 = y1 * cosP - z1 * sinP
            const z2 = y1 * sinP + z1 * cosP

            // Y-axis (Yaw)
            const cosY = Math.cos(yaw), sinY = Math.sin(yaw)
            const x3 = x2 * cosY + z2 * sinY
            const y3 = y2
            const z3 = -x2 * sinY + z2 * cosY

            return { x: x3, y: y3, z: z3 }
        }

        // Initialize particles & geometric shapes
        const initElements = () => {
            floatingShapes = []
            ambientStars = []

            // 1. Generate 3D Floating Shapes
            const shapeTypes = ['cube', 'tetra', 'octa']
            const numShapes = 11

            for (let i = 0; i < numShapes; i++) {
                const type = shapeTypes[i % shapeTypes.length]
                const color = shapeColors[Math.floor(Math.random() * shapeColors.length)]

                floatingShapes.push({
                    type,
                    geom: geometries[type],
                    x: (Math.random() - 0.5) * width * 1.3,
                    y: (Math.random() - 0.5) * height * 1.3, // distributed vertically
                    z: (Math.random() - 0.5) * 300,
                    scale: Math.random() * 20 + 22, // Size in pixels
                    rx: Math.random() * Math.PI * 2,
                    ry: Math.random() * Math.PI * 2,
                    rz: Math.random() * Math.PI * 2,
                    vrx: (Math.random() - 0.5) * 0.015 + 0.005,
                    vry: (Math.random() - 0.5) * 0.015 + 0.005,
                    vrz: (Math.random() - 0.5) * 0.015,
                    vy: -(Math.random() * 0.4 + 0.3), // slow upward drift (antigravity)
                    vx: (Math.random() - 0.5) * 0.1,
                    dispX: 0,
                    dispY: 0,
                    dispZ: 0,
                    color,
                    opacity: Math.random() * 0.35 + 0.35,
                })
            }

            // 2. Generate Ambient Star Dust
            const starCount = 100
            for (let i = 0; i < starCount; i++) {
                ambientStars.push({
                    x: (Math.random() - 0.5) * width * 1.6,
                    y: (Math.random() - 0.5) * height * 1.6,
                    z: (Math.random() - 0.5) * 500,
                    size: Math.random() * 1.1 + 0.3,
                    opacity: Math.random() * 0.45 + 0.15,
                    vy: -(Math.random() * 0.2 + 0.1), // float upwards
                })
            }
        }

        const resize = () => {
            width = window.innerWidth
            height = window.innerHeight
            dpr = window.devicePixelRatio || 1

            canvas.width = width * dpr
            canvas.height = height * dpr
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`

            ctx.scale(dpr, dpr)
            initElements()
        }

        const handleMouseMove = (e) => {
            mouse.targetX = e.clientX - width / 2
            mouse.targetY = e.clientY - height / 2
            mouse.active = true
        }

        const handleMouseLeave = () => {
            mouse.targetX = 0
            mouse.targetY = 0
            mouse.active = false
        }

        window.addEventListener('resize', resize)
        window.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseleave', handleMouseLeave)

        resize()

        let time = 0
        let currentPitch = -0.38 // slightly tilted camera
        let currentYaw = 0.08
        const fov = 580

        // Grid setup
        const gridCols = 16 // grid X segments
        const gridRows = 12 // grid Z segments
        const gridSpacingX = 100
        const gridSpacingZ = 85
        const gridBaseY = 160 // floor level coordinate
        const gridStartX = -(gridCols * gridSpacingX) / 2
        const gridStartZ = 120

        const draw = () => {
            time += 0.015

            // Smoothly interpolate camera tilt based on mouse position (parallax)
            mouse.x += (mouse.targetX - mouse.x) * 0.07
            mouse.y += (mouse.targetY - mouse.y) * 0.07

            const targetPitch = -0.38 + (mouse.y / height) * 0.18
            const targetYaw = 0.08 + (mouse.x / width) * 0.22
            currentPitch += (targetPitch - currentPitch) * 0.08
            currentYaw += (targetYaw - currentYaw) * 0.08

            // Clear frame
            ctx.fillStyle = '#0a0a0a'
            ctx.fillRect(0, 0, width, height)

            // Draw soft background glowing highlights (Nebulae)
            const nx = width / 2 + mouse.x * 0.1
            const ny = height / 2 + mouse.y * 0.1

            const glow1 = ctx.createRadialGradient(nx - 220, ny - 80, 20, nx - 220, ny - 80, width * 0.4)
            glow1.addColorStop(0, 'rgba(0, 220, 255, 0.05)')
            glow1.addColorStop(0.5, 'rgba(0, 140, 255, 0.015)')
            glow1.addColorStop(1, 'rgba(0, 0, 0, 0)')
            ctx.fillStyle = glow1
            ctx.fillRect(0, 0, width, height)

            const glow2 = ctx.createRadialGradient(nx + 220, ny + 80, 20, nx + 220, ny + 80, width * 0.45)
            glow2.addColorStop(0, 'rgba(138, 43, 226, 0.045)')
            glow2.addColorStop(0.5, 'rgba(75, 0, 130, 0.01)')
            glow2.addColorStop(1, 'rgba(0, 0, 0, 0)')
            ctx.fillStyle = glow2
            ctx.fillRect(0, 0, width, height)

            // 1. PROJECT & DRAW 3D FLOOR GRID (Warped by Antigravity fields)
            // 3D coordinate of the gravity warped center (follows mouse)
            const warpSource3D = {
                x: mouse.x * 1.4,
                y: gridBaseY,
                z: (mouse.y + height/3) * 1.5 + 400
            }

            // Create grid vertex data
            const gridPoints2D = []
            for (let c = 0; c <= gridCols; c++) {
                gridPoints2D[c] = []
                for (let r = 0; r <= gridRows; r++) {
                    const base3D = {
                        x: gridStartX + c * gridSpacingX,
                        y: gridBaseY,
                        z: gridStartZ + r * gridSpacingZ
                    }

                    // Calculate distance to mouse projected source
                    const dx = base3D.x - warpSource3D.x
                    const dz = base3D.z - warpSource3D.z
                    const dist2D = Math.sqrt(dx * dx + dz * dz)
                    const influenceRadius = 260
                    let warpY = 0

                    if (dist2D < influenceRadius) {
                        // Antigravity lift force: bulges grid lines UPWARD (negative Y in coordinates)
                        const force = Math.cos((dist2D / influenceRadius) * Math.PI * 0.5)
                        warpY = force * 65 * (1 - dist2D / influenceRadius)
                    }

                    // Add waves ripple to floor grid
                    const gridRipple = Math.sin(base3D.x * 0.004 + base3D.z * 0.005 + time * 1.2) * 8
                    base3D.y -= (warpY + gridRipple)

                    // Project point
                    const rot = rotate3D(base3D.x, base3D.y, base3D.z, currentPitch, currentYaw, 0)
                    const camZ = rot.z + 500

                    if (camZ > 30) {
                        const sf = fov / camZ
                        gridPoints2D[c][r] = {
                            x: width / 2 + rot.x * sf,
                            y: height / 2 + rot.y * sf,
                            z: camZ,
                            warp: warpY
                        }
                    } else {
                        gridPoints2D[c][r] = null
                    }
                }
            }

            // Draw grid line segments
            for (let c = 0; c <= gridCols; c++) {
                for (let r = 0; r <= gridRows; r++) {
                    const p = gridPoints2D[c][r]
                    if (!p) continue

                    // Draw connecting line to column + 1 (X lines)
                    if (c < gridCols) {
                        const pNext = gridPoints2D[c + 1][r]
                        if (pNext) {
                            drawGridSegment(p, pNext)
                        }
                    }

                    // Draw connecting line to row + 1 (Z lines)
                    if (r < gridRows) {
                        const pNext = gridPoints2D[c][r + 1]
                        if (pNext) {
                            drawGridSegment(p, pNext)
                        }
                    }
                }
            }

            function drawGridSegment(p1, p2) {
                const zAvg = (p1.z + p2.z) / 2
                // Fog effect: grid fades out in the distance
                let baseAlpha = (1 - (zAvg - 120) / 780) * 0.11
                if (baseAlpha <= 0) return

                const warpAvg = (p1.warp + p2.warp) / 2

                ctx.beginPath()
                ctx.moveTo(p1.x, p1.y)
                ctx.lineTo(p2.x, p2.y)

                if (warpAvg > 2) {
                    // Warp sections glow cyan
                    const glowIntensity = Math.min(0.55, (warpAvg / 65) * 0.6)
                    ctx.strokeStyle = `rgba(0, 240, 255, ${Math.max(baseAlpha, glowIntensity)})`
                    ctx.lineWidth = 1.2
                } else {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${baseAlpha})`
                    ctx.lineWidth = 0.8
                }
                ctx.stroke()
            }

            // 2. RENDER AMBIENT STAR DUST
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
            ambientStars.forEach((star) => {
                // Float star upwards
                star.y += star.vy

                // Boundary wrap around
                const limitY = height * 0.8
                if (star.y < -limitY) star.y = limitY
                if (star.x < -width) star.x = width
                if (star.x > width) star.x = -width

                // Project star
                const rot = rotate3D(star.x, star.y, star.z, currentPitch, currentYaw, 0)
                const camZ = rot.z + 500

                if (camZ > 50) {
                    const sf = fov / camZ
                    const sx = width / 2 + rot.x * sf
                    const sy = height / 2 + rot.y * sf

                    if (sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
                        const starFade = star.opacity * (1 - camZ / 1000)
                        ctx.beginPath()
                        ctx.arc(sx, sy, star.size * sf, 0, Math.PI * 2)
                        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, starFade)})`
                        ctx.fill()
                    }
                }
            })

            // 3. PROJECT, SORT & DRAW FLOATING 3D GEOMETRIC SHAPES
            const shapeProjectData = []

            floatingShapes.forEach((shape) => {
                // Float shape upwards (antigravity drift)
                shape.y += shape.vy
                shape.x += shape.vx

                // Boundary wrapping
                const limitY = height * 0.9
                if (shape.y < -limitY) {
                    shape.y = limitY
                    shape.x = (Math.random() - 0.5) * width
                }

                // Smoothly rotate shape on its local axis
                shape.rx += shape.vrx
                shape.ry += shape.vry
                shape.rz += shape.vrz

                // Repulsion force from mouse cursor
                const mouse3D = {
                    x: mouse.x * 1.2,
                    y: mouse.y * 1.2,
                    z: 0
                }

                const dx = shape.x - mouse3D.x
                const dy = shape.y - mouse3D.y
                const dz = shape.z - mouse3D.z
                const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz)
                const repelThreshold = 220

                if (dist3D < repelThreshold) {
                    const push = (repelThreshold - dist3D) / repelThreshold
                    const strength = 18 * push
                    shape.dispX += (dx / dist3D) * strength
                    shape.dispY += (dy / dist3D) * strength
                    shape.dispZ += (dz / dist3D) * strength
                }

                // Decay displacement offsets
                shape.dispX *= 0.93
                shape.dispY *= 0.93
                shape.dispZ *= 0.93

                const posX = shape.x + shape.dispX
                const posY = shape.y + shape.dispY
                const posZ = shape.z + shape.dispZ

                // Local shape vertices rotation
                const projectedVerts = []
                let avgZ = 0
                let offscreen = true

                shape.geom.vertices.forEach((v) => {
                    // 1. Rotate vertex on local shape axis
                    const localRot = rotate3D(v.x * shape.scale, v.y * shape.scale, v.z * shape.scale, shape.rx, shape.ry, shape.rz)

                    // 2. Add global floating position
                    const worldX = localRot.x + posX
                    const worldY = localRot.y + posY
                    const worldZ = localRot.z + posZ

                    // 3. Rotate by global camera parallax angle
                    const globalRot = rotate3D(worldX, worldY, worldZ, currentPitch, currentYaw, 0)
                    const camZ = globalRot.z + 500

                    avgZ += camZ

                    if (camZ > 40) {
                        const sf = fov / camZ
                        const sx = width / 2 + globalRot.x * sf
                        const sy = height / 2 + globalRot.y * sf

                        if (sx >= -50 && sx <= width + 50 && sy >= -50 && sy <= height + 50) {
                            offscreen = false
                        }
                        projectedVerts.push({ x: sx, y: sy, z: camZ })
                    } else {
                        projectedVerts.push(null)
                    }
                })

                if (!offscreen && projectedVerts.length === shape.geom.vertices.length) {
                    shapeProjectData.push({
                        shape,
                        vertices2D: projectedVerts,
                        zDepth: avgZ / shape.geom.vertices.length
                    })
                }
            })

            // Sort shapes back-to-front (descending Z-depth)
            shapeProjectData.sort((a, b) => b.zDepth - a.zDepth)

            // Draw shapes
            shapeProjectData.forEach(({ shape, vertices2D, zDepth }) => {
                const fadeFactor = Math.min(1.2, (800 - zDepth) / 500)
                if (fadeFactor <= 0) return

                const finalOpacity = shape.opacity * fadeFactor

                // 3a. Draw translucent faces (creates premium glassmorphic prism structure)
                ctx.shadowBlur = 0 // reset shadow for face fills

                shape.geom.faces.forEach((face) => {
                    const p0 = vertices2D[face[0]]
                    const p1 = vertices2D[face[1]]
                    const p2 = vertices2D[face[2]]

                    if (!p0 || !p1 || !p2) return

                    // Backface culling in 2D using cross product direction
                    const cross = (p1.x - p0.x) * (p2.y - p0.y) - (p1.y - p0.y) * (p2.x - p0.x)
                    if (cross > 0) {
                        ctx.beginPath()
                        ctx.moveTo(p0.x, p0.y)
                        for (let i = 1; i < face.length; i++) {
                            const p = vertices2D[face[i]]
                            if (p) ctx.lineTo(p.x, p.y)
                        }
                        ctx.closePath()
                        // Very subtle crystalline fill
                        ctx.fillStyle = shape.color + `${0.035 * finalOpacity})`
                        ctx.fill()
                    }
                })

                // 3b. Draw wireframe outlines (edges)
                shape.geom.edges.forEach((edge) => {
                    const p1 = vertices2D[edge[0]]
                    const p2 = vertices2D[edge[1]]

                    if (p1 && p2) {
                        ctx.beginPath()
                        ctx.moveTo(p1.x, p1.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.strokeStyle = shape.color + `${finalOpacity})`
                        ctx.lineWidth = 1.0
                        ctx.stroke()
                    }
                })

                // 3c. Draw vertex highlights (luminous neon nodes)
                vertices2D.forEach((p) => {
                    if (p) {
                        ctx.beginPath()
                        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
                        ctx.fillStyle = '#ffffff'
                        ctx.shadowColor = shape.color + '1.0)'
                        ctx.shadowBlur = 5
                        ctx.fill()
                    }
                })
                ctx.shadowBlur = 0 // reset shadow
            })

            // Draw overlay vignetting to darken edges and corners
            drawOverlayVignette()

            animationId = requestAnimationFrame(draw)
        }

        const drawOverlayVignette = () => {
            const darkRadial = ctx.createRadialGradient(width / 2, height / 2, width * 0.15, width / 2, height / 2, width * 0.85)
            darkRadial.addColorStop(0, 'rgba(10, 10, 10, 0.0)')
            darkRadial.addColorStop(0.65, 'rgba(10, 10, 10, 0.38)')
            darkRadial.addColorStop(1, 'rgba(10, 10, 10, 0.88)')
            ctx.fillStyle = darkRadial
            ctx.fillRect(0, 0, width, height)
        }

        animationId = requestAnimationFrame(draw)

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="starfield"
            aria-hidden="true"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                display: 'block',
            }}
        />
    )
}
