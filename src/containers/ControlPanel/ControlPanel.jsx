import React, { useState, useRef }from 'react';
import style from './ControlPanel.module.css';
import AnonymousAvatar from "../../assets/anonymous.png";
import firebase from '../../Firebase';
import {connect} from 'react-redux';

const db = firebase.firestore();
const auth = firebase.auth();

const ControlPanel = (props) => {
  const [fileUrl, setFileUrl] = useState(auth.currentUser.photoURL !== null ? auth.currentUser.photoURL : AnonymousAvatar);


  const onImageUpload = async (event) => {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  }

  const submitForm = (event) => {
    const newUserName = event.target.newusername.value;
    const newEmail = event.target.newemail.value;
    const currentPassword = event.target.currentpassword.value;
    const newPassword = event.target.newpassword.value;
    auth.currentUser.updateProfile({
      displayName: newUserName,
      photoURL: fileUrl
    })
    .then(() => {
      console.log(auth.currentUser);
    })

    //updating email and/or password
    updateEmailAndPassword(newEmail, newPassword, currentPassword);
  }

  const updateEmailAndPassword = (newEmail, newPassword, currentPassword) => {
    credentialsVerification(currentPassword)
    .then(() => {
      if (newEmail !== "" && newPassword !== "") {
        auth.currentUser.updateEmail(newEmail);
        auth.currentUser.updatePassword(newPassword);
      } else if (newEmail !== "") {
        auth.currentUser.updateEmail(newEmail);
      } else if (newPassword !== "") {
        auth.currentUser.updatePassword(newPassword);
      }
    })
    .then(() => {
      console.log('Se actualizó la información.');
    })
    .catch(error => {
      console.log('Se produjo un error:', error.message);
    })
  }

  const credentialsVerification = (currentPassword) => {
    const credential = firebase.auth.EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
    return auth.currentUser.reauthenticateWithCredential(credential);
  }

  
  return (
    <main className={style.controlPanelContainer}>
      <h1 className={style.controlPanelHeading}>Editar perfil</h1>
      <form onSubmit={(event) => {event.preventDefault(); submitForm(event)}} className={style.controlPanelForm}>
        <div className={style.profilePic}>
          <img src={fileUrl} alt="Foto de perfil del usuario"/>
        </div>
        <input type="file" onChange={(event) => onImageUpload(event)} />
        <p>{auth.currentUser.displayName}</p>
        <input type="text" name="newusername" placeholder="Nuevo nombre de usuario"  />
        <input type="email" name="newemail" placeholder="Nuevo correo" />
        <input type="password" name="newpassword" placeholder="Nueva contraseña" />
        <input type="password" name="currentpassword" placeholder="Contraseña actual" />
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