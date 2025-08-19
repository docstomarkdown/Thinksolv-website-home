"use client";

import React, { useMemo, useRef, useLayoutEffect, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// Lazy-load GSAP on the client to avoid SSR issues
let gsap: any = null;
let ScrollTrigger: any = null;
if (typeof window !== "undefined") {
  import("gsap").then((m) => {
    gsap = m.gsap || m.default || m;
    import("gsap/ScrollTrigger").then((st) => {
      ScrollTrigger = st.ScrollTrigger || st.default || st;
      if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    });
  });
}

// --- CONFIG ---
const MODULE_COUNT = 12; // number of floating modules
const GRID_SIZE = [3, 2, 2]; // final assembled shape: X by Y by Z (3*2*2 = 12)
const SCROLL_SECTION_HEIGHT = 2400; // px scrollable area to play the assembly

function GlassModule({ index, initial, target }: { index: number; initial: THREE.Vector3; target: THREE.Vector3 }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null!);
  const [hovered, setHovered] = useState(false);

  // Gentle float animation
  useFrame((state, dt) => {
    const t = state.clock.getElapsedTime() + index * 0.2;
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(t) * 0.0015; // micro bob
      meshRef.current.rotation.x += 0.005 * dt;
      meshRef.current.rotation.y += 0.006 * dt;
    }
    if (materialRef.current) {
      // ease emissive intensity toward hover target for a soft inner glow
      const targetIntensity = hovered ? 1.0 : 0.12;
      materialRef.current.emissiveIntensity += (targetIntensity - materialRef.current.emissiveIntensity) * 0.08;
    }
  });

  useEffect(() => {
    if (!gsap || !ScrollTrigger || !meshRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        scrollTrigger: {
          trigger: "#assembly-trigger",
          start: "top top",
          end: `+=${SCROLL_SECTION_HEIGHT}`,
          scrub: true,
        },
      });

      // Position animation from scattered initial -> target grid
      tl.fromTo(
        meshRef.current!.position,
        { x: initial.x, y: initial.y, z: initial.z },
        { x: target.x, y: target.y, z: target.z },
        0
      );

      // Rotation settles as they click together
      tl.to(
        meshRef.current!.rotation,
        { x: 0, y: 0, z: 0 },
        0
      );
    });

    return () => ctx.revert();
  }, [initial, target]);

  return (
    <mesh
      ref={meshRef}
      castShadow
      receiveShadow
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={(e) => (e.stopPropagation(), setHovered(false))}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        ref={materialRef}
        transmission={1}
        roughness={0.1}
        thickness={0.7}
        ior={1.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
        attenuationColor={new THREE.Color("#a3d3ff")}
        attenuationDistance={2.5}
        color={new THREE.Color("#ffffff")}
        emissive={new THREE.Color("#cde7ff")}
        emissiveIntensity={0.12}
        metalness={0.0}
      />
    </mesh>
  );
}

function Scene() {
  // precompute positions
  const { initialPositions, targetPositions } = useMemo(() => {
    const initial: THREE.Vector3[] = [];
    const targets: THREE.Vector3[] = [];

    // Random scattered cloud (within a sphere)
    for (let i = 0; i < MODULE_COUNT; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      initial.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi) * 0.6,
        r * Math.sin(phi) * Math.sin(theta)
      ));
    }

    // Final interlocking grid (centered), slightly spaced
    const [gx, gy, gz] = GRID_SIZE;
    const spacing = 1.15;
    const offsetX = -((gx - 1) * spacing) / 2;
    const offsetY = -((gy - 1) * spacing) / 2;
    const offsetZ = -((gz - 1) * spacing) / 2;

    let i = 0;
    for (let y = 0; y < gy; y++) {
      for (let z = 0; z < gz; z++) {
        for (let x = 0; x < gx; x++) {
          if (i >= MODULE_COUNT) break;
          targets.push(new THREE.Vector3(
            offsetX + x * spacing,
            offsetY + y * spacing,
            offsetZ + z * spacing
          ));
          i++;
        }
      }
    }

    return { initialPositions: initial, targetPositions: targets };
  }, []);

  // Soft camera parallax on scroll
  const cameraGroup = useRef<THREE.Group>(null!);
  useFrame(({ mouse }) => {
    if (cameraGroup.current) {
      cameraGroup.current.rotation.y = THREE.MathUtils.lerp(cameraGroup.current.rotation.y, mouse.x * 0.2, 0.05);
      cameraGroup.current.rotation.x = THREE.MathUtils.lerp(cameraGroup.current.rotation.x, -mouse.y * 0.1, 0.05);
    }
  });

  return (
    <group>
      {/* Lighting for glassmorphism */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, -4, -3]} intensity={0.4} />

      <group ref={cameraGroup}>
        {initialPositions.map((p, i) => (
          <GlassModule key={i} index={i} initial={p} target={targetPositions[i]} />
        ))}
      </group>

      {/* Subtle environment reflections */}
      <Environment preset="city" />

      {/* Post-processing for glow */}
      <EffectComposer>
        <Bloom mipmapBlur intensity={0.8} luminanceThreshold={0.2} luminanceSmoothing={0.2} />
      </EffectComposer>
    </group>
  );
}

export default function GlassModulesAssembly() {
  // Add a body scroll section to drive the animation
  useLayoutEffect(() => {
    if (!gsap || !ScrollTrigger) return;
    const ctx = gsap.context(() => {
      // pin a section to control the scroll range of the 3D scene
      ScrollTrigger.create({
        trigger: "#assembly-trigger",
        start: "top top",
        end: `+=${SCROLL_SECTION_HEIGHT}`,
        pin: true,
        anticipatePin: 1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full min-h-screen text-white" style={{ background: "radial-gradient(1200px 600px at 20% 10%, rgba(255, 255, 255, 0.25), transparent), radial-gradient(1000px 800px at 80% 20%, rgba(233, 233, 239, 0.18), transparent), linear-gradient(180deg, #0b1020 0%, #0a0f1a 100%)" }}>
      {/* Hero copy */}
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-24">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">Modular Services, One Cohesive Solution</h1>
        <p className="mt-6 text-lg/7 text-white/80">
          Hover to see each module glow. Scroll to watch them align, rotate, and click into a single, interlocking structure.
        </p>
      </section>

      {/* 3D Canvas Section (pinned during scroll) */}
      <section id="assembly-trigger" className="w-full" style={{ height: SCROLL_SECTION_HEIGHT }}>
        <Canvas
          shadows
          camera={{ position: [6, 4, 8], fov: 50, near: 0.1, far: 100 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: "100%", height: "100%" }}
        >
          <color attach="background" args={["#ffffffff"]} />
          <fog attach="fog" args={["#ffffffff", 10, 30]} />
          <Scene />
          <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI * 0.66} />
        </Canvas>
      </section>

      {/* Outro copy */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <h2 className="text-2xl md:text-3xl font-semibold">Transparent by Design</h2>
        <p className="mt-4 text-white/75">Glassmorphism materials and subtle post-processing keep the final structure solid yet see-through, so your audience grasps how each part contributes to the whole.</p>
      </section>

      {/* Frosted UI chrome overlay (purely aesthetic) */}
      <div className="pointer-events-none fixed inset-x-6 top-6 mx-auto max-w-5xl rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl" style={{ height: 72 }} />
    </div>
  );
}

