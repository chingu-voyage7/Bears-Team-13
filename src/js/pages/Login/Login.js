import React, {Component} from 'react';
import axios from 'axios';
import queryString from 'query-string';
import {LoginContainer, Form, Input, Submit, Label } from './login-style'

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameOrEmail: String,
      password: String
    }
  }
  
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    axios.post('/api/login', {
      username: this.state.usernameOrEmail,
      password: this.state.password
    })
    .then((res) => {
      this.props.setGlobal({user: res.data}, () => {
        const history = this.props.history;
        const redirect = queryString.parse(this.props.location.search).redirect;
        if (redirect) {
          history.push(redirect);
        } else {
          history.push("/myevents");
        }
      });
    })
    .catch((err) => {
      alert(err.response.status);
    });
  }

  render() {

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