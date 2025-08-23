"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ThoughtfulBuildingAnimation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Building blocks that represent "solutions"
  const buildingBlocks = [
    { id: 1, delay: 0.5, x: 0, y: 0 },
    { id: 2, delay: 0.8, x: 1, y: 0 },
    { id: 3, delay: 1.1, x: 2, y: 0 },
    { id: 4, delay: 1.4, x: 0, y: 1 },
    { id: 5, delay: 1.7, x: 1, y: 1 },
    { id: 6, delay: 2.0, x: 2, y: 1 },
    { id: 7, delay: 2.3, x: 1, y: 2 }, // Top center piece
  ];

  // Floating thought bubbles representing "thoughtfully"
  const thoughtBubbles = [
    { id: 1, delay: 3.0, size: 8, x: -20, y: -30 },
    { id: 2, delay: 3.2, size: 12, x: 40, y: -20 },
    { id: 3, delay: 3.4, size: 6, x: -10, y: -50 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background subtle pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.03 : 0 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-lg"
      />

      {/* Main building structure */}
      <div className="relative">
        {/* Building blocks */}
        <div className="grid grid-cols-3 gap-2 relative">
          {buildingBlocks.map((block) => (
            <motion.div
              key={block.id}
              initial={{ 
                opacity: 0, 
                y: 50, 
                scale: 0.8,
                rotateY: -45 
              }}
              animate={isVisible ? { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                rotateY: 0 
              } : {}}
              transition={{
                duration: 0.8,
                delay: block.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`
                w-16 h-16 rounded-lg shadow-lg
                bg-gradient-to-br from-gray-200 to-gray-300 
                dark:from-gray-700 dark:to-gray-800
                border border-gray-300 dark:border-gray-600
                ${block.id === 7 ? 'col-start-2' : ''}
              `}
              style={{
                gridColumn: block.x + 1,
                gridRow: block.y + 1,
              }}
            >
              {/* Inner glow effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{
                  duration: 2,
                  delay: block.delay + 0.5,
                  repeat: Infinity,
                  repeatDelay: 4,
                }}
                className="w-full h-full rounded-lg bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/20 dark:to-red-800/20"
              />
            </motion.div>
          ))}
        </div>

        {/* Connecting lines showing thoughtful planning */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ transform: 'scale(1.2)' }}
        >
          {/* Horizontal connections */}
          <motion.line
            x1="25%" y1="25%" x2="75%" y2="25%"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4,4"
            className="text-gray-400 dark:text-gray-600"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isVisible ? { pathLength: 1, opacity: 0.5 } : {}}
            transition={{ duration: 1.5, delay: 2.5 }}
          />
          <motion.line
            x1="25%" y1="60%" x2="75%" y2="60%"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4,4"
            className="text-gray-400 dark:text-gray-600"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isVisible ? { pathLength: 1, opacity: 0.5 } : {}}
            transition={{ duration: 1.5, delay: 2.7 }}
          />
          
          {/* Vertical connections */}
          <motion.line
            x1="25%" y1="25%" x2="25%" y2="60%"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4,4"
            className="text-gray-400 dark:text-gray-600"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isVisible ? { pathLength: 1, opacity: 0.5 } : {}}
            transition={{ duration: 1.5, delay: 2.9 }}
          />
          <motion.line
            x1="75%" y1="25%" x2="75%" y2="60%"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4,4"
            className="text-gray-400 dark:text-gray-600"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isVisible ? { pathLength: 1, opacity: 0.5 } : {}}
            transition={{ duration: 1.5, delay: 3.1 }}
          />
        </svg>

        {/* Thought bubbles representing "thoughtfully" */}
        {thoughtBubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{ 
              opacity: 0, 
              scale: 0,
              y: 20 
            }}
            animate={isVisible ? { 
              opacity: 0.6, 
              scale: 1,
              y: [0, -10, 0] 
            } : {}}
            transition={{
              opacity: { duration: 0.5, delay: bubble.delay },
              scale: { duration: 0.5, delay: bubble.delay },
              y: { 
                duration: 3, 
                delay: bubble.delay + 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="absolute rounded-full bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `calc(50% + ${bubble.x}px)`,
              top: `calc(20% + ${bubble.y}px)`,
            }}
          />
        ))}

        {/* Central "solution" indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 3.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-lg">
            <motion.div
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatDelay: 3,
                ease: "easeInOut" 
              }}
              className="w-full h-full rounded-full bg-gradient-to-r from-red-400 to-red-500 opacity-50"
            />
          </div>
        </motion.div>

        {/* Subtle text labels */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 0.7, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 4 }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wider"
        >
          SOLUTIONS
        </motion.div>
      </div>
    </div>
  );
}
