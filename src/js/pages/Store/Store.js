import React, { Component } from 'react'
import axios from 'axios'


export default class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {},
      query: ''
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

    const url = `/api/finditem?keywords=Candy+Canes&page=0`

    console.log(url)

    axios.get(url)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  render() {
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
        <article>
          <img src="" alt="img "/>
          <div>
            <span>Price</span>
          </div>
        </article>
      </section>
      </>
    )
  }
}
