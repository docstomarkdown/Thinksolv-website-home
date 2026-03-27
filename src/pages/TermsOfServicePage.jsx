import React from "react";
import { Link } from "react-router-dom";
import "../styles/PrivacyPage.css";

const TermsOfServicePage = () => {
  return (
    <div className="privacy-page">
      <header className="privacy-header">
        <h1 className="privacy-title">Terms of Service</h1>
        <p className="privacy-subtitle">
          Thinksolv Technologies — website and Chrome extensions
        </p>
      </header>

      <div className="privacy-content">
        <p className="privacy-effective-date">Effective Date: March 27, 2025</p>

        <section className="privacy-section">
          <p className="privacy-text">
            These Terms of Service (&quot;Terms&quot;) govern your access to and use
            of the websites, browser extensions, and related services offered by
            Thinksolv Technologies (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;).
            By using our services, you agree to these Terms. If you do not agree,
            do not use our services.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">1. Our services</h2>
          <p className="privacy-text">
            We provide software products, including Google Chrome extensions and
            this website, for productivity and data-related workflows. Features,
            availability, and supported platforms may change over time. We may
            modify, suspend, or discontinue any part of our services with or
            without notice where permitted by law.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">2. Acceptable use</h2>
          <p className="privacy-text">
            You agree to use our services only in compliance with applicable laws
            and the policies of platforms you interact with (including the Chrome
            Web Store and third-party sites). You must not misuse our software to
            access systems without authorization, violate others&apos; rights,
            distribute malware, or interfere with our services or other users.
          </p>
          <p className="privacy-text">
            Where an extension helps you extract or process content from websites,
            you are solely responsible for ensuring that your use complies with
            those websites&apos; terms and applicable regulations.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">3. Intellectual property</h2>
          <p className="privacy-text">
            Our services, branding, documentation, and underlying software are
            owned by Thinksolv Technologies or our licensors and are protected by
            intellectual property laws. These Terms do not grant you ownership of
            our intellectual property. You receive a limited, non-exclusive,
            non-transferable right to use our extensions and site in line with
            these Terms and any store or platform rules.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">4. Third-party services</h2>
          <p className="privacy-text">
            Our extensions or site may interoperate with third-party products
            (for example, Google services or AI platforms). Those services are
            governed by their own terms and privacy policies. We are not
            responsible for third-party services or content.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">5. Disclaimers</h2>
          <p className="privacy-text">
            Our services are provided &quot;as is&quot; and &quot;as
            available.&quot; To the fullest extent permitted by law, we disclaim
            all warranties, whether express or implied, including merchantability,
            fitness for a particular purpose, and non-infringement. We do not
            warrant that our services will be uninterrupted, error-free, or free
            of harmful components.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">6. Limitation of liability</h2>
          <p className="privacy-text">
            To the fullest extent permitted by law, Thinksolv Technologies and its
            directors, employees, and affiliates shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages, or
            any loss of profits, data, goodwill, or business opportunities,
            arising from your use of our services. Our aggregate liability for any
            claim relating to the services shall not exceed the greater of (a) the
            amount you paid us for the specific service giving rise to the claim
            in the twelve months before the claim or (b) one hundred U.S. dollars
            (USD $100), if you have not paid us. Some jurisdictions do not allow
            certain limitations; in those cases, our liability is limited to the
            maximum permitted by law.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">7. Indemnity</h2>
          <p className="privacy-text">
            You agree to defend, indemnify, and hold harmless Thinksolv
            Technologies and its affiliates from any claims, damages, losses, or
            expenses (including reasonable legal fees) arising from your use of our
            services, your violation of these Terms, or your violation of
            others&apos; rights.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">8. Termination</h2>
          <p className="privacy-text">
            We may suspend or terminate access to our services if you breach
            these Terms or if we reasonably believe such action is necessary to
            protect users, our systems, or comply with law. You may stop using
            our services at any time. Provisions that by their nature should
            survive (including intellectual property, disclaimers, limitation of
            liability, and governing law) will survive termination.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">9. Changes to these Terms</h2>
          <p className="privacy-text">
            We may update these Terms from time to time. We will post the revised
            Terms on this page and update the Effective Date. Your continued use
            of our services after changes become effective constitutes acceptance
            of the updated Terms. If you do not agree, you must stop using our
            services.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">10. Governing law</h2>
          <p className="privacy-text">
            These Terms are governed by the laws of India, without regard to
            conflict-of-law principles. Any disputes arising from or relating to
            these Terms shall be subject to the exclusive jurisdiction of the
            courts in Coimbatore, Tamil Nadu, India.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">11. Contact</h2>
          <p className="privacy-text">
            For questions about these Terms, please{" "}
            <Link to="/contact" className="privacy-link">
              contact us
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
