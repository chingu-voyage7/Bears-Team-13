import React, { Component } from 'react'
import axios from 'axios'
import {CartWrap, ItemsWrap, Item, ImageWrap, ImagePriceWrap, PriceSelectWrap, ItemName, Price, Delete, Checkout} from './cart-style';
import {Greeting} from '../MyAccount/myAccount-style'
import { Link } from 'react-router-dom';

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

  // Removes {event, item} from cart
  onDelete(e, event_id) {
    axios.delete('/api/mycart/delete', { data: {event_id} })
    .then((res) => alert("Untested delete success"))
    .catch(err => alert("Untested delete failure"));
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
    const {
      cart,
    } = this.state;

    return (
      <CartWrap>
        <Greeting>My Cart</Greeting>

        { /* List items */}
        <ItemsWrap>
          {
            cart.map((pair) => {
              const {event, item} = pair;
              return (
                <Item key={item._id}>
                    <ItemName>{item.name}</ItemName>
                    <ImagePriceWrap>
                       <ImageWrap>
                          <img src={"/api/static/images/item." + item._id} alt="item" />
                       </ImageWrap>
                       <PriceSelectWrap>
                            <Price>${item.usd}</Price>
                            <p>Gift for {event.recipient.username} @ {event.name}</p>
                            <Delete onClick={(e) => this.onDelete(e, event._id)}>Delete</Delete>
                        </PriceSelectWrap>
                    </ImagePriceWrap>

                </Item>
              );
            });
          }
        </ItemsWrap>
        <Checkout>Proceed to checkout</Checkout>
      </CartWrap>
    )
  }
}