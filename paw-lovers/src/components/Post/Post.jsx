import React from 'react';
import style from './Post.module.css';

const Post = (props) => {
  return (
    <article className={style.post}>
      <section className={style.postContent}>
        <h4 className={style.heading}>{props.title}</h4>
        <p className={style.heading}>Categoría: {props.category}</p>
        <p className={style.heading}>Autor: {props.author}</p>
        <p className={style.heading}>Me gusta: {props.likes}</p>
        <p className={style.heading}>Publicado: {props.date}</p>
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