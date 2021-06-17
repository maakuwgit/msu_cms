import React, {Component} from 'react'
import Search from '../partials/Search'

class Headline extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      activeTab: ''
    }
        
    this.hStyle = "row align-items-center w-100 py-4 mb-2 mx-auto"
  }

  componentDidMount(){
    if( this.props ) {
      if( this.props.hStyle ) this.hStyle = this.props.hStyle
    }
  }

  componentDidUpdate(){
    if( this.props ) {
      if( this.props.hStyle ) this.hStyle = this.props.hStyle
    }
  }

  render() {
    if( this.props.copy || this.props.headline ) {
      return  (
        <header data-headline className={this.hStyle} style={{overflow:'visible'}}>
          <div className="d-flex justify-content-start align-items-center">
            <div key="headline__text" className="d-flex justify-content-start ps-lg-0 mb-3 mb-lg-0">
              { this.props.headline &&
              <h1 className={`ms-0${!this.props.copy ? ' mb-0' : ''}`}>{this.props.headline}</h1>
              }
              { this.props.copy &&
                <p className="ms-0 mb-0">{this.props.copy}</p>
              }
            </div>
            { ( this.props.has_search || this.props.add_new || this.props.subsubtabs) &&
            <div key="headline__nav" className="d-flex justify-content-start justify-content-lg-end pe-lg-0 ps-lg-3">
              { this.props.has_search &&
              
              <Search searchSubmit={this.props.searchSubmit} 
              use_countries={this.props.use_countries} use_programs={this.props.use_programs} />
              }
              { this.props.has_selected &&
              <button className="btn btn-danger text-white ms-4 d-flex align-items-center" onClick={this.props.deleteAll}>
                <span className="me-2">Delete</span>
                <span className="badge badge-pill badge-white p-1">{this.props.num_selected}</span>
              </button>
              }
              { this.props.add_new &&
              <button className="btn btn-secondary text-white ms-4 d-flex align-items-center" onClick={this.props.add_new.callback} data-target="#main__modal_window" data-toggle="modal">
                <span className="me-2">Add&nbsp;{this.props.add_new.slug ? this.props.add_new.slug : 'New'}</span>
                <svg className="icon">
                  <use xlinkHref="#icon__math--add"/>
                </svg>
              </button>
              }
            </div>
            }
          </div>
        </header>
      )
    }else{
      return false
    }
  }
}

export default Headline