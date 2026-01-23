import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import '../styles/Buttons.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-container">
          <img src="/Favi.png" alt="Thinksolv" className="logo-img" />
          <span className="brand-name">thinksolv</span>
        </Link>
        <nav className="nav-menu">
            <Link to="/contact" className="btn-secondary contact-btn">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
