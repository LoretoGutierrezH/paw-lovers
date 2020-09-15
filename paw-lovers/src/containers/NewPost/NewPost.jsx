import React from 'react';
import style from './NewPost.module.css';
const NewPost = (props) => {
  // Lógica de creación de nueva publicación
  console.log(props.match);
  return (
    <main className={style.newPost}>
      <h1>Soy un formulario de nueva publicación</h1>
      <form onSubmit={(event) => {event.preventDefault(); console.log('Publicación creada');}}>
        <p>Categoría: {props.match.params.category}</p>
        <input type="text" placeholder="Título"required></input>
        <textarea type="text" placeholder="Escribe aquí" required />
        <button type="submit">Publicar</button>
      </form>
    </main>
  );
}

export default NewPost;