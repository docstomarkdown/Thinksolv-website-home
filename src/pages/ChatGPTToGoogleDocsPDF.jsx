import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import '../styles/ExtensionPage.css';

const ChatGPTToGoogleDocsPDF = () => {
  useEffect(() => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    }

    // Trigger the confetti on page load
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  return (
    <div className="extension-page">
      {/* Header */}
      <header className="extension-header">
        <p className="extension-thank-you">
          Thank you for installing the{' '}
          <span className="extension-name">ChatGPT to Google Docs or PDF</span> extension.
        </p>

        <h1 className="extension-title">
          How to Save a ChatGPT Conversation as a Google Docs or PDF Document
        </h1>
      </header>

      <main className="extension-main">
        {/* Step 1 */}
        <section className="extension-step">
          <span className="extension-step-number">1</span>
          <h2 className="extension-step-title">
            Open chatgpt.com. If its already open, refresh it after installing the add-on.
          </h2>
          <img
            src="/chatgpt-to-word-pdf-1.png"
            alt="Open ChatGPT"
            className="extension-step-image"
          />
        </section>

        {/* Step 2 */}
        <section className="extension-step">
          <span className="extension-step-number">2</span>
          <h2 className="extension-step-title">
            Ask a question to ChatGPT.{' '}
            <p>
              Once, you have received the answer, Click the Google Docs or PDF
              button on the bottom right of the response.
            </p>
          </h2>
          <img
            src="/chatgpt-to-google-docs-pdf-2.png"
            alt="Select Conversation"
            className="extension-step-image"
          />
        </section>

        {/* Step 3 */}
        <section className="extension-step">
          <span className="extension-step-number">3</span>
          <h2 className="extension-step-title">
            First time, the authorization window will open.
            <p>
              The Chrome extension requests only the minimal permissions
              needed to create files on your Google Drive. Authorize it and
              click <b>Ok.</b>. This step is required only once. Once
              authorized, the content will be created as a Google Doc, and the
              document will open automatically.
            </p>
          </h2>
          <img
            src="/google-auth.jpg"
            alt="Google Authorization"
            className="extension-step-image"
          />
        </section>

        {/* Step 4 */}
        <section className="extension-step">
          <span className="extension-step-number">4</span>
          <h2 className="extension-step-title">
            Going forward, whenever you need a Google Doc, you can create it
            with a single click.
            <p>
              Ask a question to ChatGPT, and once you receive the answer,
              click the <b>Google Docs</b> button at the bottom right of the
              response.
            </p>
            The document will be created automatically without authorization request.
          </h2>
          <img
            src="/chatgpt-to-google-docs-pdf-2.png"
            alt="Select Conversation"
            className="extension-step-image"
          />
        </section>
      </main>

      {/* Features Section */}
      <section className="extension-features">
        <h2 className="extension-features-title">
          Features of ChatGPT to Google Docs or PDF Extension
        </h2>
        <div className="extension-features-grid">
          <div className="extension-feature-item">
            <h3 className="extension-feature-item-title">One-click Export</h3>
            <p className="extension-feature-item-description">
              Save your conversation as a Google Docs or PDF file instantly.
            </p>
          </div>
          <div className="extension-feature-item">
            <h3 className="extension-feature-item-title">Supports Images</h3>
            <p className="extension-feature-item-description">
              Retain all images in the exported document.
            </p>
          </div>
          <div className="extension-feature-item">
            <h3 className="extension-feature-item-title">Preserves Formatting</h3>
            <p className="extension-feature-item-description">
              Keep text, tables, and code blocks formatted perfectly.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="extension-cta">
        <a href="#" className="extension-cta-link">
          <img
            src="/chrome-badge.png"
            alt="Download the Extension"
            className="extension-cta-image"
          />
        </a>
      </section>
    </div>
  );
};

export default ChatGPTToGoogleDocsPDF;
