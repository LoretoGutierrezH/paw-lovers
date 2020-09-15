import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './components/Navbar/NavBar.jsx';
import AuthModal from './containers/AuthModal/AuthModal.jsx';
import NewPost from './containers/NewPost/NewPost.jsx';
import Posts from './containers/Posts/Posts.jsx';
import Footer from './components/Footer/Footer.jsx';
import style from './App.module.css';
import { connect } from 'react-redux';
import * as actionTypes from './store/authActions';
import firebase from './Firebase';

const db = firebase.firestore();
const auth = firebase.auth();

const App = (props) => {

  // Basic authentication
  const signInHandler = (event) => {
    const email = event.target.email.value;
    const password = event.target.password.value;
    auth.signInWithEmailAndPassword(`${email}`, `${password}`)
    .then(credentials => {
      console.log(auth.currentUser.email);
      props.onAuthenticate(true);
      setTimeout(() => {
        props.onActivateModal();
      }, 3000);
    })
    .catch(error => console.log(error));
  }

  const signUpHandler = (event) => {
    const email = event.target.email.value;
    const password = event.target.password.value;
    auth.createUserWithEmailAndPassword(`${email}`, `${password}`)
    .then(credentials => {
      console.log(`Se acaba de registrar un nuevo usuario con correo ${credentials}`);
      props.onAuthenticate(true);
      setTimeout(() => {
        props.onActivateModal();
      }, 3000);
    })
    .catch(error => console.log(error))
  }

  const signOutHandler = () => {
    auth.signOut();
    props.onAuthenticate(false);
    console.log('Sesión cerrada', auth.currentUser);
  }

  // Gmail authentication
  const singInGoogle = async () => {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
        props.onAuthenticate(true);
        setTimeout(() => {
          props.onActivateModal();
        }, 3000);
        console.log('Sesión iniciada con Google correctamente');
      } catch (error) {
        console.log(error);
      }
  };

  // Authentication observer
  auth.onAuthStateChanged(user => {
    if (user !== null) {
      props.onAuthenticate(true);
      console.log(`Usuario actual: ${user.email}`)
    } else {
      props.onAuthenticate(false);
    }
  })

  return (
    <Router>
      <NavBar signOut={signOutHandler} />
      <AuthModal signInGoogle={singInGoogle} signIn={signInHandler} signUp={signUpHandler}/>
      <Switch>
        <Route path="/:category/nueva-publicación" component={NewPost}/>
        <Route path="/:category" component={Posts} />
        {/* <Route path="/tips" component={Posts} />
        <Route path="/cuidados-40tena" component={Posts} />
        <Route path="/adopción" component={Posts} />
        <Route path="/servicios" component={Posts} />
        <Route path="/concurso" component={Posts} />
        <Route path="/panel-de-control" component={Posts} /> */}
      </Switch>

      <div>
        
      </div>
      <Footer />
    </Router>
   
  );
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    authModal: state.authModal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticate: (authValue) => dispatch({type: actionTypes.AUTHENTICATE, value: authValue}),
    onActivateModal: () => dispatch({type: actionTypes.ACTIVATE})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
