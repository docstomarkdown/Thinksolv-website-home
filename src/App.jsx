import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ContactPage from './pages/ContactPage'
import ChatGPTToWordPDF from './pages/ChatGPTToWordPDF'
import ChatGPTToGoogleDocsPDF from './pages/ChatGPTToGoogleDocsPDF'
import PrivacyPage from './pages/PrivacyPage'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/extensions/chatgpt-to-word-pdf" element={<ChatGPTToWordPDF />} />
          <Route path="/extensions/chatgpt-to-google-docs-pdf" element={<ChatGPTToGoogleDocsPDF />} />
          <Route path="/extensions/privacy" element={<PrivacyPage />} />
        </Routes>
        <Footer />
      </Layout>
    </Router>
  )
}

export default App
