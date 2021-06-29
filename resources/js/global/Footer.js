import React, {Component} from 'react'
import { NavLink } from "react-router-dom"

class Footer extends Component {
  render() {
    return (
      <footer data-footer className={`justify-content-center flex-column ${this.props.show_frontend ? 'd-flex' : 'd-none'}`}>
        <div className="container-md d-flex">
          <p className="w-100 h-100 d-flex align-items-center justify-content-center h4 mb-0 py-3 fw-bold text-primary">
            <svg className="icon me-1">
              <use xlinkHref="#icon__instagram"/>
            </svg>
            <span>MSUBROADABROAD</span>
          </p>
        </div>
      </footer>
    )
  }
}

export default Footer