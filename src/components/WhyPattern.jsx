import React from 'react';
import SectionPattern from './SectionPattern';
import CompassIcon from '../assets/why/compass.svg';
import SparkIcon from '../assets/why/spark.svg';
import ShieldCheckIcon from '../assets/why/shield-check.svg';
import LeafIcon from '../assets/why/leaf.svg';
import ClockIcon from '../assets/why/clock.svg';

const WhyPattern = () => {
    // Most meaningful icons for "Why" - Effortless work, removing repetitive effort, staying out of the way
    const iconTypes = [
        { icon: ClockIcon, name: 'clock' },        // Time/efficiency - removing repetitive effort
        { icon: SparkIcon, name: 'spark' },       // Effortless flow
        { icon: ShieldCheckIcon, name: 'shield-check' }, // Reliability/trust
        { icon: LeafIcon, name: 'leaf' },         // Sustainability/long-term
        { icon: CompassIcon, name: 'compass' },   // Purpose/direction
    ];

    return <SectionPattern icons={iconTypes} iconCount={4} />;
};

export default WhyPattern;
