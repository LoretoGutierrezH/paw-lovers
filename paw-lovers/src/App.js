import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './components/Navbar/NavBar.jsx';
import AuthModal from './containers/AuthModal/AuthModal.jsx';
import NewPost from './containers/NewPost/NewPost.jsx';
import Posts from './containers/Posts/Posts.jsx';
import Footer from './components/Footer/Footer.jsx';
import style from './App.module.css';
import { connect } from 'react-redux';


const App = (props) => {
  console.log('APP.jsx', props.authModal);
  return (
    <Router>
      <NavBar />
      <AuthModal />
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
      <button>REGISTRARSE</button>

      <div>
        
      </div>
      <Footer />
    </Router>
   
  );
}

const mapStateToProps = (state) => {
  return {
    authModal: state.authModal
  }
}

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps)(App);
