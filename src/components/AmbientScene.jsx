import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ── Floating Dust Particles ───────────────────────────────────────── */
function DustParticles({ count = 200 }) {
  const meshRef = useRef()

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const speeds = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = Math.random() * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      sizes[i] = Math.random() * 0.03 + 0.01
      speeds[i] = Math.random() * 0.3 + 0.1
    }

    return { positions, sizes, speeds }
  }, [count])

  useFrame((state) => {
    if (!meshRef.current) return
    const posAttr = meshRef.current.geometry.attributes.position
    const time = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Gentle upward drift
      posAttr.array[i3 + 1] += particles.speeds[i] * 0.002
      // Horizontal sway
      posAttr.array[i3] += Math.sin(time * 0.2 + i) * 0.001
      posAttr.array[i3 + 2] += Math.cos(time * 0.15 + i * 0.5) * 0.001

      // Reset when too high
      if (posAttr.array[i3 + 1] > 8) {
        posAttr.array[i3 + 1] = 0
        posAttr.array[i3] = (Math.random() - 0.5) * 20
        posAttr.array[i3 + 2] = (Math.random() - 0.5) * 20
      }
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ── Volumetric Fog Planes ─────────────────────────────────────────── */
function VolumetricFog() {
  const fogRef = useRef()

  useFrame((state) => {
    if (fogRef.current) {
      fogRef.current.rotation.y = state.clock.elapsedTime * 0.02
      fogRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2 + 0.5
    }
  })

  return (
    <group ref={fogRef}>
      {[...Array(3)].map((_, i) => (
        <mesh
          key={i}
          position={[0, 0.5 + i * 0.8, 0]}
          rotation={[-Math.PI / 2, 0, (Math.PI * 2 * i) / 3]}
        >
          <planeGeometry args={[25, 25]} />
          <meshBasicMaterial
            color="#111122"
            transparent
            opacity={0.03}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ── Ground Glow Ring ──────────────────────────────────────────────── */
function GroundGlow() {
  const ringRef = useRef()

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.material.opacity =
        0.08 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03
    }
  })

  return (
    <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
      <ringGeometry args={[3, 6, 64]} />
      <meshBasicMaterial
        color="#4a6fa5"
        transparent
        opacity={0.08}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

/* ── Main Ambient Scene Export ─────────────────────────────────────── */
export default function AmbientScene() {
  return (
    <group>
      <DustParticles count={150} />
      <VolumetricFog />
      <GroundGlow />
    </group>
  )
}
