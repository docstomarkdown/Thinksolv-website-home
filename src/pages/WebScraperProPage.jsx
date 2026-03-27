import React, { useEffect } from "react";
import "../styles/WebScraperProPage.css";

const PAGE_TITLE = "Web Scraper Pro | Thinksolv Technologies";

function WebScraperProPage() {
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
        A Thinksolv browser extension for structured data extraction—from the
        pages you choose, without writing code.
      </p>

      <div className="wsp-page-card">
        <section className="wsp-page-section">
          <h2 className="wsp-page-section-title">What it is</h2>
          <p className="wsp-page-text">
            Web Scraper Pro is a Google Chrome extension that helps you pull lists,
            product details, and images from pages you visit—without writing code.
            You stay in control of what you capture and how you export it.
          </p>
        </section>

        <section className="wsp-page-section">
          <h2 className="wsp-page-section-title">Highlights</h2>
          <ul className="wsp-page-list">
            <li>Side panel workflow aligned with the tab you&apos;re on</li>
            <li>Export options including CSV, JSON, and spreadsheet-friendly formats</li>
            <li>Optional Google Sheets export when you connect your Google account</li>
          </ul>
        </section>

      </div>
    </div>
  );
}

export default WebScraperProPage;
