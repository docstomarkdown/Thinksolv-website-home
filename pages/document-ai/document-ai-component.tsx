"use client"

import { useCallback, useEffect, useRef, useState, useLayoutEffect } from "react"
import { GiProcessor } from "react-icons/gi"
import { AiOutlineTable } from "react-icons/ai"
import { HiOutlineDocumentReport } from "react-icons/hi"
import { MdOutlineDataObject } from "react-icons/md"
import { PiStampBold } from "react-icons/pi"
import { MdOutlineQrCodeScanner } from "react-icons/md"
import { LiaFileInvoiceDollarSolid } from "react-icons/lia"

/** ---- Outputs (unchanged) ---- */
const outputs = [
  { icon: <AiOutlineTable className="w-4 h-4 lg:w-6 lg:h-6" />, label: "Table" },
  { icon: <HiOutlineDocumentReport className="w-4 h-4 lg:w-6 lg:h-6" />, label: "Report" },
  { icon: <MdOutlineDataObject className="w-4 h-4 lg:w-6 lg:h-6" />, label: "Data" },
  { icon: <PiStampBold className="w-4 h-4 lg:w-6 lg:h-6" />, label: "Stamp" },
  { icon: <MdOutlineQrCodeScanner className="w-4 h-4 lg:w-6 lg:h-6" />, label: "QR Code" },
]

