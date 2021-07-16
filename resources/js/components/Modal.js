import React, {Component} from 'react'
import {randomID, closeModal} from '../functions'
import Button from './Button'
import Gallery from '../partials/Gallery'
import QRCode from '../partials/QR'
import {Slider, Upload } from 'antd'

class Modal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      error: false
    }
    
    this.id = 'modal__'+randomID()
    this.nStyle = 'modal-footer col-12'
    this.mStyle = 'modal-dialog-centered modal-xl modal-dialog-scrollable'
    this.hStyle = 'h3 fw-light'
    this.inputs = []

    this.formSubmit = this.formSubmit.bind(this)
    this.parseInput = this.parseInput.bind(this)
  }
  
  formSubmit(event) {
    event.preventDefault()
    
    let inputs = event.target.querySelectorAll('input[type="hidden"], input[type="text"], input[type="url"]')
    let selects = event.target.querySelectorAll('select')
    let checks = event.target.querySelectorAll('input[type="checkbox"]')
    let vals = {}
    
    if(checks) {
      for (var i = 0; i < checks.length; i++) {
        vals[checks[i].id] = checks[i].checked ? 'on' : 'off'
      }
    }

    if(inputs) {
      for (i = 0; i < inputs.length; i++) {
        vals[inputs[i].id] = inputs[i].value
      }
    }

    if(selects) {
      for (i = 0; i < selects.length; i++) {
        vals[selects[i].id] = this.state[selects[i].id]
      }
    }
    
    if(this.props.on_submit) this.props.on_submit(vals)
  }

  parseInput(input, index){
    let output = false
    switch(input.type){
      case 'select':
        output = (
          <select id={input.id} disabled={input.readOnly} readOnly={input.readOnly} multiple={input.multiple}
          className="form-control form-select" required={input.required} value={this.state[input.id]}
          onChange={(evt)=>{
            let opts = evt.target.options
            let val = []
            for(var o = 0; o < opts.length; o++) {
              if(opts[o].selected) val.push(opts[o].value)
            }
            this.setState({[input.id]: val})
          }}>
            { input.multiple !== true &&
            <option key={`option__${index}-${randomID()}`}></option>
            }
            { input.options && input.options.map((option,o) =>{
              return <option key={`option__${index}-${randomID()}--${o}`} value={option.value}>{option.label}</option>
            })}
          </select>
        )
      break;
      case 'textarea':
        output = (
          <textarea id={input.id} placeholder={input.placeholder} className="form-control"
            value={this.state[input.id] ? this.state[input.id] : ''} readOnly={input.readOnly}
            onChange={(evt)=>{
              this.setState({[input.id]: evt.target.value})
            }} required={input.required}/>
        )
      break;
      case 'slider':
        output = (
          <>
            <input type="hidden" id={input.id} value={this.state[input.id] ? this.state[input.id] : 4}/>
            <Slider className="mx-3" id={input.id} marks={{
              1: '10%',
              9: '50%',
              17: '90%'
            }} step={1} max={9} min={1} value={this.state[input.id] ? this.state[input.id] : 4} onChange={(value)=>{
              this.setState({[input.id]: value})
            }}/>
          </>
        )
      break;
      case 'gallery':
        output = (
          <>
            <input type="hidden" id={input.id} value={input.value}/>
            <Gallery key="modal__gallery" 
              files={input.files} 
              deleteMedia={this.props.deleteMedia} 
              uploadMedia={this.props.uploadMedia} 
              country={input.country} 
              id={input.id+'_media'} 
              index={1} 
              previewModal={this.previewModal}/>
          </>
        )
      break;
      case 'qrcode':
        output = (
          <QRCode code={input.value} hide_nav={true}/>
        )
      break;
      case 'text':
      default:
        output = (
          <>
            <input id={input.id} name={input.id} type={input.type}
              placeholder={input.placeholder} className="form-control"
              value={this.state[input.id] ? this.state[input.id] : ''}
              readOnly={input.readOnly}
              onChange={(evt)=>{
                this.setState({[input.id]: evt.target.value})
              }} required={input.required} 
              pattern={input.pattern}/>
            { input.msg &&
            <small className="invalid-feedback">{input.msg}</small>
            }
          </>
        )
      break;
    }
    return output
  }

  componentDidUpdate(){
    if(this.props ){
      if( this.props.inputs && this.props.inputs !== this.inputs) {
        this.props.inputs.forEach( (input,i) => {
          if(input.type !== 'hidden') this.setState({[input.id]: input.value ? input.value : false})
        })
        this.inputs = this.props.inputs
      }
    }
  }

  componentDidMount(){
    if(this.props){
      if( this.props.aStyle ) this.aStyle = this.props.aStyle
      if( this.props.mStyle ) this.mStyle = this.props.mStyle
      if( this.props.hStyle ) this.hStyle = this.props.hStyle
      if( this.props.id ) this.id = this.props.id

      if( this.props.inputs ) {
        this.props.inputs.forEach( (input,i) => {
          if(input.type !== 'hidden') this.setState({[input.id]: input.value ? input.value : ''})
        })
      }
    }
  }

  render() {
    let nStyle = this.nStyle + ' ' + (this.props.nStyle ? this.props.nStyle : 'justify-content-end')
    let btn = (
      <button type="button" className="ms-4 btn btn-battleship btn-square py-1 px-2 rounded-0 text-white" 
      data-bs-dismiss="modal" aria-label="Close">
      <svg className="icon">
        <use xlinkHref="#icon__math--multiply"/>
      </svg>
    </button>
    )
    return (
      <aside className="modal fade" id={this.id} tabIndex="-1" 
       role="dialog" aria-labelledby={`${this.id}__label`} aria-hidden="true"
       onClick={(event) => {
           let tag = event.target
           if(tag.tagName === "ASIDE" || tag.tagName === "BUTTON") this.props.resetModal()
         }}>
        <div className={`modal-dialog ${this.mStyle}`} role="document">
          <section className="modal-content p-1">
            { ( this.props.headline && this.props.type != 'preview' ) &&
            <header className="modal-header px-3 pt-3 pb-2">
              <h5 className={`modal-title mx-2 text-uppercase fw-bold ${this.hStyle}`} id={`${this.id}__label`}>{this.props.headline}</h5>
              {btn}
            </header>
            }
            <div className="modal-body">
              { this.props.copy &&
                <p className="px-4 mb-0 mt-2">{this.props.copy}</p>
              }
              { this.props.inputs &&
              ( this.props.type === 'edit' || this.props.type === 'create' ) ?
              <form className="row p-2" onSubmit={this.formSubmit}>
                { this.props.inputs.map( (input,i) => {
                  if( input.type === 'hidden' ){
                    return (
                      <input key={input.id} id={input.id} type="hidden" 
                      value={input.value} 
                      className="form-control"/>
                    )
                  }else{
                    return (
                      <div key={`modal__column--${i}`} className={`col-12 mb-0 py-2 bg-aluminum${input.style ? ' '+input.style : ''}`}>
                        { input.type === 'checkbox' ?
                        <fieldset className="checkbox-group d-flex flex-column">
                          <label htmlFor={input.id}>{input.required ? '*'+input.label : input.label}</label>
                          <label className="d-flex justify-content-start align-items-center">
                            <input id={input.id} type="checkbox" className="form-control me-2" checked={this.state[input.id]} onChange={(evt) => {
                            this.setState({[input.id]: evt.target.checked})
                          }} required={input.required} style={{width:'1.25rem',height:'1.25rem'}}/>
                            <small className={`text-battleship text-normal${this.state[input.id] ? ' checked' : ''}`} style={{textTransform:'none'}}>{input.description}</small>
                          </label>
                        </fieldset>
                        :
                        <fieldset>
                          { ( input.type !== 'gallery' && input.type !== 'qrcode' && input.type !== 'slider' ) && 
                          <label htmlFor={input.id}>{
                          input.required ? 
                          <>
                            <span className="text-danger">*</span>{input.label}
                          </>
                           : input.label}</label>
                          }
                          { this.parseInput(input,i) }
                        </fieldset>
                        }
                      </div>
                    )
                  }
                }) }
                { this.props.ctas &&
                <nav className={nStyle}>
                  { this.props.ctas.map( cta => {
                    if( this.props.type === 'edit' || this.props.type === 'create' ) {
                      return <Button key={`${this.id}__submit`} type="submit" label={cta.label}/>
                    }else{
                      return <Button key={`${this.id}__dismiss`} type="modal" callback={closeModal} label={cta.label}/>
                    }
                  }) }
                </nav>
                }
              </form>
              : this.props.type === 'preview' ?
              <>
                <figure>
                { this.props.image.search('.mp4') > 0 ?
                  <video id="modal__video" className="w-100 h-auto" width="100%" controls={true} autoPlay={true}>
                    <source src={this.props.image} type="video/mp4"/>
                  </video>
                :
                  <img alt="" src={this.props.image} className="w-100 h-auto" width="100%"/>
                }
                </figure>
                <p className="mb-0 text-white" 
                 style={{textShadow: '0 0 2px black, 0 0 2px black', marginTop: '-1.75rem', marginLeft: '1rem'}}>{this.props.credit}</p>
              </>
              :
              <nav className={nStyle}>
                { this.props.ctas && this.props.ctas.map( cta => {
                  return (
                    <Button key={`${this.id}__dismiss`}
                     tooltip={cta.tooltip} 
                     style={cta.style} 
                     type={cta.type}
                     icon={cta.icon} 
                     is_enabled={true} 
                     callback={cta.callback} 
                     label={cta.label}/>
                  )
                }) }
              </nav>
              }
            </div>
            { this.props.type === 'preview' &&
            <button type="button" className="position-absolute btn btn-sm p-2 bg-white text-primary" 
              data-bs-dismiss="modal" aria-label="Close" style={{bottom:0,right:0}}>
              <svg className="icon" style={{pointerEvents:'none'}}>
                <use xlinkHref="#icon__math--multiply"/>
              </svg>
            </button>
            }
          </section>
        </div>
      </aside>
    )
  }
}

export default Modal