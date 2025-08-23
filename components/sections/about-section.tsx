"use client"

import { motion, type Variants } from "framer-motion" // Import Variants
import GradientText from "@/components/ui/gradient-text" // Corrected import path
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import DotBadge from "@/components/ui/dotbadge" // Corrected import path
import ShinyButton from "@/components/ui/shiny-button" // Corrected import path

export default function About() {
  const sections = [
    {
      id: 1,
      badge: "Our Products",
      title: "Advanced solutions, built for performance",
      description:
        "From greenfields to platform modernization, we handle architecture, development and integration backed by experience and expertise.",
      features: [
        "Custom Software Development",
        "Scalable Platform Solutions",
        "User-Centric Design",
        "Enterprise-Grade Security",
      ],
      image: "/saas.jpg",
      stats: { number: "200+", label: "Products Delivered" },
      imageLeft: true,
    },
    {
      id: 2,
      badge: "Our Services",
      title: "End‑to‑end support, every step of the way",
      description:
        "Beyond products, we offer end-to-end services that ensure your success. Our expert team provides consultation, implementation, and ongoing support to maximize your investment.",
      features: [
        "Strategic Consulting",
        "Implementation & Integration",
        "24/7 Technical Support",
        "Training & Documentation",
      ],
      image: "/saas.jpg",
      stats: { number: "99.9%", label: "Uptime Guarantee" },
      imageLeft: false,
    },
  ]
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }
  return (
    <section className="lg:py-24 bg-white dark:bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-white dark:bg-black"></div>
      </div>
      <div className="container mx-auto px-4 max-w-7xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <DotBadge label="About" className="mb-5 mx-auto" />
          <h1 className="text-4xl lg:text-5xl font-medium font-geist text-gray-900 dark:text-white mb-6 leading-tight">
            Where Innovation Meets
            <GradientText className="lg:block mt-2 ml-2">Excellence</GradientText>
          </h1>
          <p className="text-xl font-geist text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          We build purposeful solutions - designed to deliver measurable business growth.
          </p>
        </motion.div>
        {/* Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-32"
        >
          {sections.map((section) => (
            <motion.div
              key={section.id}
              variants={itemVariants}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${section.imageLeft ? "lg:grid-flow-col" : "lg:grid-flow-col-dense"
                }`}
            >
              {/* Content */}
              <div
                className={`flex flex-col items-center lg:items-start text-center lg:text-left ${section.imageLeft ? "lg:order-2" : "lg:order-1"
                  }`}
              >
                <motion.div
                  initial={{ opacity: 0, x: section.imageLeft ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h2 className="text-4xl font-medium font-geist text-gray-900 dark:text-white mb-6 leading-tight">
                    {section.title}
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{section.description}</p>
                  {/* Feature List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 justify-items-center lg:justify-items-start">
                    {section.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 * featureIndex }}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-200 font-medium font-geist">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <ShinyButton>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </ShinyButton>
                  </div>
                </motion.div>
              </div>
              {/* Image */}
              <div className={`flex justify-center ${section.imageLeft ? "lg:order-1" : "lg:order-2"}`}>
                <motion.div
                  initial={{ opacity: 0, x: section.imageLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-full"
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl group aspect-[4/3] md:aspect-video">
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}>
                      <Image
                        src={section.image || "/placeholder.svg"}
                        alt={`${section.badge} illustration`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
