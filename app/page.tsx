import React from "react";
import HeroSection from "../components/sections/hero-section";
import Services from "../components/sections/services-section";
import Product from "../components/sections/products-section";
//import Contact from "../components/sections/contact-section";
// import BrandsSection from "../components/sections/brands-section";
import Contact from "@/components/sections/contact-section2";
import About from "../components/sections/about-section";
import FunFact from "../components/sections/statistics-section";
import FAQ from "../components/sections/faq-section";
// import Map from "../components/Map";
// import BrandsSection from '../components/Brands';

export default function Home() {
  return (
    <>
    <div  className="bg-red dark:bg-black">
      <HeroSection />
      {/* <BrandsSection /> */}
      <About />
      <Product />
      <Services />
      <FunFact />
      {/* <Map /> */}
      {/*<AnimatedTestimonialsDemo />*/}
      <FAQ />
      <Contact />
   </div>   
    </>
  );
}
