import React from 'react';
import '../styles/Section.css';

const HowWeBuild = () => {
    return (
        <section className="section-container">
            <h3 className="section-title">How we build</h3>
            <div className="section-content">
                <p className="section-text section-text-lead">
                    First principles over defaults.
                </p>
                <p className="section-text">
                    We start by understanding the real problem before choosing tools, architectures, or abstractions. This approach allows us to build systems that are simple to use, reliable at scale, and easy to evolve.
                </p>
                <p className="section-text">
                    We avoid unnecessary complexity because it increases mental overhead for users. Simplicity requires intent, and we choose it deliberately.
                </p>
            </div>
        </section>
    );
};

export default HowWeBuild;
