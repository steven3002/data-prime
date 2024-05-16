import Link from 'next/link';

import styles from '../app/app.module.css';

export const HelloNearCard = () => {
  return (
    <Link
      href="/hello-near"
      className={styles.card}
      rel="noopener noreferrer"
    >
      <h2>
        Smart Contract Integration <span>-&gt;</span>
      </h2>
      <p>Experience the power of Near Protocol</p>
    </Link>
  );
};
