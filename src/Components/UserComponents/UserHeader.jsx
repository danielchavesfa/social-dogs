import React from 'react';
import styles from './UserHeader.module.css';
import UserHeaderNav from './UserHeaderNav';
import { useLocation } from 'react-router-dom';

function UserHeader() {
  const [title, setTitle] = React.useState('');
  const { pathname } = useLocation();

  React.useEffect(() => {
    const titles = {
      '/conta': 'Minha Conta',
      '/conta/estatisticas': 'Estatísticas',
      '/conta/postar': 'Postar Foto',
    };

    setTitle(titles[pathname]);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <h1 className='containerTitle'>{title}</h1>
      <UserHeaderNav />
    </header>
  );
}

export default UserHeader;
