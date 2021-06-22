import api from '../api.js'
import {timedAlert, updateBodyStyle} from '../functions'
import React, {Component} from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Header from "../global/Header"
import Footer from "../global/Footer"
import Map from '../pages/Map'
import Modal from "../components/Modal"
import Feedback from "../partials/Feedback"

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
      }
    }

    this.countries = []
    this.programs = []

    this.resetAlert = this.resetAlert.bind(this)

    this.getContinents  = this.getContinents.bind(this)

    //Country Methods
    this.parseCountry     = this.parseCountry.bind(this)
    this.getCountries     = this.getCountries.bind(this)

    // Program Methods
    this.getPrograms      = this.getPrograms.bind(this)
    this.parseProgram     = this.parseProgram.bind(this)
    this.getGalleries     = this.getGalleries.bind(this)

    //Media Methods
    this.getMedia         = this.getMedia.bind(this)
  
    //Modal Methods
    this.resetModal       = this.resetModal.bind(this)
    this.setModal         = this.setModal.bind(this)
  }

  //Clear out the modal in the state object for this or a child component
  resetModal(){
    let video = document.getElementById('modal_video')
    if( video ) video.pause()
    this.setState({modal: {}})
  }

  //Set the modal in the state object from this or a child component (modal is reusable)
  setModal(type='edit', headline='', copy='', ctas=false, inputs=[], on_submit=false, image=''){
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
        inputs: inputs,
        nStyle: type === 'delete' ? 'justify-content-center' : false,
        on_submit: on_submit
      }
    })
  }

  parseCountry(country) {
    country.id = parseFloat(country.id)
    country.continent_id = parseFloat(country.continent_id)
//    country.programs = this.state.countries[country.id - 1].programs
    country.updated_at = new Date()
    return country
  }

  parseProgram(program) {
    program.id = parseFloat(program.id)
    program.country_id = parseFloat(program.country_id)
    return program
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

  componentDidMount() {
    this.getGalleries(this.getMedia)
    this.getPrograms()
    this.getCountries()
    this.getContinents()
  }

  render(){
    return (
      <BrowserRouter>
        <Header show_frontend={true} show_ui={false}/>
        <Feedback feedback={this.state.feedback}/>
        <Switch>
          <Route path="/" render={() => (
            <Map
              countries={this.state.countries} 
              continents={this.state.continents} 
              programs={this.state.programs}
              galleries={this.state.galleries} 
              media={this.state.media} 
              resetModal={this.resetModal} 
              setModal={this.setModal} 
              resetAlert={this.resetAlert}/>
          )} />
        </Switch>
        <Modal 
          id="main__modal_window"  
          loading={this.state.loading}
          copy={this.state.modal.copy} 
          headline={this.state.modal.headline}
          image={this.state.modal.image} 
          type={this.state.modal.type}
          ctas={this.state.modal.ctas}
          nStyle={this.state.modal.nStyle} 
          inputs={this.state.modal.inputs} 
          resetModal={this.resetModal} 
          deleteMedia={this.deleteMedia}  
          uploadMedia={this.uploadMedia} 
          on_submit={this.state.modal.on_submit}/>
        <Footer show_frontend={true}/>
      </BrowserRouter>
    )
  }
}

export default Screen
