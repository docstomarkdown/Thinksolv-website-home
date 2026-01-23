import React from 'react'
import Hero from '../components/Hero'
import WhatWeBuild from '../components/WhatWeBuild'
import HowWeBuild from '../components/HowWeBuild'
import WhyWeBuild from '../components/WhyWeBuild'

function Home() {
  return (
    <>
      <Hero />
      <WhyWeBuild />
      <WhatWeBuild />
      <HowWeBuild />
    </>
  )
}

export default Home
