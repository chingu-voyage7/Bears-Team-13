import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [], // [{event: {... recipient: {... }}, item: {... }}]
    }
  }

  componentDidMount() { 
    this.fetchCart();
  }

  fetchCart() {
    axios.get('/api/mycart')
      .then( res => {
        if (Object.keys(res.data).length > 0) {
          alert(JSON.stringify(res.data));
          this.setState({cart: res.data});
        }
      })
      .catch(err => console.log(err.response))
  }

  cartToJSX() {

  }

  render() {

    return (
      <section>
        <h1>My Cart</h1>
        {}
        <Link to="/store/payment">Proceed to checkout</Link>
      </section>
    )
  }
}