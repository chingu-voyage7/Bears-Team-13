import React, { Component } from 'react';
import axios from 'axios';
import {StoreWrap, SearchForm, Title} from "./store-style.js";
import {InputStyle} from '../Signup/signup-style.js';
import {Button} from '../MyAccount/myAccount-style.js';

const Item = ({item}) => {
  return (
    <article>
      <h3>{item.name}</h3>
      <img src="" alt="img "/>
      <div>
        <span>{item.usd}</span>
      </div>
    </article>
  )
}
export default class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      query: '',
      loader: false,
      searchPerformed: false
    }
  }

  handleInputSearch = (e) => {
    const { value } = e.target

    this.setState({
      query: value
    })
  }

  handleSearch = (e) => {
    e.preventDefault()

    const { query } = this.state
    const url = `/api/finditem?keywords=${query}`

    this.setState({
      loader: true
    })

    axios.get(url)
      .then(res => {
        console.log(res.data)
        this.setState({
          items: res.data,
          loader: false,
          searchPerformed:true
        })
      })
      .catch(err => {
        this.setState({
          loader: false
        })
        console.log(err.response)
      })
  }

  render() {
    const { items, loader } = this.state
    let storeItems;

     if(!this.state.searchPerformed){
      storeItems = "";
     } else {
    if (items.length > 0) {
      storeItems = items.map(item => {
        return (
          <Item item={item} key={item._id}></Item>
        )
      })
    } else {
      storeItems = "item not found";

    }
  }

    return (
  
        <StoreWrap>
     
             <Title> Gifts under $20. </Title>
             <Title>You're welcome </Title>

          <SearchForm>
            <InputStyle type="text" onChange={this.handleInputSearch}/>
            <div style={{ display: 'inline-block' }}>
              {/* <button>Price Dropdown</button> */}
              <Button type="submit" onClick={this.handleSearch}>Search</Button>
            </div>
          </SearchForm>
  
        <section>
          {storeItems}
        </section>
        </StoreWrap>
    )
  }
}
