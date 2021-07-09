import React, {Component} from 'react'
import {Table} from 'antd'
import cms from '../cms.json'
import {closeModal, randomID} from '../functions'
import {toggleCountries} from '../world'
import {checkPrograms} from '../programs'
import Button from '../components/Button'
import Breadcrumb from '../components/Breadcrumb'
import World from '../components/World'
import Subheadline from '../components/Subheadline'
import Gallery from '../partials/Gallery'
import QRCode from '../partials/QR'

class Dashboard extends Component {
  constructor(props){
    super(props)

    this.state = {
      continent: false, 
      continents: [],
      countries: [],
      country: false, 
      filter: {
        value: '', 
        label: cms.filters[0]
      },
      gallery: false, 
      programs: false,
      selectedPrograms: []
    }

    this.countries        = []

    this.divCss           = { overflow:'scroll' }
    this.divStyle         = "p-4 bg-tertiary"

    this.checkContinent   = this.checkContinent.bind(this)
    this.parseContinents  = this.parseContinents.bind(this)
    this.selectContinent  = this.selectContinent.bind(this)

    this.checkCountries   = this.checkCountries.bind(this)
    this.parseCountries   = this.parseCountries.bind(this)

    this.selectCountry    = this.selectCountry.bind(this)
    
    this.selectFilter     = this.selectFilter.bind(this)
    this.previewModal     = this.previewModal.bind(this)
  }

  //An Interface for the setModal that will slightly realign the display
  previewModal(file) {
    if(this.props){
      this.props.setModal("preview",file.name,'', [], false, false, file.url)
    }
  }

  //Look at the list of Countries, and class them based on existence and suspension
  //Used by the Map component for style and listeners
  checkContinent(slug){
    let exists = this.state.continents.filter(c => c.slug === slug)
    return exists.length ? 'active' : ''
  }

  //Look at the list of Countries, and class them based on existence and suspension
  //Used by the Map component for style and listeners
  checkCountries(slug){
    let exists    = this.state.countries.filter(c => c.slug === slug)
    if(exists.length > 0) {
      if(exists[0].enabled === 'on') {
        //console.log(exists[0])
        let styles = exists[0].suspended === 'off' ? 'active' : 'active suspended'
        styles += checkPrograms(exists[0])
        styles += ' opacity-'+exists[0].color
        return styles
      }else{
        return 'disabled'
      }
    }else{
      return ''
    }
  }

  injectProgram(obj) {
    obj.id = randomID()
    let nu = this.state.programs ? this.state.programs.concat(obj) : [obj]
    this.setState({programs: nu})
  }

  parseContinents(){
    if(this.props.continents) {
      if(this.props.continents.length > 0 && this.state.continents.length === 0){
        this.setState({continents: this.props.continents.filter(c => c.enabled)})
      }
    }
  }

  parseCountries(){
    if(this.props.countries) {
      if(this.props.countries.length > 0 && this.state.countries.length === 0){
        let enabled = this.props.countries.filter(c => c.enabled)
        this.setState({countries: enabled})
        this.countries = enabled
      }
    }
  }

  selectContinent(continent=false){
    this.setState({continent: continent})
  }

  selectCountry(country=false){
    if(country){
      this.setState({
        country: country, 
        selectedPrograms: [], 
        programs: country.programs,
        gallery: country.gallery
      })
    }else{
      let state = {
        country: false,
        programs: false,
        gallery: false,
        selectedPrograms: []
      }
      let hasgrams = []
      let actives = []
      state.countries = this.state.countries.map(c => {
        if(c.continent_id === this.state.continent.id && c.enabled){
          if(this.state.filter){
            if(c.programs.length) hasgrams.push(c)
            if(c.suspended === 'off') actives.push(c)
            if(this.state.filter === 'countries--active') {
              state.countries = actives
            }else if(this.state.filter === 'countries--programs') {
              state.countries = hasgrams
            }else{
              state.countries = this.countries
            }
          }
        }
      })

      console.log(hasgrams, actives, this.state.filter, state.countries)

      this.setState(state)
    }
  }

  selectFilter(filter=''){
    this.setState({filter: filter})
  }

  componentDidUpdate(){
    this.parseCountries()
    this.parseContinents()

    this.props.getPage('dashboard')
  }

  componentDidMount(){
    this.parseCountries()
    this.parseContinents()
  }

