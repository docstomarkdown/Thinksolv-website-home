import React from 'react';
import '../styles/Section.css';

const WhatWeBuild = () => {
    return (
        <section className="section-container">
            <h3 className="section-title">What we work on</h3>
            <div className="section-content">
                <p className="section-text">
                    We build software for document workflows, file management, and data-to-cloud automation, primarily within the Google Workspace ecosystem.
                </p>
                <div className="micro-list">
                    <span className="micro-list-item">Document processing</span>
                    <span className="micro-list-item">Drive automation</span>
                    <span className="micro-list-item">Spreadsheet-driven workflows</span>
                    <span className="micro-list-item">Applied AI</span>
                </div>
            </div>
        </section>
    );
};

export default WhatWeBuild;
