import React from 'react';
import { withRouter } from 'react-router-dom';
import style from './Post.module.css';

const Post = (props) => {
  let post = null;
  switch (props.match.params.category) {
    case "servicios":
      post = {
        heading: 'Título de servicio',
        category: 'Categoría: servicio',
        content: 'blablabla sobre servicio'
      }
      break;
    default:
      post = {
        heading: 'UN TIP',
        category: 'TIPS',
        content: 'Evita sacar a pasear a tu perro cuando haya mucho sol, ya que podría dañarse las almohadillas de las patitas. Si no hay otra alternativa, refresca sus patas con agua constantemente y evita el asfalto.'
      }
  }

  return (
    <article className={style.post}>
      <section className={style.postContent}>
        <h2 className={style.heading}>{post.heading}</h2>
        <h3 className={style.heading}>{post.category}</h3>
        <h3 className={style.heading}>Autor: Pablo</h3>
        <h3 className={style.heading}>Me gusta: usuario1, usuario2, usuario3</h3>
        <h3 className={style.heading}>Publicado: 13 de septiembre del 2020</h3>
        <p className={style.contentArea}>{post.content}
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

export default withRouter(Post);