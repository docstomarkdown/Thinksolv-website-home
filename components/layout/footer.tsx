"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "../../config/site";

const Footer = () => {
  const [year, setYear] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setYear(new Date().getFullYear());
    setIsClient(true);
  }, []);

  const socialIcons: Record<string, JSX.Element> = {
    linkedin: (
      <svg
        className="fill-gray-600 transition-all duration-300 hover:fill-primary"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6.94 5C6.94 5.53 6.73 6.04 6.35 6.41C5.98 6.79 5.47 7 4.94 7C4.41 7 3.9 6.79 3.52 6.41C3.15 6.04 2.94 5.53 2.94 5C2.94 4.47 3.15 3.96 3.52 3.58C3.9 3.21 4.41 3 4.94 3C5.47 3 5.98 3.21 6.35 3.58C6.73 3.96 6.94 4.47 6.94 5ZM7 8.48H3V21H7V8.48ZM13.32 8.48H9.34V21H13.28V14.43C13.28 10.77 18.05 10.43 18.05 14.43V21H22V13.07C22 6.9 14.94 7.13 13.28 10.16L13.32 8.48Z" />
      </svg>
    ),
    twitter: (
      <svg
        className="fill-gray-600 transition-all duration-300 hover:fill-primary"
        width="24"
        height="24"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z" />
      </svg>
    ),
  };

  return (
    <footer className="border-t border-stroke bg-white dark:border-strokedark dark:bg-black mt-10">
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="py-15">
          <div className="flex flex-wrap gap-8 lg:justify-between lg:gap-0">
            {/* Logo Section with Tagline and Social Icons */}
            {isClient && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-1/2 lg:w-1/4"
              >
                <div className="flex items-center space-x-3">
                  <a href="/" title="Thinksolv Technologies" className="flex items-center">
                    <Image
                      src={siteConfig.footer.logo.src}
                      alt={siteConfig.footer.logo.alt}
                      width={60}
                      height={55}
                      className="rounded px-2"
                    />
                    <span className="text-2xl font-bold text-black dark:text-white mt-1">
                      thinksol<span className="text-red-600">v.</span>
                    </span>
                  </a>
                </div>

                {/* Tagline */}
                <p className="mb-4 font-medium font-geist mt-5">{siteConfig.tagline}</p>

                {/* Social Icons Below Tagline */}
                <ul className="flex items-center gap-4 mt-6 text-primary">
                  {siteConfig.footer.social.map((social) => (
                    <li key={social.href}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        {socialIcons[social.icon]}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Links Section */}
            <div className="grid gap-8 w-full lg:flex lg:justify-between lg:gap-0 lg:w-2/3 xl:w-9/12 md:grid-cols-2">
              <FooterList title="Links" items={siteConfig.footer.links} isClient={isClient} />
              <FooterList title="Products" items={siteConfig.footer.products} isClient={isClient} />
              <FooterList title="Services" items={siteConfig.footer.services} isClient={isClient} />
              <FooterList title="Legal" items={siteConfig.footer.legal} isClient={isClient} />

              {/* Address */}
              {isClient && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <h4 className="mt-7 mb-4 font-geist text-itemtitle2 font-medium text-black dark:text-white">
                    Address
                  </h4>
                  <p className="mb-4 font-geist whitespace-pre-line w-[100%]">
                    {siteConfig.footer.address}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section Without Social Icons */}
        <div className="flex items-center justify-center gap-5 font-geist border-t border-stroke py-7 dark:border-strokedark">
          <p className="text-center">
            &copy; {year ?? "____"} Owned and Maintained By {siteConfig.name} Pvt Ltd. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

// FooterList Component
const FooterList = ({
  title,
  items,
  isClient,
}: {
  title: string;
  items: { label: string; href: string }[];
  isClient: boolean;
}) => {
  if (!isClient) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.1 }}
    >
      <h4 className="mt-7 mb-4 text-itemtitle2 font-medium font-geist text-black dark:text-white">
        {title}
      </h4>
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="mb-3 font-geist inline-block hover:text-primary"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};
