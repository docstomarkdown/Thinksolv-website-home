import React, { Suspense } from "react";
import Contact from "@/components/Contact";
import SectionHeader from "@/components/Common/SectionHeader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact thinksolv",
  description: "This is contact page for thinksolv",
  // other metadata
};

const SupportPage = () => {
  return (
    <>
      <Header />
      <div className="pb-5 pt-8">
        <Suspense fallback={<div>Loading...</div>}>
          <Contact />
        </Suspense>
      </div>
      <Footer />
    </>
  );
};

export default SupportPage;
