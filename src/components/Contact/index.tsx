"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import SectionHeader from "../Common/SectionHeader";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useSearchParams } from "next/navigation";
import { User, Mail, FileText, MapPin, MessageSquare } from "lucide-react";

const utmSourceMapping: { [key: string]: string } = {
  "extension_a": "Support for Extension A",
  "extension_b": "Support for Extension B",
  "ext-chatgpt-to-word": "Support for ChatGPT to Word Extension",
  "extension-ai": "Extension AI",
  "dynamic-test": "DynamicDynamic Test",

  // Add more mappings as needed
};

// Helper to format dynamic utm_source values
const formatUtmSource = (source: string): string => {
  // Replace hyphens/underscores with spaces
  const text = source.replace(/[-_]/g, " ");
  // Capitalize first letter of each word
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
};

const Contact = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [thankYouMessage, setThankYouMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const searchParams = useSearchParams();

  const [subject, setSubject] = useState("");

  React.useEffect(() => {
    setHasMounted(true);

    if (searchParams) {
      const querySubject = searchParams.get("subject");
      const utmSource = searchParams.get("utm_source");

      if (querySubject) {
        setSubject(querySubject);
      } else if (utmSource) {
        // 1. Check mapping from environment variable (JSON encoded)
        let envMapping: { [key: string]: string } = {};
        try {
          const envMapStr = process.env.NEXT_PUBLIC_UTM_SOURCE_MAP;
          if (envMapStr) {
            envMapping = JSON.parse(envMapStr);
          }
        } catch (e) {
          console.error("Failed to parse NEXT_PUBLIC_UTM_SOURCE_MAP", e);
        }

        // 2. Resolve Subject: Env Mapping -> Hardcoded Mapping -> Dynamic Formatter
        if (envMapping[utmSource]) {
          setSubject(envMapping[utmSource]);
        } else if (utmSourceMapping[utmSource]) {
          setSubject(utmSourceMapping[utmSource]);
        } else {
          const formatted = formatUtmSource(utmSource);
          setSubject(formatted);
        }
      }
    }
  }, [searchParams]);

  if (!hasMounted) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await executeRecaptcha("contact_form_submit");

      if (!token) {
        alert("Failed to verify CAPTCHA");
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          captcha: token,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Submission failed");
      }

      setThankYouMessage(true);
      form.reset();
    } catch (error) {
      console.error("Submission failed", error);
      alert("Failed to  message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="support" className="overflow-hidden bg-gray-100/40 dark:bg-black">
        <div className="relative mx-auto pt-2 lg:px-15 lg:pt-4 xl:px-20 xl:pt-4">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-black"></div>
          <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
            <Image
              src="/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          {/* Floating Patterns */}
          <div className="absolute -left-10 top-0 -z-1">
            <Image
              src="/shape/shape-01.png"
              alt="shape"
              width={46}
              height={246}
              className="dark:hidden"
            />
          </div>
          <div className="absolute -right-10 bottom-10 -z-1">
            <Image
              src="/shape/shape-02.svg"
              alt="shape"
              width={36}
              height={36}
            />
          </div>
          <div className="absolute -right-20 top-0 -z-1">
            <Image
              src="/shape/shape-03.svg"
              alt="shape"
              width={21}
              height={21}
            />
          </div>

          <div className="mb-8">
            <SectionHeader
              headerInfo={{
                subtitle: "Contact us",
                description: "Have a question? Tell us what you’re looking for, and our team will get back to you shortly.",
                textAlign: "center",
              }}
            />
          </div>

          <div className="flex flex-wrap justify-center">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full max-w-3xl rounded-lg bg-white/98 backdrop-blur-[2px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.02)] ring-1 ring-black/5 dark:ring-white/10 dark:border dark:border-strokedark dark:bg-black md:p-12 mb-16"
            ><h2 className="mb-6 text-lg font-semibold tracking-tight text-gray-800 dark:text-gray-200 xl:text-xl">
                Send us a Message
              </h2>
              <p className="mb-6 text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                {/* Tell us about your goals, challenges, or ideas — we’re here to help */}

              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3 flex flex-col gap-5">
                  <div className="relative flex items-center">
                    <User className="absolute left-3 text-black" size={20} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full name"
                      required
                      className="w-full border border-gray-200/50 bg-[#f8faff] dark:bg-gray-800/20 pl-10 p-2.5 rounded-md focus:border-black focus:bg-white transition-all duration-200 placeholder:text-gray-400 focus:placeholder:text-black/60 focus-visible:outline-none dark:border-gray-800 dark:focus:border-gray-600 dark:focus:placeholder:text-white"
                    />
                  </div>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 text-black" size={20} />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      required
                      className="w-full border border-gray-200/50 bg-[#f8faff] dark:bg-gray-800/20 pl-10 p-2.5 rounded-md focus:border-black focus:bg-white transition-all duration-200 placeholder:text-gray-400 focus:placeholder:text-black/60 focus-visible:outline-none dark:border-gray-800 dark:focus:border-gray-600 dark:focus:placeholder:text-white"
                    />
                  </div>
                </div>

                <div className="mb-3 relative flex items-center">
                  <FileText className="absolute left-3 text-black" size={20} />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                    minLength={3}
                    maxLength={150}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full border border-gray-200/50 bg-[#f8faff] dark:bg-gray-800/20 pl-10 p-2.5 rounded-md focus:border-black focus:bg-white transition-all duration-200 placeholder:text-gray-400 focus:placeholder:text-black/60 focus-visible:outline-none dark:border-gray-800 dark:focus:border-gray-600 dark:focus:placeholder:text-white"
                  />
                </div>

                <div className="mb-4 relative flex items-start">
                  <MessageSquare className="absolute left-3 top-3 text-black" size={20} />
                  <textarea
                    placeholder="Tell us more about your Needs"
                    rows={4}
                    name="message"
                    required
                    className="w-full border border-gray-200/50 bg-[#f8faff] dark:bg-gray-800/20 pl-10 p-2.5 focus:border-black focus:bg-white transition-all duration-200 placeholder:text-gray-400 focus:placeholder:text-black/60 focus-visible:outline-none dark:border-gray-800 dark:focus:border-gray-600 dark:focus:placeholder:text-white rounded-md"
                  ></textarea>
                </div>

                <div className="flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
                  <div className="flex justify-start">
                    {thankYouMessage && (
                      <p className="text-green-600 font-bold">
                        Thanks for reaching out! Our team is now on it!
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end w-full md:w-auto">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="text-center px-6 py-2 font-semibold rounded-md border border-black dark:border-white bg-white dark:bg-black text-black dark:text-white text-base hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.5)] transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 w-full md:w-auto"
                    >
                      {isSubmitting && (
                        <span className="loader border-2 border-t-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin"></span>
                      )}
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
