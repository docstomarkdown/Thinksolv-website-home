"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import DotBadge from "../ui/dotbadge";
import { Mail, Video } from "lucide-react";
import { siteConfig } from "../../config/site";
import ShinyButton from "../ui/shiny-button";
import GradientText from "../ui/gradient-text";
import { TbLoader3 } from "react-icons/tb";

declare global {
  interface Window {
    Calendly?: any;
  }
}

type Tab = "contact" | "calendly";

const Contact = () => {
  // UI state
  const [hasMounted, setHasMounted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Tab>("calendly"); // default to Calendly
  const [loadingCalendly, setLoadingCalendly] = useState(true);
  const [calendlyReady, setCalendlyReady] = useState(false);

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Calendly refs
  const calendlyRef = useRef<HTMLDivElement | null>(null);
  const initedRef = useRef(false);

  // Mount flag (no early return; we keep hooks order stable)
  useEffect(() => setHasMounted(true), []);

  // Initialize Calendly once the script is ready and container exists
  useEffect(() => {
    const tryInit = () => {
      if (initedRef.current) return true;
      if (!window.Calendly || !calendlyRef.current) return false;

      // reset container then init
      calendlyRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({
        url:
          "https://calendly.com/sam-thinksolv/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=007bbf",
        parentElement: calendlyRef.current,
      });

      // Wait for iframe to be fully loaded
      const iframe = calendlyRef.current.querySelector("iframe");
      const onLoaded = () => {
        setCalendlyReady(true);
        setLoadingCalendly(false);
      };

      if (iframe) {
        iframe.addEventListener("load", onLoaded, { once: true });
      } else {
        // fallback: observe for the iframe then bind load
        const obs = new MutationObserver(() => {
          const ifr = calendlyRef.current?.querySelector("iframe");
          if (ifr) {
            ifr.addEventListener("load", onLoaded, { once: true });
            obs.disconnect();
          }
        });
        obs.observe(calendlyRef.current!, { childList: true });
      }

      initedRef.current = true;
      return true;
    };

    // Fast path if script is already there
    if (tryInit()) return;

    // Otherwise wait for RootLayout signal or poll as fallback
    const onCalendlyLoaded = () => tryInit();
    window.addEventListener("calendly:loaded", onCalendlyLoaded);

    const id = window.setInterval(() => {
      if (tryInit()) window.clearInterval(id);
    }, 150);

    return () => {
      window.removeEventListener("calendly:loaded", onCalendlyLoaded);
      window.clearInterval(id);
    };
  }, []);

  // Handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = new FormData();
      formData.append("name", formState.name);
      formData.append("email", formState.email);
      formData.append("message", formState.message);

      const response = await fetch(process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_ID!, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      setSubmitStatus({ success: true, message: "Thanks! We'll get back to you soon." });
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Submit failed", error);
      setSubmitStatus({ success: false, message: "Submission failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const { header, findUs } = siteConfig.contact;

  return (
    <section id="contact" className="bg-white dark:bg-black text-black dark:text-white py-20">
      {!hasMounted ? null : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="relative text-center mb-10">
            <DotBadge label="Contact" textSize="text-md" className="mb-7 justify-center" />
            <h1 className="text-4xl lg:text-5xl font-medium font-geist text-gray-900 dark:text-white mb-6 leading-tight">
              {header.title}
              <GradientText className="ml-3">{header.span}</GradientText>
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left - Contact Info + Toggle Buttons */}
            <div className="space-y-6 lg:ml-25">
              <h3 className="text-xl sm:text-2xl font-medium font-geist">{findUs.heading}</h3>
              <div className="space-y-6 text-sm">
                {findUs.sections.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Mail size={20} />
                    <div>
                      <p className="font-medium font-geist">{item.title}</p>
                      <p className="mt-2">
                        {item.link ? (
                          <a href={item.link} className="hover:text-primary break-words">
                            {item.content}
                          </a>
                        ) : (
                          item.content
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-base sm:text-lg font-medium font-geist">Want to schedule a meeting?</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setSelectedOption("calendly")}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg border font-medium font-geist transition-colors ${selectedOption === "calendly"
                    ? "border-bordercolor bg-black text-white"
                    : "border-gray-300 dark:border-gray-600 bg-muted text-foreground hover:text-primary"
                    }`}
                >
                  <Video className="w-5 h-5 " />
                  <span>Schedule a Meeting</span>
                </button>
                <button
                  onClick={() => setSelectedOption("contact")}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg border font-medium font-geist transition-colors ${selectedOption === "contact"
                    ? "border-bordercolor bg-black text-white"
                    : "border-gray-300 dark:border-gray-600 bg-muted text-foreground hover:text-primary"
                    }`}
                >
                  <svg height="16pt" viewBox="0 0 512.001 512" width="16pt" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="m206.734375 223.867188c0 8.285156-6.71875 15-15 15-8.285156 0-15-6.714844-15-15 0-8.285157 6.714844-15 15-15 8.28125 0 15 6.714843 15 15zm0 0" />
                    <path fill="currentColor" d="m424.699219 112.46875h-41.230469v-25.167969c0-48.214843-39.007812-87.300781-87.300781-87.300781h-208.867188c-48.214843 0-87.300781 39.003906-87.300781 87.300781v281.167969c0 12.539062 14.703125 19.769531 24.601562 11.523438l92.230469-76.859376h11.703125v41.234376c0 48.214843 39.003906 87.300781 87.300782 87.300781h179.335937l92.226563 76.855469c2.75 2.292968 6.160156 3.476562 9.605468 3.476562 8.246094 0 14.996094-6.691406 14.996094-15v-297.234375c0-48.214844-39.003906-87.296875-87.300781-87.296875zm-313.300781 160.664062c-3.507813 0-6.90625 1.230469-9.601563 3.476563l-71.796875 59.832031v-249.140625c0-31.648437 25.601562-57.300781 57.300781-57.300781h208.867188c31.644531 0 57.300781 25.601562 57.300781 57.300781v128.535157c0 31.59375-25.707031 57.296874-57.300781 57.296874zm370.601562 191.84375-71.796875-59.832031c-2.695313-2.246093-6.09375-3.476562-9.601563-3.476562h-184.769531c-15.304687 0-29.695312-5.960938-40.515625-16.785157-10.824218-10.820312-16.785156-25.210937-16.785156-40.515624v-41.234376h137.632812c18.765626 0 36.167969-5.953124 50.417969-16.066406h70.082031c8.285157 0 15-6.714844 15-15 0-8.28125-6.714843-15-15-15h-43.566406c5.570313-10.351562 9.113282-21.953125 10.089844-34.265625h33.476562c8.285157 0 15-6.714843 15-15 0-8.285156-6.714843-15-15-15h-33.199218v-50.332031h41.234375c15.308593 0 29.695312 5.957031 40.519531 16.78125 10.820312 10.820312 16.78125 25.210938 16.78125 40.515625zm0 0" />
                    <path fill="currentColor" d="m166.566406 119.417969c0-6.71875 2.617188-13.03125 7.367188-17.785157 4.75-4.75 11.066406-7.367187 17.800781-7.367187 13.875 0 25.167969 11.292969 25.167969 25.167969 0 13.878906-11.292969 25.167968-25.167969 25.167968-8.285156 0-15 6.714844-15 15v16.066407c0 8.28125 6.714844 15 15 15 8.28125 0 15-6.71875 15-15v-3.140625c23.152344-6.550782 40.164063-27.871094 40.164063-53.09375 0-30.421875-24.746094-55.167969-55.179688-55.167969-14.730469 0-28.582031 5.738281-39 16.152344-10.414062 10.417969-16.152344 24.269531-16.152344 38.996093v.015626c0 8.285156 6.714844 14.992187 15 14.992187s15-6.71875 15-15.003906zm0 0" />
                    <path fill="currentColor" d="m416.667969 321.332031h-192.800781c-8.285157 0-15 6.71875-15 15 0 8.285157 6.714843 15 15 15h192.800781c8.28125 0 15-6.714843 15-15 0-8.28125-6.71875-15-15-15zm0 0" />
                  </svg>
                  <span>General Enquiry</span>
                </button>
              </div>
            </div>

            {/* Right - Both panels are always mounted; we toggle visibility only */}
            <div className="relative">
              {/* Calendly panel */}
              <div
                className={`shadow-xl bg-gray-100 dark:bg-[#111] p-6 sm:p-8 rounded-xl border border-primary/30 h-full relative ${selectedOption === "calendly" ? "" : "hidden"
                  }`}
              >
                {loadingCalendly && selectedOption === "calendly" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 dark:bg-[#111]/80 z-10">
                    <p className="text-lg font-medium animate-pulse flex items-center gap-2">
                      <TbLoader3 className="animate-spin text-2xl" />
                      Loading… Please wait
                    </p>
                  </div>
                )}

                <div
                  ref={calendlyRef}
                  // Keep it in layout and mounted even when tab switches away
                  className="w-full"
                  style={{
                    width: "100%",
                    minHeight: 520,
                    height: "100%",
                    maxHeight: 700,
                    overflow: "hidden",
                    visibility: calendlyReady ? "visible" : "hidden", // avoid flash of empty container
                  }}
                  aria-hidden={selectedOption !== "calendly"}
                />
              </div>

              {/* Contact form panel */}
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`shadow-xl bg-gray-100 dark:bg-[#111] p-6 sm:p-8 rounded-xl border border-primary/30 h-full ${selectedOption === "contact" ? "" : "hidden"
                  }`}
              >
                <div className="space-y-6">
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="w-full px-4 py-2 bg-transparent border rounded focus:outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full px-4 py-2 bg-transparent border rounded focus:outline-none"
                  />
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Message"
                    required
                    className="w-full px-4 py-2 bg-transparent border rounded focus:outline-none"
                  />
                  <ShinyButton
                    type="submit"
                    className="w-full bg-primary dark:bg-white text-white font-semibold py-2 rounded hover:opacity-90 transition disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </ShinyButton>
                  {submitStatus && (
                    <p className={`text-md mt-4 ${submitStatus.success ? "text-green-600" : "text-red-600"}`}>
                      {submitStatus.message}
                    </p>
                  )}
                </div>
              </motion.form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
