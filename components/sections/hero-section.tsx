"use client";

import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";
import ShinyButton from "@/components/ui/shiny-button";
import GradientText from "../ui/gradient-text";
import HeroAnimation from "./hero-animation";

export default function HeroSection() {
  
  const { hero } = siteConfig;

  return (
    <div className="w-full flex items-center justify-center bg-cover bg-center bg-white dark:bg-black">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl lg:text-6xl font-medium font-geist text-gray-900 dark:text-white leading-tight">
              {hero.title}{" "}
              <GradientText
                gradient="from-red-600 via-red-600 to-red-600"
                className="mt-2"
              >
                {hero.highlighted}
              </GradientText>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-500 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Empowering businesses with intelligent data & workflows.
            </p>
          </div>

          {/* CTA Button */}
          <div className="space-y-4">
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
          </div>
        </div>

        {/* Right Side Placeholder for Animation */}
        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] mx-auto lg:mx-0 overflow-hidden rounded-xl flex items-center justify-center dark:bg-neutral-900">
  <HeroAnimation />
</div>
      </div>
    </div>
  );
}
