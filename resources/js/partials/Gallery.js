import React, {Component} from 'react'
import {Upload} from 'antd'
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

    this.onChange = this.onChange.bind(this)
  }

  onChange({ file, fileList}) {
    let name = Object.values(file)[3]
    let exists = this.files.filter(f=> f.url.search(name) !== -1)
    file.percent = 99
    if(exists.length) fileList.pop()
    setTimeout(() => { 
      file.status = 'done'
      file.percent = 100
      file.thumbUrl = cms.settings.firebase.url+file.name+'?alt=media'
      this.setState({fileList: fileList})
    }, 3000)
  }

  componentDidUpdate(){
    if(this.props) {   
      if(this.props.files){
        if( this.props.files.length > 0 && ( this.has_files === false || this.props.country !== this.country) ){
          console.log('gallry set file list', this.props.files)
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
        return (
          <dl key={`gallery__${index}-${id}`} className="mb-0">
            <dt className="text-uppercase fw-bold text-secondary small mb-2">{country.name ? country.name : cms.gallery.title}</dt>
            <dd>
              <Upload
                customRequest={(data) => { this.props.uploadMedia(data, id, country) }}
                listType="picture-card" 
                onChange={this.onChange} 
                onPreview={this.props.previewModal}
                onRemove={this.props.deleteMedia}
                fileList={this.state.fileList}>
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