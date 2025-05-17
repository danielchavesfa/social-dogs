import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import DogsSvg from '../../assets/dogs.svg?react';
import UserContext from '../../Contexts/UserContext';

function Header() {
  const { data } = React.useContext(UserContext);

  return (
    <header className={styles.headerBg}>
      <div className={`${styles.header} container`}>
        <nav className={styles.navHeader}>
          <Link to={'/'}>
            <DogsSvg />
          </Link>
          {data ? (
            <Link to={'/login'} className={styles.loginLink}>
              {data.nome}
            </Link>
          ) : (
            <Link to={'/login'} className={styles.loginLink}>
              Login / Criar
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
