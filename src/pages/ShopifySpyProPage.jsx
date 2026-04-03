import React, { useEffect } from "react";
import "../styles/WebScraperProPage.css";

const PAGE_TITLE = "Shopify Spy Pro | Thinksolv Technologies";

function ShopifySpyProPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;

    let meta = document.querySelector('meta[name="robots"]');
    const createdMeta = !meta;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "robots");
      document.head.appendChild(meta);
    }
    const previousRobots = meta.getAttribute("content");
    meta.setAttribute("content", "noindex, nofollow");

    return () => {
      document.title = previousTitle;
      if (createdMeta) {
        meta.remove();
      } else if (previousRobots != null) {
        meta.setAttribute("content", previousRobots);
      } else {
        meta.removeAttribute("content");
      }
    };
  }, []);

  return (
    <div className="wsp-page">
      <p className="wsp-page-lead">
        A Thinksolv Chrome extension for researching Shopify stores—see themes,
        apps, and product signals from the storefronts you browse, in a side
        panel workflow.
      </p>

      <div className="wsp-page-card">
        <section className="wsp-page-section">
          <h2 className="wsp-page-section-title">What it is</h2>
          <p className="wsp-page-text">
            Shopify Spy Pro runs while you visit Shopify-powered shops. It surfaces
            structured storefront data to help you understand how stores are
            built and what they sell—without leaving your browser. You choose when
            to open the side panel and what to export.
          </p>
        </section>

        <section className="wsp-page-section">
          <h2 className="wsp-page-section-title">Highlights</h2>
          <ul className="wsp-page-list">
            <li>Side panel aligned with the active tab</li>
            <li>Storefront and product context surfaced from pages you load</li>
            <li>Export options when you want to save results (including optional Google Sheets when you connect your account)</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default ShopifySpyProPage;
