import React, { useEffect, useState } from 'react';
import '../styles/BrickAnimation.css';

const BrickAnimation = () => {
    const [layers, setLayers] = useState([]);

    useEffect(() => {
        // Create layered panels representing thoughtful assembly
        const createLayers = () => {
            const layerData = [
                { id: 0, width: '85%', height: '25%', left: '7.5%', bottom: '0%', delay: 0, rotation: 0 },
                { id: 1, width: '75%', height: '22%', left: '12.5%', bottom: '28%', delay: 0.08, rotation: -0.5 },
                { id: 2, width: '80%', height: '24%', left: '10%', bottom: '52%', delay: 0.16, rotation: 0.3 },
                { id: 3, width: '70%', height: '20%', left: '15%', bottom: '78%', delay: 0.24, rotation: -0.2 },
            ];
            setLayers(layerData);
        };
        
        createLayers();
    }, []);

    return (
        <div className="thoughtful-building">
            <div className="layered-container">
                {layers.map((layer) => (
                    <div
                        key={layer.id}
                        className="layered-panel"
                        style={{
                            width: layer.width,
                            height: layer.height,
                            left: layer.left,
                            bottom: layer.bottom,
                            animationDelay: `${layer.delay}s`,
                            '--layer-index': layer.id,
                            '--rotation': `${layer.rotation}deg`,
                        }}
                    >
                        <div className="panel-content">
                            <div className="panel-glow"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrickAnimation;
