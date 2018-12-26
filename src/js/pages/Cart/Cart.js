import React, { Component } from 'react'
import axios from 'axios'

export default class Cart extends Component {
  constructor() {
    super()

    this.state = {
      cartItems: [],
      recipients: [],
      selectedRecipient: ""
    }
  }

  fetchCartItems() {
    axios.get('/api/mycart')
      .then( res => {
        this.setState({cartItems: res.data})
        console.log(res.data)
      })
      .catch(err => console.log(err.response))
  }

  fetchRecipients() {
    axios.get('/api/myrecipients')
      .then(res => {
        const recipients = res.data.filter(recipient => recipient !== null)
        this.setState({
          recipients
        })
        console.log(recipients)
      })
      .catch(err => console.log(err.response))
  }

  onDelete = (e, itemId) => {
    e.preventDefault()

    axios.delete('/api/mycart/delete', {itemId})
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response))
    console.log(itemId)
  }

  componentDidMount() {
    this.fetchCartItems()
    this.fetchRecipients()
  }

  render() {
    const {
      cartItems,
      recipients,
      selectedRecipient
    } = this.state

    return (
      <section>
        <h1>Carrito</h1>
        { /*Headers*/ }
        <div>
          <div>
            Price
          </div>
          <div>
            Quantity
          </div>
        </div>
        { /* List items */}
        <div>
          {
            cartItems.map( cartItem => {
              return (
                <article key={cartItem._id}>
                  <img src="" alt="item" />
                  <div>
                    <h3>{cartItem.name}</h3>
                    <span>${cartItem.usd}</span>
                    <select>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>

                    {/* Recipients  */}
                    <select
                      value={this.selectedRecipient}
                      onChange={(e) => this.setState({selectedRecipient: e.target.value})}>
                      <option>Select recipient</option>
                      {
                        recipients.map(recipient => {
                          return (
                            <option value={recipient._id} key={recipient._id}>john</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <button onClick={(e) => this.onDelete(e, cartItem._id)}>Delete</button>
                </article>
              )
            })
          }
        </div>
        <button>Proceed to checkout</button>
      </section>
    )
  }
}