import React, { Component } from 'react'
import axios from 'axios'
export default class Item extends Component {
  constructor() {
    super();
    this.state = {
      item: []
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


  componentDidMount() {
    this.fetchItem()
  }

  render() {
    const { item } = this.state
    return (
      <section>
        <article>
          <div>
            <h2>{item.name}</h2>
            <span>${item.usd}</span>
          </div>
          <div>
            <img src="" alt="Item"/>
          </div>
        </article>

        <form>
          <select>
            <option value="john">john</option>
            <option value="root">sally</option>
            <option value="inna">inna</option>
          </select>
          <input type="submit">Add to cart</input>
        </form>
      </section>
    )
  }
}