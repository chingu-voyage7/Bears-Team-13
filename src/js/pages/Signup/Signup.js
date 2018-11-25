import React, {Component} from 'react';
import axios from 'axios';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: String,
        email: String,
        username: String,
        password: String
      }
    }
  }

  handleChange(e) {
    var newUser = this.state.user;
    newUser[e.target.name] = e.target.value;
    this.setState({user: newUser});
  }

  onSubmit(e) {
    alert(JSON.stringify(this.state.user));
    e.preventDefault();
    axios.post('/api/adduser', this.state.user)
    .then((res) => {
      alert("Account created!");
    })
    .catch((err) => {
      alert(JSON.stringify(err.response));
    })
  }

  render() {
    return(
      <div>
        <h1>Signup Today</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>First Name</label>
          <input 
            name="firstName"
            type="text"
            onChange={this.handleChange.bind(this)}/>
          <label>Email</label>
          <input 
            name="email" 
            type="text"
            onChange={this.handleChange.bind(this)}/>
          <label>Username</label>
          <input 
            name="username"
            type="text"
            onChange={this.handleChange.bind(this)}/>
          <label>Password</label>
          <input 
            name="password"
            type="password"
            onChange={this.handleChange.bind(this)}/>
          <input type="submit"/>
          <p>If time, we'll add Google/FB/Twitter Auth.</p>
        </form> 
      </div>
    );
  }
}