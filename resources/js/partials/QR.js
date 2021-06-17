import React, {Component} from 'react'
import QRCode from "react-qr-code"
import cms from '../cms.json'

class QR extends Component {
  constructor(props){
    super(props)
    this.title = cms.qrcode.title
    this.description = cms.qrcode.description
  }

  componentDidMount(){
    if(this.props.title) this.title = this.props.title
    if(this.props.description) this.description = this.props.description
  }

  render() {
    let code = this.props.code ? this.props.code : ''
      return (
        <div className="d-flex align-items-center">
          <picture className="border border-primary bg-white p-2 me-4">
          { code ?
            <QRCode value={code} size={65}/>
          :
            <svg width="65" height="65"/>
          }
          </picture>
          <div className="w-100">
            <legend className="text-uppercase fw-bold text-secondary small">{this.title}</legend>
            <fieldset>
              <div className="input-group">
                <input type="url" defaultValue={code} id="code" className="h-auto form-control rounded-0"/>
                { !this.props.hide_nav &&
                <div className="input-group-append">
                  <button className="btn btn-smoke text-uppercase" type="submit">Save</button>
                </div>
                }
              </div>
              <label className="text-smoke small mb-0" htmlFor="code">{this.description}</label>
            </fieldset>
          </div>
        </div>
      )
  }
}

export default QR