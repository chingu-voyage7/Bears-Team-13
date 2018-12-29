import React, { Component } from 'react';
import axios from 'axios';
import {ItemWrap, ImageWrap, H2, Form, Price, Submit, Select} from "./item-style";

export default class Item extends Component {
  constructor() {
    super();
    this.state = {
      item: [],
      recipients: [],
      selectedRecipient: ""
    }
  }

  fetchItem() {
    const { item_id } = this.props.match.params

    console.log(item_id)

    axios
      .get(`/api/item?item_id=${item_id}`)
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
        const recipients = res.data.filter( recipient => recipient !== null )
        this.setState({
          recipients
        });
      })
      .catch(err => console.log(err.response))
  }

  handleChange = (e) => {
    this.setState({selectedRecipient: e.target.value})
    console.log('changed')
  }

  addToCart = (e) => {
    e.preventDefault()
    const { item_id } = this.props.match.params
    const { selectedRecipient: recipient_id } = this.state;

    axios.post('/api/mycart/add', { item_id, recipient_id })
      .then( res => console.log(res.data) )
      .catch( err => console.log(err.response))
  }

  componentDidMount() {
    this.fetchItem()
    this.fetchRecipients()
  }

  render() {
    const {
      item,
      recipients,
      selectedRecipient
    } = this.state

    return <ItemWrap>
             <H2>{item.name}</H2>
             <ImageWrap>
              <img src="" alt="Item" />
             </ImageWrap>
             <Price>${item.usd}</Price>


        <Form onSubmit={this.addToCart}>
          <Select value={selectedRecipient} onChange={this.handleChange}>
            <option>
              Select a recipient
            </option>
            {
              recipients.map(recipient => {
                return (
                  <option
                    value={recipient._id}
                    key={recipient._id}>
                    {recipient.username}
                  </option>
                )
              })
            }
          </Select>
          <Submit type="submit" value="add to cart" />
        </Form>
      </ItemWrap>;
  }
}