import React, {Component} from 'react';
import {Form, Input, InputsContainer, CloseButton, Submit} from './popup-style'
import {Label} from '../../pages/Login/login-style';
import axios from 'axios';


export default class PasswordPopUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updates: {},
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
    // this.props.closePopUp();

    let updates = this.state.updates;

   // Delete the property that is empty
     Object.entries(updates).forEach( ([key, val]) => {
      if (!val) delete updates[key];
    });

     const { password, ...general } = updates;

    if (e.target.name === 'updatePassword') {
      updates = { password }
    } else if (e.target.name === "updateGeneral") {
      updates = { ...general }
    }

    axios.put('/api/edituser', updates )
      .then(res => {
        alert('User edited');
      })
      .catch(err => {
        console.log(err.response)
      })
    }

    
     // onSubmitClick = (e) => {
      //   e.preventDefault();
      //   this.onUpdateGeneral();
      //   this.props.closePopUp();
      // }
      
      render(){
        return( 
         <Form >
          <CloseButton onClick={this.props.closePopUp}> X </CloseButton>
          {/* ternary operator to check which form to load */}
           {this.props.whichButtonClicked === "password" ? 
           <InputsContainer>
              <Label>Old password</Label>
              <Input type="password"/>
       
     
              <Label>New password</Label>
              <Input
                name="password"
                type="password"
                onChange={this.handleChange}/>
        
      
              <Label>Confirm new password</Label>
              <Input
                type="password"
                name="confirmPassword"/>
         
            <Submit
              onClick={this.onUpdateGeneral}
              name="updatePassword">
              Update password
            </Submit>
        </InputsContainer> :
        <InputsContainer>
       
        <Label>First Name</Label>
        <Input
          type="text"
          name="firstName"
          defaultValue={this.props.user.firstName}
          onChange={this.handleChange}/>


        <Label>Username</Label>
        <Input
          type="text"
          name="username"
          defaultValue={this.props.user.username}
          onChange={this.handleChange}/>
 

        <Label>Email</Label>
        <Input
          type="text"
          name="email"
          defaultValue={this.props.user.email}
          onChange={this.handleChange}/>
   
      <Submit
        onClick={this.onUpdateGeneral}
        name="updateGeneral"
        >Update Information
      </Submit>
       </InputsContainer>}
      </Form>
        )
    
      }
    }

