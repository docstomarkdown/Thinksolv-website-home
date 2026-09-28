import React from 'react';
import '../styles/Section.css';
import FilePattern from './FilePattern';

const WhatWeBuild = () => {
    return (
        <section className="section-container section-what">
            <FilePattern />
            <h3 className="section-title">What we work on</h3>
            <div className="section-content">
                <p className="section-text section-text-lead">
                    Tools that move content where it needs to be
                </p>
                <p className="section-text">
                    We build focused browser software that moves content between AI assistants, the web, and the documents and spreadsheets people rely on—turning what's on screen into clean, structured, usable output.
                </p>
                <p className="section-text">
                    Our products are designed for people who research, write, and analyse in the browser every day and expect speed, predictability, and output they don't have to fix.
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
