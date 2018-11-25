import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Nav, AppName} from './nav-style'


export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    }
  }

  toggleLogout() {
    const other = !this.state.logout;
    this.setState({logout: other});
  }

  render() {
    if (this.state.redirect) {
      this.setState({redirect: false});
      return (<Redirect to="/"/>)
    }

    return (
      <Nav>
        <AppName>Secret Santa</AppName>
        {this.props.globals.user?(
          <div>
            <Link to="#" onClick={this.toggleLogout.bind(this)}>Logout</Link>
          </div>
        ):(
          <div>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </div>
        )}
      </Nav>
    );
  }
}