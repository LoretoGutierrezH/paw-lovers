import React from 'react';
import style from './Error404.module.css';
import { Links } from 'react-router-dom';

const Error404 = (props) => {
  return (
    <main className={style.errorTemplate}>
      <h1>ERR0R 404</h1>
      <p>Si ves esta pantalla es porque intentaste realizar una acción no permitida, como actualizar o eliminar una publicación de otro usuario o crear una nueva publicación sin estar conectado. Te invitamos a registrarte para interactuar con otros usuarios</p>
      <Link to="/inicio">Volver a la página principal</Link>
    </main>
  );
}

export default Error404;