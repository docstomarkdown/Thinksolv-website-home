"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import GradientText from "./gradient-text";

interface AnimatedHeroTextProps {
  title: string;
  highlighted: string;
  className?: string;
}

export default function AnimatedHeroText({ title, highlighted, className = "" }: AnimatedHeroTextProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  // Animation variants for each word
  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
  };

  // Animation variants for the highlighted word
  const highlightedVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1] as any,
        delay: 0.6,
      },
    },
  };

  // Split title into words and highlighted text into letters
  const titleWords = title.split(" ");
  const highlightedLetters = highlighted.split("");

  return (
    <motion.h1
      className={`text-4xl lg:text-5xl font-medium font-geist text-gray-900 dark:text-white leading-tight ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {/* Animated title words */}
      <div className="overflow-hidden">
        {titleWords.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            className="inline-block mr-4"
            style={{ transformOrigin: "bottom" }}
          >
            {word}
          </motion.span>
        ))}
      </div>

      {/* Animated highlighted word with letter-by-letter animation */}
      <div className="mt-2 relative overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-red-100 to-red-50 dark:from-red-900/20 dark:to-red-800/20 rounded-lg -z-10"
          style={{ transformOrigin: "left" }}
        />
        <GradientText
          gradient="from-red-600 via-red-600 to-red-600"
          className="relative"
        >
          {highlightedLetters.map((letter, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="inline-block"
              style={{ transformOrigin: "bottom" }}
            >
              {letter}
            </motion.span>
          ))}
        </GradientText>
      </div>
    </motion.h1>
  );
}
