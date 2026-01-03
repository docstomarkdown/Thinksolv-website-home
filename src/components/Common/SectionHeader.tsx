"use client";
import { motion } from "framer-motion";

type HeaderInfo = {
  title?: string;
  subtitle: string;
  description: string;
  textAlign?: "left" | "center";
};

const SectionHeader = ({ headerInfo }: { headerInfo: HeaderInfo }) => {
  const { title, subtitle, description, textAlign = "center" } = headerInfo;

  return (
    <>
      {/* <!-- Section Title Start --> */}
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -20,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: 0.1 }}
        viewport={{ once: true }}
        className={`animate_top ${textAlign === "left" ? "text-left" : "text-center"} ${textAlign === "left" ? "ml-0" : "mx-auto"}`}
      >
        {title && (
          <div className="mb-4 inline-block rounded-full bg-zumthor px-4.5 py-1.5 dark:border dark:border-strokedark dark:bg-blacksection">
            <span className="text-sectiontitle font-medium text-[#000000] dark:text-white">
              {title}
            </span>
          </div>
        )}
        <h2 className={`mb-4 text-2xl font-semibold text-gray-800 dark:text-white xl:text-sectiontitle3 ${textAlign === "left" ? "w-full" : "mx-auto md:w-4/5 xl:w-1/2"}`}>
          {subtitle}
        </h2>
        <p className={`text-[#000000]/60 dark:text-gray-400 leading-relaxed ${textAlign === "left" ? "w-full" : "mx-auto md:w-4/5 lg:w-3/5 xl:w-[46%]"}`}>{description}</p>
      </motion.div>
      {/* <!-- Section Title End --> */}
    </>
  );
};

export default SectionHeader;
