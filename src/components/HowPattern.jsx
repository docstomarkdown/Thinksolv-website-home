import React from 'react';
import SectionPattern from './SectionPattern';
import LayersIcon from '../assets/how/layers.svg';
import CogIcon from '../assets/how/cog.svg';
import CheckCircleIcon from '../assets/how/check-circle.svg';
import WorkflowIcon from '../assets/how/workflow.svg';
import LinkIcon from '../assets/how/link.svg';
import ToolIcon from '../assets/how/tool.svg';

const HowPattern = () => {
    // Most meaningful icons for "How" - First principles, understanding problems, simplicity, reliability
    const iconTypes = [
        { icon: LayersIcon, name: 'layers' },      // Building from first principles
        { icon: CogIcon, name: 'cog' },           // Systems thinking
        { icon: CheckCircleIcon, name: 'check-circle' }, // Reliability
        { icon: WorkflowIcon, name: 'workflow' }, // Process
        { icon: LinkIcon, name: 'link' },         // Integration
        { icon: ToolIcon, name: 'tool' },         // Engineering
    ];

    return <SectionPattern icons={iconTypes} iconCount={5} />;
};

export default HowPattern;
