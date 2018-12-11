import React, { Component } from 'react';
import {Name, MyAccountWrap, NameButtonsWrap, ButtonsWrap, Button, Greeting,  AboutWrap, H2, P, Span, Image, InfoWrap} from "./myAccount-style";
import PasswordPopUp from "../../components/PopUp/PopUp";

export default class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordPopUpShown:false,
      whichButtonClicked: "password"
    }
  }

  openPasswordPopUp = (e) => {
    if(this.state.passwordPopUpShown === false){
      this.setState({
          passwordPopUpShown: true,
          whichButtonClicked:"password"
      })
     } 
  }


  openInfoPopUp = (e) => {
    if(this.state.passwordPopUpShown === false){
      this.setState({
          passwordPopUpShown: true,
          whichButtonClicked:"info"
      })
     } 
  }

  closePasswordPopUp = ()  => {
    if(this.state.passwordPopUpShown === true){
        this.setState({
            commentPopUpShown: false,
            whichButtonClicked:""
        })
    }
}

  render() {
    const { user } = this.props.globals
    console.log(user);
    return (
      
      <MyAccountWrap>
          <NameButtonsWrap>
            <Greeting> Hello, <Name>{user.firstName}</Name></Greeting>
            <ButtonsWrap>
              {/* <Button> make event </Button> */}
              <Button onClick={this.openInfoPopUp} id="editProfile"> edit profile </Button>
              <Button  onClick={this.openPasswordPopUp} id="editPassword"> change password </Button>
            </ButtonsWrap>
          </NameButtonsWrap>

          <AboutWrap>
         
                <H2> your info </H2>
                <InfoWrap>
                <P> <Span>name :</Span> {user.firstName}</P>
                <P> <Span>email : </Span>{user.email} </P>
                <P> <Span>username : </Span>{user.username} </P>
              </InfoWrap>
              <Image></Image>
          </AboutWrap>

       {this.state.passwordPopUpShown ? <PasswordPopUp user={user} whichButtonClicked={this.state.whichButtonClicked} closePopUp={this.closePopUp}   /> : <div></div> }
      </MyAccountWrap>
      );
  }
}
