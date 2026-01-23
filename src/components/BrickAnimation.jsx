import React, { useEffect, useState } from 'react';
import '../styles/BrickAnimation.css';

const BrickAnimation = () => {
    const [layers, setLayers] = useState([]);

    useEffect(() => {
        // Create 5 thoughtful layers representing building solutions step by step
        const createLayers = () => {
            const layerData = [
                { id: 0, width: '100%', height: '20%', delay: 0, label: 'Foundation' },
                { id: 1, width: '85%', height: '18%', delay: 0.6, label: 'Structure' },
                { id: 2, width: '70%', height: '16%', delay: 1.2, label: 'Integration' },
                { id: 3, width: '55%', height: '14%', delay: 1.8, label: 'Refinement' },
                { id: 4, width: '40%', height: '12%', delay: 2.4, label: 'Solution' },
            ];
            setLayers(layerData);
        };
        
        createLayers();
    }, []);

    return (
        <div className="thoughtful-building">
            <div className="building-container">
                {layers.map((layer, index) => (
                    <div
                        key={layer.id}
                        className="building-layer"
                        style={{
                            width: layer.width,
                            animationDelay: `${layer.delay}s`,
                            '--layer-index': index,
                        }}
                    >
                        <div className="layer-content">
                            <div className="layer-shine"></div>
                        </div>
                        <div className="layer-shadow"></div>
                    </div>
                ))}
                
                {/* Decorative accent dots representing thoughtful details */}
                <div className="accent-dots">
                    <div className="dot dot-1"></div>
                    <div className="dot dot-2"></div>
                    <div className="dot dot-3"></div>
                    <div className="dot dot-4"></div>
                </div>
            </div>
        </div>
    );
};

export default BrickAnimation;
