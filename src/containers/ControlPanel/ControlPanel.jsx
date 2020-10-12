import React from 'react';
import style from './ControlPanel.module.css';
import AnonymousAvatar from "../../assets/anonymous.png";
import firebase from '../../Firebase';
import {connect} from 'react-redux';

const ControlPanel = (props) => {
  return (
    <main className={style.controlPanelContainer}>
      <h1 className={style.controlPanelHeading}>Editar perfil</h1>
      <form className={style.controlPanelForm} onSubmit={(event) => console.log("Editando perfil de usuario", event.target)}>
        <div onClick={() => console.log('editando foto de perfil')} className={style.profilePic}>
          <img src={AnonymousAvatar} alt="Foto de perfil del usuario"/>
        </div>
        <p>{props.userName}</p><input type="text" name="user-name" placeholder="Nuevo nombre de usuario" />
        <p>**********</p><input type="password" name="password" placeholder="Nueva contraseña" />
        <p>{props.userEmail}</p><input type="email" name="email" placeholder="Nuevo correo" />
        <button type="submit" className="custom-btn green-btn">Guardar</button>
      </form>
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    userName: state.authReducer.userName,
    userId: state.authReducer.userId,
    userEmail: state.authReducer.userEmail
  }
}
export default connect(mapStateToProps)(ControlPanel);