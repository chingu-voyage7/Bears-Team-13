import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Navbar from '../Navbar/Navbar.js';
import {MainContainer, SpaceBottom, SpaceTop} from './app-style';
import Footer from '../Footer/Footer.js';
import './app.css';
import './normalize.css';
import axios from 'axios';
import { connect } from 'mongoose';

const ROUTES = require('./routes.js').ROUTES;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      done: false
    };
  }

  componentWillMount() {
    axios.get('/api/myuser')
    .then((res) => {
      this.setState({user: res.data, done: true});
    })
    .catch((err) => {
      this.setState({done: true});
      console.log(err);
    });
  }

  getRoutes() {
    // Set each route
    return ROUTES.map(({path, component: C, exact, auth}) => {

      // Handle Auth/Non-Auth routes
      const render = auth?(props) => {
        if (this.state.user._id) {
          return <C {...props} setGlobal={this.setGlobal.bind(this)} globals={this.state}/>;
        }
        return <Redirect to={"/login?redirect=" + props.location.pathname}/>;  

      // Non-Auth routes
      }:(props) => {
        return <C {...props} setGlobal={this.setGlobal.bind(this)} globals={this.state}/>;
      };

      // Handle exact routes
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
    });
  }

  setGlobal(object, callback) {
    this.setState(object, callback);
  }

  render() {
    if (!this.state.done) {
      return (
        <MainContainer>
          <SpaceTop></SpaceTop>
          <b>Loading...</b>
          <SpaceBottom></SpaceBottom>
          <Footer></Footer>
        </MainContainer>
      );
    } else {
      return (
        <Router>
          <MainContainer>
            <Navbar globals={this.state} setGlobal={this.setGlobal.bind(this)}/>
            <SpaceTop></SpaceTop>
            <Switch>
              {this.getRoutes()}
            </Switch>
            <SpaceBottom></SpaceBottom>
            <Footer></Footer>
  
          </MainContainer>
        </Router>
      );
    }
  }
}

export default App;