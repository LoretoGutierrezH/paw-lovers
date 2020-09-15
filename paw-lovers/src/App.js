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
import * as firebase from "firebase";

// Firebase config
var firebaseConfig = {
  apiKey: "AIzaSyA8PUJL2pZj7Vy0602V22CkvLmgyRwCnYY",
  authDomain: "paw-lovers-2.firebaseapp.com",
  databaseURL: "https://paw-lovers-2.firebaseio.com",
  projectId: "paw-lovers-2",
  storageBucket: "paw-lovers-2.appspot.com",
  messagingSenderId: "443458945688",
  appId: "1:443458945688:web:f229528639de085d3446ed",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
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
      <AuthModal signIn={signInHandler} signUp={signUpHandler}/>
      <Switch>
        <Route path="/" component={Posts} exact />
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
