import React, {Component} from 'react'
import { NavLink } from "react-router-dom"
import {updateBodyStyle} from '../functions'
import { Drawer } from 'antd'
import Privacy from '../pages/Privacy'
import Terms from '../pages/Terms'

class Footer extends Component {
  constructor(props){
    super(props)

    this.state = {
      privacy: false,
      terms: false
    }

    this.openPrivacy = this.openPrivacy.bind(this)
    this.openTerms = this.openTerms.bind(this)
    this.closePrivacy = this.closePrivacy.bind(this)
    this.closeTerms = this.closeTerms.bind(this)
  }

  openPrivacy() {
    updateBodyStyle('privacy')
    this.setState({
      privacy: true,
      terms: false
    })
  }

  openTerms() {
    updateBodyStyle('terms')
    this.setState({
      terms: true,
      privacy: false
    })
  }

  closePrivacy() {
    updateBodyStyle()
    this.setState({
      privacy: false
    })
  }

  closeTerms() {
    updateBodyStyle()
    this.setState({
      terms: false
    })
  }

  render() {
    return (
      <>
      <Drawer onClose={this.closePrivacy} visible={this.state.privacy} closable={true} 
        placement={'bottom'} height={'40rem'} zIndex={10} mask={false} getContainer={false}>
        <Privacy/>
      </Drawer>
      <Drawer onClose={this.closeTerms} visible={this.state.terms} closable={true} 
        placement={'bottom'} height={'40rem'} zIndex={10} mask={false} getContainer={false}>
        <Terms/>
      </Drawer>
      <footer data-footer className={`justify-content-center flex-column ${this.props.show_frontend ? 'd-flex' : 'd-none'}`}>
        <div className="container-md d-flex">
          <nav className="w-100 h-100 d-flex align-items-center justify-content-center py-3">
            <a key={`footer_cta--privacy`} onClick={this.openPrivacy} className="h3 mx-5 mb-0 text-primary">Privacy Policy</a>
            <NavLink key={`footer_cta--social`} to={'#instagram'} className="h3 mx-5 mb-0 fw-bold d-flex align-items-center text-primary">
              <svg className="icon me-1">
                <use xlinkHref="#icon__instagram"/>
              </svg>
              <span>MSUBROADABROAD</span>
            </NavLink>
            <a key={`footer_cta--terms`} onClick={this.openTerms} className="h3 mx-5 mb-0 text-primary">Terms of Service</a>
          </nav>
        </div>
      </footer>
      </>
    )
  }
}

export default Footer