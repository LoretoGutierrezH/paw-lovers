import React from 'react';
import style from './Post.module.css';

const Post = (props) => {
  return (
    <article className={style.post}>
      <section className={style.postContent}>
        <h2 className={style.heading}>Título: {props.heading}</h2>
        <h3 className={style.heading}>Categoría: {props.category}</h3>
        <h3 className={style.heading}>Autor: Pablo</h3>
        <h3 className={style.heading}>Me gusta: usuario1, usuario2, usuario3</h3>
        <h3 className={style.heading}>Publicado: 13 de septiembre del 2020</h3>
        <p className={style.contentArea}>{props.content}
        </p>
      </section>
      <div className={style.interactionContainer}>
        <button className={style.interactionOption}>Me gusta</button>
        <button className={style.interactionOption}>Comentar</button>
        <button className={style.interactionOption}>Compartir</button>
      </div>
    </article>
  );
}

export default Post;