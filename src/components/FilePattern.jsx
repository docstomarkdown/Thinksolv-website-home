import React from 'react';
import SectionPattern from './SectionPattern';
import DocIcon from '../assets/file-doc.svg';
import PdfIcon from '../assets/file-pdf.svg';
import MdIcon from '../assets/file-md.svg';
import HtmlIcon from '../assets/file-html.svg';
import XlsIcon from '../assets/file-xls.svg';
import TxtIcon from '../assets/file-txt.svg';
import CsvIcon from '../assets/file-csv.svg';
import JsonIcon from '../assets/file-json.svg';

const FilePattern = () => {
    const fileTypes = [
        { icon: DocIcon, name: 'doc' },
        { icon: PdfIcon, name: 'pdf' },
        { icon: MdIcon, name: 'md' },
        { icon: HtmlIcon, name: 'html' },
        { icon: XlsIcon, name: 'xls' },
        { icon: TxtIcon, name: 'txt' },
        { icon: CsvIcon, name: 'csv' },
        { icon: JsonIcon, name: 'json' },
    ];

    return <SectionPattern icons={fileTypes} iconCount={5} />;
};

export default FilePattern;
