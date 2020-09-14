import React, { useState } from 'react';
import style from './AuthModal.module.css';
import * as actionTypes from '../../store/authActions';
import { connect } from 'react-redux';
const AuthModal = (props) => {
  const [formState, setFormState] = useState('sign-in');

  const tabActivationHandler = (event) => {
    console.log(event.target.id);
    if (event.target.id === 'sign-up-form') {
      setFormState('sign-up');
    } else {
      setFormState('sign-in');
    }
  }

  return (
    <article className={props.authModal === false ? `${style.modalWrapper} inactive` : `${style.modalWrapper} active`}>
      <h1>Soy un modal de inicio de sesión/registro</h1>
      <h1 onClick={props.onActivateModal} className={style.closeModalIcon}>&times;</h1>
      <section className={style.modal}>
        <header className={style.modalHeader}>
          <nav className={style.modalNavbar}>
            <p id="sign-in-form" onClick={(event) => tabActivationHandler(event)} className={style.activeTab} className={formState === 'sign-in' ? `${style.activeTab}` : `${style.inactiveTab}`}>Iniciar sesión</p>
            <p id="sign-up-form" onClick={(event) => tabActivationHandler(event)} className={formState === 'sign-up' ? `${style.activeTab}` : `${style.inactiveTab}`}>Registro</p>
          </nav>
        </header>
        <section className={style.modalContent}>
          <form className={formState === 'sign-up' ? `${style.signInForm} ${style.inactive}` : `${style.signInForm} ${style.active}`}>
            <input type="email" name="email" placeholder="Correo" required />
            <input type="password" name="password" placeholder="Contraseña" required />
            <button className={`custom-btn green-btn ${style.btn}`}>Iniciar sesión</button>
          </form>
          <form className={formState === 'sign-in' ? `${style.signUpForm} ${style.inactive}` : `${style.signUpForm} ${style.active}`}>
            <input type="email" name="email" placeholder="Correo" required />
            <input type="password" name="password" placeholder="Contraseña" required />
            <button className={`custom-btn green-btn ${style.btn}`}>Registrarse</button>
          </form>
          <p className={style.authenticationMessage}>Mensaje de registro/inicio de sesión</p>
        </section>
      </section>
    </article>
  );
}

const mapStateToProps = (state) => {
  return {
    authModal: state.authModal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onActivateModal: () => dispatch({type: actionTypes.ACTIVATE})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);