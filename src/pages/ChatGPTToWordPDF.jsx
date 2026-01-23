import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import '../styles/ExtensionPage.css';

const ChatGPTToWordPDF = () => {
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
          <span className="extension-name">ChatGPT to Word or PDF</span> extension.
        </p>

        {/* Export Features Section */}
        <div className="export-features">
          <h2 className="export-features-title">
            ChatGPT to Word or PDF - Export Options
          </h2>

          <div className="export-features-grid">
            {/* Feature 1: Export Single Response */}
            <div className="export-feature-card">
              <div className="export-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12h6m-3 3v-6M3 16h18a2 2 0 002-2V6a2 2 0 00-2-2H3a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="export-feature-title">Export Single Response</h3>
              <p className="export-feature-description">
                Save any individual ChatGPT response instantly as a well-formatted Word or PDF file.
              </p>
            </div>

            {/* Feature 2: Export Full Conversation */}
            <div className="export-feature-card">
              <div className="export-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M3 16h18a2 2 0 002-2V9a2 2 0 00-2-2H3a2 2 0 00-2 2v5a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="export-feature-title">Download Entire Conversation</h3>
              <p className="export-feature-description">
                Export your full ChatGPT conversation—questions and answers—as a Word or PDF document.
              </p>
            </div>

            {/* Feature 3: Export ChatGPT Output Only */}
            <div className="export-feature-card">
              <div className="export-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9.75 16.5h4.5m-2.25-13.5v1.5m6.364 1.636l-1.06 1.06M16.5 12H3m13.5 9h2a2 2 0 002-2V6a2 2 0 00-2-2h-13a2 2 0 00-2 2v12a2 2 0 002 2h2" />
                </svg>
              </div>
              <h3 className="export-feature-title">ChatGPT Output Only</h3>
              <p className="export-feature-description">
                Create a clean document that includes only the responses from ChatGPT, excluding your inputs.
              </p>
            </div>
          </div>

          <p className="export-features-note">
            <span className="export-features-note-bold">Bonus:</span> Exports preserve advanced formatting like LaTeX equations and tables with high fidelity in both Word and PDF.
          </p>
        </div>

        <h1 className="extension-title">
          How to Save a ChatGPT Conversation as a Word or PDF Document
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
              Once, you have received the answer, Click the Word or PDF button
              on the bottom right of the response.
            </p>
          </h2>
          <img
            src="/chatgpt-to-word-pdf-2.png"
            alt="Select Conversation"
            className="extension-step-image"
          />
        </section>

        {/* Step 3 */}
        <section className="extension-step">
          <span className="extension-step-number">3</span>
          <h2 className="extension-step-title">
            Export your entire conversation{' '}
            <p>
              Look for the export buttons in the top right corner of the conversation window.
            </p>
          </h2>
          <img
            src="/chatgpt-to-word-pdf-3.png"
            alt="Export Entire Conversation"
            className="extension-step-image"
          />
        </section>
      </main>

      {/* Features Section */}
      <section className="extension-features">
        <h2 className="extension-features-title">
          Features of ChatGPT to Word or PDF Extension
        </h2>
        <div className="extension-features-grid">
          <div className="extension-feature-item">
            <h3 className="extension-feature-item-title">One-click Export</h3>
            <p className="extension-feature-item-description">
              Save your conversation as a Word or PDF file instantly.
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

export default ChatGPTToWordPDF;
