"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface MobileNavProps {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ expanded, setExpanded }) => {
  const menuItems = {
    Services: [
      { title: "Web Scraping", href: "/services/web-scraping" },
      { title: "Document AI", href: "/services/document-ai" },
      //   { title: "Business Intelligence", href: "/seo" },
    //   { title: "Workflow Automations", href: "/interface-desi
    ],
    Products: [
        { title: "Merge Docs Pro", href: "https://www.mergedocs.pro" },
        { title: "Docs to PDF", href: "https://www.docstopdf.pro" },
        { title: "Docs to Markdown Pro", href: "https://www.docstomarkdown.pro" },
        { title: "Docs to WP Pro", href: "https://www.docstowp.pro" }
    ],
  };

  return (
    <AnimatePresence>
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-full left-0 right-0 bg-white dark:bg-black border-t dark:border-gray-800"
        >
          <div className="px-4 py-2">
            {Object.entries(menuItems).map(([category, items]) => (
              <div key={category} className="py-2">
                <h3 className="text-lg font-geist font-medium mb-2 text-gray-900 dark:text-gray-100">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className="block py-2 px-4 font-geist text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                        onClick={() => setExpanded(false)}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="py-2">
              <Link
                href="/blog"
                className="block py-2 text-lg text-black dark:text-gray-300 hover:bg-gray-100  font-geist font-medium dark:hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setExpanded(false)}
              >
                Blog
              </Link>
            </div>
            <div className="py-2">
              <Link
                href="/contact"
                className="block py-2 text-lg text-black dark:text-gray-300 hover:bg-gray-100 font-geist font-medium dark:hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setExpanded(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;