import React, { Component } from 'react'
import moment from "moment";

import axios from 'axios';

import {Name, Greeting, Button, } from "../MyAccount/myAccount-style";
import {DashboardWrap, EventsWrap, ButtonWrap,EventName, OneEventWrap,Span, P, AuthorSpan} from './dashboard-style';



const Event = ({event, handleEventClick}) => {
  return (
    <OneEventWrap
      onClick={handleEventClick}>
      <EventName>{event.name}</EventName>
    
    
          <P>starts on: <Span> {moment(event.startDate).format("dddd, MM/DD/YY")}</Span></P>

        <P>author:  <AuthorSpan> {event.author[1]}</AuthorSpan></P>
      
    </OneEventWrap>
  )
}

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      loader: false
    }
  }

  handleEventClick(eventId) {
    const { history } = this.props

    history.push(`/dashboard/${eventId}`)
  }

  componentDidMount() {
    this.setState({
      loader: true
    })
    axios.get('/api/myevents')
      .then(res => {
        console.log(res.data)
        this.setState({
          events: res.data,
          loader: false
        })
      })
      .catch(err => console.log(err.response))
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
          <Greeting> <Name>{user.firstName}</Name>'s events</Greeting>
          <ButtonWrap>
            <Button>Create Event</Button>
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