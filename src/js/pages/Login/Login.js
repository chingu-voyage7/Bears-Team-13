import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameOrEmail: String,
      password: String,
      redirect: false
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    alert(JSON.stringify(this.state));
    axios.post('/api/login', {
      username: this.state.usernameOrEmail,
      password: this.state.password
    })
    .then((res) => {
      this.setState({redirect: true});
    })
    .catch((err) => {
      alert(JSON.stringify(err.response));
    })
  }

  render() {
    if (this.state.redirect) {
      this.setState({redirect: false});
      return <Redirect to="/"/>
    }

    return(
      <div>
        <h1>Login</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Username or Email</label>
          <input 
            name="usernameOrEmail"
            type="text"
            onChange={this.handleChange.bind(this)}/>
          <label>Password</label>
          <input 
            name="password"
            type="password"
            onChange={this.handleChange.bind(this)}/>
          <input 
            type="submit"
          />
          <p>If time, we'll add G+/FB/TW Authorization later.</p>
        </form>
      </div>
    );
  }
}