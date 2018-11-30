import React, { Component } from 'react';
import axios from 'axios'

export default class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: String,
        email: String,
        username: String,
        password: String,
      },
    }
  }

  componentDidMount() {
    this.onFetchUser();
  }

  onFetchUser() {

    axios.get('/api/getuser?username=nevi')
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
    let userEdit = { ...this.state.user, };
    const { name, value } = e.target;

    userEdit[name] = value;

    this.setState({
      user: userEdit
    });
  }

  onUpdateGeneral = (e) => {
    const updates = {...this.state.user};

    e.preventDefault();

    axios.put('/api/edituser', {updates})
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
                name="firsName"
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
            <button onClick={this.onUpdateGeneral}>Update Information</button>
          </div>
        </article>
        <article>
          <h3>Security Information</h3>
          <div>
            <div>
              <label>Old password</label>
              <input type="text"/>
            </div>
            <div>
              <label>New password</label>
              <input type="text"/>
            </div>
            <div>
              <label>Confirm new password</label>
              <input type="text"/>
            </div>
            <button>Update password</button>
          </div>
        </article>
      </section>
    );
  }
}
