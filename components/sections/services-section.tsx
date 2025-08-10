"use client"

import { useState } from "react"
import { siteConfig } from "@/config/site"
import ShinyButton from "../ui/shiny-button"
import GradientText from "../ui/gradient-text"
import DotBadge from "../ui/dotbadge"

export default function ServiceTabs() {
  const { items, span, title, description } = siteConfig.services
  const [activeTab, setActiveTab] = useState(items[0]?.id ?? "")

  const handleTabChange = (id: string) => {
    setActiveTab(id)
  }

  return (
    <div className="w-full flex flex-col items-center justify-center py-14 px-4 overflow-hidden">
      {/* Section Heading */}
      <div>
        <div className="flex justify-center mb-8">
          <DotBadge label="Services" textSize="text-md" />
        </div>
        <div className="text-center max-w-4xl mb-8">
          <h2 className="text-4xl lg:text-5xl font-medium font-geist mb-7">
            {title}
            <GradientText className="mx-3">{span}</GradientText>
          </h2>
          <p className="text-gray-600 font-geist text-lg">{description}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-16 mb-16 relative">
        {items.slice(0, 2).map((item) => {
          const isActive = item.id === activeTab
          return (
            <div
              key={item.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleTabChange(item.id)}
            >
              <span
                className={`text-xl font-medium font-geist ${
                  isActive ? "text-black dark:text-white" : "text-black dark:text-white"
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="h-1 bg-secondary/50 mt-2 w-full rounded" />
              )}
            </div>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="w-full max-w-5xl min-h-[480px] mx-auto bg-white shadow-xl rounded-xl overflow-hidden border border-bordercolor">
        {items.map((item) =>
          item.id === activeTab ? (
            <div key={item.id} className="flex flex-col lg:flex-row w-full">
              {/* Left Section */}
              <div className="bg-black text-white px-8 py-10 lg:w-1/3 flex flex-col items-center justify-center space-y-4">
                <item.icon className="w-13 h-13 text-red-400" />
                <span className="font-semibold font-geist text-2xl text-center">
                  {item.title}
                </span>
              </div>

              {/* Right Section */}
              <div className="px-10 py-10 text-left flex-1">
                <h2 className="text-3xl font-medium font-geist text-black mb-6">
                  {item.title}
                </h2>
                <p className="text-gray-600 font-medium font-geist text-lg mb-6">
                  {item.description}
                </p>
                <ul className="space-y-4 text-gray-700 text-base font-medium font-geist mb-8">
                  {item.features.map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
                {item.url && (
                  <a
                    href={item.url}
                    rel="noopener noreferrer"
                    className="inline-block group"
                  >
                    <ShinyButton>
                      Learn More
                      <svg
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
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
                )}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}
