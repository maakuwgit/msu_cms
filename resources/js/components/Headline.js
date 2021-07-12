import React, {Component} from 'react'
import cms from '../cms.json'
import Search from '../partials/Search'

class Headline extends Component {
  render() {
    if( this.props.copy || this.props.headline ) {
      return  (
        <header data-headline className={this.props.hStyle ? this.props.hStyle : cms.headline.hStyle} style={{overflow:'visible'}}>
          <div className="d-flex justify-content-start align-items-center">
            <div key="headline__heading" className="d-flex justify-content-start flex-column ps-lg-0 mb-3 mb-lg-0">
              { this.props.headline &&
              <h1 className={`ms-0${!this.props.copy ? ' mb-0' : ''}`}>{this.props.headline}</h1>
              }
            </div>
            { ( this.props.has_search || this.props.add_new || this.props.subsubtabs) &&
            <div key="headline__nav" className="d-flex justify-content-start justify-content-lg-end pe-lg-0 ps-lg-3">
              { this.props.has_search &&
              
              <Search searchSubmit={this.props.searchSubmit} 
              use_countries={this.props.use_countries} use_programs={this.props.use_programs} />
              }
              { this.props.has_selected &&
              <button className={`btn-danger ${cms.headline.btnStyle}`} onClick={this.props.deleteAll}>
                <span className="me-2">{this.props.delete ? this.props.delete.slug : cms.headline.btnLabelDelete}</span>
                <span className="badge badge-pill badge-white p-1">{this.props.num_selected}</span>
              </button>
              }
              { this.props.add_new &&
              <button className={`btn-secondary ${cms.headline.btnStyle}`} onClick={this.props.add_new.callback} data-bs-target="#main__modal_window" data-bs-toggle="modal">
                <span className="me-2">{this.props.add_new.slug ? this.props.add_new.slug : cms.headline.btnLabelNew}</span>
                <svg className="icon">
                  <use xlinkHref="#icon__math--add"/>
                </svg>
              </button>
              }
            </div>
            }
          </div>
          { this.props.copy &&
          <p key="headline__copy" className="ms-0 pb-3 mb-4 bg-white">{this.props.copy}</p>
          }
        </header>
      )
    }else{
      return false
    }
  }
}

export default Headline