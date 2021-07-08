import React, {Component} from 'react'
import cms from "../cms.json"

class Footer extends Component {
  render() {
    return (
      <footer data-footer className={`justify-content-center flex-column ${this.props.show_frontend ? 'd-flex' : 'd-none'}`}>
        <div className="container-md d-flex">
          <p className={cms.footer.pStyle}>
            <svg className="icon me-1">
              <use xlinkHref={cms.footer.icon}/>
            </svg>
            <span>{cms.footer.text}</span>
          </p>
        </div>
      </footer>
    )
  }
}

export default Footer