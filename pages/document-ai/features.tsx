"use client";

import {ScanText,Users,Sliders,Clock,Database,Bell,} from "lucide-react";
import DotBadge from "@/components/ui/dotbadge";
import GradientText from "@/components/ui/gradient-text";
import { Features } from "@/config/data";
const iconMap = {
  ScanText,
  Users,
  Sliders,
  Clock,
  Database,
  Bell,
};

export default function FeatureSection() {
  return (
    <section className="bg-white dark:bg-black py-20 px-4 sm:px-6 lg:px-18">
      {/* Header Section */}
      <div className="text-center mb-17">
        <DotBadge
          label="Features"
          textSize="text-md"
          className="mb-7 justify-center"
        />
        <h1 className="text-4xl lg:text-5xl font-medium font-geist text-gray-900 dark:text-white mb-6 leading-tight">
          Why Teams
          <GradientText className="ml-3">
            Choose Us ?
          </GradientText>
        </h1>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-10 gap-8 gap-y-14 gap-x-10">
        {Features.map((feature, idx) => {
          const Icon = iconMap[feature.icon as keyof typeof iconMap];
          return (
            <div
              key={idx}
              className="group relative bg-white dark:bg-black rounded-xl p-6 pt-12 pb-8 border border-bordercolor shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute -top-7 left-6 w-14 h-14 rounded-full bg-[#007bbf] group-hover:!bg-white flex items-center justify-center border-2 border-bordercolor shadow-lg transition-all duration-300">
                {Icon && (
                  <Icon className="w-6 h-6 text-white group-hover:text-secondary transition-colors duration-300" />
                )}
              </div>
              <h3 className="text-xl font-medium font-geist mb-3 text-gray-900 dark:text-white transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
