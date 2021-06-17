import React, {Component} from 'react'
import World from '../components/World'
import Greeting from '../components/Greeting'
import {checkPrograms, updateBodyStyle, toggleCountries, randomID, zoomMap} from '../functions'
import Navigation from '../components/Navigation'

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      continent: false, 
      continents: [],
      countries: [],
      country: false, 
      gallery: false, 
      programs: false,
      selectedPrograms: []
    }

    this.divCss           = { overflow:'scroll' }
    this.btnStyle         = "btn h2 mb-0 btn-list-item p-4 text-uppercase fw-bold text-white border-left-0 border-right-0 border-top-0 border-white text-left"

    this.checkContinent   = this.checkContinent.bind(this)
    this.parseContinents  = this.parseContinents.bind(this)
    this.selectContinent  = this.selectContinent.bind(this)

    this.checkCountries   = this.checkCountries.bind(this)
    this.parseCountries   = this.parseCountries.bind(this)
    this.selectCountry    = this.selectCountry.bind(this)

    //this.parsePrograms    = this.parsePrograms.bind(this)
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

  parseContinents(){
    if(this.props.continents.length > 0 && this.state.continents.length === 0){
      this.setState({continents: this.props.continents.filter(c => c.enabled)})
    }
  }

  parseCountries(){
    if(this.props.countries.length > 0 && this.state.countries.length === 0){
      let enabled = this.props.countries.filter(c => c.enabled)
      //enabled.forEach(e => e.curriculum = this.parsePrograms(e.id))
      this.setState({countries: enabled})
    }
  }

  selectContinent(continent=false){
    if(continent) {
      let countries  = false
      if(this.props.countries) {
        countries = this.props.countries.filter(p => p.continent_id === continent.id)
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

  componentDidUpdate(){
    this.parseCountries()
    this.parseContinents()
    updateBodyStyle('map')
    let slides = document.querySelectorAll('.slick-slide:not(.slick-clone)')
    if(slides) {
      slides.forEach(sl => {
        sl.classList.add('btn')
        sl.addEventListener('click', (e) => {
          let target = e.target.querySelector('img')
          if(target) this.props.setModal("preview",'','', [], false, false, target.src)
        })
      })
    }
  }

  componentDidMount(){
//    this.parseCountries()
//    this.parseContinents()
    updateBodyStyle('map')
  }

  render() {
    let levels = []
    if(this.state.continent) levels.push(this.state.continent)
    if(this.state.country) levels.push(this.state.country)
    return (
      <article key="map__wrapper" 
       className="d-flex m-0 px-0 align-items-stretch justify-content-stretch h-100 w-100 flex-column">
        <Greeting/>
        <Navigation levels={levels} selectCountry={this.selectCountry} 
         toggleCountries={toggleCountries} selectContinent={this.selectContinent}/>
        <World continent={this.state.continent} continents={this.props.continents}
          country={this.state.country} countries={this.props.countries} programs={this.props.programs} 
          selectCountry={this.selectCountry} selectContinent={this.selectContinent} 
          checkContinent={this.checkContinent} checkCountries={this.checkCountries}/>
      </article>
    )
  }
}

export default Map