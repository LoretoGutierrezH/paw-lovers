import React from 'react';
import style from './UpdatePostModal.module.css';

const UpdatePostModal = (props) => {
  let oldTitle = 'Título anterior';
  let oldContent = 'Contenido anterior';
  if (props.modalDataState.length > 0) {
    console.log('HAY DATA');
    oldTitle = props.modalDataState['0'].title;
    oldContent = props.modalDataState['0'].content;
    console.log(oldTitle, oldContent);
  }
  return (
    <article className={props.modalState === true ? `${style.modalWrapper} ${style.active}` : `${style.modalWrapper} ${style.inactive}`}>
      <p className={style.closeModalBtn} onClick={() => props.closeModal()}>&times;</p>
      <section className={style.modalContent}>
        <form action="">
        <input name="post-title" type="text" defaultValue={oldTitle}/>
        <textarea name="post-content" id="" cols="30" rows="10" defaultValue={oldContent}></textarea>
        <button className="custom-btn green-btn">Actualizar</button>
        </form>
      </section>
    </article>
  );
}

export default UpdatePostModal;