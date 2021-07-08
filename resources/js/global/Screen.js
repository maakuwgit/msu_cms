import api from '../api.js'
import {timedAlert, updateBodyStyle, randomID} from '../functions'
import {toggleCountries, zoomMap} from '../world'
import {checkPrograms} from '../programs'
import React, {Component} from "react"
import Header from "../global/Header"
import Footer from "../global/Footer"
import Topbar from "../global/Topbar"
import Modal from "../components/Modal"
import Feedback from "../partials/Feedback"
import World from '../components/World'
import Greeting from '../components/Greeting'
import Navigation from '../components/Navigation'

class Screen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      continents: [], 
      countries: [],
      galleries: [], 
      programs: [], 
      media: [], 
      media_types: [], 
      continents: [],
      country: false, 
      gallery: false, 
      selectedPrograms: [],
      has_server: true,
      loading: false, 
      modal: {
        headline: '',
        copy: '',
        inputs: false,
        ctas: false
      },
      feedback: {
        msg: false,
        stlye: ''
      },
      slides: false
    }

    this.countries = []
    this.programs = []

    this.resetAlert       = this.resetAlert.bind(this)

    this.getUser          = this.getUser.bind(this)

    // Continents Methods
    this.checkContinent   = this.checkContinent.bind(this)
    this.selectContinent  = this.selectContinent.bind(this)
    this.getContinents    = this.getContinents.bind(this)

    //Country Methods
    this.parseCountry     = this.parseCountry.bind(this)
    this.getCountries     = this.getCountries.bind(this)
    this.checkCountries   = this.checkCountries.bind(this)
    this.selectCountry    = this.selectCountry.bind(this)

    // Program Methods
    this.getPrograms      = this.getPrograms.bind(this)

    // Gallery Methods
    this.getGalleries     = this.getGalleries.bind(this)

    //Media Methods
    this.getMedia         = this.getMedia.bind(this)
  
    //Modal Methods
    this.resetModal       = this.resetModal.bind(this)
    this.setModal         = this.setModal.bind(this)
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

  selectContinent(continent=false){
    if(continent) {
      let countries  = false
      if(this.countries) {
        countries = this.countries.filter(p => p.continent_id === continent.id)
        continent.countries = countries.length > 0 ? countries : false
      }
    }
    this.setState({continent: continent})
  }

  selectCountry(country=false){
    if(country){
      let tag = document.getElementById(`${country.slug}`)
      let continent = tag ? tag.parentElement : false
      this.setState({
        country: country, 
        selectedPrograms: [], 
        programs: country.programs,
        gallery: country.gallery
      })
      let scale = tag.dataset.scale ? tag.dataset.scale : continent.dataset.scale
      let left = tag.dataset.transformoriginx ? parseFloat(tag.dataset.transformoriginx) : parseFloat(continent.dataset.transformoriginx) + 19
      let top = tag.dataset.transformoriginy ? parseFloat(tag.dataset.transformoriginy) : parseFloat(continent.dataset.transformoriginy)
      zoomMap(scale, left.toString(), top.toString())
    }else{
      this.setState({
        country: false,
        programs: false,
        gallery: false, 
        selectedPrograms: []
      })
    }
  }

  //Clear out the modal in the state object for this or a child component
  resetModal(){
    let video = document.getElementById('modal_video')
    if( video ) video.pause()
    this.setState({modal: {}})
  }

  //Set the modal in the state object from this or a child component (modal is reusable)
  setModal(type='edit', headline='', copy='', ctas=false, inputs=[], on_submit=false, image='', credit=false){
    if(type === 'preview') {
      $('#main__modal_window').modal('show')
    }
    this.setState({
      modal: {
        type: type,
        headline: headline,
        copy: copy,
        ctas: ctas,
        image: image, 
        credit: credit, 
        inputs: inputs,
        nStyle: type === 'delete' ? 'justify-content-center' : false,
        on_submit: on_submit
      }
    })
  }

  parseCountry(country) {
    country.id = parseFloat(country.id)
    country.continent_id = parseFloat(country.continent_id)
    country.updated_at = new Date()
    return country
  }

  //Set the alert window to its original state
  resetAlert(msg=false,style=''){
    timedAlert(() => {
      this.setState({
        loading: false,
        feedback: {
          msg: msg,
          style: style
        }
      })
    })
  }

  //Basic calls, requiring no login
  getContinents() {
    this.setState({loading:true})
    api.get('/cms/continents')
    .then(response => {
      this.resetAlert()
      this.setState({
        continents: response.data,
        feedback: {
          msg: 'Continents successfully loaded!',
          style: 'success'
        },
        has_server: true
      })
    })
    .catch(error => {
      this.setState({
        feedback: {
          msg: `And error occurred when loading the Continents! ${error.data}`,
          style: 'danger'
        }
      })
    })
  }


  getCountries(){
    this.setState({loading:true})
    api.get('/cms/countries')
    .then(response => {
      this.countries = response.data
    })
    .finally(() => {
      this.resetAlert()
      this.setState({
        countries: this.countries,
        feedback: {
          msg: 'Countries successfully loaded!',
          style: 'success'
        }
      })
    })
    .catch(error => {
      this.setState({
        feedback: {
          msg: `And error occurred when loading the Countries! ${error.data}`,
          style: 'danger'
        }
      })
    })
  }

  getPrograms(){
    this.setState({loading:true})
    api.get('/cms/programs')
    .then(response => {
      this.resetAlert()
      this.setState({
        programs: response.data,
        feedback: {
          msg: 'Programs successfully loaded!',
          style: 'success'
        },
        is_loaded: true
      })
      this.programs = response.data
    })
    .finally(
      updateBodyStyle()
    )
    .catch(error => {
      this.setState({
        feedback: {
          msg: `And error occurred when loading the Programs! ${error.data}`,
          style: 'danger'
        }
      })
    })
  }

  getGalleries(callback=false){
    this.setState({loading:true})
    api.get('/cms/galleries')
    .then(response => {
      this.resetAlert()
      this.setState({
        galleries: response.data,
        feedback: {
          msg: 'Galleries successfully loaded!',
          style: 'success'
        }
      })
      //Push the galleries we just got into the existing Countries
      if(this.countries.length){
        this.countries.forEach(cou => {
          let gall = response.data.filter(g => g.country_id === cou.id)
          cou.gallery = gall.length ? gall[0] : false
        })
        this.setState({countries: this.countries})
        if(callback) callback()
      }
    })
    .finally(() => {
        updateBodyStyle()
      }
    )
    .catch(error => {
      this.setState({
        feedback: {
          msg: `And error occurred when loading the Galleries! ${error.data}`,
          style: 'danger'
        }
      })
    })
  }
  
  getMedia(){
    this.setState({loading:true})
    api.get('/cms/media')
    .then(response => {
      let list = response.data.map(media => {
        return ( {
          id: media.id,
          uid: media.id,
          name: 'no name',
          status: 'done',
          gallery_id: media.gallery_id, 
          caption: media.caption, 
          poster: media.poster, 
          thumbUrl: media.thumbUrl, 
          url: media.url
        } )
      })
      //Push the galleries we just got into the existing Countries
      if(this.countries){
        this.countries.forEach(cou => {
          if(cou.gallery) {
            let media = list.filter(m => m.gallery_id === cou.gallery.id)
            cou.media = media.length ? media : false
          }
        })
        this.resetAlert()
        this.setState({
          media: list,
          countries: this.countries, 
          feedback: {
            msg: 'Media successfully loaded!',
            style: 'success'
          },
          is_loaded: true
        })
      }
    })
    .finally( updateBodyStyle() )
    .catch(error => {
      this.setState({
        feedback: {
          msg: `An error occurred when loading Media! ${error.data}`,
          style: 'danger'
        }
      })
    })
  }

  componentDidUpdate(){
    let slides = document.querySelectorAll('.slick-slide:not(.slick-clone)')
    if(slides && !this.state.slides) {
      slides.forEach(sl => {
        sl.classList.add('btn')
        sl.addEventListener('click', (e) => {
          let target = e.target.querySelector('img')
          console.log(target)
          if(target) this.setModal("preview",'','', [], false, false, target.src, target.title)
        })
      })
    }
  }

  getUser(){
    this.setState({loading:true})
    api.get('/user')
    .then(response => {
      this.resetAlert()
      this.setState({
        user: response.data,
        feedback: {
          msg: 'User successfully loaded!',
          style: 'success'
        },
        is_loaded: true
      })
    })
    .finally(
      updateBodyStyle()
    )
    .catch(error => {
      this.setState({
        feedback: {
          msg: `And error occurred when loading User! ${error.data}`,
          style: 'danger'
        }
      })
    })
  }

  componentDidMount() {
    this.getUser()
    this.getGalleries(this.getMedia)
    this.getPrograms()
    this.getCountries()
    this.getContinents()
  }

  render(){
    let levels = []
    if(this.state.continent) levels.push(this.state.continent)
    if(this.state.country) levels.push(this.state.country)

    return (
      <>
        { this.state.user &&
        <Topbar username={this.state.user.username} image={this.state.user.photo}/>
        }
        <Header show_frontend={true} show_ui={false}/>
        <Feedback feedback={this.state.feedback}/>
        <article key="map__wrapper" 
        className="d-flex m-0 px-0 align-items-stretch justify-content-stretch h-100 w-100 flex-column bg-aluminum">
          <Greeting/>
          <Navigation levels={levels} selectCountry={this.selectCountry} 
          toggleCountries={toggleCountries} selectContinent={this.selectContinent}/>
          <World continent={this.state.continent} continents={this.state.continents}
            country={this.state.country} countries={this.state.countries} programs={this.state.programs} 
            selectCountry={this.selectCountry} selectContinent={this.selectContinent} 
            checkContinent={this.checkContinent} checkCountries={this.checkCountries}/>
        </article>
        <Modal 
          id="main__modal_window"  
          loading={this.state.loading}
          copy={this.state.modal.copy} 
          headline={this.state.modal.headline}
          image={this.state.modal.image} 
          credit={this.state.modal.credit} 
          type={this.state.modal.type}
          ctas={this.state.modal.ctas}
          nStyle={this.state.modal.nStyle} 
          inputs={this.state.modal.inputs} 
          resetModal={this.resetModal} 
          deleteMedia={this.deleteMedia}  
          uploadMedia={this.uploadMedia} 
          on_submit={this.state.modal.on_submit}/>
        <Footer show_frontend={true}/>
      </>
    )
  }
}

export default Screen
