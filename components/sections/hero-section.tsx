"use client";

import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";
import ShinyButton from "@/components/ui/shiny-button";
import GradientText from "../ui/gradient-text";
import ThoughtfulBuildingAnimation from "../ui/thoughtful-building-animation";

export default function HeroSection() {
  const { hero } = siteConfig;
  return (
    // Use dvh/svh so mobile browser UI doesn’t shrink the hero.
    <section className="w-full min-h-[100svh] md:min-h-[80dvh] flex items-center justify-center bg-white dark:bg-black overflow-hidden">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-12 py-10 sm:py-14 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl lg:text-6xl font-medium font-geist text-gray-900 dark:text-white leading-tight"
            >
              {hero.title}{" "}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="inline-block"
              >
                <GradientText
                  gradient="from-red-600 via-red-600 to-red-600"
                  className="mt-2"
                >
                  {hero.highlighted}
                </GradientText>
              </motion.div>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="font-geist sm:text-lg md:text-xl text-gray-500 leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Every line of code, every click, every feature built with care and purpose.
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="space-y-4"
          >
            <a
              href={hero.buttonHref}
              rel="noopener noreferrer"
              className="inline-block group"
            >
              <ShinyButton>
                {hero.buttonText}
                <svg
                  className="w-5 h-5 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </ShinyButton>
            </a>
          </motion.div>
        </div>

        {/* Right: animation */}
        <div className="relative w-full h-[45vh] md:h-[55vh] lg:h-[60vh] max-h-[560px] mx-auto lg:mx-0 overflow-hidden rounded-xl flex items-center justify-center">
          <ThoughtfulBuildingAnimation />
        </div>
      </div>
    </section>
  );
}
