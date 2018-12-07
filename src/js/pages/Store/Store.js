import React, { Component } from 'react'
import axios from 'axios'


export default class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {}
    }
  }

  componentDidMount() {
    const query = {
      query: {
        name: 'Candy'
      }
    }

    axios.get('/api/finditem?keywords=Candy')
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
          <input type="text"/>
          <div style={{ display: 'inline-block' }}>
            <button>Price Dropdown</button>
            <button type="submit">Search</button>
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
