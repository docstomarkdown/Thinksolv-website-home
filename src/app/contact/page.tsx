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
      <div className="pt-5">
        <SectionHeader
          headerInfo={{
            title: "Contact",
            subtitle: "Contact Us",
            description:
              "Reach out to us today to ask any questions about our products or discover how we can help your business automate tasks, streamline processes, boost productivity, and save valuable time."
          }}
        />
      </div>
      <div className="pb-10 pt-10">
        <Suspense fallback={<div>Loading...</div>}>
          <Contact />
        </Suspense>
      </div>
      <Footer />
    </>
  );
};

export default SupportPage;
