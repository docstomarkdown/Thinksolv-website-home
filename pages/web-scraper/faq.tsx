"use client";

import React, { useState, useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import DotBadge from "@/components/ui/dotbadge";
import GradientText from "@/components/ui/gradient-text";
import { faq } from "@/config/page";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { title, span, description, items: faqs } = faq;

  const handleClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 px-6 dar:bg-black">
      <div className="relative max-w-5xl mx-auto text-center mb-5 flex flex-col items-center gap-4">
        <DotBadge label="FAQs" className="lg:mb-5"/>
        <h1 className="text-4xl lg:text-5xl font-medium font-geist text-gray-900 dark:text-white mb-2 leading-tight">
          {title}
          <GradientText className="ml-4" >
            {span}
          </GradientText>
        </h1>
        <p className="mt-2 text-lg font-medium font-geist text-gray-600 dark:text-gray-300 relative z-10">
          {description}
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-5">
        {faqs.map((faq, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={index}
              onClick={() => handleClick(index)}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="transition-all duration-300 transform opacity-0 translate-y-6 bg-white dark:bg-black border border-bordercolor dark:border-bordercolor rounded-xl shadow-md hover:shadow-lg cursor-pointer overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-5">
                <h3 className="text-lg font-medium font-geist text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <span
                  className={`transform transition-transform duration-300 text-primary`}
                  style={{ transform: isActive ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  <Plus className="w-6 h-6" />
                </span>
              </div>

              {/* Answer */}
              <div
                className={`transition-all duration-300 ease-in-out px-7 pt-0 pb-2 text-gray-700 dark:text-gray-300 ${
                  isActive ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <p className="text-base font-geist  border-l-4 border-primary pl-3 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
