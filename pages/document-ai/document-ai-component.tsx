"use client"

import { useCallback, useEffect, useRef, useState, useLayoutEffect } from "react"
import { CustomProcessorIcon } from "./animation-icon"
import { AiOutlineTable } from "react-icons/ai"
import { HiOutlineDocumentReport } from "react-icons/hi"
import { MdOutlineDataObject, MdOutlineQrCodeScanner } from "react-icons/md"
import { PiStampBold } from "react-icons/pi"

/** ---- Outputs with responsive icon sizing ---- */
const outputs = [
  { icon: <AiOutlineTable className="w-6 h-6 sm:w-4 sm:h-4 lg:w-6 lg:h-6" />, label: "Table" },
  { icon: <HiOutlineDocumentReport className="w-6 h-6 sm:w-4 sm:h-4 lg:w-6 lg:h-6" />, label: "Report" },
  { icon: <MdOutlineDataObject className="w-6 h-6 sm:w-4 sm:h-4 lg:w-6 lg:h-6" />, label: "Data" },
  { icon: <PiStampBold className="w-6 h-6 sm:w-4 sm:h-4 lg:w-6 lg:h-6" />, label: "Stamp" },
  { icon: <MdOutlineQrCodeScanner className="w-6 h-6 sm:w-4 sm:h-4 lg:w-6 lg:h-6" />, label: "QR Code" },
]

