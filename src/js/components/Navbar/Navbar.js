import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

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
      <nav>
        <h2>Secret Santa</h2>
        {this.props.globals.user?(
          <div>
            <Link to="#" onClick={this.toggleLogout.bind(this)}>Logout</Link>
            <Link to="/myaccount">My Account</Link>
          </div>
        ):(
          <div>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </div>
        )}
      </nav>
    );
  }
}