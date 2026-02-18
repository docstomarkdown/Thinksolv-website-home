import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ContactPage from './pages/ContactPage'
import ChatGPTToWordPDF from './pages/ChatGPTToWordPDF'
import ChatGPTToGoogleDocsPDF from './pages/ChatGPTToGoogleDocsPDF'
import PrivacyPage from './pages/PrivacyPage'
import Footer from './components/Footer'
import RecaptchaProvider from './components/RecaptchaProvider'

function App() {
  return (
    <RecaptchaProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/extensions/chatgpt-to-word-pdf" element={<ChatGPTToWordPDF />} />
            <Route path="/extensions/chatgpt-to-google-docs-pdf" element={<ChatGPTToGoogleDocsPDF />} />
            <Route path="/extensions/privacy" element={<PrivacyPage />} />
            <Route path="/extensions/gemini-to-word-pdf/privacy" element={<PrivacyPage extensionName="AI Chat to Word, PDF & Google Docs - for Gemini" />} />
            <Route path="/extensions/convert-chatgpt-to-google-docs-pdf-acq/privacy" element={<PrivacyPage extensionName="Convert ChatGPT to Google Doc, Microsoft Word, PDF" />} />
          </Routes>
          <Footer />
        </Layout>
      </Router>
    </RecaptchaProvider>
  )
}

export default App
