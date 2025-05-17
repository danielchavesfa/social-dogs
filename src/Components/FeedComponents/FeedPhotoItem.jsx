import React from 'react';
import styles from './FeedPhotoItem.module.css';
import Image from '../HelpersComponents/Image';

function FeedPhotoItem({ photo, setModalPhoto }) {
  function handleClick() {
    setModalPhoto(photo);
  }

  return (
    <li className={styles.photo} onClick={handleClick}>
      <Image src={photo.src} alt={photo.title} />
      <span className={styles.views}>{photo.acessos}</span>
    </li>
  );
}

export default FeedPhotoItem;
