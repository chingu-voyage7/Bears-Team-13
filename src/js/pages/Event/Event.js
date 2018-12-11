import React, { Component } from 'react';
import axios from 'axios';

export default class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event_id: props.match.params.event_id,
      message: "Loading event...",
      event: {},
      inviteBody: {},
    }
  }

  componentDidMount() {
    axios.get('/api/event?event_id=' + this.state.event_id)
    .then((res) => {
      this.setState({message: ""}, () => {
        this.setState({event: res.data});
      });
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 404) {
          this.setState({message: "404 Event Not found."});
        } else {
          this.setState({message: err.response.data});
        }
      }
    });
  }

  handleChange(e) {
    let temp = this.state.inviteBody;
    temp[e.target.name] = e.target.value;
    this.setState({inviteBody: temp});
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

  render() {
    return (
    <div>
      {this.state.message}<br/>
      {JSON.stringify(this.state.event)}
      <h2>Invite a friend to this event</h2>
      <form onSubmit={this.sendInvite.bind(this)}>
        <label>Friend's email</label>
        <input name="email" type="email" onChange={this.handleChange.bind(this)}/><br/>
        <input type="submit"/>
      </form>
    </div>);
  }
}