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
      alert("Success! This is @inna comes in. We could make this page a popup. We also need to redirect to /dashboard/:event_id after success.");
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
          <Label>Start Date</Label><br/>
          <small>Start date of your 2-week gift exchange. New members will not be able to join after this date.</small>
          <br/><Input name="startDate" type="date" onChange={this.handleChange.bind(this)}/><br/>
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