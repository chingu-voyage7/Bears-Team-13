import React, { Component } from 'react';
import axios from 'axios';
import {InvitesContainer, Text, EventName, ButtonWrap, OneInviteWrap, AcceptButton} from './invites-style.js'
import {Button} from "../MyAccount/myAccount-style";


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
        <OneInviteWrap key={"i-"+ i}>
          <EventName>{invite.name}</EventName>
          <ButtonWrap>
            <AcceptButton onClick={() => {this.acceptInvite(invite._id); }}>Accept</AcceptButton>
            <Button onClick={() => {this.rejectInvite(invite._id); }}>Reject</Button>
          </ButtonWrap>
  
        </OneInviteWrap>
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
      <InvitesContainer>
        <Text>{this.state.message}</Text>
        {this.invitesToJSX()}
      </InvitesContainer>
    );
  }
}