import React, { Component } from 'react';
import axios from 'axios';

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


  render () {
    return (
    <form onSubmit={this.handleSubmit.bind(this)}>
      <label>Event Name</label><br/>
      <input name="name" required onChange={this.handleChange.bind(this)}/><br/>
      <label>Start Date</label><br/>
      <small>Start date of your 2-week gift exchange. New members will not be able to join after this date.</small>
      <br/><input name="startDate" type="date" onChange={this.handleChange.bind(this)}/><br/>
      <label>Public?</label>
      <input name="public" type="checkbox" onChange={this.handleChange.bind(this)}/><br/>
      <input type="submit"/>
    </form>);
  }
}