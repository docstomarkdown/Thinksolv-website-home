import React from 'react';
import '../styles/Section.css';

const HowWeBuild = () => {
    return (
        <section className="section-container">
            <h3 className="section-title">How we build</h3>
            <div className="section-content">
                <p className="section-text">
                    We start from first principles—understanding the real problem before choosing tools or architectures.
                </p>
                <p className="section-text">
                    This helps us design systems that are simple to use, reliable at scale, and easy to maintain.
                </p>
                <p className="section-text">
                    Complexity is easy. Simplicity requires thought. We choose the harder path.
                </p>
            </div>
        </section>
    );
};

export default HowWeBuild;
