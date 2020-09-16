import React, { useState } from 'react';
import style from './NewPost.module.css';
import firebase from '../../Firebase';

const db = firebase.firestore();
const auth = firebase.auth();

const NewPost = (props) => {
  const [infoMessageState, setInfoMessageState] = useState('');
  console.log(infoMessageState);

  // Lógica de creación de nueva publicación
  const newPostHandler = (event) => {
    const postTitle = event.target["post-title"].value;
    const postContent = event.target["post-content"].value;
    if (auth.currentUser) {
     db.collection('Posts').add({
       uid: auth.currentUser.uid,
       author: 'usuario_prueba',
       category: props.match.params.category,
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
      console.log('No hay ningún usuario conectado, por favor inicia sesión y vuelve a intentarlo');
    }
  }
  return (
    <main className={style.newPost}>
      <form onSubmit={(event) => {event.preventDefault(); newPostHandler(event);}}>
        <div className={style.categoryContainer}>
          <p>Categoría: {props.match.params.category}</p>
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