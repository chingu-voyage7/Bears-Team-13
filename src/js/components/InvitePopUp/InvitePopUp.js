import React, { Component } from 'react';
import axios from 'axios';
import {CloseButton, Input} from '../PopUp/popup-style'
import {Submit, InvitePopUpWrap, Form, Title, Label} from './invitePopup-style'





export default class InvitePopUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event_id: this.props.eventId,
      inviteBody: {},
    }
  }

  sendInvite(e) {
    e.preventDefault();

    axios.post('/api/invite', {
      event_id: this.state.event_id,
      email: this.state.inviteBody.email
    })
    .then((res) => {
      alert("Message sent!");
    })
    .catch((err) => {
      alert(err.response.data);
    })
  }

  handleChange(e) {
    let temp = this.state.inviteBody;
    temp[e.target.name] = e.target.value;
    this.setState({inviteBody: temp});
  }


  render() {
    
    return (
    <InvitePopUpWrap>
          <CloseButton onClick={this.props.closePopUp}> X </CloseButton>

     <Title>Invite a friend to this event</Title>
      <Form onSubmit={this.sendInvite.bind(this)}>
        <Label>Friend's email</Label>
        <Input name="email" type="email" onChange={this.handleChange.bind(this)}/><br/>
        <Submit type="submit"/>
      </Form> 
    </InvitePopUpWrap>
    )
  }
}