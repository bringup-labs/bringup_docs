import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

type CardProps = {
  icon: string;
  title: string;
  description: string;
  to: string;
};

function DocCard({icon, title, description, to}: CardProps) {
  return (
    <Link to={to} className={styles.card}>
      <div className={styles.cardIcon}>{icon}</div>
      <div>
        <div className={styles.cardTitle}>{title}</div>
        <div className={styles.cardDescription}>{description}</div>
      </div>
    </Link>
  );
}

const cards: CardProps[] = [
  {
    icon: '🚀',
    title: 'Getting Started',
    description: 'Install Bagmaster and manage your first ROS bag in minutes.',
    to: '/docs',
  },
  {
    icon: '📖',
    title: 'Guides',
    description: 'Step-by-step guides for recording, playing back, and visualizing ROS bags.',
    to: '/docs',
  },
  {
    icon: '⚙️',
    title: 'API Reference',
    description: 'Full reference for the Bagmaster REST API and SDK.',
    to: '/docs',
  },
  {
    icon: '🏗️',
    title: 'Architecture',
    description: 'Understand how Bagmaster is designed under the hood.',
    to: '/docs',
  },
  {
    icon: '🤝',
    title: 'Contributing',
    description: 'Help improve Bagmaster — code, docs, or community support.',
    to: '/docs',
  },
  {
    icon: '💬',
    title: 'Community',
    description: 'Join the conversation on GitHub and connect with other users.',
    to: 'https://github.com/rahulkatiyar19955/bagmaster/discussions',
  },
];

type SidebarItem = {
  label: string;
  to: string;
  icon: string;
};

const sidebarItems: SidebarItem[] = [
  {label: 'Getting Started', to: '/docs', icon: '🚀'},
  {label: 'Guides', to: '/docs', icon: '📖'},
  {label: 'API Reference', to: '/docs', icon: '⚙️'},
  {label: 'Architecture', to: '/architecture/placeholder', icon: '🏗️'},
  {label: 'Contributing', to: '/docs', icon: '🤝'},
  {label: 'Community', to: 'https://github.com/rahulkatiyar19955/bagmaster/discussions', icon: '💬'},
  {label: 'Blog', to: '/blog', icon: '✍️'},
];

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout title="Documentation" description={siteConfig.tagline}>
      <div className={styles.pageLayout}>
        {/* ── Sidebar (full height from top) ── */}
        <aside className={styles.sidebar}>
          <nav className={styles.sidebarNav}>
            <h3 className={styles.sidebarTitle}>Documentation</h3>
            <ul className={styles.sidebarList}>
              {sidebarItems.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className={styles.sidebarLink}>
                    <span className={styles.sidebarIcon}>{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* ── Main content area ── */}
        <main className={styles.main}>
          {/* ── Hero ── */}
          <section className={styles.hero}>
            <div className={styles.heroInner}>
              <p className={styles.badge}>Documentation</p>
              <h1 className={styles.heroTitle}>Bringup Labs Docs</h1>
              <p className={styles.heroSubtitle}>
                Everything you need to manage, visualize, and analyze ROS bags at scale.
              </p>
              <div className={styles.heroCtas}>
                <Link className={styles.ctaPrimary} to="/docs">
                  Get Started
                </Link>
                <Link
                  className={styles.ctaSecondary}
                  href="https://github.com/rahulkatiyar19955/bagmaster">
                  GitHub →
                </Link>
              </div>
            </div>
          </section>

          {/* ── Cards grid ── */}
          <section className={styles.section}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Explore the docs</h2>
              <div className={styles.grid}>
                {cards.map((card) => (
                  <DocCard key={card.title} {...card} />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
