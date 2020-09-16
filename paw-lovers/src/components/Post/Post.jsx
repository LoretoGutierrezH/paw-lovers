import React from 'react';
import style from './Post.module.css';

const Post = (props) => {
  return (
    <article className={style.post}>
      <section className={style.postContent}>
        <h2 className={style.heading}>{props.title}</h2>
        <h3 className={style.heading}>Categoría: {props.category}</h3>
        <h3 className={style.heading}>Autor: {props.author}</h3>
        <h3 className={style.heading}>Me gusta: {props.likes}</h3>
        <h3 className={style.heading}>Publicado: {props.date}</h3>
        <p className={style.contentArea}>{props.content}
        </p>
      </section>
      <div className={style.interactionContainer}>
        <button className="custom-btn green-btn">Me gusta</button>
        <button className="custom-btn green-btn">Comentar</button>
        <button className="custom-btn green-btn">Compartir</button>
      </div>
    </article>
  );
}

export default Post;