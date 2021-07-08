import React, {Component} from 'react'
import cms from '../cms.json'
import {Spin, Table, Tooltip} from 'antd'
import {closeModal, randomID, updateBodyStyle} from '../functions'
import Button from '../components/Button'
import Headline from '../components/Headline'
import Subheadline from '../components/Subheadline'
import Gallery from '../partials/Gallery'
import QRCode from '../partials/QR'
import { NavLink } from 'react-router-dom'

class Country extends Component {
  constructor(props) {
    super(props)

    this.state = {
      programs: [],
      selectedPrograms: []
    }

    this.has_programs     = false
    this.divStyle         = "p-4 bg-white mb-2"
    
    this.injectProgram    = this.injectProgram.bind(this)
    this.previewModal     = this.previewModal.bind(this)
  }

  //An Interface for the setModal that will slightly realign the display
  previewModal(file) {
    if(this.props){
      this.props.setModal("preview",file.name,'', [], false, false, file.url ? file.url : file.thumbUrl)
    }
  }

  injectProgram(obj) {
    obj.id = randomID()
    obj = this.props.parseProgram(obj)
    let nu = this.state.programs
    nu.push(obj)
    this.setState({programs: nu})
  }

  componentDidMount(){
    if(this.props) {
      if(this.props.programs.length > 0) this.setState({programs:this.props.programs})
    }
  }

  componentDidUpdate(){
    if(this.props) {
      if(this.props.programs.length > 0 && !this.has_programs) {
        this.setState({programs:this.props.programs})
        this.has_programs = true
      }
    }

    this.props.getPage('country')
  }

