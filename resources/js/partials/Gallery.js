import React, {Component} from 'react'
import {message, Upload} from 'antd'
import cms from '../cms.json'

class Gallery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fileList: []
    }

    this.has_files = false
    this.files = []
    this.country = false

    this.onChange     = this.onChange.bind(this)
    this.onSuccess    = this.onSuccess.bind(this)
    this.beforeUpload = this.beforeUpload.bind(this)
  }

  onChange({file, fileList}) {
    console.log(file)
    if( this.state.is_valid ) {
      if (file.status === 'uploading') {
        this.setState({ loading: true })
      }
    }else{
      file.status = 'error'
      this.setState({loading: false})
    }
    this.setState({fileList: fileList})
  }

  onSuccess(file) {
    file.status   = 'done'
    file.percent  = 100
    let nu = this.state.fileList.map(fl => {
      if(fl.uid === file.uid){
        return file
      }else{
        return fl
      }
    })
    this.setState({fileList: nu})
    this.setState({loading: false})
    setTimeout(() => {
      //Setup for thumbnail, but hold off until time is more plentiful
      file.thumbUrl = cms.settings.firebase.url+file.name+'?alt=media'
      file.url      = cms.settings.firebase.url+file.name+'?alt=media'
    }, 10000)
  }

  beforeUpload(file){
    let isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    let isMov = file.type === 'video/mp4'
    let error = ''
    if (!isJpgOrPng) {
      error = 'You can only upload JPG/PNG images'
    }
    if (!isMov) {
      error = 'You can only upload MP4 videos'
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      error = ( error.length > 0 ? error = error + ', and the i' : 'I' ) + 'mage must smaller than 2MB'
    }else{
      error += '!'
    }
    if (error.length > 0) {
      this.setState({is_valid:true})
      return true
    }else{
      this.setState({is_valid:false})
      return false
    }
  }

  componentDidUpdate(){
    if(this.props) {   
      if(this.props.files){
        if( this.props.files.length > 0 && ( this.has_files === false || this.props.country !== this.country) ){
          this.setState({ fileList: this.props.files.slice() })
          this.has_files = true
          this.files = this.props.files
          this.country = this.props.country
        }
      }
    }
  }

  componentDidMount(){
    if(this.props) {   
      if(this.props.files) {
        if( this.props.files.length > 0 ){
          this.setState({ fileList: this.props.files })
          this.has_files = true
          this.files = this.props.files
          this.country = this.props.country
        }
      }
    }
  }

  render() {
      let index = this.props.index
      let id = this.props.id
      let country = this.props.country
      if(country) {
        let params = {
          customRequest: (data) => {
            data.onSuccess = this.onSuccess
            this.props.uploadMedia(data, id, country)
          },
          listType: "picture-card",
          onChange: this.onChange, 
          beforeUpload: this.beforeUpload, 
          onPreview: this.props.previewModal, 
          onRemove: this.props.deleteMedia, 
          fileList: this.state.fileList,
          progress: {
            strokeColor: {
              '0%': 'var(--bs-warning)',
              '100%': 'var(--bs-success)',
            },
            strokeWidth: 3,
            format: percent => `${parseFloat(percent.toFixed(2))}%`,
          }
        }
        
        return (
          <dl key={`gallery__${index}-${id}`} className="mb-0">
            <dt className="text-uppercase fw-bold text-secondary small mb-2">{country.name ? country.name : cms.gallery.title}</dt>
            <dd>
              <Upload {...params}>
                  <svg className="icon h2 mb-0 text-list-item">
                    <use xlinkHref="#icon__math--add"/>
                  </svg>
              </Upload>
            </dd>
          </dl>
        )
      }else{
        return 'No gallery for this country?'
      }
  }
}

export default Gallery