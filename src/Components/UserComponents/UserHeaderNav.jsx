import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './UserHeaderNav.module.css';
import UserContext from '../../Contexts/UserContext';
import MinhasFotosSVG from '../../assets/feed.svg?react';
import EstatisticasSVG from '../../assets/estatisticas.svg?react';
import AddFotosSVG from '../../assets/adicionar.svg?react';
import SairSVG from '../../assets/sair.svg?react';
import useMedia from '../../Hooks/useMedia';

function UserHeaderNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { userLogout } = React.useContext(UserContext);
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const mobile = useMedia('(max-width: 40rem)');

  function buttonLogout() {
    userLogout();
    navigate('/login');
  }

  function handleClick() {
    setMobileMenu(!mobileMenu);
  }

  React.useEffect(() => {
    setMobileMenu(false);
    if (!mobile) setMobileMenu(false);
  }, [pathname, mobile]);

  return (
    <>
      {mobile && (
        <button
          className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`}
          aria-label='Menu'
          onClick={handleClick}></button>
      )}
      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}>
        <NavLink to={'/conta'} end>
          <MinhasFotosSVG />
          {mobile && 'Minhas Fotos'}
        </NavLink>
        <NavLink to={'/conta/estatisticas'}>
          <EstatisticasSVG /> {mobile && 'Estatísticas'}
        </NavLink>
        <NavLink to={'/conta/postar'}>
          <AddFotosSVG />
          {mobile && 'Adicionar Foto'}
        </NavLink>
        <button onClick={buttonLogout}>
          <SairSVG />
          {mobile && 'Sair'}
        </button>
      </nav>
    </>
  );
}

export default UserHeaderNav;
