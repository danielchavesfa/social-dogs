import React from 'react';
import styles from './Image.module.css';

function Image({ alt, ...props }) {
  const [skeleton, setSkeleton] = React.useState(true);

  function handleLoad({ target }) {
    target.style.opacity = 1;
    setSkeleton(false);
  }

  return (
    <div className={styles.wrapper}>
      {skeleton ? <div className={styles.skeleton}></div> : null}
      <img onLoad={handleLoad} className={styles.img} alt={alt} {...props} />
    </div>
  );
}

export default Image;
