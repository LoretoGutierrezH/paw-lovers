import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Posts from './containers/Posts/Posts.jsx';
import NavBar from './components/Navbar/NavBar.jsx';
import Footer from './components/Footer/Footer.jsx';
import style from './App.module.css';
const App = () => {
  return (
    <Router>
      <NavBar />
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

export default App;
