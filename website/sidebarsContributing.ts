import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
    contributing: [
        {
            type: 'doc',
            id: 'overview',
            label: 'Contributing Overview',
        },
        {
            type: 'doc',
            id: 'code-of-conduct',
            label: 'Code of Conduct',
        },
        {
            type: 'doc',
            id: 'development-workflow',
            label: 'Development Workflow',
        },
        {
            type: 'doc',
            id: 'coding-standards',
            label: 'Coding Standards',
        },
        {
            type: 'doc',
            id: 'testing',
            label: 'Testing Guidelines',
        },
        {
            type: 'doc',
            id: 'documentation',
            label: 'Writing Documentation',
        },
    ],
};

export default sidebars;
