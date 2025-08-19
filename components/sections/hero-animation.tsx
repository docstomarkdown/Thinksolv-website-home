"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import * as THREE from "three";

// ---- Solved face colors (PX, NX, PY, NY, PZ, NZ)
const FACE_COLORS = {
  PX: "#ef4444", // right  (red)
  NX: "#f97316", // left   (orange)
  PY: "#ffffff", // up     (white)
  NY: "#f59e0b", // down   (yellow)
  PZ: "#3b82f6", // front  (blue)
  NZ: "#22c55e", // back   (green)
};
const INNER_FACE = "#1f2937";

type Axis = "x" | "y" | "z";
type Move = { axis: Axis; layer: number; dir: 1 | -1; duration: number };

// 🧩 Floating pieces that can: scatter -> assemble -> rotate faces -> solved stickers
function FloatingPieces({
  triggerScatter,
  triggerAssemble,
  triggerSolveSequence, // start face-turn sequence
  onSequenceDone, // callback when sequence is complete (to apply stickers)
}: {
  triggerScatter: boolean;
  triggerAssemble: boolean;
  triggerSolveSequence: boolean;
  onSequenceDone: () => void;
}) {
  const refs = useRef<THREE.Mesh[]>([]);
  const rootRef = useRef<THREE.Group>(null!);
  const pivotRef = useRef<THREE.Group>(null!); // persistent pivot
  const { scene } = useThree();

  const cubeSize = 1.7;
  const spacing = 0.05;
  const step = cubeSize + spacing;

  const totalPieces = 27; // 4x4x4

  // Where layers live along each axis (-1.5, -0.5, 0.5, 1.5) * step
  const layerCoords = useMemo(
  () => [-1, 0, 1].map((v) => v * step),
  [step]
);
  const epsilon = 1e-3;

  const scatterPositions = useMemo(() => {
    const posList: [number, number, number][] = [];
    while (posList.length < totalPieces) {
      const pos: [number, number, number] = [
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 18,
      ];
      const dist = Math.sqrt(pos[0] ** 2 + pos[1] ** 2 + pos[2] ** 2);
      if (dist > 3) posList.push(pos);
    }
    return posList;
  }, []);

 const cubePositions = useMemo(() => {
  const positions: [number, number, number][] = [];
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      for (let z = 0; z < 3; z++) {
        positions.push([(x - 1) * step, (y - 1) * step, (z - 1) * step]);
      }
    }
  }
  return positions;
}, [step]);

  const cubeColors = useMemo(() => {
    const colors = ["#f97316",  "#ef4444",  "#ffffff", "#22c55e", "#f59e0b", "#3b82f6"];
    return Array.from({ length: totalPieces }, () => colors[Math.floor(Math.random() * colors.length)]);
  }, []);

  const solvedFaceColorsForIndex = (i: number): string[] => {
  const x = Math.floor(i / 9);        // 0..2
  const y = Math.floor((i % 9) / 3);  // 0..2
  const z = i % 3;                    // 0..2
  const px = x === 2 ? FACE_COLORS.PX : INNER_FACE;
  const nx = x === 0 ? FACE_COLORS.NX : INNER_FACE;
  const py = y === 2 ? FACE_COLORS.PY : INNER_FACE;
  const ny = y === 0 ? FACE_COLORS.NY : INNER_FACE;
  const pz = z === 2 ? FACE_COLORS.PZ : INNER_FACE;
  const nz = z === 0 ? FACE_COLORS.NZ : INNER_FACE;
  return [px, nx, py, ny, pz, nz];
};

  // --- motion towards targets (scatter/assemble)
  useFrame(() => {
    // Don't fight the rotation while a sequence is running
    if (sequenceStarted.current) return;

    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const target = triggerAssemble ? cubePositions[i] : triggerScatter ? scatterPositions[i] : undefined;

      if (target) {
        mesh.position.lerp(new THREE.Vector3(...target), triggerAssemble ? 0.08 : 0.05);
      }
    });
  });

  // --------- Face turn sequence engine ----------
  const moveQueueRef = useRef<Move[]>([]);
  const activeGroupRef = useRef<THREE.Group | null>(null);
  const currentMoveRef = useRef<Move | null>(null);
  const moveClock = useRef(0);
  const sequenceStarted = useRef(false);
  const [stickersSolved, setStickersSolved] = useState(false);

  // For quaternion slerp
  const startQRef = useRef(new THREE.Quaternion());
  const endQRef = useRef(new THREE.Quaternion());
  const axisVecRef = useRef(new THREE.Vector3());

  // Build a short random sequence (looks lively)
  const buildRandomSequence = (): Move[] => {
  const axes: Axis[] = ["x", "y", "z"];
  const seq: Move[] = [];
  for (let i = 0; i < 8; i++) {
    const axis = axes[Math.floor(Math.random() * axes.length)];
    const layer = Math.floor(Math.random() * 3); // 0..2
    const dir = Math.random() < 0.5 ? 1 : -1;
    seq.push({ axis, layer, dir, duration: 0.6 });
  }
  return seq;
};

  // Start sequence once user pressed Solve (and only after assembled)
  useEffect(() => {
    if (triggerSolveSequence && triggerAssemble && !sequenceStarted.current) {
      sequenceStarted.current = true;
      moveQueueRef.current = buildRandomSequence();
    }
  }, [triggerSolveSequence, triggerAssemble]);

  // Helper: select meshes in a layer
  const selectLayerMeshes = (axis: Axis, layerIndex: number) => {
    const layerVal = layerCoords[layerIndex];
    const arr: THREE.Mesh[] = [];
    refs.current.forEach((m) => {
      if (!m) return;
      const p = m.position;
      const v = axis === "x" ? p.x : axis === "y" ? p.y : p.z;
      if (Math.abs(v - layerVal) < step * 0.5 + epsilon) {
        arr.push(m);
      }
    });
    return arr;
  };

  // Helper: smoothstep easing
  const smoothstep = (t: number) => t * t * (3 - 2 * t);

  // Process sequence in useFrame for buttery smoothness
  useFrame((_, dtRaw) => {
    if (!sequenceStarted.current) return;

    // Clamp frame spikes
    const dt = Math.min(dtRaw, 1 / 30);

    // If no current move, pop next
    if (!currentMoveRef.current) {
      const next = moveQueueRef.current.shift();
      if (!next) {
        // Done! Apply solved stickers with a tiny delay for flair
        sequenceStarted.current = false;
        setTimeout(() => {
          setStickersSolved(true);
          onSequenceDone();
        }, 250);
        return;
      }
      currentMoveRef.current = next;

      // Prepare pivot
      const g = pivotRef.current;
      g.rotation.set(0, 0, 0);
      g.position.set(0, 0, 0);
      rootRef.current.add(g);

      // Collect targets and parent under pivot (preserve world transform)
      const targets = selectLayerMeshes(next.axis, next.layer);
      targets.forEach((mesh) => g.attach(mesh));

      // Setup quaternion slerp for the move
      axisVecRef.current.set(
        next.axis === "x" ? 1 : 0,
        next.axis === "y" ? 1 : 0,
        next.axis === "z" ? 1 : 0
      );
      startQRef.current.identity();
      endQRef.current.setFromAxisAngle(axisVecRef.current, (Math.PI / 2) * next.dir);

      activeGroupRef.current = g;
      moveClock.current = 0;
    }

    // Animate current move
    const move = currentMoveRef.current!;
    moveClock.current += dt;
    const t = Math.min(moveClock.current / move.duration, 1);
    const eased = smoothstep(t);

    if (activeGroupRef.current) {
      // Slerp quaternion for silky rotation
      activeGroupRef.current.quaternion.copy(startQRef.current).slerp(endQRef.current, eased);
    }

    // Finish: bake transform back into children and reset pivot
    if (t >= 1 && activeGroupRef.current) {
      const g = activeGroupRef.current;

      g.updateMatrixWorld(true);
      const children = [...g.children] as THREE.Mesh[];

      // Bake pivot transform into each child and move back under root
      children.forEach((child) => {
        // apply world transform of pivot to child
        child.applyMatrix4(g.matrixWorld);
        rootRef.current.attach(child);

        // Snap to grid to avoid float drift
        const m = child as THREE.Mesh;
        m.position.set(
          Math.round(m.position.x / step) * step,
          Math.round(m.position.y / step) * step,
          Math.round(m.position.z / step) * step
        );
        m.rotation.set(0, 0, 0);
      });

      // Reset pivot
      g.rotation.set(0, 0, 0);
      g.position.set(0, 0, 0);

      activeGroupRef.current = null;
      currentMoveRef.current = null;
    }
  });

  return (
    <group ref={rootRef}>
      {/* persistent pivot lives under root */}
      <group ref={pivotRef} />
      {Array.from({ length: totalPieces }).map((_, i) => {
        const preSolve = Array(6).fill(cubeColors[i]) as string[];
        const solved = solvedFaceColorsForIndex(i);
        const materials = stickersSolved ? solved : preSolve;

        return (
          <mesh
            key={i}
            ref={(el) => {
              if (el) refs.current[i] = el;
            }}
            position={[0, 0, 0]}
          >
            <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
            {materials.map((col, mi) => (
              // Lambert is cheaper than Standard; swap back if you need PBR
              <meshLambertMaterial key={mi} attach={`material-${mi}`} color={col} />
            ))}
          </mesh>
        );
      })}
    </group>
  );
}

