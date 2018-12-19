import React, { Component } from 'react'

export default class Item extends Component {
  constructor() {
    super();

    this.state = {

    }

  }

  render() {
    return (
      <section>
        <article>
          <div>
            <h2>Small teapot</h2>
            <span>$28.99</span>
          </div>
          <div>
            <img src="" alt="Item"/>
          </div>
          <button>Add to cart</button>
        </article>
      </section>
    )
  }
}