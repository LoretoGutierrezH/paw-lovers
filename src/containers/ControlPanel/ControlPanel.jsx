import React, { useState, useRef }from 'react';
import style from './ControlPanel.module.css';
import AnonymousAvatar from "../../assets/anonymous.png";
import firebase from '../../Firebase';
import {connect} from 'react-redux';

const db = firebase.firestore();
const auth = firebase.auth();

const ControlPanel = (props) => {
  const [fileUrl, setFileUrl] = useState(auth.currentUser.photoURL !== null ? auth.currentUser.photoURL : AnonymousAvatar);

  const [informationMessage, setInformationMessage] = useState(null);


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
    auth.currentUser.updateProfile({
      displayName: newUserName,
      photoURL: fileUrl
    })
    .then(() => {
      console.log(auth.currentUser);
    })

    //updating email 
    credentialsVerification(currentPassword)
    .then(() => {
      auth.currentUser.updateEmail(newEmail);
    })
    .then (() => {
      setInformationMessage('Se actualizó la información correctamente. Podrás ver los cambios al refrescar la página.');
    })
    .catch(error => {
      setInformationMessage(`${error.message}`);
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
        <p>{auth.currentUser.email}</p>
        <input type="email" name="newemail" placeholder="Nuevo correo" />
        <input type="password" name="currentpassword" placeholder="Contraseña actual" />
        <button type="submit" className="custom-btn green-btn">Guardar</button>
      </form>
      <p style={{color: "#8BC34A",
    textAlign: "center", fontWeight: "bold"}}>{informationMessage}</p>
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