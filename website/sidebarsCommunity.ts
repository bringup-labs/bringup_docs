import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
    community: [
        {
            type: 'doc',
            id: 'overview',
            label: 'Community Overview',
        },
        {
            type: 'doc',
            id: 'support',
            label: 'Getting Support',
        },
        {
            type: 'doc',
            id: 'resources',
            label: 'External Resources',
        },
    ],
};

export default sidebars;