export default function DocumentAIComponent() {
  /** ---- shared refs & constants ---- */
  const svgContainerRef = useRef<HTMLDivElement>(null)

  // left scan card path
  const inputPathRef = useRef<SVGPathElement | null>(null)
  const scanCardRef = useRef<HTMLDivElement | null>(null)

  // right outputs
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

  // timings (kept like before)
  const travelDuration = 900
  const outputAnimDuration = 800
  const outputDelayBetween = 400

  // helpers for %→px mapping
  const viewW = 1000
  const viewH = 100

  /** ---- vertical placement for outputs (same math both sides) ---- */
  const setIconPosition = (index: number) => {
    const topPadding = 12
    const bottomPadding = 8
    const usable = 100 - topPadding - bottomPadding
    const spacing = outputs.length > 1 ? usable / (outputs.length - 1) : 0
    return topPadding + index * spacing
  }

  /** ---- place the scan card at path start once mounted ---- */
  // inside useEffect (mount) → position card & show it
  useEffect(() => {
  if (outputAnimatingIndex === outputs.length) {
    setTimeout(() => {
      // reset position instantly
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

      // reset states
      setScanDone(false)
      setTraveling(false)
      setStartOutputAnimation(false)
      setOutputAnimatingIndex(-1)

      // start scan again
      const scanTime = 1600
      setTimeout(() => setScanDone(true), scanTime)
    }, 1000)
  }
}, [outputAnimatingIndex])


useLayoutEffect(() => {
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
}, [])


  /** ---- kick off travel after scan finishes ---- */
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

  /** ---- scan card travels along the (short) input path into center ---- */
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
      // start the right-side outputs “as is”
      setStartOutputAnimation(true)
      setOutputAnimatingIndex(0)
    }
  }, [])

  /** ---- animate outputs from center → right, one by one (same behavior) ---- */
  const animateOutput = useCallback(
    (currentTime: DOMHighResTimeStamp) => {
      if (outputAnimatingIndex === -1 || outputAnimatingIndex >= outputs.length) return

      const path = outputPathRefs.current[outputAnimatingIndex]
      const icon = outputIconRefs.current[outputAnimatingIndex]
      const box = svgContainerRef.current
      if (!path || !icon || !box) return

      if (!outputAnimationStartTime.current) {
        outputAnimationStartTime.current = currentTime
        // appear at center
        icon.style.opacity = "1"
        icon.style.left = "50%"
        icon.style.right = "auto"
        icon.style.top = "50%"
        icon.style.transform = "translate(-50%, -50%)"
      }

      const elapsed = currentTime - outputAnimationStartTime.current
      const p = Math.min(elapsed / outputAnimDuration, 1)

      const rect = box.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const yPercent = setIconPosition(outputAnimatingIndex)
      const finalY = (yPercent / 100) * rect.height

      const rightMargin = 16
      const finalX = rect.width - rightMargin

      const curX = centerX + (finalX - centerX) * p
      const curY = centerY + (finalY - centerY) * p

      icon.style.left = `${curX}px`
      icon.style.top = `${curY}px`
      icon.style.right = "auto"
      icon.style.transform = "translate(-50%, -50%)"

      if (p < 1) {
        outputAnimationFrameId.current = requestAnimationFrame(animateOutput)
      } else {
        // snap to final
        icon.style.left = "auto"
        icon.style.right = `${rightMargin}px`
        icon.style.top = `${yPercent}%`
        icon.style.transform = "translateY(-50%)"

        outputAnimationStartTime.current = null
        outputAnimationFrameId.current = null

        setTimeout(() => {
          setOutputAnimatingIndex(prev => prev + 1)
        }, outputDelayBetween)
      }
    },
    [outputAnimatingIndex]
  )

  useEffect(() => {
    if (startOutputAnimation && outputAnimatingIndex >= 0 && outputAnimatingIndex < outputs.length) {
      outputAnimationFrameId.current = requestAnimationFrame(animateOutput)
    }
    return () => {
      if (outputAnimationFrameId.current) cancelAnimationFrame(outputAnimationFrameId.current)
    }
  }, [outputAnimatingIndex, animateOutput, startOutputAnimation])

  /** ---- SVG: left (short) input curve + right output curves (unchanged) ---- */
  // left side shortened, center-only curve
  const inputStartX = 260
  const inputC1 = 360
  const inputC2 = 430
  const centerX = 500
  const centerY = 50

  return (
    <div className="relative w-full h-full overflow-hidden px-2 sm:px-4 md:px-8 py-4" ref={svgContainerRef}>
      <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-full">
        {/* short input curve to center */}
        <path
          ref={inputPathRef}
          d={`M ${inputStartX} ${centerY} C ${inputC1} ${centerY}, ${inputC2} ${centerY}, ${centerX} ${centerY}`}
          stroke="#ccc"
          strokeWidth="0.6"
          fill="none"
        />

        {/* right-side output curves (as before) */}
        {outputs.map((_, i) => {
          const topPadding = 10
          const bottomPadding = 10
          const usable = 100 - topPadding - bottomPadding
          const spacing = outputs.length > 1 ? usable / (outputs.length - 1) : 0
          const y = topPadding + i * spacing
          const endX = 950
          const rightD = `M ${centerX} ${centerY} C 700 ${centerY}, 800 ${y}, ${endX} ${y}`
          return (
            <path
              key={`output-${i}`}
              d={rightD}
              stroke="#ccc"
              strokeWidth="0.4"
              fill="none"
              ref={el => {
                outputPathRefs.current[i] = el
              }}
            />
          )
        })}
      </svg>

      {/* processor (unchanged) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white p-3 shadow-lg flex items-center justify-center relative z-10 rounded-lg">
          <GiProcessor className="w-12 h-12 text-primary" />
        </div>
      </div>

      {/* scan card (invoice) */}
      <div ref={scanCardRef} className="absolute z-10 pointer-events-none transition-none">
        <div className="relative w-[92px] sm:w-[110px] h-[64px] sm:h-[78px] rounded-md border border-gray-200 bg-white shadow">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <span className="text-[15px] sm:text-md text-gray-700 font-medium">Scanned.pdf</span>
          </div>
          <div className="px-2 space-y-1">
            <div className="h-1.5 bg-gray-100 rounded" />
            <div className="h-1.5 bg-gray-100 rounded w-5/6" />
            <div className="h-1.5 bg-gray-100 rounded w-2/3" />
          </div>

          {/* scanning overlay → when finished, starts travel */}
          {!scanDone && (
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-md"
              onAnimationEnd={() => setScanDone(true)}
            >
              <div className="absolute left-0 right-0 h-0.5 bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.8)] animate-scan-line" />
              <div className="absolute inset-x-0 h-10 bg-emerald-400/10 blur-[2px] animate-scan-wash" />
            </div>
          )}
        </div>
      </div>

      {/* right-side output icons (same UI/flow as before) */}
      <div className="absolute inset-0 pointer-events-none">
        {outputs.map((output, i) => {
          const yPercent = setIconPosition(i)
          const isCurrent = outputAnimatingIndex === i
          const visible = startOutputAnimation && outputAnimatingIndex >= i
          return (
            <div
              key={i}
              ref={el => {
                outputIconRefs.current[i] = el
              }}
              className="absolute -translate-y-1/2 flex flex-col items-center gap-1"
              style={{
                top: `${yPercent}%`,
                right: isCurrent || outputAnimatingIndex > i ? "16px" : "auto",
                left: isCurrent || outputAnimatingIndex > i ? "auto" : "50%",
                transform: isCurrent || outputAnimatingIndex > i ? "translateY(-50%)" : "translate(-50%, -50%)",
                opacity: visible ? 1 : 0,
                transition: isCurrent ? "none" : "opacity 0.3s ease-out",
                zIndex: 10,
              }}
            >
              <div className="bg-white border border-gray-200 rounded-lg p-2 lg:p-3 shadow-md text-gray-700">
                {output.icon}
              </div>
              <span className="text-xs text-gray-600 font-medium hidden lg:block">{output.label}</span>
            </div>
          )
        })}
      </div>

      {/* local scan animations */}
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
