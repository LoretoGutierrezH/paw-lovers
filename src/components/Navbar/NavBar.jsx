import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
import PawLovers from '../../assets/logoPawLovers.png';
import BurgerMenuIcon from '../../assets/menu.png';
import AuthenticationIcon from '../../assets/user.png';
import LogoutIcon from '../../assets/exit.png';
import * as actionTypes from '../../store/actionTypes';
import { connect } from 'react-redux';


const NavBar = (props) => {
  return (
    <nav className={style.navbar}>
      <Link to="/">
        <div className={style.logoContainer}>
          <img src={PawLovers} alt="Inicio" />
        </div>
      </Link>
      
      <div onClick={props.onActivateModal} className={props.authenticated === false ? `${style.authenticationIcon} active` : `${style.authenticationIcon} inactive`}>
        <img src={AuthenticationIcon} alt="authentication icon" />
      </div>
      <div onClick={(event) => {event.preventDefault(); props.signOut()}} className={props.authenticated === false ? `${style.authenticationIcon} inactive` : `${style.authenticationIcon} active`}>
        <img src={LogoutIcon} alt="authentication icon" />
      </div>

      <div onClick={props.burgerState === 'closed' ? props.openBurgerMenu : props.closeBurgerMenu} className={style.burgerMenuIcon}>
        <img src={BurgerMenuIcon} alt="burger menu icon" />
      </div>

      <ul
        id={style.burgerMenu}
        className={
          props.burgerState === "closed" ? style.closedMenu : style.openMenu
        }
      >
      <h1 onClick={() => props.closeBurgerMenu()} className={style.closeBurgerIcon}>&times;</h1>
        <Link to="/">
          <li className="icon-container">
            <p>Inicio</p>
          </li>
        </Link>
        <Link to="/tips">
          <li className="icon-container">
            <p>Tips</p>
          </li>
        </Link>
        <Link to="/cuarentena">
          <li className="icon-container">
            <p>Cuarentena</p>
          </li>
        </Link>
        <Link to="/adopción">
          <li className="icon-container">
            <p>Adopción</p>
          </li>
        </Link>
        <Link to="/servicios">
          <li className="icon-container">
            <p>Servicios</p>
          </li>
        </Link>
        <Link to="/concurso">
          <li className="icon-container">
            <p>Concurso</p>
          </li>
        </Link>
        {props.authenticated ? <Link to="/panel-de-control">
          <li className="icon-container">
            <p>Panel de control</p>
          </li>
        </Link> : null} 
      </ul>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authReducer.authenticated,
    authModal: state.authReducer.authModal,
    burgerState: state.burgerMenuReducer.burgerState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticate: () => dispatch({type: actionTypes.AUTHENTICATE}),
    onActivateModal: () => dispatch({type: actionTypes.ACTIVATE}),
    openBurgerMenu: () => dispatch({type: actionTypes.OPEN}),
    closeBurgerMenu: () => dispatch({type: actionTypes.CLOSE})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar); 