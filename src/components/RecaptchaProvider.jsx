import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const RecaptchaProvider = ({ children }) => {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';
  
  if (!siteKey) {
    console.warn('VITE_RECAPTCHA_SITE_KEY is not set. reCAPTCHA will not work.');
    return <>{children}</>;
  }

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