export default function HeroAnimation() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonControls = useAnimation();

  const [cursorTarget, setCursorTarget] = useState({ x: 100, y: 100 });
  const [scatter, setScatter] = useState(false);
  const [assemble, setAssemble] = useState(false);
  const [sequenceGo, setSequenceGo] = useState(false); // start face turns
  const [buttonText, setButtonText] = useState("Think");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isThinkClicked, setIsThinkClicked] = useState(false);
  const [isBuildClicked, setIsBuildClicked] = useState(false);
  const [isSolveClicked, setIsSolveClicked] = useState(false);
  const [finalCursorPos, setFinalCursorPos] = useState({ x: 100, y: 100 });

  // Step 1: Think
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (buttonRef.current && !isThinkClicked) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = rect.left + rect.width * 0.85;
        const y = rect.top + rect.height * 0.85;
        const targetPos = { x, y };
        setCursorTarget(targetPos);
        setFinalCursorPos(targetPos);
        setTimeout(() => {
          buttonControls.start({ scale: [1, 0.9, 1], transition: { duration: 0.3 } });
          setTimeout(() => {
            setScatter(true);
            setButtonText("Build");
            setIsThinkClicked(true);
          }, 600);
        }, 2000);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [buttonText, isThinkClicked, buttonControls]);

  // Step 2: Build
  useEffect(() => {
    if (buttonText === "Build" && !isBuildClicked) {
      const timeout = setTimeout(() => {
        if (buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          const x = rect.left + rect.width * 0.85;
          const y = rect.top + rect.height * 0.85;
          const targetPos = { x, y };
          setCursorTarget(targetPos);
          setFinalCursorPos(targetPos);
          setTimeout(() => {
            buttonControls.start({ scale: [1, 0.9, 1], transition: { duration: 0.3 } });
            setTimeout(() => {
              setAssemble(true);
              setButtonText("Solve");
              setIsBuildClicked(true);
            }, 600);
          }, 1500);
        }
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [buttonText, isBuildClicked, buttonControls]);

  // Step 3: Solve (click -> run face sequence -> then swap stickers)
  useEffect(() => {
    if (buttonText === "Solve" && !isSolveClicked) {
      const timeout = setTimeout(() => {
        if (buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          const x = rect.left + rect.width * 0.85;
          const y = rect.top + rect.height * 0.85;
          const targetPos = { x, y };
          setCursorTarget(targetPos);
          setFinalCursorPos(targetPos);
          setTimeout(() => {
            buttonControls.start({ scale: [1, 0.9, 1], transition: { duration: 0.3 } });
            setTimeout(() => {
              setSequenceGo(true);
              setIsSolveClicked(true);
              setTimeout(() => setCursorVisible(false), 300); // start fade after slight delay
            }, 600);
          }, 1500);
        }
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [buttonText, isSolveClicked, buttonControls]);

  const actualCursorTarget =
    isThinkClicked || isBuildClicked || isSolveClicked ? finalCursorPos : cursorTarget;

  return (
    <div className="relative w-full h-full min-h-[400px] overflow-hidden rounded-xl  ">
      <motion.div animate={{ opacity: cursorVisible ? 1 : 0 }} transition={{ duration: 0.8 }}>
        <SmoothCursor target={actualCursorTarget} />
      </motion.div>

      <Canvas
        camera={{ position: [6, 6, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        {scatter && (
          <FloatingPieces
            triggerScatter={scatter}
            triggerAssemble={assemble}
            triggerSolveSequence={sequenceGo}
            onSequenceDone={() => {
              // Stickers swap handled inside FloatingPieces; you can update UI here if desired
            }}
          />
        )}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none">
        <motion.button
          ref={buttonRef}
          animate={buttonControls}
          initial={{ opacity: 1 }}
          className="pointer-events-auto px-6 py-3 text-lg font-semibold text-secondary border border-secondary bg-white rounded-lg shadow"
        >
          {buttonText}
        </motion.button>
      </div>
    </div>
  );
}
