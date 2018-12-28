import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import moment from "moment";

import axios from 'axios';

import {Name, Greeting, Button,} from "../MyAccount/myAccount-style";
import {DashboardWrap, EventsWrap, ButtonWrap,EventName, OneEventWrap,Span, P, AuthorSpan} from './dashboard-style';



const Event = ({event, handleEventClick}) => {
  return (
    <OneEventWrap
      onClick={handleEventClick}>
      <EventName>{event.name}</EventName>
    
    
          <P>draw date: <Span> {moment(event.startDate).format("dddd, MM/DD/YY")}</Span></P>
          <P>exchange date: <Span> {moment(event.endDate).format("dddd, MM/DD/YY")}</Span></P>

        <P>author:  <AuthorSpan> {event.author[1]}</AuthorSpan></P>
      
    </OneEventWrap>
  )
}

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      loader: false,
      createEventClicked: false,
      invites: [],

    }
  }

  handleEventClick(eventId) {
    const { history } = this.props;

    history.push(`/event/${eventId}`);
  }

  componentDidMount() {
    this.getInvites();

    this.setState({
      loader: true
    })
    axios.get('/api/myevents')
      .then(res => {
        // console.log(res.data)
        this.setState({
          events: res.data,
          loader: false
        })
      })
      .catch(err => console.log(err.response))
  }

  openEventPopUp = (e) => {
    const { history } = this.props

    history.push(`/myevents/create`);
    console.log("create event clicked");
    if(this.state.passwordPopUpShown === false){
      this.setState({
          createEventClicked: true
      })
     } 
  }

  getInvites(cb) {
    axios.get('/api/myinvites')
    .then((res) => {
      if (res.data.length === 0) {
        this.setState({invites: []});
      }
      this.setState({invites: res.data});
      console.log(this.state.invites)
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
    const { events, loader } = this.state
    const { user } = this.props.globals
    let userEvents

    if (events.length > 0) {
      userEvents = events.map(event => {
        return(
          <Event
            event={event}
            key={event._id}
            handleEventClick={() => this.handleEventClick(event._id)}>
          </Event>
        )
      })
    } else {
      userEvents = `You don't have any events yet`;
    }

    return (
      <DashboardWrap>
          <Greeting> <Name>{user.username}</Name>'s events</Greeting>
          <ButtonWrap>
            <Button onClick={this.openEventPopUp}>Create Event</Button>
            <Link to="/myevents/invites"> <Button>My Invites ({this.state.invites.length})</Button></Link> 
          </ButtonWrap>


          <EventsWrap>
            {/* <img src="" alt="bg-img"/> */}
              
          {
            loader
              ? 'Loading...'
              : userEvents
          }
          </EventsWrap>
  
      </DashboardWrap>
    )
  }
}