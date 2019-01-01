import React, { Component } from 'react';
import {Name, MyAccountWrap, NameButtonsWrap, ButtonsWrap, Button, Greeting,  AboutWrap, H2, P, Span, Image, InfoWrap, UserImage, ImageInfoWrap} from "./myAccount-style";
import PasswordPopUp from "../../components/PopUp/PopUp";
import axios from 'axios';

export default class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordPopUpShown:false,
      whichButtonClicked: "password",
      selectedFile: null,
      loaded: 0
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

  setSelectedFile(e) {
    this.setState({selectedFile: e.target.files[0], loaded: 0});
  }

  uploadFile(e) {
    e.preventDefault();

    if (!this.props.globals || !this.props.globals.user || !this.props.globals.user._id) {
      alert("Error uploading image. Please refresh and try again.");
    }

    const data = new FormData();
    const file = this.state.selectedFile;
    data.append('file', file, "user." + this.props.globals.user._id);
    data.append('contentType', file.name.split('.').pop())

    axios.post('/api/static/images/', data, {
      /*onUploadProgress: (e) => {
        this.setState({loaded: e.loaded / e.total * 100});
      }*/
    })
    .then((res) => {
      alert(res.status);
    })
    .catch((err) => {
      alert(err.response.status);
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
              {/* <Button> make event </Button> */}
              <Button onClick={this.openInfoPopUp} id="editProfile"> edit profile </Button>
              <Button  onClick={this.openPasswordPopUp} id="editPassword"> change password </Button>
            </ButtonsWrap>
          </NameButtonsWrap>

          <AboutWrap>
         
                <H2> your info </H2>
              

              <ImageInfoWrap>
                  <UserImage src={"/api/static/images/user." + this.props.globals.user._id} alt="no pic"/>
                    
                  <InfoWrap>
                      <P> <Span>name :</Span> {user.firstName}</P>
                      <P> <Span>email : </Span>{user.email} </P>
                      <P> <Span>username : </Span>{user.username} </P>
                      
                  </InfoWrap>
              </ImageInfoWrap>
              <form onSubmit={this.uploadFile.bind(this)}>
                    <input name="" type="file" onChange={this.setSelectedFile.bind(this)}/>
                    <input type="submit"/>
                  </form>
              {/* <Image></Image> */}
          </AboutWrap>

       {this.state.passwordPopUpShown ? <PasswordPopUp user={user} whichButtonClicked={this.state.whichButtonClicked} closePopUp={this.closePopUp}   /> : <div></div> }
      </MyAccountWrap>
      );
  }
}
