import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const RecaptchaProvider = ({ children }) => {
  // Always get the site key - in Vercel, this comes from environment variables
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';
  
  // Always wrap with provider to ensure context is available
  // Even if siteKey is empty, the provider will be available (just won't work)
  // This prevents "Context has not yet been implemented" errors
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};

export default RecaptchaProvider;
