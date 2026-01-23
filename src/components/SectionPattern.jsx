import React, { useState, useEffect } from 'react';
import '../styles/FilePattern.css';

/**
 * Simplified component - fixed positions with random icon assignment
 * @param {Array} icons - Array of icon objects: [{ icon: IconComponent, name: string }]
 * @param {Number} iconCount - Number of icons to display (default: 5)
 */
const SectionPattern = ({ icons, iconCount = 5 }) => {
    const [placedIcons, setPlacedIcons] = useState([]);

    useEffect(() => {
        const generateIcons = () => {
            // Container dimensions (matches CSS)
            const containerWidth = 350;
            const containerHeight = 350;
            
            // Fixed positions for icons - shifted to the left
            // These are percentage positions that favor left/center area
            const fixedPositions = [
                { x: 15, y: 20 },   // Top-left area
                { x: 35, y: 35 },   // Center-left
                { x: 55, y: 25 },   // Top-center (was right)
                { x: 20, y: 60 },   // Middle-left
                { x: 45, y: 65 },   // Middle-center (was right)
                { x: 30, y: 80 },   // Bottom-left-center
                { x: 10, y: 75 },   // Bottom-left
                { x: 50, y: 50 },   // Center
            ];
            
            const numIcons = Math.min(iconCount || 5, fixedPositions.length);
            const newIcons = [];
            
            // Validate inputs
            if (numIcons <= 0 || !icons || icons.length === 0) {
                setPlacedIcons([]);
                return;
            }
            
            // Shuffle icons using Fisher-Yates
            const shuffledIcons = [...icons];
            for (let i = shuffledIcons.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledIcons[i], shuffledIcons[j]] = [shuffledIcons[j], shuffledIcons[i]];
            }
            
            // Shuffle positions to randomize which positions are used
            const shuffledPositions = [...fixedPositions];
            for (let i = shuffledPositions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledPositions[i], shuffledPositions[j]] = [shuffledPositions[j], shuffledPositions[i]];
            }
            
            // Assign icons to positions
            for (let i = 0; i < numIcons; i++) {
                const position = shuffledPositions[i];
                const iconType = shuffledIcons[i % shuffledIcons.length];
                
                // Random properties for visual variety
                const rotation = (Math.random() - 0.5) * 15; // -7.5 to +7.5 degrees
                const scale = 0.75 + Math.random() * 0.25; // 0.75 to 1.0
                const opacity = 0.25 + Math.random() * 0.1; // 0.25 to 0.35
                
                newIcons.push({
                    id: i,
                    x: position.x,
                    y: position.y,
                    rotation,
                    scale,
                    opacity,
                    ...iconType,
                });
            }
            
            setPlacedIcons(newIcons);
        };

        generateIcons();
    }, [icons, iconCount]);

    return (
        <div className="file-pattern-container">
            {placedIcons.map((icon) => (
                <img
                    key={icon.id}
                    src={icon.icon}
                    alt={icon.name}
                    className="file-icon"
                    style={{
                        left: `${icon.x}%`,
                        top: `${icon.y}%`,
                        transform: `translate(-50%, -50%) rotate(${icon.rotation}deg) scale(${icon.scale})`,
                        opacity: icon.opacity,
                        animationDelay: `${icon.id * 0.08}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default SectionPattern;
