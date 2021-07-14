import React, {Component} from 'react'
import QRCode from "react-qr-code"
import cms from '../cms.json'

class QR extends Component {
  constructor(props){
    super(props)

    this.state = ({
      code: ''
    })

    this.title = cms.qrcode.title
    this.description = cms.qrcode.description
  }

  componentDidMount(){
    if(this.props.title) this.title = this.props.title
    if(this.props.description) this.description = this.props.description
    if(this.props.code) this.setState({code: this.props.code})
  }
  
  render(){
    let code = this.props.code ? this.props.code : ''
      return (
        <div className="d-flex align-items-center">
          <picture className="border border-primary bg-white p-2 me-4">
          { code ?
            <QRCode value={code} size={cms.qrcode.size}/>
          :
            <svg width={cms.qrcode.size} height={cms.qrcode.size}/>
          }
          </picture>
          <div className="w-100">
            <legend className="text-uppercase fw-bold text-secondary small">{this.title}</legend>
            <fieldset>
              <div className="input-group">
                <input type="url" value={this.state.code} id="code" onChange={(evt)=> {
                  this.setState({code: evt.target.value})
                }} className="h-auto form-control form-control-sm rounded-0"/>
                { !this.props.hide_nav &&
                <div className="input-group-append">
                  <button className="btn btn-smoke text-uppercase rounded-0 rounded-end btn-sm" type="submit">Save</button>
                </div>
                }
              </div>
              <label className="text-smoke mb-0" htmlFor="code" style={{fontSize:'0.625rem'}}>{this.description}</label>
            </fieldset>
          </div>
        </div>
      )
  }
}

export default QR