import React from 'react';
import '../styles/Hero.css';
import FileCreationAnimation from './FileCreationAnimation';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="company-name">Thinksolv Technologies</h1>
        <h2 className="tagline">Building software, thoughtfully.</h2>
        
        <p className="description">
          We build software that supports everyday work.
        </p>
        
        <p className="description">
          Our products integrate naturally with the platforms people already use—designed for clarity, minimal interaction, and little to no learning curve.
        </p>
        
        <p className="description">
          Used by over 150,000 users globally, our products are reliable and built to last.
        </p>
        
        <p className="description">
          We focus on long-term utility over short-term novelty.
        </p>
      </div>
      
      <div className="hero-visual">
        <FileCreationAnimation />
      </div>
    </section>
  );
};

export default Hero;
