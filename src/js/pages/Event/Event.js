import React, { Component } from 'react';
import axios from 'axios';
import {OneEventWrap, EventTitle, Time, TimeSpan, RecipientName, ButtonWrap} from './event-style';
import {Button} from '../MyAccount/myAccount-style';
import InvitePopUp from '../../components/InvitePopUp/InvitePopUp'

import moment from "moment";
import "./members.css"


export default class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event_id: props.match.params.event_id,
      message: "Loading event...",
      event: {},
      members: [],
      inviteBody: {},
      editEvent: {},
      inviteClicked:false
    }
  }

  componentDidMount() {
    this.getEvent();
  }

  isAuthor() {
    if (this.props.globals.user._id && this.state.event.author) {
      if (this.props.globals.user._id === this.state.event.author[0]) {
        return true;
      }
    }
    return false;
  }

  editEvent(e) {
    e.preventDefault();
    let edits = this.state.editEvent;
    edits.event_id = this.state.event_id;
    axios.put('/api/editevent', edits)
    .then((res) => {
      alert("EDITED");
      this.getEvent();
    })
    .catch((err) => {
      alert("ERR: " + err.response.status);
    });
  }

  handleEdit(e) {
    let temp = this.state.editEvent;
    temp[e.target.name] = e.target.type === 'checkbox'? e.target.checked: e.target.value;
    this.setState({editEvent: temp});
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

  getEvent() {
    axios.get('/api/event?event_id=' + this.state.event_id)
    .then((res) => {
      this.setState({message: ""}, () => {
        this.setState({event: res.data}, () => {
          this.getMembers(res.data._id);
        });
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

  getMembers(event_id) {
    axios.get('/api/eventmembers?event_id='+event_id+"&username=1&firstName=1")
    .then((res) => {
      this.setState({members: res.data});
    })
    .catch((err) => {
      alert(err.response.status);
    });
  }

  membersToJSX() {
    if (this.state.members) {
      console.log(this.state.members)
      return this.state.members.map((member, i) => {
        return (
          <div  key={"m-"+i}>
            <p>{member.firstName  + "@" +  member.username}</p>
          </div>
        );
      });
    } else {
      return "";
    }
  }


handleInviteClick = () => {
 if(!this.state.inviteClicked){
   this.setState({
     inviteClicked: true
   })
  }
 }

 closePopUp = ()  => {
  if(this.state.inviteClicked === true){
      this.setState({
          inviteClicked: false,
      })
  }
}

  render() {
    
    return (
    <OneEventWrap>
      {this.state.message}<br/>

      <EventTitle>{this.state.event?this.state.event.name:""}</EventTitle>
      <Time> Exchange Date : <TimeSpan>{this.state.event?moment(this.state.event.startDate).format("dddd, MM/DD/YY"):""}</TimeSpan></Time>
      <RecipientName> recipient's name coming soon </RecipientName>
     
      

       <ButtonWrap>
         <div className="dropdown">
           <button className="dropbtn">Members</button>
           <div className="dropdown-content">
           {this.membersToJSX()}
           </div>
         </div>

        <Button onClick={this.handleInviteClick}> invite friend </Button>
       </ButtonWrap>

       
      {this.state.inviteClicked ? <InvitePopUp closePopUp={this.closePopUp} eventId={this.state.event_id}></InvitePopUp> : ""}
      {/* {this.isAuthor()?(
        <form onSubmit={this.editEvent.bind(this)}>
          <label>Event name</label><br/>
          <input name="name" type="text" placeholder={this.state.event.name} value={this.state.editEvent.name} onChange={this.handleEdit.bind(this)}/><br/>
          <label>Public</label><br/>
          <input name="public" type="checkbox" checked={this.state.editEvent.public} onChange={this.handleEdit.bind(this)}/><br/>
          <input type="submit"/>
        </form>
      ):""} */}
    </OneEventWrap>);
  }
}