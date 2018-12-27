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
        alert(res.data);
        this.setState({cartItems: res.data});
        this.setState({recipients: res.data.map((itemRecipient => {
          return itemRecipient[1];
        }))});
      })
      .catch(err => console.log(err.response))
  }

  onDelete = (e, item_id) => {
    e.preventDefault()

    axios.delete('/api/mycart/delete', {data: {item_id}})
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response))
    console.log(item_id)
  }

  componentDidMount() {
    this.fetchCartItems();
  }

  render() {
    const {
      cartItems,
      recipients,
      selectedRecipient
    } = this.state;

    return (
      <section>
        <h1>My Cart</h1>
        { /*Headers*/ }
        <div>
          <div>
            Price
          </div>
        </div>
        { /* List items */}
        <div>
          {
            cartItems.map( itemRecipient => {
              return (
                <article key={itemRecipient[0]._id}>
                  <img src="" alt="item" />
                  <div>
                    <h3>{itemRecipient[0].name}</h3>
                    <span>${itemRecipient[0].usd}</span>

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
                  <button onClick={(e) => this.onDelete(e, itemRecipient[0]._id)}>Delete</button>
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