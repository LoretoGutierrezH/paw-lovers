import React, { useState } from 'react';
import style from './ConfirmationModal.module.css';
import firebase from '../../Firebase';
const db = firebase.firestore();
const auth = firebase.auth();

const ConfirmationModal = (props) => {
    const [actionMessage, setActionMessage] = useState("");
    const closeModal = () => {
        props.setConfirmationState({ modalState: false })
    }

    const deletePost = () => {
        db.collection("Posts")
            .doc(`${props.confirmationState.postId}`)
            .delete()
            .then(() => {
                setActionMessage("Publicación eliminada correctamente.");
                setTimeout(() => {
                    setActionMessage("");
                    props.setConfirmationState({modalState: false});
                }, 1000);
            })
            .catch((error) => {
                setActionMessage(error.message);
            })
    }

    return (
        <article className={props.confirmationState.modalState ? `${style.modalWrapper} ${style.active}` : `${style.modalWrapper} ${style.inactive}`}>
            <p className={style.closeModalBtn} onClick={() => closeModal()}>&times;</p>
            <section className={style.modal}>
                <section className={style.modalContent}>
                    <h5>¿Estás seguro de que quieres eliminar esta publicación?</h5>
                    <div className={style.actionController}>
                        <button onClick={() => deletePost()} className="custom-btn warning-btn">Eliminar</button>
                        <button onClick={() => closeModal()} className="custom-btn green-btn">Cancelar</button>
                    </div>
                    <p className={style.actionMessage}>{actionMessage}</p>
                </section>
            </section>
        </article>
    );
}

export default ConfirmationModal;