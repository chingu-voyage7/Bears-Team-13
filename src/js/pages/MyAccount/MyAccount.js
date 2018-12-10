import React, { Component } from 'react';
import axios from 'axios'

export default class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updates: {}
    }
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

    let updates = this.state.updates;

    Object.entries(updates).forEach( ([key, val]) => {
      if (!val || val === "") delete updates[key];
    });

    axios.put('/api/edituser', {updates} )
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  render() {
    const { user } = this.props.globals

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
                defaultValue={user.email}
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
