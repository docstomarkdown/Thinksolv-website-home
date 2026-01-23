import React from 'react';
import '../styles/FileCreationAnimation.css';

// Import input icons
import DocIcon from '../assets/file-doc.svg';
import WrenchIcon from '../assets/how/wrench.svg';
import LightbulbIcon from '../assets/why/lightbulb.svg';

// Import output icons
import PdfIcon from '../assets/file-pdf.svg';

const FileCreationAnimation = () => {
    // Chat bubble SVG (inline)
    const ChatBubbleSVG = () => (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 9H17M7 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    );

    // Input icons - coming from different sides
    const inputIcons = [
        { 
            id: 0, 
            icon: 'chat', 
            name: 'Chat', 
            startX: 10, 
            startY: 20,
            endX: 50,
            endY: 50,
            side: 'left'
        },
        { 
            id: 1, 
            icon: DocIcon, 
            name: 'DOC', 
            startX: 90, 
            startY: 20,
            endX: 50,
            endY: 50,
            side: 'right'
        },
        { 
            id: 2, 
            icon: WrenchIcon, 
            name: 'Wrench', 
            startX: 10, 
            startY: 80,
            endX: 50,
            endY: 50,
            side: 'left-bottom'
        },
        { 
            id: 3, 
            icon: LightbulbIcon, 
            name: 'Lightbulb', 
            startX: 90, 
            startY: 80,
            endX: 50,
            endY: 50,
            side: 'right-bottom'
        },
    ];

    return (
        <div className="file-creation-container">
            {/* Input icons - Scene 1 & 2 */}
            <div className="input-icons-wrapper">
                {inputIcons.map((input) => (
                    <div
                        key={input.id}
                        className="input-icon-item"
                        style={{
                            '--start-x': `${input.startX}%`,
                            '--start-y': `${input.startY}%`,
                            '--end-x': `${input.endX}%`,
                            '--end-y': `${input.endY}%`,
                            '--delay': `${input.id * 0.15}s`,
                        }}
                    >
                        {input.icon === 'chat' ? (
                            <ChatBubbleSVG />
                        ) : (
                            <img src={input.icon} alt={input.name} />
                        )}
                    </div>
                ))}
            </div>

            {/* Processing moment - Scene 3 */}
            <div className="processing-moment">
                <div className="processing-glow"></div>
            </div>

            {/* Output icons - Scene 4 */}
            <div className="output-icons-wrapper">
                <div className="output-icon-item output-doc">
                    <img src={DocIcon} alt="DOC" />
                </div>
                <div className="output-icon-item output-pdf">
                    <img src={PdfIcon} alt="PDF" />
                </div>
            </div>
        </div>
    );
};

export default FileCreationAnimation;
