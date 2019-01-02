import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Navbar from '../Navbar/Navbar.js';
import {MainContainer, SpaceBottom, SpaceTop} from './app-style';
import Footer from '../Footer/Footer.js';
import './app.css';
import './normalize.css';
import axios from 'axios';

const ROUTES = require('./routes.js').ROUTES;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    axios.get('/api/myuser')
    .then((res) => {
      this.setState({user: res.data});
    })
    .catch((err) => {
      console.log(err);
    });
  }

  setGlobal(object, callback) {
    this.setState(object, callback);
  }

  render() {
    return (
      <Router>
        <MainContainer>
          <Navbar globals={this.state} setGlobal={this.setGlobal.bind(this)}/>
          <SpaceTop></SpaceTop>
          <Switch>
            {ROUTES.map(({path, component: C, exact, auth}) => {

              // Handle rendering "auth" (private) or !auth routes (public)
              const render = (props) => {
                if (auth) {
                  if (this.state.user._id) {
                    return <C {...props} setGlobal={this.setGlobal.bind(this)} globals={this.state}/>;
                  } else {
                  return <Redirect to={"/login?redirect=" + props.location.pathname}/>;
                  }
                }
                return <C {...props} setGlobal={this.setGlobal.bind(this)} globals={this.state}/>;
              };

              // Handle "exact routes"
              if (exact) {
                return (
                  <Route
                    key={path}
                    path={path}
                    render={render}
                    exact
                  />);
              } else {
                return (
                  <Route
                    key={path}
                    path={path}
                    render={render}
                  />);
              }
            })}
          </Switch>
          <SpaceBottom></SpaceBottom>
          <Footer></Footer>

        </MainContainer>
      </Router>
    );
  }
}

export default App;