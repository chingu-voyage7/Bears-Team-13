import React, { Component } from 'react'
import axios from 'axios'

export default class Cart extends Component {
  constructor() {
    super()

    this.state = {
      cartItems: [],
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

  componentDidMount() {
    this.fetchCartItems()
  }

  render() {
    const { cartItems } = this.state

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
                  <img src="" alt="item image" />
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
                  </div>
                </article>
              )
            })
          }
        </div>
      </section>
    )
  }
}