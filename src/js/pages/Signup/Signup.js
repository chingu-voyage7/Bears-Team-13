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
    e.preventDefault();
    axios.post('/api/adduser', this.state.user)
    .then((res) => {
      alert(res.data);
    })
    .catch((err) => {
      alert(err.response);
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
            type="text"/>
          <label>Email</label>
          <input 
            name="email" 
            type="text"/>
          <label>Username</label>
          <input 
            name="username"
            type="text"/>
          <label>Password</label>
          <input 
            name="password"
            type="password"/>
          <input type="submit"/>
          <p>If time, we'll add Google/FB/Twitter Auth.</p>
        </form> 
      </div>
    );
  }
}