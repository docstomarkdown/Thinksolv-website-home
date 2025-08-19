import Contact from "@/components/sections/contact-section";
import FAQ from "@/pages/document-ai/faq";
import HeroSection from "@/pages/document-ai/hero-section";
import FeatureSection from "@/pages/document-ai/features";
import HowItWorksSection from "@/pages/document-ai/how-it-works";
import UseCasesGrid from "@/pages/document-ai/use-cases";

export default function DocumentAiPage() {
  return(
    <>
      <HeroSection />
      <FeatureSection />
      <UseCasesGrid />
      <HowItWorksSection />
      {/* <PricingSection /> */}
      <FAQ />
      <Contact />
    </>
  )
};