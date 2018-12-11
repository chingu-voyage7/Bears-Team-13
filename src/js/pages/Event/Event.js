import React, { Component } from 'react';
import axios from 'axios';

export default class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event_id: props.match.params.event_id,
      message: "Loading event...",
      event: {}
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


  render() {
    return (
    <div>
      {this.state.message}<br/>
      {JSON.stringify(this.state.event)}
    </div>);
  }
}