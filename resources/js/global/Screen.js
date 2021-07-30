import api from '../api.js'
import {timedAlert} from '../functions'
import {toggleCountries, zoomMap} from '../world'
import {checkPrograms} from '../programs'
import React, {Component} from "react"
import Header from "../global/Header"
import Footer from "../global/Footer"
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
    this.continents = []

    this.resetAlert       = this.resetAlert.bind(this)

    // Continents Methods
    this.checkContinent   = this.checkContinent.bind(this)
    this.selectContinent  = this.selectContinent.bind(this)
    this.setContinent    = this.setContinent.bind(this)

    //Country Methods
    this.checkCountries   = this.checkCountries.bind(this)
    this.selectCountry    = this.selectCountry.bind(this)
    this.setCountry     = this.setCountry.bind(this)
  
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
      exists = exists[0]
      if(exists.enabled === 'on') {
        let styles = ''
        if(exists.suspended === 'off'){
          styles =  'active'
          styles += checkPrograms(exists)
          styles += ' opacity-'+exists.color
        }else{
          styles = 'suspended'
        }
        return styles
      }else{
        return 'disabled'
      }
    }else{
      return ''
    }
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
        gallery: false
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
  setModal(image='', credit=false){
    $('#main__modal_window').modal('show')

    this.setState({
      modal: {
        type: 'preview',
        headline: '',
        copy: '',
        ctas: false,
        image: image, 
        credit: credit, 
        inputs: [],
        nStyle: false,
        on_submit: false
      }
    })
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

  setContinent(continent) {
    let act = ''
    let exists = this.continents.length ? false : this.continents.filter(c => c.id === continent.id)
    if(exists.length){
      this.continents = this.continents.map(c => c.id === continent.id ? continent : c)
      act = 'updated'
    }else{
      this.continents.push(continent)
      act = 'added'
    }

    this.resetAlert()
    this.setState({
      continents: this.continents,
      feedback: {
        msg: continent.name+' successfully '+act+'!',
        style: 'success'
      }
    })
  }

  setCountry(country){
    let act = ''
    let exists = this.countries.length ? false : this.countries.filter(c => c.id === country.id)
    if(exists.length){
      this.countries = this.countries.map(c => c.id === country.id ? country : c)
      act = 'updated'
    }else{
      this.countries.push(country)
      act = 'added'
    }

    this.resetAlert()
    this.setState({
      countries: this.countries,
      feedback: {
        msg: country.name+' successfully '+act+'!',
        style: 'success'
      }
    })
  }

  componentDidUpdate(){
    let slides = document.querySelectorAll('.slick-slide:not(.slick-clone)')
    if(slides && !this.state.slides) {
      slides.forEach(sl => {
        sl.classList.add('btn')
        sl.addEventListener('click', (e) => {
          let target = e.target.querySelector('img')
          if(target) this.setModal(target.dataset.src, target.title)
        })
      })
    }
  }

  componentDidMount() {
    api.get('/database')
    .finally(() => {
      this.resetAlert()
      this.setState({
        feedback: {
          msg: 'New screen added to the System',
          style: 'success'
        },
      })
    })

    //Dev Note: this next line is temporary
    this.setState({has_server: true})

    Echo.channel(`continents`)
    .listen('ContinentsUpdated', (e) => {
      this.setContinent(e.continents)
    })

    Echo.channel(`countries`)
    .listen('CountriesUpdated', (e) => {
      this.setCountry(e.countries)
    })
  }

  render(){
    let levels = []
    if(this.state.continent) levels.push(this.state.continent)
    if(this.state.country) levels.push(this.state.country)

    return (
      <>
        <Header show_frontend={true} user_type={false}/>
        <Feedback feedback={this.state.feedback}/>
        <article key="map__wrapper" 
        className="d-flex m-0 px-0 align-items-stretch justify-content-stretch h-100 w-100 flex-column bg-aluminum">
          <Greeting/>
          <Navigation levels={levels} selectCountry={this.selectCountry} 
          toggleCountries={toggleCountries} selectContinent={this.selectContinent}/>
          <World show_suspended={false} continent={this.state.continent} continents={this.state.continents}
            country={this.state.country} countries={this.state.countries} programs={this.state.programs} 
            selectCountry={this.selectCountry} selectContinent={this.selectContinent} 
            checkContinent={this.checkContinent} checkCountries={this.checkCountries}/>
        </article>
        <Modal 
          id="main__modal_window"  
          loading={this.state.loading}
          image={this.state.modal.image} 
          credit={this.state.modal.credit} 
          type={this.state.modal.type}
          resetModal={this.resetModal} />
        <Footer show_frontend={true}/>
      </>
    )
  }
}

export default Screen
