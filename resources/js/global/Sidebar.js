import cms from '../cms.json'
import React, {Component} from 'react'
import {Tooltip} from 'antd'
import { NavLink } from "react-router-dom"

class Sidebar extends Component {
  render() {
    let nav = document.querySelector('#primary-nav')
    return (
      !this.props.show_frontend ?
      <aside id="primary-nav" data-sidebar 
      data-bs-backdrop="false" 
      className={`offcanvas navbar navbar-dark sticky-top flex-column justify-content-start align-items-center p-2 min-vh-100 collapse${this.props.show_ui ? ' d-none' : ''}`}>
        <nav className="w-100 h-100 bg-primary">
          <ul className="nav navbar-nav ms-0 d-grid gap-1 bg-white pb-1">
          { cms.routes.map((link,l) => {
            return (
            <li key={`nav-link--${l}`} className="py-0 nav-link fw-bold text-uppercase">
              <Tooltip title={cms[link].tooltip} placement="left">
                <NavLink exact onClick={() => nav.classList.remove('show')} 
                className="btn btn-sm btn-primary rounded-0 w-100" 
                to={'/admin/'+cms[link].slug}>{cms[link].label}
                </NavLink>
              </Tooltip>
            </li>
            )
          } ) }
          </ul>
        </nav>
      </aside>
      :
      ''
    )
  }
}

export default Sidebar