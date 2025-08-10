"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { FaRegFilePdf, FaRegFileWord } from "react-icons/fa";
import {
  FileJson,
  FileText,
  FileCode2,
  FileSpreadsheet,
  ShoppingCart,
  Newspaper,
  Briefcase,
  LineChart,
  Home,
  MessageSquare,
} from "lucide-react"

export default function WebScrapingVisual() {
  const initialTargets = [
    { icon: ShoppingCart, title: "E-commerce Store" },
    { icon: Newspaper, title: "News Portal" },
    { icon: Briefcase, title: "Job Listings" },
    { icon: LineChart, title: "Marketing Page" },
    { icon: Home, title: "Real Estate Site" },
    { icon: MessageSquare, title: "Forum Thread" },
  ]

  const structuredTargets = [
  { icon: FileText, title: "CSV Format" },
  { icon: FileJson, title: "JSON Format" },
  { icon: FileCode2, title: "XML Format" },
  { icon: FileSpreadsheet, title: "XLSX Format" },
  { icon: FaRegFilePdf, title: "PDF Format" },
  { icon: FaRegFileWord, title: "Word Format" },
]

  const [isMobile, setIsMobile] = useState(false)
  const [showWeb, setShowWeb] = useState(false)
  const [absorbTiles, setAbsorbTiles] = useState(false)
  const [showStructured, setShowStructured] = useState(false)
  const [hideWeb, setHideWeb] = useState(false)
  const [hideSpider, setHideSpider] = useState(false)

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 768)
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  useEffect(() => {
    const timer1 = setTimeout(() => setShowWeb(true), 2500)
    const timer2 = setTimeout(() => setAbsorbTiles(true), 4000)
    const timer3 = setTimeout(() => setShowStructured(true), 5500)
    const timer4 = setTimeout(() => setHideWeb(true), 7500)
    const timer5 = setTimeout(() => setHideSpider(true), 8500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, [])

  const targets = isMobile ? initialTargets.slice(0, 4) : initialTargets
  const structuredFormats = isMobile ? structuredTargets.slice(0, 4) : structuredTargets

  const spiderImage = "/spider.svg"
  const webImage = "/web.svg"

  const getAbsorptionAnimation = (index: number) => {
    const positions = isMobile
      ? [
          { x: "100%", y: "100%" },
          { x: "-100%", y: "100%" },
          { x: "100%", y: "-100%" },
          { x: "-100%", y: "-100%" },
        ]
      : [
          { x: "150%", y: "100%" },
          { x: "-150%", y: "100%" },
          { x: "200%", y: "0%" },
          { x: "-200%", y: "0%" },
          { x: "150%", y: "-100%" },
          { x: "-150%", y: "-100%" },
        ]
    return {
      scale: 0,
      opacity: 0,
      ...positions[index],
    }
  }

  const getEmergeAnimation = (index: number) => {
    const positions = isMobile
      ? [
          { x: "100%", y: "100%" },
          { x: "-100%", y: "100%" },
          { x: "100%", y: "-100%" },
          { x: "-100%", y: "-100%" },
        ]
      : [
          { x: "150%", y: "100%" },
          { x: "-150%", y: "100%" },
          { x: "200%", y: "0%" },
          { x: "-200%", y: "0%" },
          { x: "150%", y: "-100%" },
          { x: "-150%", y: "-100%" },
        ]
    return {
      initial: {
        scale: 0,
        opacity: 0,
        ...positions[index],
      },
      animate: {
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0,
      },
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden px-4 py-6 relative">
      {/* Spider Web */}
      {showWeb && (
        <motion.img
          src={webImage}
          alt="Spider Web"
          className="absolute top-150 left-150 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{
            scale: hideWeb ? 0 : 1,
            opacity: hideWeb ? 0 : 1,
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Spider + Thread */}
      <motion.div
        initial={{ y: -150, opacity: 0 }}
        animate={hideSpider ? { y: -150, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{
          delay: 0.6,
          duration: 1.4,
          ease: "easeOut",
        }}
        className="absolute top-0 left-[48%] transform -translate-x-1/2 z-40 flex flex-col items-center"
      >
        <svg width="2" height="220" viewBox="0 0 2 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="-ml-1">
          <path
            d="M1 0 C0.5 30, 1.5 70, 1 110 C0.5 150, 1.5 190, 1 220"
            stroke="rgba(120,120,120,0.5)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
        <Image src={spiderImage} alt="Spider" width={54} height={54} className="-ml-2" />
      </motion.div>

      {/* First set of tiles */}
      <div className={`relative w-full max-w-5xl grid grid-cols-2 gap-6 place-items-center z-10`}>
        {targets.map(({ icon: Icon, title }, i) => (
          <motion.div
            key={i}
            className="w-full max-w-[200px] h-36 bg-white rounded-xl shadow-md border border-gray-300 relative overflow-hidden flex flex-col"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={absorbTiles ? getAbsorptionAnimation(i) : { scale: 1, opacity: 1, x: 0, y: 0 }}
            transition={{
              delay: absorbTiles ? 0.2 + i * 0.15 : i * 0.15,
              duration: absorbTiles ? 0.8 : 0.6,
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-0 opacity-20 z-0" />
            
            <div className="relative z-10 flex-1 px-3 py-2 text-black flex flex-col justify-center items-center text-center">
              <Icon className="w-8 h-8 mb-1 text-secondary" />
              <div className="text-md font-medium font-geist leading-tight mt-2">{title}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Second set of tiles - emerge from center */}
      {showStructured && (
        <div className="absolute w-full max-w-5xl grid grid-cols-2 gap-6 place-items-center z-20 px-4">
          {structuredFormats.map(({ icon: Icon, title }, i) => {
            const emerge = getEmergeAnimation(i)
            return (
              <motion.div
                key={title}
                className="w-full max-w-[200px] h-36 bg-white rounded-xl shadow-md border border-gray-300 overflow-hidden flex flex-col"
                initial={emerge.initial}
                animate={emerge.animate}
                transition={{
                  delay: 0.5 + i * 0.2,
                  duration: 0.9,
                  ease: "easeOut",
                }}
              >
                
                <div className="relative z-10 flex-1 px-3 py-2 text-black flex flex-col justify-center items-center text-center">
                  <Icon className="w-8 h-8 mb-1 text-primary" />
                  <div className="text-md font-medium font-geist leading-tight mt-2">{title}</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
