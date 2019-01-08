import React, { Component } from 'react';
import axios from 'axios';
import { OneEventWrap, EventTitle, Time, TimeSpan,RecipientName,ButtonWrap, ExchangDate, TitleEditWrap , CountdownWrap, EditPopUp, Form} from './event-style';
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

  onDeleteEvent = () => {
    const { event_id } = this.state
    const { history } = this.props

    axios.delete('/api/deleteevent', { data: {event_id: event_id} })
      .then(res => {
        history.push('/myevents')
        alert('Event event_id deleted')
      })
      .catch(err => console.log(err.response))

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
          const start = new Date(this.state.event.startDate);
          const end = new Date(this.state.event.endDate);
          const now = new Date();
          if (now.getTime() < start.getTime()) {
            this.setState({countdown: <Countdown title={"Draw Date Countdown:"} goal={new Date(res.data.startDate)}/>})
          } else if (now.getTime() < end.getTime()) {
            this.setState({countdown: <Countdown title={"Gift Exchange Countdown:"} goal={new Date(res.data.endDate)}/>});
          }
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

  recipientToJSX() {
    if (this.state.event) {
      if (this.state.event.endDate) {
        const endDate = new Date(this.state.event.endDate);
        if (endDate.getTime() < Date.now()) {
          endDate.setDate(endDate.getDate() + 7);
          return "Your gift has been sent! :) This event will expire on " + moment(endDate).format("dddd, MM/DD/YY");
        }
      }
      if (this.state.recipient) {
        let user = this.state.event.recipient.username;
        user = user[0].toUpperCase() + user.substring(1);
        return "You are " + user + "'s Secret Santa!";
      }
    }
    return (
      <div>
        <CountdownWrap>{this.state.countdown}</CountdownWrap>
        <p>
          Discover your Secret Santa on {moment(this.state.event.startDate).format("dddd, MM/DD/YY")} :)
        </p>

      </div>
    );
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
    const { purchasedItems, event } = this.state
    const { globals } = this.props
    return (
      <>
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

          <RecipientName>
            {this.recipientToJSX()}
          </RecipientName>

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
            this.isAuthor() &&
              <Button onClick={this.onDeleteEvent}>Delete Event</Button>
          }

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

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goal: this.props.goal,
      now: new Date(),
      difference: 0
    }
  }

  componentDidMount() {
    if (this.state.goal) {
      this.handleTimer();
    }
  }

  handleTimer() {
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

  countdownToJSX() {
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
        {/* <p>{this.props.title}</p> */}
        {days}:{hours}:{minutes}:{seconds}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.countdownToJSX()}
      </div>
    );
  }
}