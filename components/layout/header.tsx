"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { GiSpiderWeb } from "react-icons/gi";
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronDown, Settings, Package, BookOpen, Mail, FileText } from "lucide-react"
import MobileNav from "@/components/MobileNav"
import { siteConfig } from "@/config/site"
import { dropdownVariants, sharedTransition } from "@/lib/framer-animations"
import { cn } from "@/lib/utils"

// Function to get icon for service items
const getServiceIcon = (label: string) => {
  switch (label) {
    case "Document AI":
      return <FileText className="h-5 w-5" />
    case "Web Scraping":
      return <GiSpiderWeb className="h-5 w-5" />
    default:
      return null
  }
}

interface AnimatedMenuItemProps {
  children: React.ReactNode
  icon?: React.ReactNode
  href?: string
  hasDropdown?: boolean
  dropdownItems?: Array<{ label: string; href: string }>
  iconColor?: string
  dropdownKey?: string
}

const AnimatedMenuItem = ({
  children,
  icon,
  href,
  hasDropdown = false,
  dropdownItems = [],
  iconColor,
  dropdownKey,
}: AnimatedMenuItemProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setIsHovered(true)
    if (hasDropdown && dropdownKey) setActiveDropdown(dropdownKey)
  }

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setIsHovered(false)
      setActiveDropdown(null)
    }, 200)
    setTimeoutId(id)
  }

  return (
    <motion.div className="relative group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <motion.a
        href={href}
        className={cn(
          "flex items-center gap-3 px-5 py-2 rounded-xl transition-all duration-300",
          isHovered && iconColor ? `${iconColor} text-foreground` : "text-foreground/80",
        )}
        whileHover={{ scale: 1.05 }}
      >
        {icon && (
          <span
            className={cn("transition-colors duration-300", isHovered && iconColor ? iconColor : "text-foreground/60")}
          >
            {icon}
          </span>
        )}
        <span className="font-medium transition">{children}</span>
        {hasDropdown && (
          <motion.div animate={{ rotate: isHovered ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        )}
      </motion.a>
      {hasDropdown && activeDropdown === dropdownKey && (
        <motion.div
          className="absolute top-full left-0 mt-3 w-72 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl z-50 overflow-hidden"
          variants={dropdownVariants}
          transition={sharedTransition}
          initial="initial"
          animate="hover"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="divide-y divide-border/40">
            {dropdownItems.map((item, index) => {
              const serviceIcon = dropdownKey === "services" ? getServiceIcon(item.label) : null

              return (
                <motion.a
                  key={index}
                  href={item.href}
                  className="flex items-center justify-between px-4 py-3 gap-2 text-muted-foreground hover:text-foreground group transition-colors duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    x: 5,
                  }}
                >
                  <div className="flex items-center gap-3">
                    {serviceIcon && (
                      <motion.div
                        className="text-primary opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                        whileHover={{ scale: 1.1 }}
                      >
                        {serviceIcon}
                      </motion.div>
                    )}
                    {!serviceIcon && (
                      <motion.div className="w-2 h-2 rounded-full bg-current opacity-0 group-hover:opacity-100 transition duration-200" />
                    )}
                    <span className="text-sm font-medium group-hover:font-semibold transition">{item.label}</span>
                  </div>
                  {dropdownKey === "products" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7m0 0v7m0-7L10 14" />
                    </svg>
                  )}
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

const Header = ({ showHeader = true, showLogo = true }) => {
  const [expanded, setExpanded] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-100",
        scrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent border-b",
      )}
    >
      <div className="container mx-auto px-0">
        <div className="flex items-center py-4 w-full">
          {/* Logo on the far left */}
          <motion.div className="flex items-center space-x-3">
            <a href="/" title={siteConfig.name} className="flex items-center">
              <div id="header-logo-container" className="relative">
                <Image
                  src={siteConfig.logo.src || "/thinksolv-logo.png"}
                  alt={siteConfig.logo.alt}
                  width={siteConfig.logo.width}
                  height={siteConfig.logo.height}
                  className="rounded px-2"
                />
              </div>
              <span className="text-3xl font-bold text-black dark:text-white mt-1">
                {siteConfig.brandText.main}
                <span className="text-red-600">{siteConfig.brandText.highlight}</span>
              </span>
            </a>
          </motion.div>

          {/* Spacer pushes everything else to far right */}
          <div className="flex-grow" />

          {/* Right-aligned Menu + ThemeToggle + Mobile Nav Button */}
          <div className="flex items-center gap-4">
            {/* Menu Bar */}
            <motion.nav
              className="hidden md:flex items-center gap-4 p-3 rounded-3xl bg-gradient-to-r from-background/60 via-background/40 to-background/60 backdrop-blur-xl border border-border/30 dark:border-white shadow-xl">
              <AnimatedMenuItem
                icon={<Settings className="h-5 w-5" />}
                hasDropdown
                dropdownItems={siteConfig.nav.services}
                iconColor="text-red-600"
                dropdownKey="services"
              >
                Services
              </AnimatedMenuItem>
              <AnimatedMenuItem
                icon={<Package className="h-5 w-5" />}
                hasDropdown
                dropdownItems={siteConfig.nav.products}
                iconColor="text-red-600"
                dropdownKey="products"
              >
                Products
              </AnimatedMenuItem>
              <AnimatedMenuItem
                icon={<BookOpen className="h-5 w-5" />}
                href={siteConfig.nav.blog.href}
                iconColor="text-red-600"
              >
                {siteConfig.nav.blog.label}
              </AnimatedMenuItem>
              <AnimatedMenuItem
                icon={<Mail className="h-5 w-5" />}
                href={siteConfig.nav.contact.href}
                iconColor="text-red-600"
              >
                {siteConfig.nav.contact.label}
              </AnimatedMenuItem>
            </motion.nav>

            {/* Theme toggle and mobile menu icon */}
            <motion.button
              onClick={() => setExpanded(!expanded)}
              className="md:hidden relative w-8 h-8 flex flex-col justify-center mr-5 items-center focus:outline-none"
              aria-label="Toggle mobile menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span
                className={cn(
                  "absolute w-6 h-0.5 bg-current transition-all duration-300",
                  expanded ? "rotate-45 translate-y-0" : "-translate-y-1.5"
                )}
              />
              <span
                className={cn(
                  "absolute w-6 h-0.5 bg-current transition-all duration-300",
                  expanded ? "-rotate-45 translate-y-0" : "translate-y-1.5"
                )}
              />
            </motion.button>
          </div>
        </div>
        <MobileNav expanded={expanded} setExpanded={setExpanded} />
      </div>
    </motion.header>
  )
}

export default Header
