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
      cartLength:0
    }
  }

  componentDidMount() {
    this.fetchItem();
    this.fetchRecipients();
    this.fetchCartLength();
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

  fetchCartLength() {
    axios.get('/api/mycart/length')
      .then((res) => {
        this.setState({cartLength: res.data.length});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addToCart = (e) => {
    e.preventDefault()
    const { selected } = this.state;

    axios.post('/api/mycart/update', { item_id: this.state.item_id, event_id: selected })
      .then( res => console.log(res.data), this.fetchCartLength() )
      .catch( err => console.log(err.response));

      this.fetchCartLength();
  }

  handleChange = (e) => {
    this.setState({selected: e.target.value})
    console.log('changed')
  }

  render() {
    const { item, selected, events } = this.state;

    return <ItemWrap>
        
             <CartWrap>
               <Link style={{ textDecoration: 'none' }} to="/cart"> <i  style={iconStyle} className="fas fa-shopping-cart"></i><CartSpan>{this.state.cartLength} </CartSpan>  </Link>
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