import React, {Component} from 'react';
import { Redirect} from 'react-router-dom';
import axios from 'axios';
import {LoginContainer, Form, Input, Submit, Label } from './login-style'

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
    // alert(JSON.stringify(this.state));
    axios.post('/api/login', {
      username: this.state.usernameOrEmail,
      password: this.state.password
    })
    .then((res) => {
      // alert("USER set:\n" + JSON.stringify(res.data));
      this.props.setGlobal({user: res.data});
      this.setState({redirect: true});
    })
    .catch((err) => {
      // alert(JSON.stringify(err.response));
    })
  }

  render() {
    if (this.state.redirect) {
      this.setState({redirect: false});
      return <Redirect to="/"/>
    }

    return(
      <LoginContainer>
        <Form onSubmit={this.onSubmit.bind(this)}>
          <Label>Username or Email</Label>
          <Input 
            name="usernameOrEmail"
            type="text"
            onChange={this.handleChange.bind(this)}/>
          <Label>Password</Label>
          <Input 
            name="password"
            type="password"
            onChange={this.handleChange.bind(this)}/>
          <Submit
            type="submit"
          />
        </Form>
      </LoginContainer>
    );
  }
}