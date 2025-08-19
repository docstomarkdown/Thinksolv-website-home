"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

type Tabs = { bottom: boolean; right: boolean; top: boolean; left: boolean }

// ===== Seam + scale helpers =====
const BASE_OVERLAP = 1.05        // default in-plane overlap (most pieces)
const RED_OVERLAP = 1.001        // near-zero overlap for red caps
const POLAR_NEIGH_OVERLAP = 1.005// near-zero overlap for ring next to top/bottom caps

const USE_BEVEL = false
const FILLET_RATIO = 0

// ===== Sphere scale =====
const SPHERE_RADIUS = 28
const PIECE_SIZE = 5.2

// Packs rings near poles tightly
const PHI_START_FRAC = 0.028
const PHI_END_FRAC   = 0.972

// ===== Polar radial padding =====
const POLAR_RED_OUTSET  = 0.10 * PIECE_SIZE   // push red caps outward a hair
const POLAR_NEIGH_INSET = 0.10 * PIECE_SIZE   // pull first ring inward a hair

// ===== Glow sequence & spin =====
const GLOW_WINDOW = 700          // ms for each glow pulse
const GLOW_GAP    = 300           // ms gap between pulses
const MAX_LIGHT_INTENSITY = 3.6
const BASELINE_INTENSITY  = 0.65  // persistent glow after each has pulsed
const HALO_BASE_OPACITY   = 0.28  // persistent halo opacity
const HALO_PULSE_OPACITY  = 0.9
const HALO_BASE_SCALE     = 1.15
const HALO_PULSE_SCALE    = 1.85
const SPIN_SPEED          = 0.14  // radians/sec after last glow
const GLOW_ORDER: Array<"top"|"right"|"bottom"|"left"> = ["top","right","bottom","left"]

// Utility: build tangent quaternion for a sphere point: +Z out, +Y north, +X east
const quaternionFromNormal = (normal: THREE.Vector3) => {
  const z = normal.clone().normalize()
  const worldUp = new THREE.Vector3(0, 1, 0)
  let x = new THREE.Vector3().crossVectors(worldUp, z)
  if (x.lengthSq() < 1e-8) x = new THREE.Vector3(1, 0, 0)
  else x.normalize()
  const y = new THREE.Vector3().crossVectors(z, x).normalize()
  const m = new THREE.Matrix4().makeBasis(x, y, z)
  return new THREE.Quaternion().setFromRotationMatrix(m)
}

