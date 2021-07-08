import React, {Component} from 'react'
import cms from '../cms.json'
import {Avatar, Tooltip} from 'antd'
import { getPaths } from '../functions'

class Topbar extends Component {
  render(){
    let paths = getPaths()
    let is_admin = paths.filter(p => p === 'admin')
    is_admin = is_admin.length ? true : false
    return (
      <nav data-topbar>
        <div className="d-flex h-100 justify-content-between align-items-center">
          <div className="d-flex col-8">
            <a href={is_admin ? "/" : "/admin"} className="d-block me-1">
              <Tooltip title={`Jump to the ${is_admin ? 'touchscreen' : 'content managment system Dashboard'}`}>
                <svg className="icon">
                  <use xlinkHref="#logo__bluewater" style={{width: '1.25rem', height: '1.25rem'}}/>
                </svg>
                <span className="ms-1">Bluewater {is_admin ? 'Touchscreen' : 'CMS'}</span>
              </Tooltip>
            </a>
            <a href="/logout"
            className="d-block mx-1">
              <Tooltip title="Logout">
                <svg className="icon">
                  <use xlinkHref="#icon__logout" style={{width: '1.25rem', height: '1.25rem'}}/>
                </svg>
                <span className="ms-1">Logout</span>
              </Tooltip>
            </a>
            <a href={`https://console.firebase.google.com/u/1/project/${cms.settings.firebase.project_id}/storage/${cms.settings.firebase.storage_bucket}/files`}
            className="d-block mx-1" target="_blank">
              <Tooltip title="View my Google Firebase Account">
                <svg className="icon">
                  <use xlinkHref="#logo__firebase" style={{width: '1.25rem', height: '1.25rem'}}/>
                </svg>
                <span className="ms-1">Firebase</span>
              </Tooltip>
            </a>
          </div>
          <div className="d-flex col-4 justify-content-end">
            <Tooltip title="View my Google Firebase Account">
              { //Dev Note: this will be replaced by UserTypes call to identify the usertype slug later
              }
              <span className="me-1">{this.props.username} | <strong className="text-bold">{this.props.usertype === 1 ? 'Administrator' : 'Manager'}</strong></span>
              <Avatar src={this.props.image} size="small"/>
            </Tooltip>
          </div>
        </div>
      </nav>
    )
  }
}

export default Topbar