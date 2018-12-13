import React, { Component } from 'react'
import axios from 'axios'

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
    }
  }

  componentDidMount() {
    console.log('mounted')

    axios.get('/api/items')
      .then(res => {
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
    let storeItems

    if (items.length > 0) {
      storeItems = items.map(item => {
        return (
          <Item item={item} key={item._id}></Item>
        )
      })
    } else {
      storeItems = "Items not found";
    }

    return (
      <>
        <section>
          <form>
            <input type="text" onChange={this.handleInputSearch}/>
            <div style={{ display: 'inline-block' }}>
              <button>Price Dropdown</button>
              <button type="submit" onClick={this.handleSearch}>Search</button>
            </div>
          </form>
        </section>
        <section>
          {storeItems}
        </section>
      </>
    )
  }
}
