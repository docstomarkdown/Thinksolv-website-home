import React from 'react';
import '../styles/Section.css';

const WhatWeBuild = () => {
    return (
        <section className="section-container">
            <h3 className="section-title">What we work on</h3>
            <div className="section-content">
                <p className="section-text section-text-lead">
                    Tools for document-centric work
                </p>
                <p className="section-text">
                    We build focused software for document workflows, file management, and spreadsheet-driven automation within the Google ecosystem, spanning Google Workspace and Chrome-based platforms.
                </p>
                <p className="section-text">
                    Our products are designed for people who work daily in Docs, Sheets, and Drive and expect speed, predictability, and deep integration.
                </p>
                <p className="section-text">
                    Every product begins with a simple question:
                </p>
                <p className="section-text">
                    What if this task didn't need to exist at all?
                </p>
                <p className="section-text">
                    That question guides us to design at the system level—eliminating repetitive work before it reaches the user.
                </p>
            </div>
        </section>
    );
};

export default WhatWeBuild;
