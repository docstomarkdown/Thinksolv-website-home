import React from "react";
import { Link } from "react-router-dom";
import "../styles/PrivacyPage.css";

const DEFAULT_SUBTITLE = (
  <>
    for Google Chrome Extension <b>ChatGPT to Word or PDF</b> and{" "}
    <b>ChatGPT to Google Docs or PDF</b>
  </>
);

const PrivacyPage = ({ extensionName, sourceName = "ChatGPT" }) => {
  const subtitle = extensionName ? (
    <>
      for Google Chrome Extension <b>{extensionName}</b>
    </>
  ) : (
    DEFAULT_SUBTITLE
  );

  return (
    <div className="privacy-page">
      <header className="privacy-header">
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-subtitle">{subtitle}</p>
      </header>

      <div className="privacy-content">
        <p className="privacy-effective-date">
          Effective Date: December 17, 2024
        </p>

        <section className="privacy-section">
          <p className="privacy-text">
            Thinksolv Technologies ("we," "us," "our") respects and values your privacy. This Privacy Policy describes how we handle and protect your personal information in relation to your use of our Google Chrome extension(s).
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">1. Information We Collect</h2>
          <p className="privacy-text">
            Our extension is designed with privacy in mind. To perform conversions, we transmit the HTML source of your content to secure temporary server environments operated by us. Data is processed only for conversion; no content is stored after processing.
          </p>
          <p className="privacy-text">
            This includes the {sourceName} responses or chat content you convert to Google Docs, Word, or PDF format. We do not collect, store, or retain this content—it is processed and immediately discarded after the conversion is complete.
          </p>
          <p className="privacy-text">
            We only collect your email address when you voluntarily provide it to us—for example, when you contact us for support or feedback. We do not gather, store, or transmit any other personal information that can be used to identify you, such as your name, address, phone number, or location.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">2. Categories of Data Processed</h2>
          <ul className="privacy-list">
            <li><strong>Content Data:</strong> HTML/chat content submitted for conversion</li>
            <li><strong>Contact Information:</strong> Email address voluntarily provided</li>
            <li><strong>Technical Data:</strong> Temporary IP address or system logs processed automatically during server execution, if applicable</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">3. How We Use Your Information</h2>
          <p className="privacy-text">
            The HTML source you send is used solely for on-the-fly conversion to your requested format (Google Docs, Word, or PDF). It is not stored, retained, or used for any other purpose.
          </p>
          <p className="privacy-text">
            Any email address you provide is used solely for communication purposes—to respond to your inquiries, provide support, or address feedback. We do not use your information for marketing, advertising, or any purpose other than direct communication with you.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">4. Data Storage and Retention</h2>
          <p className="privacy-text">
            Your content is transmitted to secure temporary server environments operated by us for conversion only. The data is not stored or retained on any servers—it is processed and immediately discarded after the conversion is complete.
          </p>
          <p className="privacy-text">
            If you contact us and provide your email address, we retain that information only for as long as necessary to fulfill your request and maintain our support records. You may request deletion of your contact information at any time by contacting us.
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
            <li>With service providers who assist us in operating our business (e.g., email delivery), subject to confidentiality obligations</li>
          </ul>
          <p className="privacy-text">
            We do not share user data with any advertising networks, data brokers, or analytics services.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">6. Data Security</h2>
          <p className="privacy-text">
            Data is transmitted over HTTPS encryption. Processing occurs in isolated server environments. We do not maintain persistent storage of user content. Access to our systems is restricted and controlled.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">7. International Data Processing</h2>
          <p className="privacy-text">
            Processing may occur on secure servers and may involve cross-border data transfer. We ensure appropriate safeguards are in place for any such transfers.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">8. Children's Privacy</h2>
          <p className="privacy-text">
            Our extension is not directed to children under 13. We do not knowingly collect data from children under 13.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">9. Compliance</h2>
          <p className="privacy-text">
            We comply with the Chrome Web Store User Data Policy. We do not sell user data. We do not use user data for advertising, analytics, or profiling.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">10. Changes to this Privacy Policy</h2>
          <p className="privacy-text">
            We reserve the right to amend this Privacy Policy at any time. Any
            changes will be effective immediately upon posting the revised
            Privacy Policy, and the "Effective Date" above will be updated. You
            are advised to review this Privacy Policy periodically for any
            changes.
          </p>
          <p className="privacy-text">
            By using our Google Chrome Extensions, you signify your consent and
            agreement to the terms of this Privacy Policy. If you do not agree
            with this Privacy Policy, please refrain from using our Google
            Chrome Extensions.
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

export default PrivacyPage;
