import {themes as prismThemes} from 'prism-react-renderer';
import type * as PluginContentDocs from '@docusaurus/plugin-content-docs';
import type * as Preset from '@docusaurus/preset-classic';
import type {Config} from '@docusaurus/types';

const isProductionDeployment = process.env.NODE_ENV === 'production';
const isDeployPreview = process.env.PREVIEW_DEPLOY === 'true';

const copyright = `Copyright © ${new Date().getFullYear()} Bagmaster Project`;

const commonDocsOptions: Partial<PluginContentDocs.Options> = {
  breadcrumbs: false,
  showLastUpdateAuthor: true,
  showLastUpdateTime: true,
  editUrl: 'https://github.com/rahulkatiyar19955/bagmaster/edit/main/bagmaster_docs/',
};

const config: Config = {
  future: {
    v4: true,
    experimental_faster: (process.env.DOCUSAURUS_FASTER ?? 'true') === 'true',
  },

  title: 'Bagmaster',
  tagline: 'ROS Bag Management and Visualization Platform',
  organizationName: 'rahulkatiyar19955',
  projectName: 'bagmaster',
  url: 'https://bagmaster.dev',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  titleDelimiter: '·',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          sidebarPath: './sidebars.ts',
          editCurrentVersion: true,
          ...commonDocsOptions,
        },
        blog: {
          path: 'blog',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All Blog Posts',
          feedOptions: {
            type: 'all',
            copyright,
          },
          onInlineAuthors: 'ignore',
          onUntruncatedBlogPosts: 'ignore',
          showReadingTime: true,
        },
        theme: {
          customCss: [
            './src/css/custom.css',
          ],
        },
        gtag: {
          trackingID: 'G-XXXXXXXXXX', // TODO: Replace with your tracking ID
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    'docusaurus-plugin-sass',
    [
      'content-docs',
      {
        id: 'architecture',
        path: 'architecture',
        routeBasePath: '/architecture',
        sidebarPath: './sidebarsArchitecture.ts',
        ...commonDocsOptions,
      } satisfies PluginContentDocs.Options,
    ],
    [
      'content-docs',
      {
        id: 'contributing',
        path: 'contributing',
        routeBasePath: '/contributing',
        sidebarPath: './sidebarsContributing.ts',
        ...commonDocsOptions,
      } satisfies PluginContentDocs.Options,
    ],
    [
      'content-docs',
      {
        id: 'community',
        path: 'community',
        routeBasePath: '/community',
        sidebarPath: './sidebarsCommunity.ts',
        ...commonDocsOptions,
      } satisfies PluginContentDocs.Options,
    ],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: !isProductionDeployment,
        offlineModeActivationStrategies: ['appInstalled', 'queryString'],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/pwa/manifest-icon-512.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#20232a',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
        ],
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        'bash',
        'diff',
        'json',
        'python',
        'yaml',
        'cpp',
        'cmake',
        'docker',
      ],
    },
    navbar: {
      title: 'Bagmaster',
      logo: {
        src: 'img/logo.svg',
        alt: 'Bagmaster Logo',
      },
      style: 'dark',
      items: [
        {
          label: 'Documentation',
          type: 'dropdown',
          position: 'left',
          items: [
            {
              label: 'Getting Started',
              type: 'doc',
              docId: 'getting-started',
            },
            {
              label: 'Guides',
              type: 'doc',
              docId: 'guides/index',
            },
            {
              label: 'API Reference',
              type: 'doc',
              docId: 'api/index',
            },
            {
              label: 'Architecture',
              type: 'doc',
              docId: 'overview',
              docsPluginId: 'architecture',
            },
          ],
        },
        {
          type: 'doc',
          docId: 'overview',
          label: 'Contributing',
          position: 'left',
          docsPluginId: 'contributing',
        },
        {
          type: 'doc',
          docId: 'overview',
          label: 'Community',
          position: 'left',
          docsPluginId: 'community',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
        },
        {
          href: 'https://github.com/rahulkatiyar19955/bagmaster',
          'aria-label': 'GitHub repository',
          position: 'right',
          className: 'navbar-github-link',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/getting-started',
            },
            {
              label: 'Guides',
              to: 'docs/guides',
            },
            {
              label: 'API Reference',
              to: 'docs/api',
            },
            {
              label: 'Architecture',
              to: 'architecture/overview',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Contributing',
              to: 'contributing/overview',
            },
            {
              label: 'Community',
              to: 'community/overview',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/rahulkatiyar19955/bagmaster',
            },
            {
              label: 'Issues',
              href: 'https://github.com/rahulkatiyar19955/bagmaster/issues',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'ROS',
              href: 'https://www.ros.org/',
            },
          ],
        },
      ],
      copyright,
    },
    metadata: [
      {
        property: 'og:image',
        content: 'https://bagmaster.dev/img/social-card.png',
      },
      {name: 'twitter:card', content: 'summary_large_image'},
      {
        name: 'twitter:image',
        content: 'https://bagmaster.dev/img/social-card.png',
      },
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
