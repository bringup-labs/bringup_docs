import { themes as prismThemes } from 'prism-react-renderer';
import type * as PluginContentDocs from '@docusaurus/plugin-content-docs';
import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';

const isProductionDeployment = process.env.NODE_ENV === 'production';
const isDeployPreview = process.env.PREVIEW_DEPLOY === 'true';

const copyright = `Copyright © ${new Date().getFullYear()} Bringup Labs.`;

const commonDocsOptions: Partial<PluginContentDocs.Options> = {
  breadcrumbs: false,
  showLastUpdateAuthor: true,
  showLastUpdateTime: true,
  editUrl: 'https://github.com/bringup-labs/bagmaster_docs/edit/main/',
};

const config: Config = {
  future: {
    v4: true,
    experimental_faster: (process.env.DOCUSAURUS_FASTER ?? 'true') === 'true',
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'warn',
    },
  },
  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexBlog: true,
        indexDocs: true,
        docsRouteBasePath: '/',
        searchBarShortcutHint: true,
        searchBarPosition: 'left',
      },
    ],
  ],

  title: 'Bringup Labs',
  tagline: 'ROS Bag Management and Visualization Platform',
  organizationName: 'rahulkatiyar19955',
  projectName: 'Bringup Docs',
  url: 'https://bagmaster.dev',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  titleDelimiter: '·',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  onBrokenLinks: 'warn',

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editCurrentVersion: true,
          ...commonDocsOptions,
          sidebarCollapsible: true,
          sidebarCollapsed: false,
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
            content: '#101c22',
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

  clientModules: [
    './src/clientModules/anchor-reveal.ts',
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
        'cpp',
        'cmake',
        'docker',
      ],
    },
    navbar: {
      title: 'Bringup Docs',
      logo: {
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg',
        alt: 'Bringup Labs Logo',
        href: '/',
      },
      style: 'dark',
      items: [
        {
          type: 'search',
          position: 'left',
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
              to: '/getting-started',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/bringup-labs',
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
        content: 'https://bringup.dev/img/social-card.png',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        name: 'twitter:image',
        content: 'https://bringup.dev/img/social-card.png',
      },
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
