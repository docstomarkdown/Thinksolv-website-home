import React from 'react';
import '../styles/Hero.css';
import BrickAnimation from './BrickAnimation';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="company-name">Thinksolv Technologies</h1>
        <h2 className="tagline">Building solutions, thoughtfully.</h2>
        
        <p className="description">
          We design dependable software that simplifies everyday work.
        </p>
        
        <p className="users-count">
          Used by 150,000+ users across productivity products.
        </p>
      </div>
      
      <div className="hero-visual">
        <BrickAnimation />
      </div>
    </section>
  );
};

export default Hero;
