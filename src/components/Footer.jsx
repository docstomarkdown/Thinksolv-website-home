import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    const year = new Date().getFullYear();
    
    return (
        <footer className="footer-container">
            <div className="footer-top">
                <div className="footer-brand">
                    © Thinksolv Technologies OPC Pvt Ltd
                </div>
                <div className="footer-links">
                    <span>Official Google Cloud Partner</span>
                    <span className="separator">·</span>
                    <a href="#careers">Careers</a>
                    <span className="separator">·</span>
                    <a href="#privacy">Privacy</a>
                    <span className="separator">·</span>
                    <a href="#contact">Contact</a>
                </div>
            </div>
            <div className="footer-bottom">
                Registered in India · Coimbatore
            </div>
        </footer>
    );
};

export default Footer;
