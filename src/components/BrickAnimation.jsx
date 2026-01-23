import React, { useEffect, useState } from 'react';
import '../styles/BrickAnimation.css';

const BrickAnimation = () => {
    // Generate bricks with different sizes for masonry effect
    const [bricks, setBricks] = useState([]);

    useEffect(() => {
        const generateBricks = () => {
            const count = 30; // Fewer bricks for cleaner masonry
            const newBricks = Array.from({ length: count }, (_, i) => {
                const heightType = Math.random();
                let span = 1;
                if (heightType > 0.6) span = 2; // Some taller bricks
                
                // 10% chance of being an accent brick
                const isAccent = Math.random() > 0.9; 
                
                return {
                    id: i,
                    span: span,
                    isAccent: isAccent,
                    delay: Math.random() * 2,
                    opacity: 0.1 + Math.random() * 0.4 // Varied base opacity for texture
                };
            });
            setBricks(newBricks);
        };
        
        generateBricks();
    }, []);

    return (
        <div className="masonry-grid">
            {bricks.map((brick) => (
                <div 
                    key={brick.id} 
                    className={`brick span-${brick.span} ${brick.isAccent ? 'brick-accent' : ''}`} 
                    style={{ 
                        animationDelay: `${brick.delay}s`,
                        opacity: 0, // Start invisible for fadeIn
                        '--target-opacity': brick.opacity 
                    }}
                />
            ))}
        </div>
    );
};

export default BrickAnimation;
