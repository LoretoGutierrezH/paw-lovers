import React, { useState, useRef, useEffect } from 'react';
import style from './AuthModal.module.css';
import * as actionTypes from '../../store/actionTypes';
import GoogleLogo from '../../assets/Google__G__Logo.svg';
import { connect } from 'react-redux';
import firebase from '../../Firebase';
const db = firebase.firestore();
const auth = firebase.auth();


const AuthModal = (props) => {
  const [formState, setFormState] = useState('sign-in');
  
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const signUpEmailRef = useRef("");
  const signUpPasswordRef = useRef("");


  const tabActivationHandler = (event) => {
    if (event.target.id === 'sign-up-form') {
      setFormState('sign-up');
    } else {
      setFormState('sign-in');
    }
  }

  let firebaseInfoMessage = null;

  {/* <p className={style.authenticationMessage}>{props.authenticated === true ? `Bienvenido a Paw Lovers, ${auth.currentUser.displayName}` : null}</p>
  <p>{props.failedAuthMessage !== undefined ? props.failedAuthMessage : null}</p> */}
  if (props.authenticated) {
    firebaseInfoMessage = <p className={style.successMessage}>{`Bienvenido a Paw Lovers, ${auth.currentUser.displayName}`}</p>
  } else if (props.authenticated === false && props.failedAuthMessage !== undefined) {
    firebaseInfoMessage = <p className={style.failMessage}>{props.failedAuthMessage}</p>;
  }


  const clearInputs = () => {
      emailRef.current.value = "";
      passwordRef.current.value = "";
      usernameRef.current.value = "";
      signUpEmailRef.current.value = "";
      signUpPasswordRef.current.value = "";

  }
  return (
    <article className={props.authModal === false ? `${style.modalWrapper} inactive` : `${style.modalWrapper} active`}>
      <h1 onClick={props.onActivateModal} className={style.closeModalIcon}>&times;</h1>
      <section className={style.modal}>
        <header className={style.modalHeader}>
          <nav className={style.modalNavbar}>
            <p id="sign-in-form" onClick={(event) => tabActivationHandler(event)} className={style.activeTab} className={formState === 'sign-in' ? `${style.activeTab}` : `${style.inactiveTab}`}>Iniciar sesión</p>
            <p id="sign-up-form" onClick={(event) => tabActivationHandler(event)} className={formState === 'sign-up' ? `${style.activeTab}` : `${style.inactiveTab}`}>Registro</p>
          </nav>
        </header>
        <section className={style.modalContent}>
          <form onSubmit={(event) => {event.preventDefault(); props.signIn(event); clearInputs();}} className={formState === 'sign-up' ? `${style.signInForm} ${style.inactive}` : `${style.signInForm} ${style.active}`}>
            <input ref={emailRef} type="email" name="signinemail" placeholder="Correo" required />
            <input ref={passwordRef} type="password" name="signinpassword" placeholder="Contraseña" required />
            <button type="submit" className={`custom-btn green-btn ${style.btn}`}>Iniciar sesión</button>
            <button className={style.googleBtn} onClick={props.signInGoogle}><img src={GoogleLogo} alt=""/></button>
          </form>



          <form onSubmit={(event) => {event.preventDefault(); props.signUp(event); clearInputs();}}className={formState === 'sign-in' ? `${style.signUpForm} ${style.inactive}` : `${style.signUpForm} ${style.active}`}>
            <input ref={usernameRef} type="text" name="signup-username" placeholder="Nombre de usuario" required />
            <input ref={signUpEmailRef} type="email" name="signupemail" placeholder="Correo" required />
            <input ref={signUpPasswordRef} type="password" name="signuppassword" placeholder="Contraseña" required />
            <button type="submit" className={`custom-btn green-btn ${style.btn}`}>Registrarse</button>
          </form>
          {firebaseInfoMessage}
        </section>
      </section>
    </article>
  );
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authReducer.authenticated,
    authModal: state.authReducer.authModal,
    failedAuthMessage: state.authReducer.errorMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onActivateModal: () => dispatch({type: actionTypes.ACTIVATE})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);