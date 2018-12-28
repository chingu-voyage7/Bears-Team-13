import React, { Component } from 'react'
import axios from 'axios'
export default class Item extends Component {
  constructor() {
    super();
    this.state = {
      item: [],
      recipients: [],
      selectedRecipient: ""
    }
  }

  fetchItem() {
    const { item_id } = this.props.match.params

    console.log(item_id)

    axios
      .get(`/api/item?item_id=${item_id}`)
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
        const recipients = res.data.filter( recipient => recipient !== null )
        this.setState({
          recipients
        });
      })
      .catch(err => console.log(err.response))
  }

  handleChange = (e) => {
    this.setState({selectedRecipient: e.target.value})
    console.log('changed')
  }

  addToCart = (e) => {
    e.preventDefault()
    const { item_id } = this.props.match.params
    const { selectedRecipient: recipient_id } = this.state;

    axios.post('/api/mycart/add', { item_id, recipient_id })
      .then( res => console.log(res.data) )
      .catch( err => console.log(err.response))
  }

  componentDidMount() {
    this.fetchItem()
    this.fetchRecipients()
  }

  render() {
    const {
      item,
      recipients,
      selectedRecipient
    } = this.state

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
          <select value={selectedRecipient} onChange={this.handleChange}>
            <option>
              Select a recipient
            </option>
            {
              recipients.map(recipient => {
                return (
                  <option
                    value={recipient._id}
                    key={recipient._id}>
                    {recipient.username}
                  </option>
                )
              })
            }
          </select>
          <input type="submit" value="Add to cart" />
        </form>
      </section>;
  }
}