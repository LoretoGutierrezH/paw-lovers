import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import style from './Post.module.css';
import PawImg from '../../assets/Paw.png';
import firebase from '../../Firebase';
const db = firebase.firestore();

const Post = (props) => {
  const [pawState, setPawState] = useState({pawActivation: false});
  const pawOptionsHandler = (event) => {
    setPawState({
      pawId: event.target.id,
      pawActivation: pawState.pawActivation === false ? true : false
    })
  };

  return (
    <article className={style.post}>
      <section className={style.postContent}>
        <h4 className={style.heading}>{props.title}</h4>
        <div className={style.innerContent}>
          <div className={style.pawContainer}>
            <img onClick={(event) => pawOptionsHandler(event)} id={props.id} src={PawImg} alt="Imagen de patita de perro para eliminar o editar publicación" />
            <select onChange={(event) => props.postAction(event)} className={pawState.pawActivation === false ? "inactive" : "active"} name="paw-options" id={props.id}>
              <option defaultValue="Elegir opción">Elegir opción</option>
              <option value="update">Actualizar</option>
              <option value="delete">Eliminar</option>
            </select>
          </div>
          <div className={style.data}>
            <p className={style.heading}>Categoría: {props.category}</p>
            <p className={style.heading}>Autor: {props.author}</p>
            <p className={style.heading}>Me gusta: {props.likes}</p>
            <p className={style.heading}>Publicado: {props.date}</p>
            <p className={style.contentArea}>{props.content}</p>
          </div>
        </div>
      </section>
      <div className={style.interactionContainer}>
        <button className="custom-btn green-btn">Me gusta</button>
        <button className="custom-btn green-btn">Comentar</button>
        <button className="custom-btn green-btn">Compartir</button>
      </div>
    </article>
  );
}

export default withRouter(Post);