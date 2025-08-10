"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import DotBadge from "../../components/ui/dotbadge";
import { Mail } from "lucide-react";
import { siteConfig } from "../../config/site";
import ShinyButton from "../../components/ui/shiny-button";
import GradientText from "../../components/ui/gradient-text";

const Contact = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [selectedOption, setSelectedOption] = useState<"contact" | "calendly">("contact");

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    inquiry: "",
    message: "",
  });

  const calendlyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedOption === "calendly" && calendlyRef.current) {
      // @ts-ignore
      window.Calendly?.initInlineWidget({
        url: "https://calendly.com/sam-thinksolv/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=e91c24",
        parentElement: calendlyRef.current,
      });
    }
  }, [selectedOption]);

  useEffect(() => setHasMounted(true), []);
  if (!hasMounted) return null;

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
      formData.append("subject", formState.inquiry || siteConfig.contact.form.subject);
      formData.append("message", formState.message);

      const response = await fetch(process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_ID!, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      setSubmitStatus({ success: true, message: "Thanks! We'll get back to you soon." });
      setFormState({ name: "", email: "", inquiry: "", message: "" });
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
        <div className="space-y-6 lg:ml-15">
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
              onClick={() => setSelectedOption("contact")}
              className={`px-5 py-2 rounded-lg border font-medium font-geist transition-colors ${
                selectedOption === "contact"
                  ? "border-bordercolor bg-black text-white"
                  : "border-gray-300 dark:border-gray-600 bg-muted text-foreground hover:text-primary"
              }`}
            >
              Talk to Us
            </button>
            <button
              onClick={() => setSelectedOption("calendly")}
              className={`px-5 py-2 rounded-lg border font-medium font-geist transition-colors ${
                selectedOption === "calendly"
                  ? "border-bordercolor bg-black text-white"
                  : "border-gray-300 dark:border-gray-600 bg-muted text-foreground hover:text-primary"
              }`}
            >
              Schedule Meeting
            </button>
          </div>
        </div>

        {/* Right - Contact Form or Calendly */}
        {selectedOption === "calendly" ? (
            <motion.div
  initial={{ opacity: 0, y: -20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="shadow-xl bg-gray-100 dark:bg-[#111] p-6 sm:p-8 rounded-xl border border-primary/30 h-full"
>
  <div
    ref={calendlyRef}
    className="w-full"
    style={{
      width: "100%",
      minHeight: "320px", // consistent with contact form height
      height: "100%",
      maxHeight: "600px",
      overflow: "hidden",
    }}
  />
</motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="shadow-xl bg-gray-100 dark:bg-[#111] p-6 sm:p-8 rounded-xl border border-primary/30"
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
              ></textarea>
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
        )}
      </div>
    </div>
  </section>
  );
};

export default Contact;
