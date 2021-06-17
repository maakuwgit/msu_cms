import cms from '../cms.json'
import React, {Component} from 'react'
import { NavLink } from "react-router-dom"
import { getPaths } from '../functions'
import { Tooltip } from 'antd'

class Header extends Component {
  render() {
    let title = this.props.title ? this.props.title : cms.settings.options[0].value
    let department = this.props.department ? this.props.department : cms.settings.options[1].value
    let program = this.props.program ? this.props.program : cms.settings.options[2].value
    let paths = getPaths()
    let is_admin = paths.filter(p => p === 'admin')
    return (
      <header data-header className="navbar navbar-light w-100 sticky-top">
        <figure className="py-0 navbar-brand text-left text-uppercase d-flex align-items-center my-auto ms-0 me-auto">
          <NavLink exact to={is_admin.length ? '/admin' : '/'} aria-label={title}
           className="d-flex display-4 pe-2 mb-0 text-primary text-uppercase">
           <Tooltip title="Click to return to home">
              <svg className="icon">
                <use xlinkHref="#logo__msu"/>
              </svg>
            </Tooltip>
          </NavLink>
          { title &&
          <figcaption className="mt-3">
            <NavLink className="h3 text-primary" to={is_admin.length ? '/admin' : '/'}>
              <Tooltip title="Click to return to home">
                <span className="fw-bold">{title.substr(0, title.lastIndexOf(' '))}</span> {title.substr(title.lastIndexOf(' ') + 1)}
              </Tooltip>
            </NavLink>
          </figcaption>
          }
        </figure>
        { ( ( department || program ) && this.props.show_frontend ) &&
        <div className="d-none d-md-inline h3 my-auto text-primary">{department} | <span className="fw-bold text-uppercase">{program}</span></div>
        }
        { !this.props.show_frontend &&
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="offcanvas" 
          data-bs-target="#primary-nav" 
          aria-controls="primary-nav" 
          aria-expanded="false" 
          aria-label="Toggle primary navigation">
          <Tooltip title="Show/Hide the menu" placement="left">
            <span className="navbar-toggler-icon"></span>
          </Tooltip>
        </button>
        }
      </header>
    )
  }
}

export default Header