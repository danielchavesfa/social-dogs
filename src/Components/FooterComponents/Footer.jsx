import React from 'react';
import styles from './Footer.module.css';
import DogsSVG from '../../assets/dogs-footer.svg?react';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className='container'>
        <DogsSVG />
        <p>Dogs. Alguns direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
