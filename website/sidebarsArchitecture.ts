import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
    architecture: [
        {
            type: 'doc',
            id: 'overview',
            label: 'Architecture Overview',
        },
        {
            type: 'doc',
            id: 'system-design',
            label: 'System Design',
        },
        {
            type: 'doc',
            id: 'data-flow',
            label: 'Data Flow',
        },
        {
            type: 'doc',
            id: 'storage',
            label: 'Storage Architecture',
        },
        {
            type: 'doc',
            id: 'performance',
            label: 'Performance Considerations',
        },
    ],
};

export default sidebars;
