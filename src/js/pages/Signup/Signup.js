import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import {InputStyle, FormContainer, SignupContainer, TextSignup, GraphicContainer, LabelSignUp, InputSubmit} from "./signup-style";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      redirectTo: String,
      user: {
        firstName: String,
        email: String,
        username: String,
        password: String
      }
    }
  }

  componentDidMount() {
    this.setState({redirectTo: queryString.parse(this.props.location.search).redirect});
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
      this.setState({redirect: true});
    })
    .catch((err) => {
    })
  }

  render() {
    if (this.state.redirect && this.state.redirectTo && this.state.redirectTo.length > 0) {
      this.setState({redirect: false});
      return <Redirect to={this.state.redirectTo}/>;
    }

    return(
      <SignupContainer>
        <TextSignup>CHRISTMAS JOY IS JUST A FEW QUESTIONS AWAY</TextSignup>
       <GraphicContainer> Santa graphic goes here</GraphicContainer>
        <FormContainer onSubmit={this.onSubmit.bind(this)}>
          <LabelSignUp>First Name</LabelSignUp>
          <InputStyle 
            name="firstName"
            type="text"
            onChange={this.handleChange.bind(this)}/>
         
          <LabelSignUp>Last Name</LabelSignUp>
          <InputStyle 
            name="lastName"
            type="text"
            onChange={this.handleChange.bind(this)}/>
         
          <LabelSignUp>Street Address</LabelSignUp>
          <InputStyle 
            name="streetAddress"
            type="text"
            onChange={this.handleChange.bind(this)}/>

           <LabelSignUp>Apt #</LabelSignUp>
           <InputStyle 
            name="apt"
            type="text"
            onChange={this.handleChange.bind(this)}/>  

          <LabelSignUp>City</LabelSignUp>
          <InputStyle 
            name="city"
            type="text"
            onChange={this.handleChange.bind(this)}/>

         <LabelSignUp>State</LabelSignUp>
          <InputStyle 
            name="state"
            type="text"
            onChange={this.handleChange.bind(this)}/>

          <LabelSignUp>Zip Code</LabelSignUp>
          <InputStyle 
            name="zipCode"
            type="text"
            onChange={this.handleChange.bind(this)}/>
         
          <LabelSignUp>Email</LabelSignUp>
          <InputStyle
            name="email" 
            type="text"
            onChange={this.handleChange.bind(this)}/>
         
          <LabelSignUp>Username</LabelSignUp>
          <InputStyle
            name="username"
            type="text"
            onChange={this.handleChange.bind(this)}/>
          
          <LabelSignUp>Password</LabelSignUp>
          <InputStyle
            name="password"
            type="password"
            onChange={this.handleChange.bind(this)}/>
            
          <InputSubmit type="submit"/>
          {/* <p>If time, we'll add Google/FB/Twitter Auth.</p> */}
        </FormContainer> 
      </SignupContainer>
    );
  }
}