"use client";
import { heroContent } from "@/config/data";
import ShinyButton from "@/components/ui/shiny-button";
import GradientText from "../../components/ui/gradient-text";
import DocumentAIComponent from "./document-ai-component";

export default function HeroSection() {
  return (
    <div className="w-full flex items-center justify-center bg-cover bg-center bg-white dark:bg-black">
      <div className="w-full py-16 md:py-30 lg:p-40 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12">
        
        {/* Left Side - Text Content */}
        <div className="flex-1 text-center lg:text-left space-y-6 lg:-translate-x-4 px-2 md:px-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium font-geist text-gray-900 dark:text-white leading-tight">
            {heroContent.headline}
            <GradientText className="ml-2">{heroContent.highlightedText}</GradientText>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
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
                  className="w-5 h-5 ml-2 transition-transform duration-300"
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

        {/* Right Side - Visual Component */}
        <div className="flex-1 flex justify-center items-center lg:translate-x-4 w-full">
          <div className="w-full max-w-[90vw] sm:max-w-[500px] md:max-w-[750px] lg:w-[850px] aspect-[3/2] bg-white lg:mr-30 dark:bg-gray-800 rounded-xl ">
            <DocumentAIComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
