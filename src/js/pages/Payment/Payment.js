import React, { Component } from "react";
import axios from "axios";
import {
  CartWrap,
  ItemsWrap,
  Item,
  Image,
  ImagePriceWrap,
  PriceSelectWrap,
  ItemName,
  Price,
  ButtonsWrap,
  Checkout
} from "../Cart/cart-style";
import { Greeting } from "../MyAccount/myAccount-style";
import { Link } from "react-router-dom";

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [] // [{event, item}]
    };
  }

  componentDidMount() {
    this.fetchCart();
  }

  fetchCart() {
    axios
      .get("/api/mycart")
      .then(res => {
        if (Object.keys(res.data).length > 0) {
          this.setState({ cart: res.data });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  onCompletePurchase = () => {
    axios
      .post("/api/mycart/purchase")
      .then(res => console.log(res.data), this.setState({ cart: []}), alert("Your purchase is complete!"))
      .catch(err => console.log(err.response));
  }

  render() {
    const { cart } = this.state;
    const that = this;

    return (
      <CartWrap>
        <Greeting>Finalize Payment</Greeting>

        {/* List items */}
        <ItemsWrap>
          {(function() {
            if (!cart || cart.length === 0) {
              return "No Items in cart.";
            }

            return cart.map(pair => {
              const { event, item } = pair;
              console.log(JSON.stringify(item));

              return (
                <Item key={event._id}>
                  <ItemName>{item.name}</ItemName>
                  <ImagePriceWrap>
                      <Image src={"/api/static/images/item." + item._id}alt="item"
                      />
                    <PriceSelectWrap>
                      <Price>${item.usd}</Price>
                      <p>
                        Gift for {event.recipient.username} @ {event.name}
                      </p>
                    </PriceSelectWrap>
                  </ImagePriceWrap>
                </Item>
              );
            });
          })()}
          <b>
            Total: ${" "}
            {(function() {
              let total = 0;
              cart.forEach(pair => {
                total += pair.item.usd;
              });

              return Math.floor(total*100)/100;
            })()}
          </b>
        </ItemsWrap>
         <ButtonsWrap>
          <Checkout onClick={this.onCompletePurchase}>Complete purchase</Checkout>
        </ButtonsWrap>
      </CartWrap>
    );
  }
}
