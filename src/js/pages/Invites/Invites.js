import React, { Component } from 'react';
import axios from 'axios';

export default class Invites extends Component {
  constructor(props) {
    super (props);

    this.state = {
      invites: [],
      message: "Loading your invites..."
    }
  }

  componentDidMount() {
    this.getInvites();
  }

  invitesToJSX() {
    if (!this.state.invites || !this.state.invites.length) {
      return <div></div>;
    }

    return <div>{this.state.invites.map((invite, i) => {
      console.log(JSON.stringify(invite));
      return (
        <div key={"i-"+ i}>
          <h1>{invite.name}</h1>
          <button onClick={() => {this.acceptInvite(invite._id); }}>Accept</button>
          <button onClick={() => {this.rejectInvite(invite._id); }}>Reject</button>
        </div>
      );
    })}</div>;
  }

  acceptInvite(event_id) {
    axios.post("/api/acceptinvite", {event_id})
    .then((res) => {
      this.getInvites();
    })
    .catch((err) => {
      alert("Accept invite failed");
    });
  }

  rejectInvite(event_id) {
    axios.delete("/api/rejectinvite", {data: {event_id}})
    .then((res) => {
      this.getInvites();
    })
    .catch((err) => {
      alert("Reject invite failed");
    });
  }

  getInvites(cb) {
    axios.get('/api/myinvites')
    .then((res) => {
      if (res.data.length === 0) {
        this.setState({message: "No invites found."});
      } else {
        this.setState({message: ""});
      }
      this.setState({invites: res.data});
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 404) {
          this.setState({message: "You do not have any invites."});
        } else {
          this.setState({message: "Error \"" + err.response.status + ": " + err.response.statusText + "\". Please reload the page."});
        }  
      }
    })
  }

  render() {
    return (
      <div>
        {this.state.message}
        {this.invitesToJSX()}
      </div>
    );
  }
}