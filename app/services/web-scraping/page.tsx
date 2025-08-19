import  HeroSection  from "@/pages/web-scraper/hero-section"
import FeaturesGrid  from "@/pages/web-scraper/features"
import UseCases  from "@/pages/web-scraper/use-cases"
import HowItWorks  from "@/pages/web-scraper/how-it-works"
import  FAQ  from "@/pages/web-scraper/faq"
import Contact from "@/components/sections/contact-section"
// import { PricingSection } from "@/components/web-scraper/pricing-section"

export default function WebScrapingPage() {
  return(
    <>
      <HeroSection />
      <FeaturesGrid />  
      <UseCases />
      <HowItWorks />
      {/* <PricingSection /> */}
      <FAQ />
      <Contact />
    </>
  )
};