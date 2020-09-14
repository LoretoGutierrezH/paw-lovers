import React from 'react';
import style from './AuthModal.module.css';
import * as actionTypes from '../../store/authActions';
import { connect } from 'react-redux';
const AuthModal = (props) => {
  console.log('AuthModal.jsx', props.authModal);
  return (
    <article className={props.authModal === false ? `${style.modalWrapper} ${style.inactive}` : `${style.modalWrapper} ${style.active}`}>
      <h1>Soy un modal de inicio de sesión/registro</h1>
      <h1 onClick={props.onActivateModal} className={style.closeModalIcon}>&times;</h1>
      <section className={style.modal}>
        <header className={style.modalHeader}>
          <nav className={style.modalNavbar}>
            <p>Iniciar sesión</p>
            <p>Registro</p>
          </nav>
        </header>
        <section className={style.modalContent}>
          <form className={style.signInForm}>
            <input type="email" name="email" placholder="Correo" />
            <input type="password" name="password" placeholder="Contraseña" />
            <button className={style.authBtn}>Iniciar sesión</button>
          </form>
          <form className={style.signUpForm}>
            <input type="email" name="email" placholder="Correo" />
            <input type="password" name="password" placeholder="Contraseña" />
            <button className={style.authBtn}>Registrarse</button>
          </form>
          <p className={style.authenticationMessage}></p>
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