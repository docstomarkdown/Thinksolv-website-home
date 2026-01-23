import React from 'react';
import '../styles/Section.css';
import WhyPattern from './WhyPattern';

const WhyWeBuild = () => {
    return (
        <section className="section-container section-why">
            <WhyPattern />
            <h3 className="section-title">Why we build</h3>
            <div className="section-content">
                <p className="section-text section-text-lead">
                    Effortless work, by design.
                </p>
                <p className="section-text">
                    Our goal is to remove repetitive effort so individuals and teams can focus on higher-value work.
                </p>
                <p className="section-text">
                    Our software supports this by staying out of the way—integrating seamlessly, providing stability, and requiring minimal attention.
                </p>
                <p className="section-text">
                    When a tool fades into the background, it is working exactly as intended.
                </p>
            </div>
        </section>
    );
};

export default WhyWeBuild;
