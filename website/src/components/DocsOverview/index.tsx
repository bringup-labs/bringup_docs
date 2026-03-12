import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

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
    to: '/getting-started',
  },
  {
    icon: '📖',
    title: 'Guides',
    description: 'Step-by-step guides for recording, playing back, and visualizing ROS bags.',
    to: '/getting-started',
  },
  {
    icon: '⚙️',
    title: 'API Reference',
    description: 'Full reference for the Bagmaster REST API and SDK.',
    to: '/getting-started',
  },
  {
    icon: '🏗️',
    title: 'Architecture',
    description: 'Understand how Bagmaster is designed under the hood.',
    to: '/getting-started',
  },
  {
    icon: '🤝',
    title: 'Contributing',
    description: 'Help improve Bagmaster — code, docs, or community support.',
    to: '/getting-started',
  },
  {
    icon: '💬',
    title: 'Community',
    description: 'Join the conversation on GitHub and connect with other users.',
    to: 'https://github.com/bringup-labs/bagmaster/discussions',
  },
];

export default function DocsOverview(): ReactNode {
  return (
    <div className={styles.overview}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Explore the docs</h2>
        <div className={styles.grid}>
          {cards.map((card) => (
            <DocCard key={card.title} {...card} />
          ))}
        </div>
      </section>
    </div>
  );
}
