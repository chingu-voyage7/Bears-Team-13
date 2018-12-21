import React, { Component } from 'react';
import axios from 'axios';
import { Input, CloseButton} from '../../components/PopUp/popup-style'
// import {Label} from '../Login/login-style';
import {Submit, MakeEventWrap, PublicWrap, PublicLabel, CheckBox, Form, Label} from './createEvent-style';


export default class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: {}
    }
  }

  handleChange(e) {
    let updates = this.state.event;
    if (e.target.name === "public") {
      updates.public = e.target.value==="on"?true:false;
    } else {
      updates[e.target.name] = e.target.value;
    }
    this.setState({event: updates});
  }

  handleSubmit(e) {
    e.preventDefault();

    alert(JSON.stringify(this.state.event));
    
    axios.post('/api/addevent', this.state.event)
    .then((res) => {
      alert("Success! ");
    })
    .catch((err) => {
      alert(JSON.stringify(err.response));
    });
  }

  closeEventPopUp = (e) => {
    const { history } = this.props

    history.push(`/myevents/`);
    console.log("close event clicked");

  }


  render () {
    return (
      <MakeEventWrap>
      
        <Form onSubmit={this.handleSubmit.bind(this)}>
       
          <CloseButton onClick={this.closeEventPopUp}> x </CloseButton>
          <h2> Create Event </h2>
          <Label>Event Name</Label><br/>
          <Input name="name" required onChange={this.handleChange.bind(this)}/><br/>
          <Label>Draw Date</Label><br/>
          <small>Date that members are assigned a Secret Santa. <b>New members will NOT be able to join after this date.</b></small><br/>
          <Input name="startDate" type="date" onChange={this.handleChange.bind(this)}/>
          <Label>Gift Exchange Date</Label><br/>
          <small>We recommend scheduling your Gift Exchange 2 to 4 weeks after the Draw Date.</small><br/>
          <Input name="endDate" type="date" onChange={this.handleChange.bind(this)}/>
          <PublicWrap>
             <PublicLabel>Public?</PublicLabel>
             <CheckBox name="public" type="checkbox" onChange={this.handleChange.bind(this)}/><br/>
          </PublicWrap>
          <Submit type="submit" />
        </Form>
    </MakeEventWrap>
    );
  }
}