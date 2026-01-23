import React from 'react'
import Layout from './components/Layout'
import Hero from './components/Hero'
import WhatWeBuild from './components/WhatWeBuild'
import HowWeBuild from './components/HowWeBuild'
import WhyWeBuild from './components/WhyWeBuild'
import Footer from './components/Footer'

function App() {
  return (
    <Layout>
      <Hero />
      <WhatWeBuild />
      <HowWeBuild />
      <WhyWeBuild />
      <Footer />
    </Layout>
  )
}

export default App