export default function DocumentAIComponent() {
  const svgContainerRef = useRef<HTMLDivElement>(null)

  const [windowWidth, setWindowWidth] = useState(1024) // Default to desktop size
  const [isClient, setIsClient] = useState(false)

  // scan card path (top → center)
  const inputPathRef = useRef<SVGPathElement | null>(null)
  const scanCardRef = useRef<HTMLDivElement | null>(null)

  // outputs (center → bottom)
  const outputPathRefs = useRef<(SVGPathElement | null)[]>([])
  const outputIconRefs = useRef<(HTMLDivElement | null)[]>([])

  const [scanDone, setScanDone] = useState(false)
  const [traveling, setTraveling] = useState(false)
  const [startOutputAnimation, setStartOutputAnimation] = useState(false)
  const [outputAnimatingIndex, setOutputAnimatingIndex] = useState(-1)

  const travelStart = useRef<number | null>(null)
  const rafId = useRef<number | null>(null)

  const outputAnimationStartTime = useRef<DOMHighResTimeStamp | null>(null)
  const outputAnimationFrameId = useRef<number | null>(null)

  // timings
  const travelDuration = 900
  const outputAnimDuration = 800
  const outputDelayBetween = 400

  // virtual viewbox for mapping
  const viewW = 100
  const viewH = 1000

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth)

      const handleResize = () => setWindowWidth(window.innerWidth)
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  /** ---- responsive horizontal placement for outputs at bottom ---- */
  const setIconPosition = useCallback(
    (index: number) => {
      const leftPadding = windowWidth < 640 ? 8 : windowWidth < 1024 ? 10 : 12
      const rightPadding = leftPadding
      const usable = 100 - leftPadding - rightPadding
      const spacing = outputs.length > 1 ? usable / (outputs.length - 1) : 0
      return leftPadding + index * spacing
    },
    [windowWidth],
  )

  /** ---- reset and loop animation ---- */
  useEffect(() => {
    if (outputAnimatingIndex === outputs.length) {
      setTimeout(() => {
        const card = scanCardRef.current
        const box = svgContainerRef.current
        const path = inputPathRef.current
        if (card && box && path) {
          const p0 = path.getPointAtLength(0)
          const rect = box.getBoundingClientRect()
          const x = (p0.x / viewW) * rect.width
          const y = (p0.y / viewH) * rect.height
          Object.assign(card.style, {
            left: `${x}px`,
            top: `${y}px`,
            transform: "translate(-50%, -50%)",
            opacity: "1",
          } as CSSStyleDeclaration)
        }

        setScanDone(false)
        setTraveling(false)
        setStartOutputAnimation(false)
        setOutputAnimatingIndex(-1)

        const scanTime = 1600
        setTimeout(() => setScanDone(true), scanTime)
      }, 1000)
    }
  }, [outputAnimatingIndex])

  /** ---- place scan card at top ---- */
  useLayoutEffect(() => {
    if (!isClient) return

    const card = scanCardRef.current
    const box = svgContainerRef.current
    const path = inputPathRef.current
    if (!card || !box || !path) return

    const p0 = path.getPointAtLength(0)
    const rect = box.getBoundingClientRect()
    const x = (p0.x / viewW) * rect.width
    const y = (p0.y / viewH) * rect.height

    Object.assign(card.style, {
      left: `${x}px`,
      top: `${y}px`,
      transform: "translate(-50%, -50%)",
      opacity: "1",
    } as CSSStyleDeclaration)

    const scanTime = 1600
    setTimeout(() => setScanDone(true), scanTime)
  }, [isClient])

  /** ---- start travel after scan ---- */
  useEffect(() => {
    if (!scanDone || traveling) return
    setTraveling(true)
    travelStart.current = null
    rafId.current = requestAnimationFrame(stepTravel)
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanDone])

  /** ---- scan card travel (top → center) ---- */
  const stepTravel = useCallback((t: number) => {
    const box = svgContainerRef.current
    const path = inputPathRef.current
    const card = scanCardRef.current
    if (!box || !path || !card) return

    if (travelStart.current == null) travelStart.current = t
    const k = Math.min((t - travelStart.current) / travelDuration, 1)

    const len = path.getTotalLength()
    const pt = path.getPointAtLength(k * len)

    const rect = box.getBoundingClientRect()
    const x = (pt.x / viewW) * rect.width
    const y = (pt.y / viewH) * rect.height

    const fade = k < 0.75 ? 1 : 1 - (k - 0.75) / 0.25

    Object.assign(card.style, {
      left: `${x}px`,
      top: `${y}px`,
      transform: "translate(-50%, -50%)",
      opacity: `${Math.max(0, Math.min(1, fade))}`,
    } as CSSStyleDeclaration)

    if (k < 1) {
      rafId.current = requestAnimationFrame(stepTravel)
    } else {
      card.style.opacity = "0"
      setStartOutputAnimation(true)
      setOutputAnimatingIndex(0)
    }
  }, [])

  /** ---- output travel (center → bottom) ---- */
  const animateOutput = useCallback(
    (currentTime: DOMHighResTimeStamp) => {
      if (outputAnimatingIndex === -1 || outputAnimatingIndex >= outputs.length) return

      const path = outputPathRefs.current[outputAnimatingIndex]
      const icon = outputIconRefs.current[outputAnimatingIndex]
      const box = svgContainerRef.current
      if (!path || !icon || !box) return

      if (!outputAnimationStartTime.current) {
        outputAnimationStartTime.current = currentTime
        icon.style.opacity = "1"
        icon.style.left = "50%"
        icon.style.top = "50%"
        icon.style.transform = "translate(-50%, -50%)"
      }

      const elapsed = currentTime - outputAnimationStartTime.current
      const p = Math.min(elapsed / outputAnimDuration, 1)

      const rect = box.getBoundingClientRect()
      const centerX_px = rect.width / 2
      const centerY_px = rect.height / 2

      const xPercent = setIconPosition(outputAnimatingIndex)
      const finalX = (xPercent / 100) * rect.width
      const bottomMargin = windowWidth < 640 ? 40 : windowWidth < 1024 ? 48 : 56
      const finalY = rect.height - bottomMargin

      const curX = centerX_px + (finalX - centerX_px) * p
      const curY = centerY_px + (finalY - centerY_px) * p

      icon.style.left = `${curX}px`
      icon.style.top = `${curY}px`
      icon.style.transform = "translate(-50%, -50%)"

      if (p < 1) {
        outputAnimationFrameId.current = requestAnimationFrame(animateOutput)
      } else {
        icon.style.left = `${xPercent}%`
        icon.style.top = `calc(100% - ${bottomMargin}px)`
        icon.style.transform = "translate(-50%, -50%)"

        outputAnimationStartTime.current = null
        outputAnimationFrameId.current = null

        setTimeout(() => {
          setOutputAnimatingIndex((prev) => prev + 1)
        }, outputDelayBetween)
      }
    },
    [outputAnimatingIndex, setIconPosition, windowWidth],
  )

  useEffect(() => {
    if (startOutputAnimation && outputAnimatingIndex >= 0 && outputAnimatingIndex < outputs.length) {
      outputAnimationFrameId.current = requestAnimationFrame(animateOutput)
    }
    return () => {
      if (outputAnimationFrameId.current) cancelAnimationFrame(outputAnimationFrameId.current)
    }
  }, [outputAnimatingIndex, animateOutput, startOutputAnimation])

  // vertical layout paths
  const inputStartY = 220
  const inputC1 = 320
  const inputC2 = 390
  const centerX = 50
  const centerY = 460

  if (!isClient) {
    return (
      <div className="relative w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] overflow-hidden px-1 sm:px-2 md:px-4 lg:px-8 py-2 sm:py-4 flex items-center justify-center">
        <div className="bg-white p-2 sm:p-3 lg:p-4 shadow-lg flex items-center justify-center rounded-lg">
          <CustomProcessorIcon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-primary" />
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] overflow-hidden px-1 sm:px-2 md:px-4 lg:px-8 py-2 sm:py-4"
      ref={svgContainerRef}
    >
      <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-full">
        {/* top → center */}
        <path
          ref={inputPathRef}
          d={`M ${centerX} ${inputStartY} C ${centerX} ${inputC1}, ${centerX} ${inputC2}, ${centerX} ${centerY}`}
          stroke="#ccc"
          strokeWidth="0.6"
          fill="none"
        />

        {/* center → bottom outputs */}
        {outputs.map((_, i) => {
          const leftPadding = windowWidth < 640 ? 8 : windowWidth < 1024 ? 10 : 12
          const rightPadding = leftPadding
          const usable = 100 - leftPadding - rightPadding
          const spacing = outputs.length > 1 ? usable / (outputs.length - 1) : 0
          const x = leftPadding + i * spacing
          const endY = 900
          const downD = `M ${centerX} ${centerY} C ${centerX} 700, ${x} 800, ${x} ${endY}`
          return (
            <path
              key={`output-${i}`}
              d={downD}
              stroke="#ccc"
              strokeWidth="0.4"
              fill="none"
              ref={(el) => {
                outputPathRefs.current[i] = el
              }}
            />
          )
        })}
      </svg>

      {/* processor - responsive sizing */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white p-2 sm:p-3 lg:p-4 shadow-lg flex items-center justify-center rounded-lg">
          <CustomProcessorIcon className="w-10 h-10 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-primary" />
        </div>
      </div>

      {/* scan card - responsive sizing */}
      <div ref={scanCardRef} className="absolute z-10 pointer-events-none transition-none">
        <div className="relative w-[70px] h-[48px] sm:w-[92px] sm:h-[64px] md:w-[110px] md:h-[78px] rounded-md border border-gray-200 bg-white shadow">
          <div className="flex items-center gap-1 sm:gap-2 px-1 sm:px-2 py-1 sm:py-1.5">
            <span className="text-[11px] sm:text-[13px] md:text-[15px] text-gray-700 font-medium truncate">
              Scanned.pdf
            </span>
          </div>
          <div className="px-1 sm:px-2 space-y-0.5 sm:space-y-1">
            <div className="h-1 sm:h-1.5 bg-gray-100 rounded" />
            <div className="h-1 sm:h-1.5 bg-gray-100 rounded w-5/6" />
            <div className="h-1 sm:h-1.5 bg-gray-100 rounded w-2/3" />
          </div>
          {!scanDone && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-md">
              <div className="absolute left-0 right-0 h-0.5 bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.8)] animate-scan-line" />
              <div className="absolute inset-x-0 h-6 sm:h-8 lg:h-10 bg-emerald-400/10 blur-[2px] animate-scan-wash" />
            </div>
          )}
        </div>
      </div>

      {/* bottom outputs - responsive positioning and sizing */}
      <div className="absolute inset-0 pointer-events-none">
        {outputs.map((output, i) => {
          const xPercent = setIconPosition(i)
          const isCurrent = outputAnimatingIndex === i
          const visible = startOutputAnimation && outputAnimatingIndex >= i
          const bottomOffset = windowWidth < 640 ? "40px" : windowWidth < 1024 ? "48px" : "56px"

          return (
            <div
              key={i}
              ref={(el) => {
                outputIconRefs.current[i] = el
              }}
              className="absolute flex flex-col items-center gap-0.5 sm:gap-1"
              style={{
                left: `${xPercent}%`,
                top: isCurrent || outputAnimatingIndex > i ? `calc(100% - ${bottomOffset})` : "50%",
                transform: "translate(-50%, -50%)",
                opacity: visible ? 1 : 0,
                transition: isCurrent ? "none" : "opacity 0.3s ease-out",
                zIndex: 10,
              }}
            >
              <div className="bg-white border border-gray-200 rounded-md sm:rounded-lg p-1.5 sm:p-2 lg:p-3 shadow-md text-gray-700">
                {output.icon}
              </div>
              <span className="text-[10px] sm:text-xs text-gray-600 font-medium hidden sm:block lg:block max-w-[60px] sm:max-w-none text-center truncate">
                {output.label}
              </span>
            </div>
          )
        })}
      </div>

      <style jsx>{`
        @keyframes scanSweepDown {
          0% { transform: translateY(-120%); }
          100% { transform: translateY(120%); }
        }
        .animate-scan-line {
          animation: scanSweepDown 0.8s ease-in-out 0s 2 forwards;
        }
        .animate-scan-wash {
          animation: scanSweepDown 0.8s ease-in-out 0s 2 forwards;
        }
      `}</style>
    </div>
  )
}
