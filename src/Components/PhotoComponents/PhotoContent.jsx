import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PhotoContent.module.css';
import UserContext from '../../Contexts/UserContext';
import PhotoComments from './PhotoComments';
import PhotoDelete from './PhotoDelete';
import Image from '../HelpersComponents/Image';

function PhotoContent({ data, single }) {
  const user = React.useContext(UserContext);
  const { photo, comments } = data;

  function checkPhotoAuthor() {
    return user.data && user.data.username === photo.author;
  }

  return (
    <div className={`${styles.photo} ${single ? styles.single : ''}`}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {checkPhotoAuthor() ? (
              <PhotoDelete id={photo.id} />
            ) : (
              <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
            )}
            <span className={styles.views}>{photo.acessos}</span>
          </p>
          <h1 className='containerTitle'>
            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{photo.peso} kg</li>
            <li>{photo.idade} anos</li>
          </ul>
        </div>
      </div>
      <PhotoComments id={photo.id} comments={comments} single={single} />
    </div>
  );
}

export default PhotoContent;