  render() {
    let levels = []
    if(this.state.continent) levels.push(this.state.continent)
    if(this.state.country) levels.push(this.state.country)
//    if(this.state.gallery) console.log(this.state.gallery.media)
    return (
      <article key="dashboard__wrapper" className="container mx-0 px-2 pb-2">
        <div className="row mx-0 align-items-stretch justify-content-stretch h-100">
          <section className={`col-12 flex-column px-0 mb-2 d-flex h-100${levels.length > 0 ? ' col-lg-7 col-xl-8' :''}`} style={{overflow:'hidden'}}>
            <Breadcrumb levels={levels} selectFilter={this.selectFilter} filter={this.state.filter}
             selectCountry={this.selectCountry} selectContinent={this.selectContinent}/>
            <World continent={this.state.continent} continents={this.props.continents}
             country={this.state.country} countries={this.props.countries} programs={this.props.programs} 
             selectCountry={this.selectCountry} selectContinent={this.selectContinent} 
             checkContinent={this.checkContinent} checkCountries={this.checkCountries}/>
          </section>
          <section className={`flex-column align-items-stretch justify-contrent-stretch px-0 ps-lg-3 pe-lg-0 col-12 col-lg-5 col-xl-4 mh-100 ${levels.length > 0 ? 'd-flex' : 'd-none'}`}
           style={this.divCss}>
            { this.state.continent &&
            <>
            { !this.state.country ?
            <>
            <Subheadline key="dashboard__headline--countries"
            copy={cms.countries.headline} hStyle="row align-items-center w-100 py-3 px-4 mb-2 mx-auto bg-tertiary sticky sticky-top"/>
            <div className={this.divStyle}>
              <Table dataSource={this.state.countries ? this.state.countries : false}
                loading={this.state.countries.length ? false : true}
                rowKey={(record) => {
                  return `dashboard__table__row--${record.id}`
                }} 
                rowClassName={(record) =>{
                  let style = "ant-table-clickable"+ (record.suspended !== 'off' ? ' suspended' : '')
                  style = record.programs ? style + ' programs' : style
                  style = record.enabled === 'on' ? style + ' active' : style
                  return style
                }} 
                onRow={(record, r) => {
                  if(record.suspended === 'off'){
                  return {
                    onClick: (event) => {
                      if(event.target.tagName === 'TD') {
                        let country = this.props.countries.filter(c => c.id === record.id)
                        if(country.length > 0) {
                          let markup = document.getElementById(country[0].slug)
                          if(markup) {
                            toggleCountries('off', markup)
                            markup.classList.add('selected')
                            this.selectCountry(country[0])
                          }else{
                            this.props.resetAlert('There was no country to show programs for','warning')
                          }
                        }
                      }
                    }
                  }}
                }}
                columns={[
                  {
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
                      let gallery = this.props.galleries.filter(g => g.country_id === record.id)
                      let media = []
                      let s_label = record.suspended === 'off' ? 'Suspend' : 'Reinstate'
                      let s_style = record.suspended === 'off' ? 'text-danger' : 'text-success'

                      if(gallery.length) {
                        media = this.props.media.filter(m => m.gallery_id === gallery[0].id)
                      }

                      return (
                      <Button type="dropdown" is_enabled={true} 
                       ctas={[
                        {
                          label: 'Edit', 
                          target: '#main__modal_window', 
                          callback: () => {
                            this.props.editModal(`Edit Country #${record.id}`, '',[
                            {
                              label: 'Id',
                              id: 'id',
                              type: 'hidden',
                              value: record.id
                            },{
                              label: 'Continent Id',
                              id: 'continent_id',
                              type: 'hidden',
                              value: record.continent_id
                            },{
                              label: 'Slug',
                              id: 'slug',
                              type: 'text', 
                              readOnly: true, 
                              required: true,  
                              style: 'col-md-6', 
                              value: record.slug
                            },{
                              label: 'Name',
                              id: 'name',
                              type: 'text', 
                              required: true,  
                              style: 'col-md-6', 
                              value: record.name
                            },{
                              label: 'Highlight Color',
                              id: 'color',
                              type: 'slider', 
                              style: 'mt-2', 
                              description: <span>This is an opacity slider. The <span className="text-primary">primary color</span> is used</span>, 
                              value: record.color
                            },{
                              label: 'Enable/Disable',
                              id: 'enabled',
                              type: 'checkbox', 
                              style: 'col-md-6 mt-2', 
                              description: "This country is available to Moderators", 
                              value: record.enabled === 'off' ? false : true
                            },{
                              label: 'Suspended/Reinstate',
                              id: 'suspended',
                              type: 'checkbox', 
                              style: 'col-md-6 mt-2', 
                              description: <span>This country's programs are <span className="checked">suspended</span><span className="unchecked">open</span></span>, 
                              value: record.suspended === 'off' ? false : true
                            },{
                              label: 'QR Code',
                              id: 'code',
                              type: 'qrcode',  
                              style: 'mt-2', 
                              description: "Link to an existing website with further information about the program or country", 
                              value: record.code
                            },{
                              label: 'Gallery',
                              id: this.props.galleries.filter(g => g.country_id === record.id),
                              type: 'gallery',  
                              style: 'mt-2', 
                              country: record, 
                              value: media
                            }
                          ],(obj) => {
                            closeModal(this.props.resetModal)
                            this.props.editCountry(obj)
                            })
                          }
                        },{
                          label: s_label,
                          target: '#main__modal_window', 
                          style: s_style,
                          callback: () => {
                            this.props.editModal(`${record.suspended === 'off' ? 'Suspend' : 'Reinstate'} "${record.name}"`, 
                            record.suspended === 'off' ? cms.countries.modal.suspend : cms.countries.modal.reinstate ,[
                            {
                              label: 'id',
                              id: 'id',
                              type: 'hidden',
                              required: true, 
                              value: record.id
                            },{
                              label: 'Enabled',
                              id: 'enabled',
                              type: 'hidden',
                              required: true, 
                              value: record.enabled
                            },{
                              label: 'Slug',
                              id: 'slug',
                              type: 'hidden', 
                              required: true, 
                              value: record.slug
                            },{
                              label: 'Name',
                              id: 'name',
                              type: 'hidden', 
                              required: true, 
                              value: record.name
                            },{
                              label: 'QR Code',
                              id: 'code',
                              type: 'hidden',
                              value: record.code
                            },{
                              label: 'Highlight Color',
                              id: 'color',
                              type: 'hidden',
                              value: record.color
                            },{
                              label: 'Suspended/Reinstated',
                              id: 'suspended',
                              type: 'hidden',
                              value: record.suspended === 'off' ? 'on' : 'off'
                            },{
                              label: 'Continent',
                              id: 'continent_id',
                              type: 'hidden',
                              required: true, 
                              value: record.continent_id
                            },{
                              label: 'Continents',
                              id: 'continent',
                              type: 'hidden',
                              required: true, 
                              value: JSON.stringify(record.continent)
                            },{
                              label: 'Programs',
                              id: 'programs',
                              type: 'hidden',
                              required: true, 
                              value: JSON.stringify(record.programs)
                            },{
                              label: 'Gallery',
                              id: 'gallery',
                              type: 'hidden',
                              required: true, 
                              value: JSON.stringify(record.gallery)
                            }
                          ],(obj) => {
                            closeModal(this.props.resetModal)
                            this.props.suspendCountry(obj)
                            })
                          }
                        }]} 
                        style={record.suspended === 'off' ? false : "outline-battleship px-2 py-1"}/>
                      )
                    }
                  }
                ]}
                pagination={false}/>
              </div>
            </>
            :
            <>
            <Subheadline key="dashboard__headline--programs" 
            copy={cms.programs.label} h2Style="ms-0 mb-0 fw-bold text-primary display-6" 
            hStyle="d-flex align-items-center w-100 py-3 px-4 mb-2 mx-auto bg-tertiary sticky sticky-top justify-content-start" add_new={{
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
                  value: this.props.countries.filter(c => c.id === this.state.country.id)[0].id
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
            <form className={this.divStyle+' mb-2'} onSubmit={(event)=>{
              event.preventDefault()
              let code = document.getElementById('code')
              if(code) this.props.setQR(code.value, this.state.country)
            }}>
              <QRCode code={this.state.country.code}/>
            </form>
            { ( this.state.gallery && this.props.media ) &&
            <div className={this.divStyle+' mb-2'}>
              <Gallery key="dashboard__country_gallery" 
               deleteMedia={this.props.deleteMedia} 
               uploadMedia={this.props.uploadMedia} 
               country={this.state.country} 
               id={this.state.gallery.id} 
               index={1} 
               previewModal={this.previewModal}
               files={this.props.media.filter(media => media.gallery_id === this.state.gallery.id)}/>
            </div>
            }
            <div className="p-4 bg-list-item h-100">
              <Table dataSource={this.state.programs}
                rowKey={(record) => {
                  return `dashboard__table__row--${record.id}`
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
                  }, {
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
                      let programs = []
                      let program = false
                      if(record.pivot) {
                        programs = this.props.programs.filter(pr => pr.id === record.pivot.programs_id)
                        if( programs.length ) program = programs[0]
                      }
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
                              label: 'Countries',
                              id: 'country_ids',
                              type: 'hidden',
                              value: program ? JSON.stringify(program.countries.map(cou => cou.id)) : JSON.stringify([])
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
                            let np = this.state.programs.filter(p => p.id !== record.id)
                            np.push(obj)
                            this.setState({programs: np})
                            this.props.editProgram(obj)
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
            </>
            }
          </>
          }
          </section>
        </div>
      </article>
    )
  }
}

export default Dashboard