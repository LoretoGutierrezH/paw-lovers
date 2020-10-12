import React, { useState, useEffect, useRef } from 'react';
import style from './UpdatePostModal.module.css';
import firebase from '../../Firebase';
const db = firebase.firestore();
const auth = firebase.auth();

const UpdatePostModal = (props) => {
  const [internalState, setInternalState] = useState("");

  const closeModal = () => {
    props.setModalState({
      modalState: false
    })
  }

const updatePost = (event) => {
  console.log(event.target);
  let newTitle = event.target["post-title"].value;
  let newContent = event.target["post-content"].value;
  console.log(newTitle, newContent);
  db.collection('Posts').doc(`${props.modalState.postId}`).update({
    title: newTitle,
    content: newContent
  }).then((bla) => {
    props.setModalState({modalState: false});

  }) 
}

useEffect(() => {
  setInternalState({
    title: props.modalState.postTitle,
    content: props.modalState.postContent
  })
}, [setInternalState, props.modalState.postId])

console.log(internalState);

  return (
    <article className={props.modalState.modalState === true ? `${style.modalWrapper} ${style.active}` : `${style.modalWrapper} ${style.inactive}`}>
      <p className={style.closeModalBtn} onClick={() => closeModal()}>&times;</p>
      <section className={style.modalContent}>
        <form id={props.modalState.id} onSubmit={(event) => {event.preventDefault(); updatePost(event); /* closeModal(); */}}>
        <input name="post-title" type="text" defaultValue={internalState.title} />
        <textarea name="post-content" cols="30" rows="10" defaultValue={internalState.content}></textarea>
        <button type="submit" className="custom-btn green-btn">Actualizar</button>
        </form>
        <p>{props.successMessage}</p>
      </section>
    </article>
  );
}

export default UpdatePostModal;