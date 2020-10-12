const firebaseTranslate = (message) => {
  switch (message) {
    case "The password is invalid or the user does not have a password.":
      return "La contraseña no es válida o el usuario no tiene una contraseña.";
      break;
    case "There is no user record corresponding to this identifier. The user may have been deleted.":
      return "No existen registros asociados con este correo electrónico, puede que el usuario haya sido eliminado.";
      break;
    case "The email address is already in use by another account.":
      return "Este correo electrónico ya está asociado a una cuenta de Paw Lovers.";
      break;
    case "Password should be at least 6 characters":
      return "La contraseña debe tener 6 caracteres como mínimo";
      break;
    case "The email address is badly formatted.":
      return "El correo tiene un formato no permitido";
      break;
    default: {
      return message;
    }
  }
}

export default firebaseTranslate;