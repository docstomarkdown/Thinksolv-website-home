import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PrivacyPage.css';

const PrivacyPage = () => {
  return (
    <div className="privacy-page">
      <header className="privacy-header">
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-subtitle">
          for Google Chrome Extension <b>ChatGPT to Word or PDF</b> and <b>ChatGPT to Google Docs or PDF</b>
        </p>
      </header>

      <div className="privacy-content">
        <p className="privacy-effective-date">Effective Date: December 17, 2024</p>

        <section className="privacy-section">
          <p className="privacy-text">
            We respect and value your privacy. This Privacy Policy describes how
            we handle and protect your personal information in relation to your
            use of our Google Chrome extension(s).
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">Information Collection</h2>
          <p className="privacy-text">
            We only collect your email address for communication purposes. We do
            not gather, store, or transmit any other personal information that
            can be used to identify you, such as your name, address, or
            location. Your email address will not be sold or shared with third
            parties.
          </p>
          <br />
          <p className="privacy-text">
            We also do not collect the chatGPT responses while converting them to Google Docs or Word or PDF format.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">Changes to this Privacy Policy</h2>
          <p className="privacy-text">
            We reserve the right to amend this Privacy Policy at any time. Any
            changes will be effective immediately upon posting the revised
            Privacy Policy, and the "Effective Date" above will be updated. You
            are advised to review this Privacy Policy periodically for any
            changes.
          </p>
        </section>

        <section className="privacy-section">
          <p className="privacy-text">
            By using our Google Chrome Extensions, you signify your consent and
            agreement to the terms of this Privacy Policy. If you do not agree
            with this Privacy Policy, please refrain from using our Google
            Chrome Extensions.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">Feedback</h2>
          <p className="privacy-text">
            If you have questions or concerns about this Privacy Policy, you can{' '}
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
