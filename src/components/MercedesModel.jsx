import React, { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

/* ═══════════════════════════════════════════════════════════════════
   Automotive Paint Material Presets
   ═══════════════════════════════════════════════════════════════════ */
const PAINT_COLORS = {
  '#1a1a2e': {
    color: '#1a1a2e',
    metalness: 0.9,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
  },
  '#e8e6e1': {
    color: '#e8e6e1',
    metalness: 0.7,
    roughness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
  },
  '#1b3a5c': {
    color: '#1b3a5c',
    metalness: 0.85,
    roughness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
  },
  '#8c8c8c': {
    color: '#8c8c8c',
    metalness: 0.95,
    roughness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
  },
}

/* ═══════════════════════════════════════════════════════════════════
   Helper — classify meshes
   ═══════════════════════════════════════════════════════════════════ */
const isBodyMesh = (meshName, matName) => {
  const m = matName.toLowerCase()
  const n = meshName.toLowerCase()
  const bodyKeywords = [
    'body', 'paint', 'car_paint', 'carpaint', 'exterior', 'shell',
    'fender', 'bumper', 'quarter', 'roof', 'trunk', 'bonnet', 'hood',
    'door', 'panel', 'frame', 'pillar',
  ]
  return bodyKeywords.some((kw) => m.includes(kw) || n.includes(kw))
}

const isExcluded = (meshName, matName) => {
  const m = matName.toLowerCase()
  const n = meshName.toLowerCase()
  const excludeKeywords = [
    'glass', 'window', 'windshield', 'chrome', 'metal_trim',
    'tire', 'tyre', 'rubber', 'wheel', 'rim', 'brake',
    'light', 'lamp', 'lens', 'headlight', 'taillight',
    'interior', 'seat', 'leather', 'fabric', 'carpet', 'dashboard',
    'mirror_glass', 'emblem', 'logo', 'grille_chrome', 'badge',
    'exhaust', 'undercarriage',
  ]
  return excludeKeywords.some((kw) => m.includes(kw) || n.includes(kw))
}

/* ═══════════════════════════════════════════════════════════════════
   MercedesModel Component
   Loads the REAL GLB from /models/mercedes.glb
   ═══════════════════════════════════════════════════════════════════ */
export default function MercedesModel({
  currentColor = '#1a1a2e',
  doorsOpen = { left: false, right: false },
  engineMode = false,
}) {
  const groupRef = useRef()
  const { scene } = useGLTF('/models/mercedes.glb')

  /* Clone once so we never mutate the drei cache */
  const clonedScene = useMemo(() => scene.clone(true), [scene])

  /* Refs to animated sub-meshes */
  const doorMeshes = useRef({ left: [], right: [], hood: [] })

  /* ── Discover doors & hood on first render ────────────────── */
  useEffect(() => {
    const left = []
    const right = []
    const hood = []

    clonedScene.traverse((child) => {
      const n = (child.name || '').toLowerCase()
      if (
        n.includes('door') &&
        (n.includes('left') || n.includes('_l') || n.includes('.l') || n.includes('_fl') || n.includes('_rl'))
      ) {
        left.push(child)
      } else if (
        n.includes('door') &&
        (n.includes('right') || n.includes('_r') || n.includes('.r') || n.includes('_fr') || n.includes('_rr'))
      ) {
        right.push(child)
      }
      if (n.includes('hood') || n.includes('bonnet') || n.includes('engine_cover')) {
        hood.push(child)
      }
    })

    doorMeshes.current = { left, right, hood }
  }, [clonedScene])

  /* ── Apply paint color ────────────────────────────────────── */
  useEffect(() => {
    const paint = PAINT_COLORS[currentColor] || PAINT_COLORS['#1a1a2e']
    const target = new THREE.Color(paint.color)

    clonedScene.traverse((child) => {
      if (!child.isMesh || !child.material) return

      // Handle both single materials and multi-material arrays
      const materials = Array.isArray(child.material) ? child.material : [child.material]

      materials.forEach((mat) => {
        if (!mat) return
        const meshName = child.name || ''
        const matName = mat.name || ''

        if (isBodyMesh(meshName, matName) && !isExcluded(meshName, matName)) {
          /* Animate colour smoothly if material supports color */
          if (mat.color) {
            gsap.to(mat.color, {
              r: target.r,
              g: target.g,
              b: target.b,
              duration: 0.8,
              ease: 'power2.inOut',
            })
          }

          /* Physical paint properties */
          mat.metalness = paint.metalness
          mat.roughness = paint.roughness
          if (mat.isMeshPhysicalMaterial) {
            mat.clearcoat = paint.clearcoat
            mat.clearcoatRoughness = paint.clearcoatRoughness
          }
          mat.envMapIntensity = 1.5
          mat.needsUpdate = true
        }
      })

      /* Ensure everything casts / receives shadows */
      child.castShadow = true
      child.receiveShadow = true
    })
  }, [currentColor, clonedScene])

  /* ── Animate doors ────────────────────────────────────────── */
  useEffect(() => {
    const { left, right } = doorMeshes.current
    left.forEach((m) =>
      gsap.to(m.rotation, {
        y: doorsOpen.left ? -Math.PI / 3 : 0,
        duration: 1.2,
        ease: 'power3.inOut',
      }),
    )
    right.forEach((m) =>
      gsap.to(m.rotation, {
        y: doorsOpen.right ? Math.PI / 3 : 0,
        duration: 1.2,
        ease: 'power3.inOut',
      }),
    )
  }, [doorsOpen])

  /* ── Animate hood / engine mode ───────────────────────────── */
  useEffect(() => {
    doorMeshes.current.hood.forEach((m) =>
      gsap.to(m.rotation, {
        x: engineMode ? -Math.PI / 6 : 0,
        duration: 1.5,
        ease: 'power3.inOut',
      }),
    )
  }, [engineMode])

  /* ── Gentle breathing animation ───────────────────────────── */
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.015
    }
  })

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={clonedScene} scale={1} />

      {/* Engine bay glow when inspecting */}
      {engineMode && (
        <>
          <pointLight
            position={[0, 1.2, 1.5]}
            intensity={2}
            color="#ff6b35"
            distance={3}
            decay={2}
          />
          <pointLight
            position={[0, 0.8, 1.2]}
            intensity={1}
            color="#ff9f43"
            distance={2}
            decay={2}
          />
        </>
      )}
    </group>
  )
}

/* Pre-load the model so drei caches it early */
useGLTF.preload('/models/mercedes.glb')
