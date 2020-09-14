import React, { useState } from 'react';
import style from './AuthModal.module.css';
import * as actionTypes from '../../store/authActions';
import { connect } from 'react-redux';
const AuthModal = (props) => {
  const [formState, setFormState] = useState('sign-in');

  const showForm = (event) => {
    console.log(event.target);
  }
  return (
    <article className={props.authModal === false ? `${style.modalWrapper} inactive` : `${style.modalWrapper} active`}>
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
            <input type="email" name="email" placeholder="Correo" />
            <input type="password" name="password" placeholder="Contraseña" />
            <button className={style.authBtn}>Iniciar sesión</button>
          </form>
          <form className={formState === 'sign-in' ? `${style.signUpForm} inactive` : `${style.signUpForm} active`}>
            <input type="email" name="email" placeholder="Correo" />
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