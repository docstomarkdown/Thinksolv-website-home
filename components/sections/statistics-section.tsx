"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import DotBadge from "../ui/dotbadge";
import GradientText from "../ui/gradient-text";

const FunFact = () => {
  const { title, span, description, stats } = siteConfig.funFact;

  return (
    <section className="relative overflow-hidden bg-white dark:bg-black px-6 py-20">
  {/* Centered DotBadge */}
  {/* <div className="flex justify-center mb-8">
    <DotBadge label="Stats" className="lg:mb-5" textSize="text-md" />
  </div> */}

  {/* Grid overlay background */}
  <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none" />

  <div className="relative z-10 container mx-auto max-w-7xl">
    {/* Two-Column Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left: Section Header */}
      <div className="relative text-center lg:text-left">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 text-4xl lg:text-5xl font-medium font-geist text-black dark:text-white leading-tight"
        >
          {title}
          <GradientText className="block">{span}</GradientText>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative z-10 font-geist text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-xl mt-4"
        >
          {description}
        </motion.p>
      </div>

      {/* Right: Stat Cards Grid */}
      <div className="grid sm:grid-cols- gap-6 max-w-[500px] items-center justifymx-auto lg:mx-0">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 + index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-[#1a1a1a] border border-primary/50 dark:border-primary/50 rounded-2xl  p-6 shadow-md"
          >
            <div className="text-4xl lg:text-5xl font-semibold font-geist text-black dark:text-white mb-2">
              {stat.value}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-lg">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>

  );
};

export default FunFact;
