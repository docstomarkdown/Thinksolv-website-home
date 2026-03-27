import React from "react";
import { Link } from "react-router-dom";
import "../styles/PrivacyPage.css";

const EXTENSION_DISPLAY_NAME = "Web Scraper Pro";

const WebScraperProPrivacyPage = () => {
  return (
    <div className="privacy-page">
      <header className="privacy-header">
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-subtitle">
          for Google Chrome Extension <b>{EXTENSION_DISPLAY_NAME}</b>
        </p>
      </header>

      <div className="privacy-content">
        <p className="privacy-effective-date">
          Effective Date: March 27, 2025
        </p>

        <section className="privacy-section">
          <p className="privacy-text">
            Thinksolv Technologies (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;)
            respects and values your privacy. This Privacy Policy describes how
            we handle and protect your personal information in relation to your
            use of our Google Chrome extension{" "}
            <strong>{EXTENSION_DISPLAY_NAME}</strong>.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">1. Information We Collect</h2>
          <p className="privacy-text">
            Our extension is designed with privacy in mind. It helps you extract
            structured data, images, and related content from web pages you use
            with the extension. That processing occurs in your browser; we do not
            operate a service that stores your full scraped datasets on our
            servers.
          </p>
          <p className="privacy-text">
            If you choose to export data to Google Sheets, the extension uses
            Google&apos;s sign-in and APIs with the permissions you approve. Your
            exported data is sent to Google under your account; we do not retain
            a copy on our servers as part of that flow.
          </p>
          <p className="privacy-text">
            We only collect your email address when you voluntarily provide it to
            us—for example, when you contact us for support or feedback. We do not
            gather, store, or transmit any other personal information that can be
            used to identify you, such as your name, address, phone number, or
            location.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">2. Categories of Data Processed</h2>
          <ul className="privacy-list">
            <li>
              <strong>Content Data:</strong> Web page content you extract using
              the extension (processed locally in the browser, and sent to Google
              only if you export to Google Sheets)
            </li>
            <li>
              <strong>Contact Information:</strong> Email address voluntarily
              provided
            </li>
            <li>
              <strong>Technical Data:</strong> Temporary IP address or system logs
              processed automatically during server execution, if applicable
            </li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">3. How We Use Your Information</h2>
          <p className="privacy-text">
            Information is used solely to provide scraping and export features,
            to maintain extension reliability, and to improve the product. We do
            not use it for unrelated purposes.
          </p>
          <p className="privacy-text">
            Any email address you provide is used solely for communication
            purposes—to respond to your inquiries, provide support, or address
            feedback. We do not use your information for marketing, advertising,
            or any purpose other than direct communication with you.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">4. Data Storage and Retention</h2>
          <p className="privacy-text">
            Extracted content remains on your device within the extension unless you
            export it or clear it. We do not maintain persistent storage of your
            scraped content on our servers.
          </p>
          <p className="privacy-text">
            If you contact us and provide your email address, we retain that
            information only for as long as necessary to fulfill your request and
            maintain our support records. You may request deletion of your contact
            information at any time by contacting us.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">5. Data Sharing and Disclosure</h2>
          <p className="privacy-text">
            We do not sell, rent, or share your personal information with third
            parties for their marketing purposes. Your email address and any
            other information you provide will not be disclosed to external
            parties except in the following limited circumstances:
          </p>
          <ul className="privacy-list">
            <li>When required by law, court order, or governmental authority</li>
            <li>To protect our rights, safety, or property, or that of our users</li>
            <li>
              With service providers who assist us in operating our business (e.g.,
              email delivery), subject to confidentiality obligations
            </li>
          </ul>
          <p className="privacy-text">
            We do not share user data with any advertising networks, data brokers,
            or analytics services.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">6. Data Security</h2>
          <p className="privacy-text">
            Data is transmitted over HTTPS encryption. Processing occurs in
            isolated server environments where applicable. We do not maintain
            persistent storage of user content on our systems. Access to our
            systems is restricted and controlled.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">7. International Data Processing</h2>
          <p className="privacy-text">
            Processing may occur on secure servers and may involve cross-border
            data transfer. We ensure appropriate safeguards are in place for any
            such transfers.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">8. Children&apos;s Privacy</h2>
          <p className="privacy-text">
            Our extension is not directed to children under 13. We do not
            knowingly collect data from children under 13.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">9. Compliance</h2>
          <p className="privacy-text">
            We comply with the Chrome Web Store User Data Policy. We do not sell
            user data. We do not use user data for advertising, analytics, or
            profiling.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">10. Changes to this Privacy Policy</h2>
          <p className="privacy-text">
            We reserve the right to amend this Privacy Policy at any time. Any
            changes will be effective immediately upon posting the revised
            Privacy Policy, and the &quot;Effective Date&quot; above will be updated.
            You are advised to review this Privacy Policy periodically for any
            changes.
          </p>
          <p className="privacy-text">
            By using this Google Chrome extension, you signify your consent and
            agreement to the terms of this Privacy Policy. If you do not agree
            with this Privacy Policy, please refrain from using it.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">11. Contact Us</h2>
          <p className="privacy-text">
            If you have questions or concerns about this Privacy Policy, you can
            &nbsp;
            <Link to="/contact" className="privacy-link">
              contact us by email
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default WebScraperProPrivacyPage;
