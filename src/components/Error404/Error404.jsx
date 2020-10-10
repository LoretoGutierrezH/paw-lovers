import React from 'react';
import style from './Error404.module.css';
import { Link } from 'react-router-dom';
import PawImage from '../../assets/Paw.png';

const Error404 = (props) => {
  return (
    <main className={style.errorTemplate}>
      <article className={style.errorMessage}>
        <h1>ERROR 404</h1>
        <div className={style.pawContainer}>
          <img src={PawImage} alt="Patita de perro, uno de los íconos de Paw Lovers"/>
        </div>
        <p>
          Si ves esta pantalla es porque intentaste realizar una acción no
          permitida, como actualizar o eliminar una publicación de otro usuario
          o crear una nueva publicación sin estar conectado. 
          Te invitamos a
          registrarte para interactuar con otros usuarios.
        </p>
        <Link to="/inicio">Volver a la página principal</Link>
      </article>
    </main>
  );
}

export default Error404;