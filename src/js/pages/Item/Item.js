import React, { Component } from 'react'
import axios from 'axios'
export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      item_id: this.props.match.params.item_id,
      events: [],
      selected: ""
    }
  }

  componentDidMount() {
    this.fetchItem();
    this.fetchRecipients();
  }

  fetchItem() {
    axios.get(`/api/item?item_id=${this.state.item_id}`)
      .then(res => {
        this.setState({
          item: res.data
        })
      })
      .catch(err => console.log(err.response));
  }

  fetchRecipients() {
    axios.get('/api/myrecipients')
      .then(res => {
        this.setState({events: res.data});
      })
      .catch(err => console.log(err.response))
  }

  addToCart = (e) => {
    e.preventDefault()
    const { selected } = this.state;

    console.log("EVENT_ID: " + selected);

    axios.post('/api/mycart/update', { item_id: this.state.item_id, event_id: selected })
      .then( res => console.log(res.data) )
      .catch( err => console.log(err.response))
  }

  handleChange = (e) => {
    this.setState({selected: e.target.value})
    console.log('changed')
  }

  render() {
    const { item, selected, events } = this.state;

    return <section>
        <article>
          <div>
            <h2>{item.name}</h2>
            <span>${item.usd}</span>
          </div>
          <div>
            <img src="" alt="Item" />
          </div>
        </article>

        <form onSubmit={this.addToCart}>
          <select value={selected} onChange={this.handleChange}>
            <option>
              Select a recipient
            </option>
            { events.map((event) => {
              console.log(JSON.stringify(event));
                return (
                  <option
                    value={event._id}
                    key={event._id}>
                    {event.recipient.username + '@"' + event.name + '"'}
                  </option> 
                  );
              })}
          </select>
          <input type="submit" value="Add to cart" />
        </form>
      </section>;
  }
}