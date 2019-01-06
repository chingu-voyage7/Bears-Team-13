import React, { Component } from 'react';
import axios from 'axios';
import {ItemWrap, ImageWrap, H2, Form, Price, Submit, Select, NameCartWrap, CartSpan, CartWrap} from "./item-style";
import { Link} from 'react-router-dom';

const iconStyle = {
  fontSize: '22px',
  color: '#13491C',
  textDecoration: 'none',
};

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      item_id: this.props.match.params.item_id,
      events: [],
      selected: "",
      cartItemsLength:0
    }
  }

  componentDidMount() {
    this.fetchItem();
    this.fetchRecipients();
    this.fetchCart();
  }

  fetchItem() {
    axios.get(`/api/item?item_id=${this.state.item_id}`)
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
        this.setState({events: res.data});
      })
      .catch(err => console.log(err.response))
  }

  fetchCart() {
    axios.get('/api/mycart')
      .then( res => {
   
          this.setState({cartItemsLength: res.data.length});
          console.log("cart length fetched " + res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addToCart = (e) => {
    e.preventDefault()
    const { selected } = this.state;

    axios.post('/api/mycart/update', { item_id: this.state.item_id, event_id: selected })
      .then( res => console.log(res.data), this.fetchCart() )
      .catch( err => console.log(err.response));

      this.fetchCart();
  }

  handleChange = (e) => {
    this.setState({selected: e.target.value})
    console.log('changed')
  }

  render() {
    const { item, selected, events } = this.state;

    return <ItemWrap>
        
             <CartWrap>
               <Link style={{ textDecoration: 'none' }} to="/cart"> <i  style={iconStyle} className="fas fa-shopping-cart"></i><CartSpan>{this.state.cartItemsLength} </CartSpan>  </Link>
             </CartWrap>
            
             <H2>{item.name}</H2>
             <ImageWrap image={"/api/static/images/item." + item._id} alt={item.name}>
              {/* <img src="" alt="Item" /> */}
             </ImageWrap>
             <Price>${item.usd}</Price>

        <Form onSubmit={this.addToCart}>
          <Select value={selected} onChange={this.handleChange}>
            <option>
              Select a recipient
            </option>
            { events.map((event) => {
              console.log(JSON.stringify(event));
                return (
                  <option
                    value={event._id}
                    key={event._id}>
                    {event.recipient.username + '@"' + event.name + '"'}
                  </option> 
                  );
              })}
          </Select>
          <Submit type="submit" value="Add to cart" />
        </Form>
      </ItemWrap>;
  }
}