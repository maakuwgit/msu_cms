import React, {Component} from 'react'
import Search from '../partials/Search'

class Subheadline extends Component {
  render() {
    if(this.props.copy){
      return  (
        <header data-subheadline className={`d-flex${this.props.hStyle ? ' ' + this.props.hStyle : 'row align-items-center w-100 py-3 px-4 mb-2 mx-auto bg-tertiary'}`} style={{overflow:'visible'}}>
          <div key="headline__copy" className="d-flex">
            <h2 className={this.props.h2Style ? ' ' + this.props.h2Style : "ms-0 mb-0 fw-bold text-primary"}>{this.props.copy}</h2>
          </div>
          { ( this.props.has_search || this.props.add_new ) &&
          <div key="headline__nav" className={`d-flex justify-content-start pe-0`}>
            { this.props.has_search &&
            <Search searchSubmit={this.props.searchSubmit} 
            use_events={this.props.use_events} use_specialists={this.props.use_specialists} 
            use_sourceCodes={this.props.use_sourceCodes} use_purged={this.props.use_purged} use_purgedHistory={this.props.use_purgedHistory} 
            use_heldLeads={this.props.use_heldLeads}  use_heldLeadsHistory={this.props.use_heldLeadsHistory} 
            use_productSpecialistLeads={this.props.use_productSpecialistLeads}/>
            }
            { this.props.has_selected &&
            <button className="btn btn-danger ms-4 d-flex text-uppercase align-items-center" onClick={this.props.deleteAll}>
              <span className="me-2">Delete</span>
              <span className="badge badge-pill badge-white p-1" style={{minWidth:'1.25rem'}}>{this.props.num_selected}</span>
            </button>
            }
            { this.props.add_new &&
            <button className="btn btn-secondary text-white text-uppercase ms-4 d-flex align-items-center" onClick={this.props.add_new.callback} data-bs-target="#main__modal_window" data-bs-toggle="modal">
              <span className={'me-2'}>{this.props.add_new.slug ? this.props.add_new.slug : 'Add New'}</span>
              <svg className="icon">
                <use xlinkHref="#icon__math--add"/>
              </svg>
            </button>
            }
          </div>
          }
        </header>
      )
    }else{
      return false
    }
  }
}

export default Subheadline