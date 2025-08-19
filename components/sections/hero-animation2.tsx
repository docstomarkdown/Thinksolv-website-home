'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'

export default function PuzzleMerge() {
  const [playing, setPlaying] = useState(true)
  const [cycle, setCycle] = useState(0)

  const GRID: [number, number, number] = [4, 4, 4]
  const GAP = 0.07
  const pieceSize = 0.6
  const duration = 3.2
  const scatterRadius = 6

  const { count, starts, targets, delays, colors } = useMemo(() => {
    const [gx, gy, gz] = GRID
    const total = gx * gy * gz
    const starts: THREE.Vector3[] = []
    const targets: THREE.Vector3[] = []
    const delays: number[] = []
    const colors: THREE.Color[] = []

    const ox = (gx - 1) * (pieceSize + GAP) * 0.5
    const oy = (gy - 1) * (pieceSize + GAP) * 0.5
    const oz = (gz - 1) * (pieceSize + GAP) * 0.5

    let i = 0
    for (let z = 0; z < gz; z++) {
      for (let y = 0; y < gy; y++) {
        for (let x = 0; x < gx; x++) {
          const dir = new THREE.Vector3().randomDirection()
          const r = scatterRadius * (0.45 + Math.random() * 0.55)
          starts.push(dir.multiplyScalar(r))

          const tx = x * (pieceSize + GAP) - ox
          const ty = y * (pieceSize + GAP) - oy
          const tz = z * (pieceSize + GAP) - oz
          targets.push(new THREE.Vector3(tx, ty, tz))

          delays.push(Math.random() * 1.6)

          const hue = THREE.MathUtils.mapLinear(i, 0, total - 1, 0.55, 0.95)
          colors.push(new THREE.Color().setHSL(hue, 0.55, 0.55))

          i++
        }
      }
    }

    return { count: total, starts, targets, delays, colors }
  }, [cycle, GRID, GAP, pieceSize, scatterRadius])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 480, background: '#ffffff' }}>
      <Canvas
        camera={{ position: [5.5, 4.5, 6.5], fov: 45 }}
        dpr={[1, 2]}
        onCreated={({ gl }) => void gl.setClearColor('#ffffff')}
      >
        <ambientLight intensity={0.7} />
        <directionalLight intensity={1} position={[6, 8, 4]} />
        <Environment preset="city" />
        <PuzzlePieces
          count={count}
          starts={starts}
          targets={targets}
          delays={delays}
          colors={colors}
          size={pieceSize}
          duration={duration}
          playing={playing}
          onFinish={() => {}}
          key={cycle}
        />
        <OrbitControls enableDamping makeDefault />
      </Canvas>

      {/* UI Overlay */}
      <div style={{ position: 'absolute', left: 16, bottom: 16, display: 'flex', gap: 8 }}>
        <button
          onClick={() => setPlaying((p) => !p)}
          style={btnStyle}
          aria-label={playing ? 'Pause animation' : 'Play animation'}
        >
          {playing ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={() => {
            setCycle((c) => c + 1)
            setPlaying(true)
          }}
          style={btnStyle}
          aria-label="Restart animation"
        >
          Restart
        </button>
      </div>
    </div>
  )
}

type PuzzlePiecesProps = {
  count: number
  starts: THREE.Vector3[]
  targets: THREE.Vector3[]
  delays: number[]
  colors: THREE.Color[]
  size: number
  duration: number
  playing: boolean
  onFinish?: () => void
}

function PuzzlePieces({
  count,
  starts,
  targets,
  delays,
  colors,
  size,
  duration,
  playing,
  onFinish,
}: PuzzlePiecesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const timeRef = useRef(0)
  const didFinishRef = useRef(false)
  const temp = useMemo(() => new THREE.Object3D(), [])

  useEffect(() => {
    if (!meshRef.current) return
    for (let i = 0; i < count; i++) {
      meshRef.current.setColorAt(i, colors[i])
    }
    meshRef.current.instanceColor!.needsUpdate = true
  }, [count, colors])

  useEffect(() => {
    timeRef.current = 0
    didFinishRef.current = false
  }, [])

  useFrame((_, delta) => {
    if (playing) timeRef.current += delta
    const tGlobal = timeRef.current
    let allComplete = true

    for (let i = 0; i < count; i++) {
      const t = Math.min(1, Math.max(0, (tGlobal - delays[i]) / duration))
      const e = easeInOutCubic(t)

      const from = starts[i]
      const to = targets[i]
      temp.position.lerpVectors(from, to, e)

      const spin = 2 * (1 - e)
      temp.rotation.set(spin * 0.6, spin * 0.9, spin * 0.3)

      temp.scale.setScalar(THREE.MathUtils.lerp(0.6, 1, e))
      temp.updateMatrix()
      meshRef.current.setMatrixAt(i, temp.matrix)

      if (e < 1) allComplete = false
    }

    meshRef.current.instanceMatrix.needsUpdate = true

    if (allComplete && !didFinishRef.current) {
      didFinishRef.current = true
      onFinish?.()
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow receiveShadow>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial vertexColors roughness={0.45} metalness={0.05} />
    </instancedMesh>
  )
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

const btnStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: 12,
  border: '1px solid rgba(0,0,0,0.15)',
  background: 'rgba(0,0,0,0.06)',
  backdropFilter: 'blur(6px)',
  color: 'black',
  fontSize: 14,
  cursor: 'pointer',
}
