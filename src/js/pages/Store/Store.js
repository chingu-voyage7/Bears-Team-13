import React, { Component } from 'react';
import axios from 'axios';
import {StoreWrap, SearchForm, Title,} from "./store-style.js";
import {InputStyle} from '../Signup/signup-style.js';
import {Button} from '../MyAccount/myAccount-style.js';
import {Grid, GridItem, ItemName, ItemPrice} from '../Index/index-style.js';

const Item = ({item}) => {
  return (

    <GridItem>
      <ItemName>{item.name}</ItemName>
      <img src="" alt="img "/>

        <ItemPrice>{item.usd}</ItemPrice>

    </GridItem>

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

  componentDidMount() {
    console.log('mounted')

    axios.get('/api/items')
      .then(res => {
        this.setState({
          items: res.data,
        })
        console.log(res.data)
      })
      .catch(err => console.log(err.response))
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
      storeItems = items.slice(0, 8).map(item => {
        return (
           <Item item={item} key={item._id}></Item>
      
        )
      })

 
      
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
             <Title>You're welcome. </Title>

          <SearchForm>
            <InputStyle type="text" onChange={this.handleInputSearch}/>
            <div style={{ display: 'inline-block' }}>
              {/* <button>Price Dropdown</button> */}
              <Button type="submit" onClick={this.handleSearch}>Search</Button>
            </div>
          </SearchForm>
  
        <Grid>
          {storeItems}
        </Grid>
        </StoreWrap>
    )
  }
}
