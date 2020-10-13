import React, { useState }from 'react';
import style from './ControlPanel.module.css';
import AnonymousAvatar from "../../assets/anonymous.png";
import firebase from '../../Firebase';
import {connect} from 'react-redux';

const db = firebase.firestore();
const auth = firebase.auth();

const ControlPanel = (props) => {
  const [fileUrl, setFileUrl] = useState(null);

  const onImageUpload = async (event) => {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  }

  const submitForm = (event) => {
    const newUserName = event.target.username.value;
    auth.currentUser.updateProfile({
      displayName: newUserName,
      photoURL: fileUrl
    })
    .then(() => {
      console.log(auth.currentUser);
    })

  }

  return (
    <main className={style.controlPanelContainer}>
      <h1 className={style.controlPanelHeading}>Editar perfil</h1>
      <form onSubmit={(event) => {event.preventDefault(); submitForm(event)}} className={style.controlPanelForm}>
        <div className={style.profilePic}>
          <img src={fileUrl !== null ? fileUrl : AnonymousAvatar} alt="Foto de perfil del usuario"/>
        </div>
        <input type="file" onChange={(event) => onImageUpload(event)} />
        <p>{auth.currentUser.displayName}</p>
        <input type="text" name="username" placeholder="Nuevo nombre de usuario" />
        <p>{auth.currentUser.email}</p>
        <input type="email" name="email" placeholder="Nuevo correo" />
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