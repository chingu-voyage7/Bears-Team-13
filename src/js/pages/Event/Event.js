import React, { Component } from 'react';
import axios from 'axios';
import { OneEventWrap, EventTitle, Time, TimeSpan,RecipientName,ButtonWrap, ExchangDate, TitleEditWrap , CountdownWrap, EditPopUp, Form, PublicWrap, Checkbox, PublicLabel} from './event-style';
import {Button} from '../MyAccount/myAccount-style';
import {CloseButton, Input} from '../../components/PopUp/popup-style'
import {Submit,   Label} from '../../components/InvitePopUp/invitePopup-style'


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
      purchase: {},
      inviteBody: {},
      editEvent: {},
      inviteClicked:false,
      countdown: "",
      editClicked:false,
    }
  }

  componentDidMount() {
    this.getEvent();
    this.getPurchasedItems();
  }

  isAuthor() {
    if (this.props.globals.user._id && this.state.event.author) {
      if (this.props.globals.user._id === this.state.event.author._id) {
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
          this.getMembers();
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

  getMembers() {
    axios.get('/api/eventmembers?event_id='+this.state.event_id+"&username=1&firstName=1")
    .then((res) => {
      this.setState({members: res.data});
    })
    .catch((err) => {
      alert(err.response.status);
    });
  }

  getPurchasedItems() {
    axios.get("/api/mypurchases")
    .then((res) => {
      const purchases = res.data;
      if (purchases[this.state.event_id]) {
        axios.get("/api/item?item_id=" + purchases[this.state.event_id])
        .then((res) => {
          alert("hit");
          this.setState({purchase: res.data});
        })
        .catch((err) => {
          console.log(err);
        });  
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  membersToJSX() {
    if (this.state.members) {
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

  purchaseToJSX() {
    if (!this.state.purchase.name) {
      return "";
    }
    let item = this.state.purchase;
    return (
      <div>
        <b>{item.name}</b>
        <img src={"/api/static/images/item." + item._id} alt={item.name}></img>
      </div>
    );
  }

  startEvent() {
    axios.post('/api/startevent', {event_id: this.state.event_id})
    .then((res) => {
      alert("Event Started!");
    })
    .catch((err) => {
      alert(err.response.status);
    });
  }

  handleInviteClick = () => {
  if(!this.state.inviteClicked){
    this.setState({
      inviteClicked: true
    })
    }
  }

  handleEditClick = () => {
    if(!this.state.editClicked){
      this.setState({
        editClicked: true
      })
     }

  }

  closePopUp = ()  => {
    if(this.state.inviteClicked === true || this.state.editClicked){
        this.setState({
            inviteClicked: false,
            editClicked:false
        })
    }
  }

  render() {
    console.log("Rendering...");
    return (
      <OneEventWrap>
        {this.state.message}<br />
          <TitleEditWrap>
            <EventTitle>{this.state.event ? this.state.event.name : ""}</EventTitle>
            { this.isAuthor() ? <Button onClick={this.handleEditClick}> edit </Button> : "" }
          </TitleEditWrap>
        <Time>
          Draw Date : 
          <TimeSpan>
            { this.state.event
                ? moment(this.state.event.startDate).format("dddd, MM/DD/YY")
                : ""
            }
          </TimeSpan>
          <ExchangDate>
            Exchange Date : 
            <TimeSpan>
              { this.state.event
                  ? moment(this.state.event.endDate).format("dddd, MM/DD/YY")
                  : ""
              }
            </TimeSpan>
          </ExchangDate>
        </Time>

        {this.state.event && this.state.event.startDate?(
          <RecipientName> 
            <Display event={this.state.event}/>
          </RecipientName>
        ):""}

        {this.purchaseToJSX()}

        <ButtonWrap>
          <div className="dropdown">
            <button className="dropbtn">Members</button>
            <div className="dropdown-content">
              {this.membersToJSX()}
            </div>
          </div>

          <Button onClick={this.handleInviteClick}> invite friend </Button>
        </ButtonWrap>

        {
          this.state.inviteClicked
            ? <InvitePopUp closePopUp={this.closePopUp} eventId={this.state.event_id}></InvitePopUp>
            : ""
        }
        { this.state.editClicked ? (
          <EditPopUp>
            <CloseButton onClick={this.closePopUp}> X </CloseButton>
          <Form onSubmit={this.editEvent.bind(this)}>
            <Label>Event name</Label><br/>
            <Input name="name" type="text" placeholder={this.state.event.name} value={this.state.editEvent.name} onChange={this.handleEdit.bind(this)}/><br/>
            <Label>Public</Label><br/>
            <Input name="public" type="checkbox" checked={this.state.editEvent.public} onChange={this.handleEdit.bind(this)}/><br/>
            <Submit type="submit"/>
          </Form>
          </EditPopUp>
          ):""
          
        }


            <Button onClick={this.handleInviteClick}> invite friend </Button>
          </ButtonWrap>

          {
            this.state.inviteClicked
              ? <InvitePopUp closePopUp={this.closePopUp} eventId={this.state.event_id}></InvitePopUp>
              : ""
          }
          { this.state.editClicked ? (
            <EditPopUp>
              <CloseButton onClick={this.closePopUp}> X </CloseButton>
            <Form onSubmit={this.editEvent.bind(this)}>
              <Label>Event name</Label>
              <Input name="name" type="text" placeholder={this.state.event.name} value={this.state.editEvent.name} onChange={this.handleEdit.bind(this)}/>
              <PublicWrap>
                 <PublicLabel>Public</PublicLabel>
                 <Checkbox name="public" type="checkbox" checked={this.state.editEvent.public} onChange={this.handleEdit.bind(this)}/>
              </PublicWrap>
              
              <Submit type="submit"/>
            </Form>
            </EditPopUp>
            ):""
            
          }

          {
            this.state.inviteClicked
              ? <InvitePopUp closePopUp={this.closePopUp} eventId={this.state.event_id}></InvitePopUp>
              : ""
          }

      
        </OneEventWrap>
      </>
    );
  }
}

class Display extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: this.props.event,
      goal: "",
      now: new Date(),
      difference: 0
    }
  }

  componentWillMount() {
    console.log(JSON.stringify(this.state.event));
    if (this.state.event) {
      var compiled = this.state.event;
      compiled.endDate = new Date(compiled.endDate);
      compiled.startDate = new Date(compiled.startDate);

      console.log(JSON.stringify(compiled.endDate));
      console.log(JSON.stringify(compiled.startDate));

      // Set compiled event
      this.setState({event: compiled}, () => {
        // Set "goal"
        this.setGoal(() => {
          // Start Timer
          this.handleTimer();
        });
      });
    }
  }

  setGoal(cb) {
    const now = this.state.now;
    const { endDate, startDate } = this.state.event;
    if (this.props.event) {
      if (now.getTime() < startDate.getTime()) {
        this.setState({goal: startDate}, cb);
      } else if (now.getTime() < endDate.getTime()) {
        this.setState({goal: endDate}, cb);
      } else {
        this.setState({goal: ""}, cb);
      }
    }
  }

  handleTimer() {
    if (!this.state.goal || !this.state.goal.getTime()) {
      return;
    }
    
    const tic = () => {
      this.setState({now: new Date()}, () => {
        let {now, goal} = this.state;

        if (now.getTime() <= goal.getTime()) {

          this.setState({difference: goal.getTime() - now.getTime()});
          window.setTimeout(tic, 1000);
        }
      });
    }
    tic();
  }

  countdownToJSX(text) {
    if (this.state.difference <= 0) {
      return "";
    }
    const date = new Date(this.state.difference);
    let days = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    return (
      <div>
        <CountdownWrap>
          <p>{text}</p>
          {days}:{hours}:{minutes}:{seconds}
        </CountdownWrap>
      </div>
    );
  }

  render() {
    const { endDate, startDate } = this.state.event;
    const now = this.state.now;

    if (this.state.event) {
      if (now.getTime() < startDate.getTime()) {
        return (
          <div>
            {this.countdownToJSX("Discover Countdown:")}
            <p>Discover your Secret Santa on {moment(startDate).format("dddd, MM/DD/YY")} :)</p>
          </div>
        );
      } else if (now.getTime() < endDate.getTime()) {
        return (
          <div>
            {this.countdownToJSX("Exchange Countdown:")}
            <p>You are {this.state.event.recipient?this.state.event.recipient.username:"Undefined"}'s Secret Santa.</p>
          </div>
        );
      } else {
        return "Event Ended! Gifts have been sent! This event will expire in 1 week. :)";
      }
    } else {
      return "404 Event not found.";
    }
  }
}