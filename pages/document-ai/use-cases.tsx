'use client';

import { useCases } from '@/config/data';
import DotBadge from '@/components/ui/dotbadge';
import GradientText from '@/components/ui/gradient-text';
import { cn } from '@/lib/utils';

export default function UseCasesGrid() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-14 bg-white dark:bg-black">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <DotBadge label="Use Cases" className="mb-5 mx-auto" textSize="text-md" />
          <h2 className="text-4xl font-medium font-geist lg:text-5xl">
            {useCases.heading}
            <GradientText className="mt-2 lg:block">
              Makes Difference
            </GradientText>
          </h2>
          <p className="font-geist max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {useCases.description}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-l dark:border-neutral-800">
          {useCases.items.map((item, index) => {
            const IconComponent = item.icon;
            const isLastRow = index >= useCases.items.length - 3;

            return (
              <div
                key={item.id}
                className={cn(
                  'flex flex-col border-r dark:border-neutral-800 py-10 relative group/feature',
                  !isLastRow && 'border-b dark:border-neutral-800',
                  (index === 0 || index === 3 || index === 6) && 'border-l dark:border-neutral-800'
                )}
              >
                {/* Hover gradient glow */}
                {index < 3 ? (
                  <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
                ) : (
                  <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
                )}

                {/* Icon with rounded-square background */}
                <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400 flex justify-start">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                </div>

                {/* Title */}
                <div className="text-lg font-medium font-geist mb-2 relative z-10 px-10">
                  <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-red-500 transition-all duration-200 origin-center" />
                  <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                    {item.title}
                  </span>
                </div>

                {/* Description */}
                <p className="text-md font-geist text-neutral-600 dark:text-neutral-300 max-w-sm relative z-10 px-10">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
