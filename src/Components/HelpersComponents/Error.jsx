import React from 'react';
import styles from './Error.module.css';

function Error({ error }) {
  if (!error) return null;

  return <p className={styles.error}>{error}</p>;
}

export default Error;
