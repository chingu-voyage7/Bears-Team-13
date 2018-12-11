import React, { Component } from 'react';
import axios from 'axios';

export default class Invites extends Component {
  constructor(props) {
    super (props);

    this.state = {
      invites: Array,
      message: "Loading your invites..."
    }
  }

  componentDidMount() {
    this.getInvites(() => {

    });
  }

  invitesToJSX() {
    return <div><p>Inna's design GOOO! :wizard-dance:</p>{JSON.stringify(this.state.invites)}</div>;
  }

  getInvites(cb) {
    axios.get('/api/myinvites')
    .then((res) => {
      this.setState({message: ""});
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
      //alert(JSON.stringify(err.response));
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