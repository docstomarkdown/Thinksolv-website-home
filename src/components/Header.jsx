import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <img src="/Favi.png" alt="Thinksolv" className="logo-img" />
          <span className="brand-name">thinksolv</span>
        </div>
        <nav className="nav-menu">
            {/* Minimal nav - just contact for now as requested */}
            <a href="#contact" className="nav-link contact-btn">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
