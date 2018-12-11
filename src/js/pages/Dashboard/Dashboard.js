import React, { Component } from 'react'
import axios from 'axios'

const Event = ({event, handleEventClick}) => {
  return (
    <article
      onClick={handleEventClick}>
      <h3>{event.name}</h3>
      <div>
        <div>
          Event start at <span>{event.startDate}</span>
        </div>
        <span>author</span>
      </div>
    </article>
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
      <main>
        <section>
          <article>
            <img src="" alt="bg-img"/>
            <div>
              <button>Create</button>
              <button>Shop</button>
            </div>
          </article>
        </section>
        <section>
          <h2>Events</h2>
          {
            loader
              ? 'Loading...'
              : userEvents
          }
        </section>
      </main>
    )
  }
}