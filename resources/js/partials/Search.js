import React, {Component} from 'react'
import {randomID} from '../functions'

class Search extends Component {
  constructor(props) {
    super(props)

    this.id = `inline_search--${randomID()}`
    this.searchLabel = 'search'
    this.icon = '#icon__search'

    this.state = {
      error: [],
      value: ''
    }
    
    //Methods
    this.fieldChange = this.fieldChange.bind(this)
    this.clearField = this.clearField.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.searchSubmit = this.searchSubmit.bind(this)
  }

  searchSubmit(value) {
    this.setState({value:value})
    this.props.searchSubmit(
     value, 
     this.props.use_countries, 
     this.props.use_programs
    )
  }

  fieldChange(event) {
    event.preventDefault()
    let value = event.target.value
    this.searchSubmit(value)
  }

  clearField(event) {
    event.preventDefault()
    let field = document.querySelector('[data-search] input')
    if(field) {
      field.value = ''
      this.searchSubmit('', true)
    }
  }

  submitForm(event) {
    event.preventDefault()
  }

  componentDidMount(){
    if(this.props) {
      if(this.props.searchLabel) this.searchLabel = this.props.searchLabel
      if(this.props.icon) this.icon = this.props.icon
      if(this.props.id) this.id = this.props.id
    }
  }
    
  render() {
    if( this.state.errors ) {
      this.search_response = this.state.errors
    }else{
      this.search_response = ''
    }

    return (
      <form data-search onSubmit={this.submitForm} className="w-100">
        {this.search_response}
        <div className="mb-3 input-group my-auto">
            { this.icon &&
            <div className="input-group-prepend">
            {!this.state.value ?
              <label className="input-group-text pe-0 ps-1 border-right-0" htmlFor={this.id}>
                <svg className="icon text-primary">
                  <use xlinkHref={this.icon}/>
                </svg>
              </label>
            :
              <button className="input-group-text" onClick={this.clearField}>
                <svg className="icon text-primary">
                  <use xlinkHref="#icon__math--multiply"/>
                </svg>
              </button>
            }
            </div>
          }
          <input type="text" className="form-control border-left-0" id={this.id} 
           placeholder={this.searchLabel} onChange={this.fieldChange}/>
        </div>
      </form>
    )
  }
}
export default Search