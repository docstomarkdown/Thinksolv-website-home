import React from 'react';
import '../styles/FileCreationAnimation.css';

// Output icons
import SheetIcon from '../assets/file-sheet.svg';
import CsvIcon from '../assets/file-csv.svg';
import DocIcon from '../assets/file-doc.svg';
import PdfIcon from '../assets/file-pdf.svg';

// Input icons: AI chats and web pages, the two things our products turn into files. Generic AI sparkles, not vendor logos. Inline so they take the brand colour.
const svgProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    xmlns: 'http://www.w3.org/2000/svg',
};

const WebPageSVG = () => (
    <svg {...svgProps}>
        <rect x="2.5" y="3.5" width="19" height="17" rx="2" />
        <path d="M2.5 8h19" />
        <path d="M5.5 5.75h.01M8 5.75h.01M10.5 5.75h.01" />
        <path d="M6 12h7M6 15.5h12M6 18h9" />
    </svg>
);

const ListSVG = () => (
    <svg {...svgProps}>
        <path d="M9 6h11M9 12h11M9 18h11" />
        <path d="M4.5 6h.01M4.5 12h.01M4.5 18h.01" />
    </svg>
);

const AiChatSVG = () => (
    <svg {...svgProps}>
        <path d="M20 3H4a1.5 1.5 0 0 0-1.5 1.5V21l4-3.5H20a1.5 1.5 0 0 0 1.5-1.5V4.5A1.5 1.5 0 0 0 20 3z" />
        <path d="M12 6.5l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" />
    </svg>
);

const AiSparkleSVG = () => (
    <svg {...svgProps}>
        <path d="M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9z" />
        <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
    </svg>
);

// Each input starts at (x, y), as a percentage of the stage, and converges on the centre.
const inputIcons = [
    { id: 0, Icon: WebPageSVG, x: 12, y: 20 },
    { id: 1, Icon: AiChatSVG, x: 88, y: 22 },
    { id: 2, Icon: AiSparkleSVG, x: 14, y: 78 },
    { id: 3, Icon: ListSVG, x: 86, y: 80 },
];

// Data from web pages, then documents from AI chats.
const outputIcons = [SheetIcon, CsvIcon, DocIcon, PdfIcon];

// Browser content in, clean spreadsheets and documents out. Purely decorative, so it is hidden from assistive technology.
const FileCreationAnimation = () => (
    <div className="file-creation-container" aria-hidden="true">
        <div className="input-icons-wrapper">
            {inputIcons.map(({ id, Icon, x, y }) => (
                <div
                    key={id}
                    className="input-icon-item"
                    style={{
                        '--dx': x - 50,
                        '--dy': y - 50,
                        '--delay': `${id * 0.15}s`,
                    }}
                >
                    <Icon />
                </div>
            ))}
        </div>

        <div className="processing-moment">
            <div className="processing-glow"></div>
        </div>

        <div className="output-icons-wrapper">
            {outputIcons.map((icon, index) => (
                <div
                    key={index}
                    className="output-icon-item"
                    style={{ '--delay': `${index * 0.1}s` }}
                >
                    <img src={icon} alt="" />
                </div>
            ))}
        </div>
    </div>
);

export default FileCreationAnimation;
