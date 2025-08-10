"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect } from "react";

export interface Position {
  x: number;
  y: number;
}

export interface SmoothCursorProps {
  target: Position;
  
}

export function SmoothCursor({ target }: SmoothCursorProps) {
  const cursorX = useSpring(0, {
  damping: 80,        
  stiffness: 150,   
  mass: 1.2,
});

const cursorY = useSpring(0, {
  damping: 60,
  stiffness: 150,
  mass: 1.2,
});

  useEffect(() => {
    cursorX.set(target.x);
    cursorY.set(target.y);
  }, [target.x, target.y]);

  return (
    <motion.div
      style={{
        position: "fixed",
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        rotate: "-30deg",
        zIndex: 100,
        pointerEvents: "none",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={50}
        height={54}
        viewBox="0 0 50 54"
        fill="none"
        style={{ scale: 0.5 }}
      >
        <g filter="url(#filter0_d_91_7928)">
          <path
            d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
            fill="black"
          />
          <path
            d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
            stroke="white"
            strokeWidth={2.25825}
          />
        </g>
        <defs>
          <filter
            id="filter0_d_91_7928"
            x={0.602397}
            y={0.952444}
            width={49.0584}
            height={52.428}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy={2.25825} />
            <feGaussianBlur stdDeviation={2.25825} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_91_7928"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_91_7928"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
}