  render() {
    let country = this.props.countries.filter(c => c.slug === this.props.slug)
    if(country.length ) {
      country = country[0]
      let gallery = this.props.galleries.filter(g => g.country_id === country.id)
      let files = []
      if(gallery.length) {
        gallery = gallery[0]
        files = this.props.media.filter(media => media.gallery_id === gallery.id)
        console.log(country, gallery, files)
      }
      return (
        <article key="country__article" className={cms.theme.article+' d-flex px-0 align-items-stretch flex-column'} style={{ overflow:'scroll' }}>
          <nav 
            key="breadcrumb__wrapper" 
            data-breadcrumb 
            className="d-flex align-items-center bg-seafoam w-100 mb-2 sticky sticky-top">
            <div className="mb-0">
              <NavLink key="breadcrumb__continent" to="/admin/continents" className="h6 fw-bold text-primary">
                <Tooltip title="Return to the Continents page">Continents</Tooltip>
              </NavLink>
              <span key="breadcrumb__country" className="h6 fw-bold text-list-item">&nbsp;&rsaquo;&nbsp;{country.name}</span>
            </div>
          </nav>
          <section className="d-flex flex-wrap h-100 pb-2 px-2">
            <div className="col-12 col-lg-5">
              <Headline key="country_headline" hStyle={cms.components.headline.style+' bg-white'}
              headline={country.name} />
              <form className={this.divStyle} onSubmit={(event)=>{
                event.preventDefault()
                let code = document.getElementById('code')
                if(code) this.props.setQR(code.value, country)
                }}>
                <QRCode code={country.code}/>
              </form>
              <div className={this.divStyle}>
              { files.length ?
                <Gallery key="country_gallery" 
                  index={1} 
                  country={country} 
                  id={gallery.id} 
                  previewModal={this.previewModal}
                  deleteMedia={this.props.deleteMedia}  
                  uploadMedia={this.props.uploadMedia} 
                  files={files}/>
              :
                <button className="btn btn-primary" disabled>Create Gallery</button>
              }
              </div>
            </div>
            <div className="col-12 col-lg-7 bg-tertiary">
              <div className="p-4 h-100">
                <Subheadline key="country_subheadline" hStyle={cms.components.headline.style+' mb-4 pt-0'}
                copy={'programs'} add_new={{
                  slug: 'New',
                  callback: () => {
                    this.props.createModal(`New Program`, '',[
                    {
                      label: 'Name',
                      id: 'name',
                      type: 'text', 
                      required: true, 
                      style: 'col-md-6'
                    },{
                      label: 'Semester',
                      id: 'semester',
                      type: 'text', 
                      required: true, 
                      style: 'col-md-6'
                    },{
                      label: 'Country',
                      id: 'country_id',
                      type: 'select', 
                      options: this.props.countries.map(co => {
                        return { 
                          label: co.name,
                          value: co.id
                        }
                      }),
                      readOnly: true,
                      style: 'mt-2 col-md-6',
                      value: this.props.countries.filter(c => c.id === country.id)[0].id
                    },{
                      label: 'Suspended/Open',
                      id: 'suspended',
                      type: 'checkbox', 
                      style: 'mt-2 col-md-6', 
                      description: <span>This program is <span className="checked">suspended</span><span className="unchecked">open</span></span>, 
                    }
                  ],(obj) => {
                    this.injectProgram(obj)
                    closeModal(this.props.resetModal)
                    this.props.postProgram(obj)
                    })
                  }
                }} has_selected={this.state.selectedPrograms.length > 0 ? 'program' : false} num_selected={this.state.selectedPrograms ? this.state.selectedPrograms.length : 0} />
                <Table dataSource={this.state.programs.filter(pr => pr.country_id === country.id)} className={cms.components.table.style + ' px-0'} 
                  rowKey={(record) => {
                    return `country__table__row--${record.id}`
                  }} 
                  rowSelection={{
                    onChange: rows => {
                      this.setState({ selectedPrograms: rows })
                    }
                  }}
                  columns={[
                    {
                      title: 'Semester',
                      dataIndex: 'semester',
                      key: 'semester',
                      render: (str => {
                        return str
                      })
                    },{
                      title: 'NAME',
                      dataIndex: 'name',
                      key: 'name'
                    },{
                      title: 'Action',
                      dataIndex: 'Action',
                      key: 'Action',
                      align: 'center',
                      width: '2rem',
                      render: (text, record, index) => {
                        return (
                        <Button type="dropdown" is_enabled={true} 
                          ctas={[
                          {
                            label: 'Edit', 
                            target: '#main__modal_window', 
                            callback: () => {
                              this.props.editModal(`Edit Program #${record.id}`, '',[
                              {
                                label: 'id',
                                id: 'id',
                                type: 'hidden',
                                value: record.id
                              },{
                                label: 'Country',
                                id: 'country_id',
                                type: 'hidden',
                                value: record.country_id
                              },{
                                label: 'Name',
                                id: 'name',
                                type: 'text', 
                                required: true, 
                                style: 'col-md-6', 
                                value: record.name
                              },{
                                label: 'Semester',
                                id: 'semester',
                                type: 'text', 
                                required: true, 
                                style: 'col-md-6', 
                                value: record.semester
                              },{
                                label: 'Suspended/Open',
                                id: 'suspended',
                                type: 'checkbox', 
                                style: 'mt-2', 
                                description: <span>This program is <span className="checked">suspended</span><span className="unchecked">open</span></span>, 
                                value: record.suspended === 'on' ? true : false
                              }
                            ],(obj) => {
                              closeModal(this.props.resetModal)
                              obj = this.props.parseProgram(obj)
                              let cp = this.state.programs.filter(p => p.id !== obj.id)
                              cp.push(obj)
                              this.props.editProgram(obj)
                              this.setState({programs: cp})
                              })
                            }
                          },{
                            label: 'Delete',
                            target: '#main__modal_window', 
                            style: 'text-danger',
                            callback: () => {
                              this.props.deleteModal(`Delete "${record.name}"`, '',[
                              {
                                label: 'id',
                                id: 'id',
                                type: 'hidden',
                                value: record.id
                              }
                            ],() => {
                              closeModal(this.props.resetModal)
                              let np = this.state.programs.filter(p => p.id !== record.id)
                              this.props.deleteProgram(record.id)
                              this.setState({programs: np})
                              })
                            }
                          }]}/>
                        )
                      }
                    }
                  ]}
                  pagination={false}/>
              </div>
            </div>
          </section>
        </article>
      )
    }else{
     return <Spin/> 
    }
  }
}

export default Country