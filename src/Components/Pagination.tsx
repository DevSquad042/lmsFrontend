import React from 'react';
import styles from './Pagination.module.css';

const Pagination: React.FC = () => (
  <div className={styles.wrapper}>
    <button className={styles.arrow}>‹</button>
    {[1, 2, 3].map((page) => (
      <button
        key={page}
        className={`${styles.page} ${page === 1 ? styles.active : ''}`}
      >
        {page}
      </button>
    ))}
    <button className={styles.arrow}>›</button>
  </div>
);

export default Pagination;
