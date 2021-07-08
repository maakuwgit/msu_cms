import React, {Component} from 'react'
import cms from '../cms.json'

class Greeting extends Component {
  render() {
    return (
      <header data-greeting className={cms.greeting.hStyle}>
        <h1 className={cms.greeting.h1Style}>{this.props.headline ? this.props.headline : cms.greeting.headline}</h1>
      </header>
    )
  }
}

export default Greeting