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
        <p className="privacy-effective-date">Effective Date: August 19, 2026</p>

        <section className="privacy-section">
          <p className="privacy-text">
            These Terms of Service (&quot;Terms&quot;) govern your access to and use
            of the websites, browser extensions, and related services offered by
            Thinksolv Technologies (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;).
            By using our services, you agree to these Terms. If you do not agree,
            do not use our services.
          </p>
        </section>

        <nav className="privacy-toc" aria-label="Table of contents">
          <p className="privacy-toc-title">Jump to:</p>
          <ul className="privacy-toc-list">
            <li><a href="#our-services" className="privacy-toc-link">1. Our services</a></li>
            <li><a href="#payments-subscriptions-refunds" className="privacy-toc-link">2. Payments, subscriptions, and refunds</a></li>
            <li><a href="#acceptable-use" className="privacy-toc-link">3. Acceptable use</a></li>
            <li><a href="#intellectual-property" className="privacy-toc-link">4. Intellectual property</a></li>
            <li><a href="#third-party-services" className="privacy-toc-link">5. Third-party services</a></li>
            <li><a href="#disclaimers" className="privacy-toc-link">6. Disclaimers</a></li>
            <li><a href="#limitation-of-liability" className="privacy-toc-link">7. Limitation of liability</a></li>
            <li><a href="#indemnity" className="privacy-toc-link">8. Indemnity</a></li>
            <li><a href="#termination" className="privacy-toc-link">9. Termination</a></li>
            <li><a href="#changes-to-these-terms" className="privacy-toc-link">10. Changes to these Terms</a></li>
            <li><a href="#governing-law" className="privacy-toc-link">11. Governing law</a></li>
            <li><a href="#contact" className="privacy-toc-link">12. Contact</a></li>
          </ul>
        </nav>

        <section className="privacy-section">
          <h2 id="our-services" className="privacy-section-title">1. Our services</h2>
          <p className="privacy-text">
            We provide software products, including Google Chrome extensions and
            this website, for productivity and data-related workflows. Features,
            availability, and supported platforms may change over time. We may
            modify, suspend, or discontinue any part of our services with or
            without notice where permitted by law.
          </p>
        </section>

        <section className="privacy-section">
          <h2 id="payments-subscriptions-refunds" className="privacy-section-title">2. Payments, subscriptions, and refunds</h2>
          <p className="privacy-text">
            <strong>Payment processing:</strong> Paid features of our Chrome
            extensions are billed and processed by Lemon Squeezy, our authorized
            payment processor and Merchant of Record. Lemon Squeezy handles
            billing, payment collection, tax calculation, and receipt issuance on
            our behalf.
          </p>
          <p className="privacy-text">
            By purchasing a paid plan, you also agree to Lemon Squeezy&apos;s{" "}
            <a
              href="https://www.lemonsqueezy.com/terms"
              className="privacy-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              terms of service
            </a>{" "}
            and privacy policy.
          </p>

          <p className="privacy-text">
            <strong>Subscriptions and renewals:</strong> Paid plans renew
            automatically at the end of each billing cycle unless canceled before
            the renewal date.
          </p>
          <p className="privacy-text">
            Lemon Squeezy sends a renewal reminder and receipt by email in
            advance of each charge. It is your responsibility to review these
            emails and to cancel your subscription before the renewal date if you
            do not wish to be charged for the next billing cycle.
          </p>
          <p className="privacy-text">
            We are not responsible for renewal charges resulting from a failure
            to cancel in time, including where the email is missed, filtered, or
            sent to an incorrect address on file.
          </p>

          <p className="privacy-text">
            <strong>How to cancel:</strong> You may cancel your subscription at
            any time through your{" "}
            <a
              href="https://thinksolv.lemonsqueezy.com/billing"
              className="privacy-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lemon Squeezy customer portal
            </a>
            , or by contacting us at{" "}
            <a href="mailto:help@thinksolv.com" className="privacy-link">
              help@thinksolv.com
            </a>
            .
          </p>
          <p className="privacy-text">
            Cancellation stops future renewals but does not retroactively refund
            charges already processed, except as described below.
          </p>

          <p className="privacy-text">
            <strong>Refund policy:</strong> We offer a 14-day money-back
            guarantee on the initial purchase of a paid plan. If you are not
            satisfied, contact us at{" "}
            <a href="mailto:help@thinksolv.com" className="privacy-link">
              help@thinksolv.com
            </a>{" "}
            within 14 days of your original purchase date to request a refund.
          </p>
          <p className="privacy-text">
            Refund requests made after this 14-day window, and charges for
            subscription renewals (including the first renewal after the initial
            purchase), are not eligible for a refund except where required by
            applicable law.
          </p>
          <p className="privacy-text">
            Approved refunds are issued to the original payment method via Lemon
            Squeezy and take 7 working days to appear, depending on your bank or
            card issuer.
          </p>

          <p className="privacy-text">
            <strong>Disputes and chargebacks:</strong> If you believe you were
            charged in error or are dissatisfied with a purchase, you agree to
            contact us first at{" "}
            <a href="mailto:help@thinksolv.com" className="privacy-link">
              help@thinksolv.com
            </a>{" "}
            so we can investigate and resolve the issue directly.
          </p>
          <p className="privacy-text">
            Initiating a chargeback or payment dispute with your bank or card
            issuer without first attempting to resolve the matter with us is a
            breach of these Terms and may result in immediate suspension or
            termination of your access to our services.
          </p>
          <p className="privacy-text">
            We reserve the right to contest any chargeback or dispute by
            providing evidence to Lemon Squeezy and/or your card issuer,
            including your purchase records, license and activation status,
            extension usage and access logs, IP addresses, support
            correspondence, and records of the renewal notice emails sent to
            you.
          </p>
          <p className="privacy-text">
            <strong>Support:</strong> For billing questions, cancellations, or
            refund requests, contact{" "}
            <a href="mailto:help@thinksolv.com" className="privacy-link">
              help@thinksolv.com
            </a>
            .
          </p>
        </section>

        <section className="privacy-section">
          <h2 id="acceptable-use" className="privacy-section-title">3. Acceptable use</h2>
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
          <h2 id="intellectual-property" className="privacy-section-title">4. Intellectual property</h2>
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
          <h2 id="third-party-services" className="privacy-section-title">5. Third-party services</h2>
          <p className="privacy-text">
            Our extensions or site may interoperate with third-party products
            (for example, Google services or AI platforms). Those services are
            governed by their own terms and privacy policies. We are not
            responsible for third-party services or content.
          </p>
        </section>

        <section className="privacy-section">
          <h2 id="disclaimers" className="privacy-section-title">6. Disclaimers</h2>
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
          <h2 id="limitation-of-liability" className="privacy-section-title">7. Limitation of liability</h2>
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
          <h2 id="indemnity" className="privacy-section-title">8. Indemnity</h2>
          <p className="privacy-text">
            You agree to defend, indemnify, and hold harmless Thinksolv
            Technologies and its affiliates from any claims, damages, losses, or
            expenses (including reasonable legal fees) arising from your use of our
            services, your violation of these Terms, or your violation of
            others&apos; rights.
          </p>
        </section>

        <section className="privacy-section">
          <h2 id="termination" className="privacy-section-title">9. Termination</h2>
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
          <h2 id="changes-to-these-terms" className="privacy-section-title">10. Changes to these Terms</h2>
          <p className="privacy-text">
            We may update these Terms from time to time. We will post the revised
            Terms on this page and update the Effective Date. Your continued use
            of our services after changes become effective constitutes acceptance
            of the updated Terms. If you do not agree, you must stop using our
            services.
          </p>
        </section>

        <section className="privacy-section">
          <h2 id="governing-law" className="privacy-section-title">11. Governing law</h2>
          <p className="privacy-text">
            These Terms are governed by the laws of India, without regard to
            conflict-of-law principles. Any disputes arising from or relating to
            these Terms shall be subject to the exclusive jurisdiction of the
            courts in Coimbatore, Tamil Nadu, India.
          </p>
        </section>

        <section className="privacy-section">
          <h2 id="contact" className="privacy-section-title">12. Contact</h2>
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
