import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
import PawLovers from '../../assets/logoPawLovers.png';
import BurgerMenuIcon from '../../assets/menu.png';
import AuthenticationIcon from '../../assets/user.png';
import * as actionTypes from '../../store/authActions';
import { connect } from 'react-redux';

import * as firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA8PUJL2pZj7Vy0602V22CkvLmgyRwCnYY",
  authDomain: "paw-lovers-2.firebaseapp.com",
  databaseURL: "https://paw-lovers-2.firebaseio.com",
  projectId: "paw-lovers-2",
  storageBucket: "paw-lovers-2.appspot.com",
  messagingSenderId: "443458945688",
  appId: "1:443458945688:web:f229528639de085d3446ed",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

const NavBar = (props) => {
  //Burger Menu State:
  const [burgerMenuState, setBurgerMenuState] = useState('closed');
  const openBurgerMenu = () => {
    burgerMenuState === 'closed' ? setBurgerMenuState('open') : setBurgerMenuState('closed');
  }
  /* //Authentication Modal State:
  const [authModalState, setAuthModalState] = useState('inactive');
  const showAuthModal = () => {
    authModalState === 'inactive' ? setAuthModalState('active') : setAuthModalState('inactive');
  } */
 /*  const signUp = (event) => {
    auth.createUserWithEmailAndPassword('loreto.gutier.h@gmail.com', '123456').then(credentials => console.log(credentials));
  }

  const signIn = (event) => {
    auth.signInWithEmailAndPassword('loreto.gutier.@gmail.com', '123456').then(() => {
      console.log(auth.currentUser);
    })
  } */
  return (
    <nav className={style.navbar}>
      <Link to="/">
        <div className={style.logoContainer}>
          <img src={PawLovers} alt="Inicio" />
        </div>
      </Link>
      <div onClick={props.onActivateModal} className={style.authenticationIcon}>
        <img src={AuthenticationIcon} alt="authentication icon" />
      </div>
      <div onClick={openBurgerMenu} className={style.burgerMenuIcon}>
        <img src={BurgerMenuIcon} alt="burger menu icon" />
      </div>

      <ul
        id={style.burgerMenu}
        className={
          burgerMenuState === "closed" ? style.closedMenu : style.openMenu
        }
      >
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
        <Link to="/cuidados-40tena">
          <li className="icon-container">
            <p>Cuarentena</p>
          </li>
        </Link>
        <Link to="/adopción">
          <li className="icon-container">
            <p>Adoptación</p>
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
        <Link to="/panel-de-control">
          <li className="icon-container">
            <p>Panel de control</p>
          </li>
        </Link>
      </ul>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    authModal: state.authModal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticate: () => dispatch({type: actionTypes.AUTHENTICATE}),
    onActivateModal: () => dispatch({type: actionTypes.ACTIVATE})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);