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
        console.log(res.data)
      })
      .catch(err => console.log(err.response))
  }

  componentDidMount() {
    this.fetchCartItems()
  }

  render() {
    return (
      <section>
        <h1>Carrito</h1>
        { /*Headers*/ }
        <div>
          <div>
            Precio
          </div>
          <div>
            Cantidad
          </div>
        </div>
        { /* List items */}
        <div>
          <article>
            <img src="" alt="item image" />
            <div>
              <h3>Nombre Articulo</h3>
              <span>$233.99</span>
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
        </div>
      </section>
    )
  }
}