"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Stars } from "@react-three/drei"
import * as THREE from "three"

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002
    }
  })

  return (
    <Sphere ref={earthRef} args={[2, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial map={null} color="#4A90E2" roughness={0.8} metalness={0.1} />
      {/* Atmosphere */}
      <Sphere args={[2.1, 64, 64]}>
        <meshBasicMaterial color="#87CEEB" transparent opacity={0.1} side={THREE.BackSide} />
      </Sphere>
    </Sphere>
  )
}

function Satellite({ position, speed = 1 }: { position: [number, number, number]; speed?: number }) {
  const satelliteRef = useRef<THREE.Group>(null)

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
      {/* Solar panels */}
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

function OrbitingCamera() {
  const cameraRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (cameraRef.current) {
      const time = state.clock.elapsedTime * 0.5
      cameraRef.current.position.x = Math.cos(time) * 8
      cameraRef.current.position.z = Math.sin(time) * 8
      cameraRef.current.position.y = Math.sin(time * 0.5) * 2
      cameraRef.current.lookAt(0, 0, 0)
    }
  })

  return <group ref={cameraRef} />
}

export default function Earth3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4A90E2" />

        <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />

        <Earth />

        <Satellite position={[4, 1, 0]} speed={1} />
        <Satellite position={[-4, -1, 2]} speed={0.8} />
        <Satellite position={[2, 3, -4]} speed={1.2} />

        <OrbitingCamera />
      </Canvas>
    </div>
  )
}
