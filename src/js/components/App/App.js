import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Navbar from '../Navbar/Navbar.js';

const ROUTES = [{
  path: '/',
  component: require('../../pages/Index/Index.js').default,
  exact: true
}, {
  path: '/signup',
  component: require('../../pages/Signup/Signup.js').default,
  exact: true
}, {
  path: '/login',
  component: require('../../pages/Login/Login.js').default,
  exact: true
}];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined
    };
  }

  setGlobal(object, callback) {
    this.setState(object, callback);
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar globals={this.state} setGlobal={this.setGlobal.bind(this)}/> 
          {ROUTES.map(({path, component: C, exact}) => {
            if (exact) {
              return (
                <Route
                  key={path}
                  path={path}
                  render={(props) => <C {...props} setGlobal={this.setGlobal.bind(this)} globals={this.state}/>}
                  exact 
                />);
            } else {
              return ( 
                <Route
                  key={path}
                  path={path}
                  render={(props) => <C {...props} setGlobal={this.setGlobal.bind(this)} globals={this.state}/>}
                />);
            }
          })}
        </div> 
      </Router>
    );
  }
}

export default App;