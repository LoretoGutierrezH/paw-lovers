import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import style from './NewPost.module.css';
import firebase from '../../Firebase';

const db = firebase.firestore();
const auth = firebase.auth();

const NewPost = (props) => {
  const [infoMessageState, setInfoMessageState] = useState('');
  const [errorState, setErrorState] = useState(false);
  console.log(infoMessageState);
  console.log(props.location);

  // Lógica de creación de nueva publicación
  const newPostHandler = (event) => {
    const postCategory = event.target["post-category"].value;
    const postTitle = event.target["post-title"].value;
    const postContent = event.target["post-content"].value;
    if (auth.currentUser) {
     db.collection('Posts').add({
       uid: auth.currentUser.uid,
       author: auth.currentUser.displayName,
       category: postCategory,
       title: postTitle,
       content: postContent,
       likes: [],
       comments: {},
       timestamp: firebase.firestore.FieldValue.serverTimestamp()
     })
     .then(() => {
       console.log('Publicación creada correctamente');
       setInfoMessageState('Publicación creada correctamente');
     })
     .catch(error => {
       console.log(error.message);
       setInfoMessageState(`${error.message}`);
     })

    } else {
      setErrorState(true);
      console.log('No hay ningún usuario conectado, por favor inicia sesión y vuelve a intentarlo');
    }
  }
  return (
    <main className={style.newPost}>
      {errorState ? <Redirect to="/404"></Redirect> : null}
      <form onSubmit={(event) => {event.preventDefault(); newPostHandler(event);}}>
        <div className={style.categoryContainer}>
          <select name="post-category" required>
            <option disabled defaultValue="Selecciona">Selecciona la categoría...</option>
            <option value="tips">Tips</option>
            <option value="cuarentena">Cuarentena</option>
            <option value="adopción">Adopción</option>
            <option value="servicios">Servicios</option>
          </select>
        </div>
        <input name="post-title" type="text" placeholder="Título"required></input>
        <textarea name="post-content" type="text" placeholder="Escribe aquí" required />
        <button className="custom-btn green-btn" type="submit">Publicar</button>
      </form>
      <p className={style.infoMessage}>{infoMessageState}</p>
    </main>
  );
}

export default NewPost;