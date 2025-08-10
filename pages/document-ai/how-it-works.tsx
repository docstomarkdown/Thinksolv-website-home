"use client";

import { useEffect, useRef, useState } from "react";
import {
  PiNumberCircleOneLight,
  PiNumberCircleTwoLight,
  PiNumberCircleThreeLight,
} from "react-icons/pi";
import GradientText from "@/components/ui/gradient-text";
import DotBadge from "@/components/ui/dotbadge";
import { motion, AnimatePresence } from "framer-motion";

const sectionContent = {
  title: "of your Documents",
  span: "Unlock the Potential",
  description:
    "Our AI transforms raw data into actionable insights with unmatched precision.",
  items: [
    {
      icon: PiNumberCircleOneLight,
      title: "Upload your Document",
      description:
        "Simply drag and drop or select your document. We support PDF, Word, images, and various other formats for seamless processing.",
      details: [
        "Drag & drop interface",
        "Multiple file formats supported",
        "Batch upload capability",
        "Secure cloud storage"
      ]
    },
    {
      icon: PiNumberCircleTwoLight,
      title: "AI Processing",
      description:
        "Our advanced AI algorithms analyze your document, extracting key information, understanding context, and preparing intelligent insights.",
      details: [
        "Natural Language Processing",
        "Computer Vision technology",
        "Contextual understanding",
        "Real-time processing"
      ]
    },
    {
      icon: PiNumberCircleThreeLight,
      title: "Get Results",
      description:
        "Receive structured data, summaries, and actionable insights from your document in seconds, ready for your next workflow.",
      details: [
        "Structured JSON output",
        "Customizable templates",
        "API integration",
        "Downloadable reports"
      ]
    },
  ],
};

export default function HowItWorksSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const animationInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAutoCycle();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      stopAutoCycle();
    };
  }, []);

  const startAutoCycle = () => {
    stopAutoCycle(); // Clear any existing interval
    animationInterval.current = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % sectionContent.items.length);
      setExpandedStep(null);
      
      // Expand the step after a brief delay
      setTimeout(() => {
        setExpandedStep((prev) => 
          prev === null ? activeStepIndex : null
        );
      }, 1000);
    }, 4000); // Total cycle time for each step
  };

  const stopAutoCycle = () => {
    if (animationInterval.current) {
      clearInterval(animationInterval.current);
    }
  };

  const handleStepClick = (index: number) => {
    stopAutoCycle();
    setActiveStepIndex(index);
    setExpandedStep(expandedStep === index ? null : index);
    startAutoCycle(); // Restart auto-cycle after manual interaction
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <DotBadge
          label="How It Works"
          className="mb-8"
          textSize="text-md"
        />
        <motion.h2 
          className="text-4xl sm:text-5xl font-medium font-geist mb-6 text-black dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GradientText
            className="block mb-4"
          >
            {sectionContent.span}
          </GradientText>
          {sectionContent.title}
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-600 font-geist max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {sectionContent.description}
        </motion.p>
      </div>

      {/* Steps with animation */}
      <div className="relative">
        <div className="absolute left-8 top-20 bottom-20 w-0.5 bg-transparent hidden sm:block" />

        {sectionContent.items.map((step, index) => {
          const Icon = step.icon;
          const isActive = activeStepIndex === index;
          const isExpanded = expandedStep === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: isActive ? 1 : 0.4,
                y: 0,
                scale: isActive ? 1 : 0.98
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={() => handleStepClick(index)}
              className={`relative flex items-start mb-16 last:mb-0 cursor-pointer group`}
            >
              {/* Animated Icon */}
              <motion.div
                className={`relative flex-shrink-0 mr-8`}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className={`w-16 h-16 rounded-full mt-10 bg-gradient-to-br from-white to-gray-50 border-2 ${
                    isActive ? 'border-bordercolor' : 'border-gray-200'
                  } flex items-center justify-center shadow-lg`}
                  animate={{
                    scale: isActive ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.5, 1]
                  }}
                >
                  <Icon
                    className={`w-12 h-12 transition-all duration-300 ${
                      isActive ? "text-secondary" : "text-gray-400"
                    }`}
                  />
                </motion.div>
              </motion.div>

              {/* Content */}
              <motion.div
                className={`flex-1 bg-white border ${
                  isActive ? 'border-bordercolor' : 'border-gray-200'
                } rounded-xl py-4 p-5`}
                layout
                animate={{
                  borderColor: isActive ? 'black' : 'gray-500',
                  boxShadow: isActive ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.h3
                  className={`text-2xl font-medium font-geist mb-4 ${
                    isActive ? "text-primary" : "text-gray-700"
                  }`}
                >
                  {step.title}
                </motion.h3>
                <motion.p
                  className={`text-gray-600 leading-relaxed font-geist text-lg mb-4`}
                >
                  {step.description}
                </motion.p>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: 1, 
                        height: 'auto',
                        transition: { 
                          opacity: { duration: 0.3 },
                          height: { duration: 0.4 } 
                        }
                      }}
                      exit={{ 
                        opacity: 0, 
                        height: 0,
                        transition: { 
                          opacity: { duration: 0.2 },
                          height: { duration: 0.3 } 
                        }
                      }}
                      className="overflow-hidden space-y-2 pl-4"
                    >
                      
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}