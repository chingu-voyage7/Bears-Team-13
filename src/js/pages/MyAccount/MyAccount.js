import React, { Component } from 'react';
import axios from 'axios'

export default class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      updates: {}
    }
  }

  componentDidMount() {
    this.onFetchUser();
  }

  onFetchUser() {

    axios.get('/api/getuser?username=nevi11')
    .then(res => {
        const { firstName, username } = res.data
        const fetchedUser = {
          ...this.state.user,
          firstName,
          username
        }

        this.setState({
          user: fetchedUser
        })
      })
      .catch(err => {
        console.log('error');
      })
  }

  handleChange = (e) => {
    let userEdit = { ...this.state.updates, };
    const { name, value } = e.target;

    userEdit[name] = value;

    this.setState({
      updates: userEdit
    });
  }

  onUpdateGeneral = (e) => {
    e.preventDefault();

    let updates = {
      updates: this.state.updates
    }

    const { password, ...general } = this.state.updates

    const hasPassword = updates.updates.hasOwnProperty('password')

    if (hasPassword && e.target.name == 'updatePassword') {
      updates.updates = !!password
        ? { password }
        : {}
    } else if (hasPassword && e.target.name == "updateGeneral") {
      updates.updates = {
        ...general
      }
    }

    axios.put('/api/edituser', {updates} )
      .then(res => {
        alert('User edited');
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  render() {
    const { user } = this.state

    return (
      <section>
        <article>
          <h3>General Information</h3>
          <div>
            <div>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                defaultValue={user.firstName}
                onChange={this.handleChange}/>
            </div>
            <div>
              <label>Username</label>
              <input
                type="text"
                name="username"
                defaultValue={user.username}
                onChange={this.handleChange}/>
            </div>
            <div>
              <label>Email</label>
              <input
                type="text"
                name="email"
                defaultValue="nvi74@gmail.com"
                onChange={this.handleChange}/>
            </div>
            <button
              onClick={this.onUpdateGeneral}
              name="updateGeneral"
              >Update Information</button>
          </div>
        </article>
        <article>
          <h3>Security Information</h3>
          <div>
            <div>
              <label>Old password</label>
              <input type="password"/>
            </div>
            <div>
              <label>New password</label>
              <input
                name="password"
                type="password"
                onChange={this.handleChange}/>
            </div>
            <div>
              <label>Confirm new password</label>
              <input
                type="password"
                name="confirmPassword"/>
            </div>
            <button
              onClick={this.onUpdateGeneral}
              name="updatePassword">
              Update password
            </button>
          </div>
        </article>
      </section>
    );
  }
}
