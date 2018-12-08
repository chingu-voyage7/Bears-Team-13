import React, { Component } from 'react';
import axios from 'axios'
import {Name, MyAccountWrap, NameButtonsWrap, ButtonsWrap, Button, Greeting, PasswordButton, AboutWrap} from "./myAccount-style";

export default class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
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

    let updates = {
      updates: this.state.updates
    }

    // Delete the property that is empty
    Object.entries(updates.updates).forEach( ([key, val]) => {
      if (!val) delete updates.updates[key]
    })

    const { password, ...general } = this.state.updates

    if (e.target.name === 'updatePassword') {
      updates.updates = { password }
    } else if (e.target.name === "updateGeneral") {
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
    const { user } = this.props.globals
    console.log(user);
    return (
      
      <MyAccountWrap>
          <NameButtonsWrap>
            <Greeting> Hello, <Name>{user.firstName}</Name></Greeting>
            <ButtonsWrap>
              <Button> make event </Button>
              <Button> edit profile </Button>
            </ButtonsWrap>
          </NameButtonsWrap>

          <AboutWrap>
            <h2> About </h2>
            <p> name : {user.firstName}</p>
            <p> email : {user.email} </p>
            <p> username : {user.username} </p>
    
            <PasswordButton> change password </PasswordButton>
          </AboutWrap>
         
          {/* <div>
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
      */}
      </MyAccountWrap>
    );
  }
}
