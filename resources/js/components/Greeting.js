import React, {Component} from 'react'
import cms from '../cms.json'

class Greeting extends Component {
  render() {
    return (
      <header data-greeting className="py-2 px-5 bg-primary w-100 fixed-bottom d-flex align-items-center">
        <h1 className="display-4 mb-0 fw-bold text-uppercase text-white">{this.props.headline ? this.props.headline : cms.greeting.headline}</h1>
      </header>
    )
  }
}

export default Greeting