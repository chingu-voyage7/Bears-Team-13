import React, { Component } from 'react'
import axios from 'axios'

export default class Cart extends Component {
  constructor() {
    super()

    this.state = {
      cart: [],
      recipients: [],
    }
  }

  componentDidMount() { 
    this.fetchRecipients(() => {
      this.fetchCart();
    });
  }

  fetchCart() {
    axios.get('/api/mycart')
      .then( res => {
        if (Object.keys(res.data).length > 0) {
          this.setState({cart: res.data});
        }
      })
      .catch(err => console.log(err.response))
  }

  fetchRecipients(cb) {
    axios.get('/api/myrecipients')
      .then( res => {
        this.setState({recipients: res.data}, cb);
      })
      .catch(err => console.log(err.response));
  }

  getUsername(recipient_id) {
    let username = null;
    this.state.recipients.forEach((recipient) => {
      if (recipient._id === recipient_id) {
        username = recipient.username;
        return;
      }
    });
    return username;
  }

  onChangeRecipient(item, old_id, new_id) {
    const cart = this.state.cart;
    cart.map((itemRecipientPair, i ) => {
      if (itemRecipientPair[0]._id === item._id) {
        cart[i][1][cart[i][1].indexOf(old_id)] = new_id;
      }
    });
    this.setState({cart: cart});
  }

  onDelete = (e, item_id) => {
    e.preventDefault()

    axios.delete('/api/mycart/delete', {data: {item_id}})
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response))
    console.log(item_id)
  }

  render() {
    const {
      cart,
      recipients
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
            cart.map((item, i) => {
              return item[1].map((recipient_id) => {
                return (
                  <article key={item[0]._id}>
                    <img src="" alt="item" />
                    <div>
                      <h3>{item[0].name}</h3>
                      <span>${item[0].usd}</span>
                      <p></p>
  
                      {/* Recipients  */}
                      <select
                        value={recipient_id}
                        onChange={(e) => this.onChangeRecipient(item[0], recipient_id, e.target.value)}>
                        <option>Select Recipient</option>
                        {
                          recipients.map(recipient => {
                            return (
                              <option value={recipient._id} key={recipient._id}>{recipient.username}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <button onClick={(e) => this.onDelete(e, item[0]._id)}>Delete</button>
                  </article>
                );
              });

            })
          }
        </div>
        <button>Proceed to checkout</button>
      </section>
    )
  }
}