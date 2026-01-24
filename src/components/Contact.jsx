import React, { useState, useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import '../styles/Contact.css';
import '../styles/Buttons.css';
import '../styles/Input.css';
import Input from './Input';
import Textarea from './Textarea';

// Import document icons
import DocIcon from '../assets/file-doc.svg';
import PdfIcon from '../assets/file-pdf.svg';
import CsvIcon from '../assets/file-csv.svg';
import HtmlIcon from '../assets/file-html.svg';
import XlsIcon from '../assets/file-xls.svg';
import TxtIcon from '../assets/file-txt.svg';

const Contact = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [thankYouMessage, setThankYouMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Handle URL parameters for subject and utm_source
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const querySubject = params.get('subject');
    const utmSource = params.get('utm_source');

    if (querySubject) {
      setFormData(prev => ({ ...prev, subject: querySubject }));
    } else if (utmSource) {
      // 1. Check mapping from environment variable (JSON encoded)
      let envMapping = {};
      try {
        const envMapStr = import.meta.env.VITE_UTM_SOURCE_MAP;
        if (envMapStr) {
          envMapping = JSON.parse(envMapStr);
        }
      } catch (e) {
        console.error('Failed to parse VITE_UTM_SOURCE_MAP', e);
      }

      // 2. Hardcoded UTM source mapping
      const utmSourceMapping = {
        "extension_a": "Support for Extension A",
        "extension_b": "Support for Extension B",
        "ext-chatgpt-to-word": "Support for ChatGPT to Word Extension",
        "extension-ai": "Extension AI",
      };

      // Format dynamic utm_source values
      const formatUtmSource = (source) => {
        const text = source.replace(/[-_]/g, " ");
        return text.replace(/\b\w/g, (char) => char.toUpperCase());
      };

      // 3. Resolve Subject: Env Mapping -> Hardcoded Mapping -> Dynamic Formatter
      let subject = '';
      if (envMapping[utmSource]) {
        subject = envMapping[utmSource];
      } else if (utmSourceMapping[utmSource]) {
        subject = utmSourceMapping[utmSource];
      } else {
        subject = formatUtmSource(utmSource);
      }

      setFormData(prev => ({ ...prev, subject }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setErrorMessage('');
    setThankYouMessage(false);

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Check if reCAPTCHA is available
    if (!executeRecaptcha) {
      setErrorMessage('reCAPTCHA is not ready. Please refresh the page and try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Execute reCAPTCHA v3
      const token = await executeRecaptcha('contact_form_submit');

      if (!token) {
        setErrorMessage('Failed to verify CAPTCHA. Please try again.');
        setIsSubmitting(false);
        return;
      }

      const apiEndpoint = import.meta.env.VITE_API_ENDPOINT || '/api/send-email';
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captcha: token,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Submission failed');
      }

      setThankYouMessage(true);
      setErrorMessage('');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Hide thank you message after 5 seconds
      setTimeout(() => {
        setThankYouMessage(false);
      }, 5000);
    } catch (error) {
      console.error('Submission failed', error);
      setErrorMessage(error.message || 'Failed to send message. Please try again.');
      setThankYouMessage(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Static document icons for aesthetic - fixed positions
  const documentIcons = [
    { icon: DocIcon, left: '8%', top: '15%', size: 32, rotation: -5, opacity: 0.25 },
    { icon: PdfIcon, left: '88%', top: '20%', size: 28, rotation: 8, opacity: 0.22 },
    { icon: CsvIcon, left: '12%', top: '75%', size: 30, rotation: -3, opacity: 0.24 },
    { icon: HtmlIcon, left: '85%', top: '70%', size: 26, rotation: 6, opacity: 0.2 },
    { icon: XlsIcon, left: '5%', top: '45%', size: 24, rotation: -7, opacity: 0.23 },
    { icon: TxtIcon, left: '92%', top: '50%', size: 28, rotation: 4, opacity: 0.25 },
  ];

  return (
    <section className="contact-section" id="contact">
      {/* Decorative document icons */}
      <div className="contact-decorative-icons">
        {documentIcons.map((item, index) => (
          <img
            key={index}
            src={item.icon}
            alt=""
            className="contact-decorative-icon"
            style={{
              left: item.left,
              top: item.top,
              width: `${item.size}px`,
              height: `${item.size}px`,
              transform: `rotate(${item.rotation}deg)`,
              opacity: item.opacity,
            }}
          />
        ))}
      </div>

      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Contact us</h2>
          <p className="contact-description">
            Have a question? Tell us what you're looking for, and our team will get back to you shortly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full name</label>
                <div className="input-wrapper">
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">Subject</label>
              <div className="input-wrapper">
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  minLength={3}
                  maxLength={150}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <div className="input-wrapper">
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your needs"
                  rows={6}
                  required
                />
              </div>
            </div>

            <div className="form-footer">
              <div className="form-message">
                {thankYouMessage && (
                  <p className="success-message">
                    Thanks for reaching out! Our team is now on it!
                  </p>
                )}
                {errorMessage && (
                  <p className="error-message">
                    {errorMessage}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    <span>Sending...</span>
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>
          </form>
      </div>
    </section>
  );
};

export default Contact;
