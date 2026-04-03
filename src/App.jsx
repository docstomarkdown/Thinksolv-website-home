import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import WebScraperProShell from './components/WebScraperProShell'
import ShopifySpyProShell from './components/ShopifySpyProShell'
import Home from './pages/Home'
import ContactPage from './pages/ContactPage'
import ChatGPTToWordPDF from './pages/ChatGPTToWordPDF'
import ChatGPTToGoogleDocsPDF from './pages/ChatGPTToGoogleDocsPDF'
import PrivacyPage from './pages/PrivacyPage'
import WebScraperProPrivacyPage from './pages/WebScraperProPrivacyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import WebScraperProPage from './pages/WebScraperProPage'
import ShopifySpyProPage from './pages/ShopifySpyProPage'
import ShopifySpyProPrivacyPage from './pages/ShopifySpyProPrivacyPage'
import RecaptchaProvider from './components/RecaptchaProvider'

function App() {
  return (
    <RecaptchaProvider>
      <Router>
        <Routes>
          <Route element={<WebScraperProShell />}>
            <Route path="/extensions/web-scraper-pro" element={<WebScraperProPage />} />
          </Route>
          <Route element={<ShopifySpyProShell />}>
            <Route path="/extensions/shopify-spy-pro" element={<ShopifySpyProPage />} />
            <Route path="/extensions/shopify-spy-pro/privacy" element={<ShopifySpyProPrivacyPage />} />
          </Route>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/extensions/chatgpt-to-word-pdf" element={<ChatGPTToWordPDF />} />
            <Route path="/extensions/chatgpt-to-google-docs-pdf" element={<ChatGPTToGoogleDocsPDF />} />
            <Route path="/extensions/privacy" element={<PrivacyPage />} />
            <Route path="/extensions/gemini-to-word-pdf/privacy" element={<PrivacyPage extensionName="AI Chat to Word, PDF & Google Docs - for Gemini" sourceName="Gemini" />} />
            <Route path="/extensions/convert-chatgpt-to-google-docs-pdf-acq/privacy" element={<PrivacyPage extensionName="Convert ChatGPT to Google Doc, Microsoft Word, PDF" />} />
            <Route path="/extensions/web-scraper-pro/privacy" element={<WebScraperProPrivacyPage />} />
          </Route>
        </Routes>
      </Router>
    </RecaptchaProvider>
  )
}

export default App
