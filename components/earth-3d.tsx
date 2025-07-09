"use client"

import { useRef, useEffect, useState } from "react"

// Lazy load Three.js components only on client side
const LazyEarth3D = () => {
  const [components, setComponents] = useState<any>(null)
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mounted = true

    const loadComponents = async () => {
      try {
        const [{ Canvas, useFrame }, { Sphere, Stars }, THREE] = await Promise.all([
          import("@react-three/fiber"),
          import("@react-three/drei"),
          import("three"),
        ])

        if (!mounted) return

        const Earth = () => {
          const earthRef = useRef<any>(null)

          useFrame((state) => {
            if (earthRef.current) {
              earthRef.current.rotation.y += 0.002
            }
          })

          return (
            <Sphere ref={earthRef} args={[2, 64, 64]} position={[0, 0, 0]}>
              <meshStandardMaterial map={null} color="#4A90E2" roughness={0.8} metalness={0.1} />
              <Sphere args={[2.1, 64, 64]}>
                <meshBasicMaterial color="#87CEEB" transparent opacity={0.1} side={THREE.BackSide} />
              </Sphere>
            </Sphere>
          )
        }

        const Satellite = ({ position, speed = 1 }: { position: [number, number, number]; speed?: number }) => {
          const satelliteRef = useRef<any>(null)

          useFrame((state) => {
            if (satelliteRef.current) {
              satelliteRef.current.rotation.y += 0.01 * speed
              satelliteRef.current.position.x = Math.cos(state.clock.elapsedTime * speed) * 4
              satelliteRef.current.position.z = Math.sin(state.clock.elapsedTime * speed) * 4
            }
          })

          return (
            <group ref={satelliteRef} position={position}>
              <mesh>
                <boxGeometry args={[0.1, 0.1, 0.2]} />
                <meshStandardMaterial color="#FFD700" />
              </mesh>
              <mesh position={[-0.15, 0, 0]}>
                <boxGeometry args={[0.05, 0.3, 0.1]} />
                <meshStandardMaterial color="#1a1a2e" />
              </mesh>
              <mesh position={[0.15, 0, 0]}>
                <boxGeometry args={[0.05, 0.3, 0.1]} />
                <meshStandardMaterial color="#1a1a2e" />
              </mesh>
            </group>
          )
        }

        const Scene = () => (
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4A90E2" />
            <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
            <Earth />
            <Satellite position={[4, 1, 0]} speed={1} />
            <Satellite position={[-4, -1, 2]} speed={0.8} />
            <Satellite position={[2, 3, -4]} speed={1.2} />
          </Canvas>
        )

        setComponents({ Scene })
      } catch (error) {
        console.error("Failed to load 3D components:", error)
      }
    }

    loadComponents()

    return () => {
      mounted = false
    }
  }, [])

  if (!components) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-900/20 to-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  const { Scene } = components

  return (
    <div ref={mountRef} className="absolute inset-0 z-0">
      <Scene />
    </div>
  )
}

export default function Earth3D() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-900/20 to-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return <LazyEarth3D />
}
