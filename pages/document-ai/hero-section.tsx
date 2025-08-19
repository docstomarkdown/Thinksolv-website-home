"use client";
import { heroContent } from "@/config/data";
import ShinyButton from "@/components/ui/shiny-button";
import GradientText from "../../components/ui/gradient-text";
import DocumentAIComponent from "./document-ai-component";

export default function HeroSection() {
  return (
    <div className="w-full flex items-center justify-center bg-cover bg-center bg-white dark:bg-black">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 xl:py-32 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        
        {/* Left Side - Text */}
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium font-geist text-gray-900 dark:text-white leading-tight">
            {heroContent.headline}
            <GradientText className="ml-1 sm:ml-2 lg:ml-1 inline-block">
              {heroContent.highlightedText}
            </GradientText>
          </h1>
          <p className="font-geist text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            {heroContent.subheadline}
          </p>
          <div className="pt-2">
            <a
              href={heroContent.primaryCTA}
              rel="noopener noreferrer"
              className="inline-block group"
            >
              <ShinyButton>
                {heroContent.secondaryCTA}
                <svg
                  className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-0.5"
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

        {/* Right Side - Visual */}
        <div className="relative w-full max-w-[700px] mx-auto aspect-square rounded-2xl shadow-inner bg-gray-100 dark:bg-gray-900">
          <DocumentAIComponent />
        </div>
      </div>
    </div>
  );
}
