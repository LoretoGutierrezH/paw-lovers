import React, { useState, useEffect } from 'react';
import style from './UpdatePostModal.module.css';

const UpdatePostModal = (props) => {
  const [postState, setPostState] = useState({});
 

  useEffect(() => {
     const id = props.modalState.id;
     const oldTitle = props.modalState.title;
     const oldContent = props.modalState.content;
    setPostState({
      id,
      oldTitle,
      oldContent
    })
  }, [props.modalState.modalState]);
  console.log(postState);
  return (
    <article className={props.modalState.modalState === true ? `${style.modalWrapper} ${style.active}` : `${style.modalWrapper} ${style.inactive}`}>
      <p className={style.closeModalBtn} onClick={() => props.closeModal()}>&times;</p>
      <section className={style.modalContent}>
        <form id={postState.id} onSubmit={(event) => {event.preventDefault(); props.clicked(event);}}>
        <input name="post-title" type="text" defaultValue={postState.oldTitle} />
        <textarea name="post-content" id="" cols="30" rows="10" defaultValue={postState.oldContent}></textarea>
        <button className="custom-btn green-btn">Actualizar</button>
        </form>
      </section>
    </article>
  );
}

export default UpdatePostModal;