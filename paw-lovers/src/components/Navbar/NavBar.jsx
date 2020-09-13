import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
import PawLovers from '../../assets/logoPawLovers.png';
import BurgerMenuIcon from '../../assets/menu.png';

const NavBar = (props) => {
  const [burgerMenuState, setBurgerMenuState] = useState('closed');
  console.log(burgerMenuState);
  const openBurgerMenu = () => {
    burgerMenuState === 'closed' ? setBurgerMenuState('open') : setBurgerMenuState('closed');
  }

  return (
    <div className={style.navbar}>
      <Link to="/">
        <div className={style.logoContainer}>
          <img src={PawLovers} alt="Inicio" />
        </div>
      </Link>

      <div onClick={openBurgerMenu} className={style.burgerMenuIcon}>
        <img src={BurgerMenuIcon} alt="burger menu icon" />
      </div>

      <ul id={style.burgerMenu}className={burgerMenuState === 'closed' ? style.closedMenu : style.openMenu}>
        <Link to="/">
          <li className="icon-container">
            <img src="" alt="Inicio" />
          </li>
        </Link>
        <Link to="/tips">
          <li className="icon-container">
            <img src="" alt="Tips" />
          </li>
        </Link>
        <Link to="/cuidados-40tena">
          <li className="icon-container">
            <img src="" alt="Cuidados en 40tena" />
          </li>
        </Link>
        <Link to="/adopción">
          <li className="icon-container">
            <img src="" alt="Adopción" />
          </li>
        </Link>
        <Link to="/servicios">
          <li className="icon-container">
            <img src="" alt="Servicios" />
          </li>
        </Link>
        <Link to="/concurso">
          <li className="icon-container">
            <img src="" alt="Concurso" />
          </li>
        </Link>
        <Link to="/panel-de-control">
          <li className="icon-container">
            <img src="" alt="Panel de control" />
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default NavBar;