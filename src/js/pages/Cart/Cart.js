import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [], // [{event, item}]
      recipients: {} // {event_id: new_event_id}
    }
  }

  componentDidMount() { 
    this.fetchCart();
  }

  fetchCart() {
    axios.get('/api/mycart')
      .then( res => {
        if (Object.keys(res.data).length > 0) {
          this.setState({cart: res.data});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateCart(event_id, item_id) {
    axios.post("/api/mycart/update", {event_id, item_id})
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response);
    });
  }

  // Removes {event, item} from cart
  removeItem(e) {

  }

  // Handles swapping recipients
  swapRecipientHandler(e) {
    let selected = this.state.selected;
  }

  cartToJSX() {
    console.log(JSON.stringify(this.state.selected));
    let jsx = this.state.cart.map((pair) => {
      return (
        <div>
          <h2>
            {pair.item.name}
          </h2>
          <img src={"api/static/images/item." + pair.item._id} alt={pair.item.name}/>
          <p>${pair.item.usd}</p>
          <b>Gift for {pair.event.recipient.username + "@" + pair.event.name}</b>
        </div>
      );
    });

    return jsx;
  }

  render() {

    return (
      <section>
        <h1>My Cart</h1>
        {this.cartToJSX()}
        <Link to="/store/payment">Proceed to checkout</Link>
        <p>OR</p>
        <Link to="/store">Continue Shopping</Link>
      </section>
    )
  }
}