import React, { useState } from 'react';
import style from './Post.module.css';
import PawImg from '../../assets/Paw.png';
import firebase from '../../Firebase';
import {connect} from 'react-redux';
const db = firebase.firestore();
const auth = firebase.auth();

const Post = (props) => {
  const [pawState, setPawState] = useState({pawActivation: false});

  const pawOptionsHandler = (event) => {
    setPawState({
      pawId: event.target.id,
      pawActivation: pawState.pawActivation === false ? true : false
    })
  };

  const showLikesDetails = (event) => {
    
  }

  

  return (
    <article data-userid={props.uid} data-postid={props.id} className={style.post}>
      <section className={style.postContent}>
        <h4 className={style.heading}>{props.title}</h4>
        <div className={style.innerContent}>
          <div className={props.authenticated === true && props.userId === props.uid ? `${style.pawContainer} active` : `${style.pawContainer} inactive`}>
            <img onClick={(event) => pawOptionsHandler(event)} id={props.id} src={PawImg} alt="Imagen de patita de perro para eliminar o editar publicación" />
            <select onChange={(event) => props.postAction(event)} className={pawState.pawActivation === false ? "inactive" : "active"} name="paw-options" id={props.id} name={props.uid}>
              <option className="inactive grey-option" defaultValue="Elegir opción">Elegir opción</option>
              <option value="update">Actualizar</option>
              <option value="delete">Eliminar</option>
            </select>
          </div>
          <div className={style.data}>
            <p className={style.heading}>Categoría: {props.category}</p>
            <p className={style.heading}>Autor: {props.author}</p>
            <p className={style.heading}>Me gusta: {props.likes.length}</p>
            <p className={style.heading}>Publicado: {props.date}</p>
            <p className={style.contentArea}>{props.content}</p>
          </div>
        </div>
      </section>
      <div className={style.interactionContainer}>
        <button onClick={(event) => {event.preventDefault(); props.clicked(event)}} className={auth.currentUser !== null ? `custom-btn green-btn` : `inactive`}>Me gusta</button>
        <button className="custom-btn green-btn">Comentar</button>
        <button className="custom-btn green-btn">Compartir</button>
      </div>
    </article>
  );
}
const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    userId: state.userId
  }
}
export default connect(mapStateToProps)(Post);