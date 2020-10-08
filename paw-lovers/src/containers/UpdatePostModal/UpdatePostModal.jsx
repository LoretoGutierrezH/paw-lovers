import React, { useState, useEffect, useRef } from 'react';
import style from './UpdatePostModal.module.css';

const UpdatePostModal = (props) => {
  const closeModal = () => {
    props.setModalState({
      modalState: false
    })
  }

  return (
    <article className={props.modalState.modalState === true ? `${style.modalWrapper} ${style.active}` : `${style.modalWrapper} ${style.inactive}`}>
      <p className={style.closeModalBtn} onClick={() => closeModal()}>&times;</p>
      <section className={style.modalContent}>
        <form id={props.modalState.id} onSubmit={(event) => {event.preventDefault(); props.clicked(event); closeModal();}}>
        <input name="post-title" type="text" defaultValue={props.modalState.title} />
        <textarea name="post-content" id="" cols="30" rows="10" defaultValue={props.modalState.content}></textarea>
        {console.log('dentro del return', props.modalState.id, props.modalState.title, props.modalState.content)}
        <button className="custom-btn green-btn">Actualizar</button>
        </form>
        <p>{props.successMessage}</p>
      </section>
    </article>
  );
}

export default UpdatePostModal;