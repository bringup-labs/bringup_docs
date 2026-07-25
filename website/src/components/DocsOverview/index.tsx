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
    title: 'Get Started',
    description: 'Install the desktop app, set up the daemon, and connect your first device.',
    to: '/get-started/install',
  },
  {
    icon: '📖',
    title: 'Tutorials',
    description: 'Walkthroughs for the things you will do most: shells, files, and deploys.',
    to: '/tutorials/get-a-shell',
  },
  {
    icon: '🧩',
    title: 'Extensions',
    description: 'Reference for every extension, from Fleet Manager to Bag Master.',
    to: '/extensions/',
  },
  {
    icon: '⚙️',
    title: 'Reference',
    description: 'The bringup CLI, file locations, update channels, and the daemon.',
    to: '/reference/cli',
  },
  {
    icon: '💬',
    title: 'FAQ',
    description: 'Setup problems, how updates work, and answers about plans and licensing.',
    to: '/faq',
  },
  {
    icon: '🤝',
    title: 'GitHub',
    description: 'Source-available code, issues, and releases.',
    to: 'https://github.com/bringup-labs',
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
