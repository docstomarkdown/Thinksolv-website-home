"use client"
import { motion } from "framer-motion"
import { siteConfig } from "../../config/site"
import DotBadge from "@/components/ui/dotbadge"
import ShinyButton from "../ui/shiny-button"
import type { IconType } from "react-icons"
import GradientText from "../ui/gradient-text"

interface Product {
  id: number
  icon: IconType
  title: string
  description: string
  url: string
}

const Product = () => {
  const { title, span, description, items, buttontext } = siteConfig.products

  return (
    <section id="products" className="relative max-w-7xl dark:bg-black mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      {/* Mobile Only: Top Centered DotBadge */}
      <div className="w-full flex justify-center mb-8 lg:hidden">
        <DotBadge label="Products" textSize="text-md"  />
      </div>

      {/* Flex Layout */}
      <div className="flex flex-col lg:flex-row gap-15">
        {/* LEFT: Sticky Header with Abstract Shapes */}
        <div className="lg:w-1/2 relative">
          <div className="sticky top-[120px] z-10 flex flex-col gap-8 sm:gap-10">
            {/* Desktop Only: Left-aligned DotBadge */}
            <div className="hidden lg:flex justify-start">
              <DotBadge label="Products" textSize="text-md" />
            </div>

            {/* Text Content */}
            <div className="relative z-10 text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-medium font-geist text-gray-900 dark:text-white mb-6 leading-tight">
                {title}
                <GradientText className="ml-3">{span}</GradientText>
              </h1>
              <p className="mt-4 font-geist sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Product Cards */}
        <div className="lg:w-1/2 w-full">
          <div className="flex flex-col sm:flex-wrap sm:flex-row lg:flex-col gap-6">
            {items.map((product: Product, index) => {
              const { icon: Icon, title, description, url, id } = product
              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row gap-6 border border-bordercolor dark:border-bordercolor hover:border-secondary/50 hover:border-l-[6px] rounded-2xl bg-white dark:bg-[#111] p-6 w-full shadow-md hover:shadow-lg transition-all"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 shrink-0">
                    <Icon className="text-3xl text-black dark:text-white" />
                  </div>
                  {/* Content */}
                  <div className="flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-medium font-geist text-black dark:text-white">{title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                      {description}
                    </p>
                    {/* Explore Button */}
                    <div className="mt-4">
                      <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block group">
                        <ShinyButton>
                          {buttontext}
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
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Product