const PuzzleSphere3D = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !mountRef.current) return

    // Scene
    const currentMount = mountRef.current
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    // Camera
    const camera = new THREE.PerspectiveCamera(50, currentMount.clientWidth / currentMount.clientHeight, 0.1, 6000)
    camera.position.set(0, 0, 120)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    currentMount.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.target.set(0, 0, 0)
    controls.minDistance = 22
    controls.maxDistance = 360

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.86))
    const dir = new THREE.DirectionalLight(0xffffff, 1)
    dir.position.set(28, 44, 22)
    dir.castShadow = true
    dir.shadow.mapSize.set(2048, 2048)
    dir.shadow.camera.near = 0.5
    dir.shadow.camera.far = 220
    dir.shadow.bias = -0.001
    scene.add(dir)
    // ===== Piece geometry =====
    const makePieceShape = (size: number, tabs: Tabs) => {
      const half = size / 2
      const tabWidth = size * 0.35
      const tabDepth = size * 0.2
      const fillet = size * FILLET_RATIO

      const roundedLineTo = (shape: THREE.Shape, xFrom: number, yFrom: number, xTo: number, yTo: number) => {
        const dx = xTo - xFrom, dy = yTo - yFrom
        const len = Math.hypot(dx, dy)
        if (len < 1e-6) return
        if (fillet <= 0) { shape.lineTo(xTo, yTo); return }
        const cut = Math.min(fillet, len * 0.5)
        const ux = dx / len, uy = dy / len
        shape.lineTo(xTo - ux * cut, yTo - uy * cut)
        shape.quadraticCurveTo(xTo, yTo, xTo + -uy * 0.0001, yTo + ux * 0.0001)
      }

      const addSideWithTab = (shape: THREE.Shape, side: "bottom" | "right" | "top" | "left", isOutie: boolean) => {
        const w2 = tabWidth / 2
        if (side === "bottom") {
          const y = -half
          roundedLineTo(shape, (shape as any).currentPoint.x, (shape as any).currentPoint.y, -w2, y)
          const dirN = isOutie ? -1 : 1
          shape.quadraticCurveTo(-w2, y + dirN * (tabDepth * 0.6), 0, y + dirN * (tabDepth * 0.8))
          shape.quadraticCurveTo(w2, y + dirN * (tabDepth * 0.6), w2, y)
          roundedLineTo(shape, w2, y, half, y)
        } else if (side === "right") {
          const x = half
          roundedLineTo(shape, (shape as any).currentPoint.x, (shape as any).currentPoint.y, x, -w2)
          const dirN = isOutie ? 1 : -1
          shape.quadraticCurveTo(x + dirN * (tabDepth * 0.6), -w2, x + dirN * (tabDepth * 0.8), 0)
          shape.quadraticCurveTo(x + dirN * (tabDepth * 0.6), w2, x, w2)
          roundedLineTo(shape, x, w2, x, half)
        } else if (side === "top") {
          const y = half
          roundedLineTo(shape, (shape as any).currentPoint.x, (shape as any).currentPoint.y, w2, y)
          const dirN = isOutie ? 1 : -1
          shape.quadraticCurveTo(w2, y + dirN * (tabDepth * 0.6), 0, y + dirN * (tabDepth * 0.8))
          shape.quadraticCurveTo(-w2, y + dirN * (tabDepth * 0.6), -w2, y)
          roundedLineTo(shape, -w2, y, -half, y)
        } else {
          const x = -half
          roundedLineTo(shape, (shape as any).currentPoint.x, (shape as any).currentPoint.y, x, w2)
          const dirN = isOutie ? -1 : 1
          shape.quadraticCurveTo(x + dirN * (tabDepth * 0.6), w2, x + dirN * (tabDepth * 0.8), 0)
          shape.quadraticCurveTo(x + dirN * (tabDepth * 0.6), -w2, x, -w2)
          roundedLineTo(shape, x, -w2, x, -half)
        }
      }

      const piece = new THREE.Shape()
      piece.moveTo(-half, -half)
      addSideWithTab(piece, "bottom", tabs.bottom)
      addSideWithTab(piece, "right", tabs.right)
      addSideWithTab(piece, "top", tabs.top)
      addSideWithTab(piece, "left", tabs.left)
      return piece
    }

    const makePieceMesh = (
      size: number,
      tabs: Tabs,
      color: string,
      inPlaneOverlap: number,
      materialTweak?: (m: THREE.MeshStandardMaterial) => void,
    ) => {
      const shape = makePieceShape(size, tabs)
      const extrudeSettings: THREE.ExtrudeGeometryOptions = {
        steps: 1,
        depth: 0.9,
        bevelEnabled: USE_BEVEL,
        bevelThickness: 0,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 1,
        curveSegments: 32,
      }
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
      geometry.scale(inPlaneOverlap, inPlaneOverlap, 1) // 2D overgrowth
      geometry.center()

      const material = new THREE.MeshStandardMaterial({ color, metalness: 0.1, roughness: 0.6 })
      if (materialTweak) materialTweak(material)
      const mesh = new THREE.Mesh(geometry, material)
      mesh.castShadow = true
      mesh.receiveShadow = true
      return mesh
    }

    // helpers
    const rand = (min: number, max: number) => Math.random() * (max - min) + min
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

    // ===== Build sphere grid with tangent quats and tab complements =====
    const createSphereGrid = (numRings: number, piecesPerRing: number[]) => {
      const sphereRadius = SPHERE_RADIUS
      const positions: THREE.Vector3[] = []
      const rotations: THREE.Quaternion[] = []
      const tabPatterns: Tabs[] = []
      const redIndices: number[] = [] // [top, bottom, right, left] in insertion order

      let pieceIndex = 0

      // Cardinals (Top, Bottom, Right, Left)
      const cardinalPositions = [
        new THREE.Vector3(0, sphereRadius, 0),   // Top (index 0)
        new THREE.Vector3(0, -sphereRadius, 0),  // Bottom (index 1)
        new THREE.Vector3(sphereRadius, 0, 0),   // Right (index 2)
        new THREE.Vector3(-sphereRadius, 0, 0),  // Left  (index 3)
      ]
      cardinalPositions.forEach((position) => {
        positions.push(position)
        rotations.push(quaternionFromNormal(position.clone().normalize()))
        tabPatterns.push({
          bottom: Math.random() > 0.5,
          top: Math.random() > 0.5,
          left: Math.random() > 0.5,
          right: Math.random() > 0.5,
        })
        redIndices.push(pieceIndex)
        pieceIndex++
      })

      const ringIndices: number[][] = []
      const ringAngles: number[][] = []

      for (let ring = 0; ring < numRings; ring++) {
        ringIndices[ring] = []
        ringAngles[ring] = []

        const ringPieces = piecesPerRing[ring]
        const t = ring / (numRings - 1)
        const phi = (PHI_START_FRAC + (PHI_END_FRAC - PHI_START_FRAC) * t) * Math.PI
        const y = sphereRadius * Math.cos(phi)
        const ringRadius = sphereRadius * Math.sin(phi)

        const firstIndexOfRing = pieceIndex

        for (let piece = 0; piece < ringPieces; piece++) {
          const theta = (piece / ringPieces) * 2 * Math.PI
          const x = ringRadius * Math.cos(theta)
          const z = ringRadius * Math.sin(theta)
          const position = new THREE.Vector3(x, y, z)

          positions.push(position)
          rotations.push(quaternionFromNormal(position.clone().normalize()))

          // random tabs then complement
          const tabs: Tabs = {
            bottom: ring < numRings - 1 ? Math.random() > 0.5 : false,
            top: ring > 0 ? Math.random() > 0.5 : false,
            left: ringPieces > 1 ? Math.random() > 0.5 : false,
            right: ringPieces > 1 ? Math.random() > 0.5 : false,
          }

          // complement horizontally: left neighbor
          if (piece > 0) {
            const leftNeighborGlobal = pieceIndex - 1
            tabs.left = !tabPatterns[leftNeighborGlobal].right
          }

          // complement vertically: nearest previous ring
          if (ring > 0) {
            const prevAngles = ringAngles[ring - 1]
            const prevGlobals = ringIndices[ring - 1]
            let nearestIdx = 0, best = Infinity
            for (let k = 0; k < prevAngles.length; k++) {
              const d = Math.abs(Math.atan2(Math.sin(theta - prevAngles[k]), Math.cos(theta - prevAngles[k])))
              if (d < best) { best = d; nearestIdx = k }
            }
            const aboveGlobal = prevGlobals[nearestIdx]
            tabs.top = !tabPatterns[aboveGlobal].bottom
          }

          tabPatterns.push(tabs)
          ringIndices[ring].push(pieceIndex)
          ringAngles[ring].push(theta)
          pieceIndex++
        }

        // wraparound complement in ring
        if (ringPieces > 1) {
          const firstGlobal = firstIndexOfRing
          const lastGlobal = firstIndexOfRing + ringPieces - 1
          tabPatterns[firstGlobal].left = !tabPatterns[lastGlobal].right
        }
      }

      return { positions, rotations, tabPatterns, redIndices, totalPieces: pieceIndex, sphereRadius }
    }

    const ringStructure = [
      1,   // Top cap
      6,   // near poles
      12,
      18,  // around equator
      12,
      6,
      1,   // Bottom cap
    ]

    const {
      positions: spherePositions,
      rotations: sphereQuats,
      tabPatterns,
      redIndices,
      totalPieces,
      sphereRadius,
    } = createSphereGrid(ringStructure.length, ringStructure)

    // === Identify polar neighbor rings for radial padding ===
    // Build quick lookup: which ring a piece index belongs to (excluding first 4 cardinals)
    const ringIndexOf: number[] = []
    {
      let idx = 4
      for (let r = 0; r < ringStructure.length; r++) {
        const count = ringStructure[r]
        for (let k = 0; k < count; k++) ringIndexOf[idx++] = r
      }
    }
    const TOP_RED = redIndices[0]
    const BOTTOM_RED = redIndices[1]
    const RIGHT_RED = redIndices[2]
    const LEFT_RED = redIndices[3]

    const isTopNeighbor = (i: number) => ringIndexOf[i] === 0 + 1 // ring just under top
    const isBottomNeighbor = (i: number) => ringIndexOf[i] === (ringStructure.length - 1) - 1 // ring just above bottom

    // scatter for animation
    const spread = 72
    const minDistance = 9
    const scatteredPositions: THREE.Vector3[] = []
    for (let i = 0; i < totalPieces; i++) {
      let p: THREE.Vector3, tries = 0
      do {
        p = new THREE.Vector3(rand(-spread, spread), rand(-spread * 0.7, spread * 0.7), rand(-spread, spread))
        tries++
        if (tries > 500) { p.multiplyScalar(1.2); break }
      } while (scatteredPositions.some((q) => q.distanceTo(p) < minDistance))
      scatteredPositions.push(p)
    }

    const greys = ["#9b9b9b", "#8a8a8a", "#b0b0b0", "#c0c0c0", "#7f7f7f", "#969696", "#a5a5a5"]

    interface PieceData {
      mesh: THREE.Mesh
      groundPosition: THREE.Vector3
      scatteredPosition: THREE.Vector3
      finalRotation: THREE.Euler
      spherePosition: THREE.Vector3
      sphereQuat: THREE.Quaternion
      fallStartTime: number
      fallDuration: number
      tornadoStartTime: number
      tornadoDuration: number
      sphereStartTime: number
      sphereDuration: number
      isRed: boolean
    }

    const easeOutBounce = (t: number) => (t < 1 / 2.75
      ? 7.5625 * t * t
      : t < 2 / 2.75
        ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
        : t < 2.5 / 2.75
          ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
          : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375)

    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
    const easeInOutQuart = (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2)

    const pieceData: PieceData[] = []
    const piecesGroup = new THREE.Group()
    scene.add(piecesGroup)

    // Store red glow handles by piece index
    const redHalos: Record<number, THREE.Mesh> = {}
    const redLights: Record<number, THREE.PointLight> = {}
    const redIndexMap: Record<"top"|"bottom"|"right"|"left", number> = {
      top: TOP_RED, bottom: BOTTOM_RED, right: RIGHT_RED, left: LEFT_RED,
    }

    // Build pieces + track assembly completion (for glow timing)
    let assemblyDoneMs = 0
    const tmpQuat = new THREE.Quaternion()

    for (let i = 0; i < totalPieces; i++) {
      const tabs = tabPatterns[i]
      const isRed = i === TOP_RED || i === BOTTOM_RED || i === RIGHT_RED || i === LEFT_RED
      const color = isRed ? "#d40000" : pick(greys)

      // Overlap policy
      let overlap = BASE_OVERLAP
      if (isRed && (i === TOP_RED || i === BOTTOM_RED)) overlap = RED_OVERLAP
      else if (!isRed && (isTopNeighbor(i) || isBottomNeighbor(i))) overlap = POLAR_NEIGH_OVERLAP

      const mesh = makePieceMesh(
        PIECE_SIZE,
        tabs,
        color,
        overlap,
        isRed ? (m) => { m.polygonOffset = true; m.polygonOffsetFactor = -0.5; m.polygonOffsetUnits = -0.5 } : undefined
      )

      // Glow attachments for red caps
      if (isRed) {
        // Additive halo shell (slightly larger than piece)
        const haloGeom = new THREE.SphereGeometry(PIECE_SIZE * 0.95, 24, 16)
        const haloMat = new THREE.MeshBasicMaterial({
          color: 0xff3333,
          transparent: true,
          opacity: 0.0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
        const halo = new THREE.Mesh(haloGeom, haloMat)
        halo.scale.setScalar(HALO_BASE_SCALE)
        mesh.add(halo)
        redHalos[i] = halo

        // Point light
        const glowLight = new THREE.PointLight(0xff3333, 0, 46, 2.0)
        mesh.add(glowLight)
        redLights[i] = glowLight
      }

      // Place targets with polar radial padding
      const basePos = spherePositions[i].clone().setLength(sphereRadius)
      if (i === TOP_RED || i === BOTTOM_RED) {
        basePos.setLength(sphereRadius + POLAR_RED_OUTSET) // push red caps outward
      } else if (isTopNeighbor(i) || isBottomNeighbor(i)) {
        basePos.setLength(sphereRadius - POLAR_NEIGH_INSET) // pull neighbors inward
      }
      const spherePos = basePos
      const sphereQuat = sphereQuats[i].clone()

      // start + ground + timings
      const startHeight = 130
      mesh.position.set(rand(-14, 14), startHeight, rand(-14, 14))
      const groundPosition = new THREE.Vector3(mesh.position.x + rand(-8, 8), 1, mesh.position.z + rand(-8, 8))
      const finalRotation = new THREE.Euler(rand(0, Math.PI * 2), rand(0, Math.PI * 2), rand(0, Math.PI * 2))

      let fallStartTime: number
      let fallDuration: number
      let tornadoStartTime: number
      let tornadoDuration: number
      let sphereStartTime: number
      let sphereDuration: number

      if (isRed) {
        fallStartTime = 0
        fallDuration = 2200
        tornadoStartTime = fallStartTime + fallDuration + 600
        tornadoDuration = 3200
        const order = [TOP_RED, BOTTOM_RED, RIGHT_RED, LEFT_RED].indexOf(i)
        sphereStartTime = tornadoStartTime + tornadoDuration + 1200 + order * 400
        sphereDuration = 2800
      } else {
        fallStartTime = 800 + rand(0, 1800)
        fallDuration = rand(1800, 2800)
        tornadoStartTime = fallStartTime + fallDuration + rand(300, 1000)
        tornadoDuration = rand(2800, 4200)
        sphereStartTime = tornadoStartTime + tornadoDuration + 2800 + (i - 4) * 110
        sphereDuration = 2200
      }

      assemblyDoneMs = Math.max(assemblyDoneMs, sphereStartTime + sphereDuration)

      piecesGroup.add(mesh)
      pieceData.push({
        mesh,
        groundPosition,
        scatteredPosition: scatteredPositions[i],
        finalRotation,
        spherePosition: spherePos,
        sphereQuat,
        fallStartTime,
        fallDuration,
        tornadoStartTime,
        tornadoDuration,
        sphereStartTime,
        sphereDuration,
        isRed,
      })
    }

    // Soft shadow plane
    const planeGeometry = new THREE.PlaneGeometry(340, 340)
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.22 })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.position.y = -1.8
    plane.rotation.x = -Math.PI / 2
    plane.receiveShadow = true
    scene.add(plane)

    // ===== Glow sequence & looped spin =====
    const startTime = Date.now()
    let lastFrameMs = startTime

    const orderIndices = GLOW_ORDER.map((k) => redIndexMap[k])
    const glowSequenceStart = assemblyDoneMs + 200 // start after pieces settle
    const glowTotalDuration = GLOW_WINDOW * 4 + GLOW_GAP * 3
    const spinStart = glowSequenceStart + glowTotalDuration

    const pulse = (t01: number) => Math.sin(Math.PI * t01) // 0..1 -> 0..1..0

    const setBaselineGlow = (idx: number) => {
      const l = redLights[idx]
      const h = redHalos[idx] as any
      if (l) l.intensity = BASELINE_INTENSITY
      if (h && h.material) h.material.opacity = HALO_BASE_OPACITY
      if (h) h.scale.setScalar(HALO_BASE_SCALE)
    }

    const setNoGlow = (idx: number) => {
      const l = redLights[idx]
      const h = redHalos[idx] as any
      if (l) l.intensity = 0
      if (h && h.material) h.material.opacity = 0
      if (h) h.scale.setScalar(HALO_BASE_SCALE)
    }

    // init: no glow visible until sequence starts
    orderIndices.forEach(setNoGlow)

    const animate = () => {
      requestAnimationFrame(animate)
      const nowMs = Date.now()
      const currentTime = nowMs - startTime
      const dt = (nowMs - lastFrameMs) / 1000
      lastFrameMs = nowMs

      pieceData.forEach((p) => {
        const {
          mesh, groundPosition, scatteredPosition, finalRotation,
          spherePosition, sphereQuat,
          fallStartTime, fallDuration, tornadoStartTime, tornadoDuration, sphereStartTime, sphereDuration,
        } = p

        if (currentTime >= fallStartTime && currentTime < fallStartTime + fallDuration) {
          const k = Math.min((currentTime - fallStartTime) / fallDuration, 1)
          const e = easeOutBounce(k)
          const sx = mesh.position.x, sz = mesh.position.z, sh = 130
          mesh.position.set(
            sx + (groundPosition.x - sx) * e,
            sh + (groundPosition.y - sh) * e,
            sz + (groundPosition.z - sz) * e,
          )
          mesh.rotation.x = finalRotation.x * e * 0.3
          mesh.rotation.y = finalRotation.y * e * 0.3
          mesh.rotation.z = finalRotation.z * e * 0.3
        } else if (currentTime >= tornadoStartTime && currentTime < tornadoStartTime + tornadoDuration) {
          const k = Math.min((currentTime - tornadoStartTime) / tornadoDuration, 1)
          const e = easeInOutCubic(k)
          mesh.position.lerpVectors(groundPosition, scatteredPosition, e)
          mesh.rotation.x = finalRotation.x * e
          mesh.rotation.y = finalRotation.y * e
          mesh.rotation.z = finalRotation.z * e
        } else if (currentTime >= sphereStartTime && currentTime < sphereStartTime + sphereDuration) {
          const k = Math.min((currentTime - sphereStartTime) / sphereDuration, 1)
          const e = easeInOutQuart(k)
          mesh.position.lerpVectors(scatteredPosition, spherePosition, e)
          tmpQuat.setFromEuler(finalRotation)
          mesh.quaternion.copy(tmpQuat).slerp(sphereQuat, e)
        } else if (currentTime >= fallStartTime + fallDuration && currentTime < tornadoStartTime) {
          mesh.position.copy(groundPosition)
        } else if (currentTime >= tornadoStartTime + tornadoDuration && currentTime < sphereStartTime) {
          mesh.position.copy(scatteredPosition)
          mesh.rotation.copy(finalRotation)
        } else if (currentTime >= sphereStartTime + sphereDuration) {
          mesh.position.copy(spherePosition)
          mesh.quaternion.copy(sphereQuat)
        }
      })

      // Glow sequence (one after another), previously-glowed reds keep baseline glow (do not disappear)
      if (currentTime >= glowSequenceStart && currentTime < spinStart) {
        const tSeq = currentTime - glowSequenceStart

        // how many reds fully completed pulse so far
        const segLen = GLOW_WINDOW + GLOW_GAP
        const completed = Math.floor(Math.max(0, tSeq - GLOW_WINDOW) / segLen) + 0 // completed pulses

        // set baseline glow for completed ones
        for (let c = 0; c < Math.min(completed + 1, orderIndices.length); c++) {
          const idxDone = orderIndices[c]
          setBaselineGlow(idxDone)
        }

        // active segment
        const activeSeg = Math.floor(tSeq / segLen)
        if (activeSeg >= 0 && activeSeg < orderIndices.length) {
          const segStart = activeSeg * segLen
          const tInSeg = tSeq - segStart
          if (tInSeg <= GLOW_WINDOW) {
            const idx = orderIndices[activeSeg]
            const l = redLights[idx]; const h = redHalos[idx] as any
            const p = pulse(tInSeg / GLOW_WINDOW)
            if (l) l.intensity = BASELINE_INTENSITY + (MAX_LIGHT_INTENSITY - BASELINE_INTENSITY) * p
            if (h && h.material) h.material.opacity = HALO_BASE_OPACITY + (HALO_PULSE_OPACITY - HALO_BASE_OPACITY) * p
            if (h) {
              const s = HALO_BASE_SCALE + (HALO_PULSE_SCALE - HALO_BASE_SCALE) * p
              h.scale.setScalar(s)
            }
          }
        }
      }

      // After last glow: start slow spin (loop), keep ALL reds at baseline glow forever
      if (currentTime >= spinStart) {
        piecesGroup.rotation.y += SPIN_SPEED * dt
        orderIndices.forEach(setBaselineGlow)
      }

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!mountRef.current) return
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "760px", borderRadius: "12px", overflow: "hidden", cursor: "grab" }}
    />
  )
}

export default PuzzleSphere3D
