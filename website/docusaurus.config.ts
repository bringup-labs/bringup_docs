import { themes as prismThemes } from 'prism-react-renderer';
import type * as PluginContentDocs from '@docusaurus/plugin-content-docs';
import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';

const isProductionDeployment = process.env.NODE_ENV === 'production';
const isDeployPreview = process.env.PREVIEW_DEPLOY === 'true';

// Supplied per environment rather than committed. Absent locally, so dev and preview
// builds simply ship no analytics instead of reporting into the production site.
const analyticsSiteId = process.env.ANALYTICS_SITE_ID;

// Analytics previously went missing without anyone noticing. A build that omits it
// should say so out loud rather than silently producing an untracked site.
if (isProductionDeployment && !analyticsSiteId) {
  console.warn(
    '[analytics] ANALYTICS_SITE_ID is unset — building without analytics.',
  );
}

const copyright = `Copyright © ${new Date().getFullYear()} Bringup Labs.`;

const commonDocsOptions: Partial<PluginContentDocs.Options> = {
  breadcrumbs: false,
  showLastUpdateAuthor: true,
  showLastUpdateTime: true,
  // Function form, not a string. `docs/` lives outside this site dir (`path: '../docs'`),
  // so Docusaurus appends `path.relative(siteDir, docsDir)` — i.e. `../docs` — to a string
  // editUrl. That yields `.../edit/main/../docs/<file>`, which the browser collapses to
  // `.../edit/docs/<file>`, silently eating the branch segment and 404ing on GitHub.
  editUrl: ({ docPath }) =>
    `https://github.com/bringup-labs/bringup_docs/edit/main/docs/${docPath}`,
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
  tagline: 'The operating layer for robotics development',
  organizationName: 'Bringup Labs',
  projectName: 'Bringup Docs',
  url: 'https://docs.bringup.dev',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  titleDelimiter: '·',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  onBrokenLinks: 'throw',

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
        // Analytics is intentionally disabled. It previously shipped the literal
        // placeholder `G-XXXXXXXXXX`, so production pages loaded gtag.js and fired
        // hits against a measurement ID that does not exist. Re-enable by restoring
        // this block with a real ID:
        //   gtag: { trackingID: 'G-XXXXXXXXXX', anonymizeIP: true },
        sitemap: {
          // `/search` carries a noindex meta tag; listing it in the sitemap would ask
          // crawlers to index a page that tells them not to.
          ignorePatterns: ['/search'],
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

  // Self-hosted analytics, wired up only when ANALYTICS_SITE_ID is present at build
  // time. Key/value pairs beyond `src` are emitted verbatim as attributes, which is
  // how the `data-site-id` the collector keys on gets through. Note the site ID is
  // public either way — it ships in the HTML of every page. The env var keeps it out
  // of the repo and lets each environment point at its own site; it is not a secret.
  scripts: analyticsSiteId
    ? [
        {
          src: 'https://analytics.bringup.dev/api/script.js',
          'data-site-id': analyticsSiteId,
          defer: true,
        },
      ]
    : [],

  // Sitewide Organization schema. Emitted into every page's <head> so crawlers and AI
  // summarizers can attribute the docs to the right entity.
  headTags: [
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Bringup Labs',
        url: 'https://bringup.dev',
        logo: 'https://docs.bringup.dev/img/logo.svg',
        description: 'The operating layer for robotics development.',
        sameAs: [
          'https://github.com/bringup-labs',
          'https://x.com/Bringup_labs',
          'https://www.linkedin.com/company/bringup-labs',
        ],
      }),
    },
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
            { label: 'Get Started', to: '/get-started/install' },
            { label: 'Tutorials', to: '/tutorials/get-a-shell' },
            { label: 'Extensions', to: '/extensions/' },
            { label: 'FAQ', to: '/faq' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'GitHub', href: 'https://github.com/bringup-labs' },
            { label: 'X', href: 'https://x.com/Bringup_labs' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/company/bringup-labs' },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              href: 'https://bringup.dev/blog',
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
    // Self-hosted at static/img/social-card.png. These previously pointed at
    // https://bringup.dev/img/social-card.png, which 404s — so every shared docs
    // link rendered a broken preview.
    metadata: [
      {
        property: 'og:image',
        content: 'https://docs.bringup.dev/img/social-card.png',
      },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        name: 'twitter:image',
        content: 'https://docs.bringup.dev/img/social-card.png',
      },
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
