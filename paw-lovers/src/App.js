import React, { useState }from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import NavBar from './components/Navbar/NavBar.jsx';
import AuthModal from './containers/AuthModal/AuthModal.jsx';
import NewPost from './containers/NewPost/NewPost.jsx';
import ControlPanel from './containers/ControlPanel/ControlPanel.jsx';
import Posts from './containers/Posts/Posts.jsx';
import Footer from './components/Footer/Footer.jsx';
import Error404 from './components/Error404/Error404.jsx';
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
      props.onAuthenticate(true);
      setTimeout(() => {
        props.onActivateModal();
      }, 2000);
    })
    .catch(error => console.log(error));
  }

  const signUpHandler = (event) => {
    const userName = event.target['user_name'].value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    auth.createUserWithEmailAndPassword(`${email}`, `${password}`)
    .then(credentials => {
      credentials.user.updateProfile({
        displayName: userName
      });
      /* db.collection('users').doc(credentials.user.uid).set({
        userName
      }) */
      console.log(`Se acaba de registrar un nuevo usuario con correo ${credentials}`);
      props.onAuthenticate(true);
      setTimeout(() => {
        props.onActivateModal();
      }, 2000);
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
      props.onAuthenticate(true, auth.currentUser.displayName, auth.currentUser.uid, auth.currentUser.email);
    } else {
      props.onAuthenticate(false);
    }
  })

  return (
    <Router>
      <NavBar signOut={signOutHandler} />
      <AuthModal signInGoogle={singInGoogle} signIn={signInHandler} signUp={signUpHandler}/>
      <Switch> 
        {window.location.pathname === "/" ? <Redirect to="/inicio"></Redirect> : null}
        <Route path="/panel-de-control" component={ControlPanel}>
          {!props.authenticated ? <Redirect to="/404"></Redirect> : console.log('AUTENTICADO')}
        </Route>
        <Route path="/404" component={Error404} exact/>

        <Route path="/:category/nueva-publicación" component={NewPost}>
          {!props.authenticated ? <Redirect to="/404"></Redirect> : null}
        </Route>
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
    onAuthenticate: (authValue, userName, userId, userEmail) => dispatch({type: actionTypes.AUTHENTICATE, value: authValue,  userName, userId, userEmail}),
    onActivateModal: () => dispatch({type: actionTypes.ACTIVATE})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
