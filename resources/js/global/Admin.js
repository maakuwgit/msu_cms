import api from '../api.js'
import cms from '../cms.json'
import {getPaths, timedAlert, updateBodyStyle} from '../functions'
import React, {Component} from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Header from "../global/Header"
import Footer from "../global/Footer"
import Sidebar from "../global/Sidebar"
import Modal from "../components/Modal"
import Country from "../pages/Country"
import Feedback from "../partials/Feedback"
import Countries from "../pages/Countries"
import Continents from "../pages/Continents"
import Dashboard from "../pages/Dashboard"
import Galleries from "../pages/Galleries"
import Programs from "../pages/Programs"
import Settings from "../pages/Settings"
import firebase from 'firebase/app'
import 'firebase/storage'
import Topbar from './Topbar.js'

// Firebase configuration: measurementId is optional!
const app = firebase.initializeApp({
  apiKey: cms.settings.firebase.api_key,
  authDomain: cms.settings.firebase.auth_domain,
  projectId: cms.settings.firebase.project_id,
  storageBucket: cms.settings.firebase.storage_bucket, 
  messagingSenderId: cms.settings.firebase.messaging_sender_id,
  appId: cms.settings.firebase.app_id,
  measurementId: cms.settings.firebase.measurement_id
})

class Admin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      continents: [], 
      countries: [],
      galleries: [], 
      programs: [], 
      media: [], 
      db_path: 'cms', 
      media_types: [], 
      has_server: true,
      loading: false, 
      user: false,
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
      countries_have_posted: true,
      programs_have_posted: true
    }

    this.continents = []
    this.countries  = []
    this.galleries  = []
    this.programs   = []
    this.media      = []

    this.resetAlert = this.resetAlert.bind(this)
    this.checkPage  = this.checkPage.bind(this)
    this.getPage    = this.getPage.bind(this)

    this.getContinents  = this.getContinents.bind(this)

    //Country Methods
    this.editCountry      = this.editCountry.bind(this)
    this.injectCountry    = this.injectCountry.bind(this)
    this.parseCountry     = this.parseCountry.bind(this)
    this.suspendCountry   = this.suspendCountry.bind(this)
    this.getCountries     = this.getCountries.bind(this)

    // Program Methods
    this.getPrograms      = this.getPrograms.bind(this)
    this.deleteProgram    = this.deleteProgram.bind(this)
    this.deletePrograms   = this.deletePrograms.bind(this)
    this.editProgram      = this.editProgram.bind(this)
    this.injectProgram    = this.injectProgram.bind(this)
    this.parseProgram     = this.parseProgram.bind(this)
    this.postProgram      = this.postProgram.bind(this)
    this.getGalleries     = this.getGalleries.bind(this)
    this.setQR            = this.setQR.bind(this)

    //Media Methods
    this.getMedia         = this.getMedia.bind(this)
    this.uploadMedia      = this.uploadMedia.bind(this)
    this.deleteMedia      = this.deleteMedia.bind(this)
    this.searchSubmit     = this.searchSubmit.bind(this)
  
    //Modal Methods
    this.resetModal       = this.resetModal.bind(this)
    this.setModal         = this.setModal.bind(this)
    this.editModal        = this.editModal.bind(this)
    this.createModal      = this.createModal.bind(this)
    this.deleteModal      = this.deleteModal.bind(this)

    //Settings
    this.getUser          = this.getUser.bind(this)
  }

  setQR(url, country){
    this.setState({loading: true})
    country.code = url
    api.put(`/resource/countries/${country.id}`,country)
    .then((response) => {
      let np = this.injectCountry(response.data)
      
      this.resetAlert()
      this.setState({
        feedback: {
          msg: `${country.name} QR code updated!`,
          style: 'success'
        },
        countries: np, 
        loading: false,
        countries_have_posted: true
      })
      this.countries = np
    })
    .catch( error => {
      this.setState({
        feedback: {
          msg: `An error occurred while trying to update the QR code on ${country.name}: ${error}`,
          style: 'danger'
        },
        countries_have_posted: false
      })
    })
  }

  deleteMedia(media){
    this.setState({loading: true})
    let id = media.id
    api.delete(`/resource/media/${id}`)
    .then( response => {
      let nm = this.state.media.filter(m => m.id !== id)  
      firebase.storage().refFromURL(media.url).delete().then(() => {
        // File deleted successfully
        this.resetAlert()
        //Then update the file references
        this.setState({
          feedback: {
            msg: response.data,
            style: 'success'
          },
          media: nm,
          loading: false,
          media_has_posted: true
        })
      }).catch((error) => {
        this.setState({
          feedback: {
            msg: `Uh-oh, an error occurred! :${error}`,
            style: 'danger'
          },
          loading: false,
          media_has_posted: true
        })
      })
    })
    .catch( error => {
      this.setState({
        feedback: {
          msg: `An error occurred while trying to delete "${media.url}" from the database: ${error}`,
          style: 'danger'
        },
        programs_have_posted: false
      })
    })
  }

  uploadMedia(media, gallery_id) {
    this.setState({loading: true})
    let url = cms.settings.firebase.url+media.file.name+'?alt=media'
    let gallery = this.state.galleries.filter(g=>g.id === gallery_id)
    let obj = this.state.media.filter( m => m.url === url && m.gallery_id === gallery_id)
    gallery = gallery.length ? gallery[0] : false
    if(obj.length) {
      firebase.storage().ref(media.file.name).put(media.file)
      this.resetAlert()
      //Then update the file references
      this.setState({
        feedback: {
          msg: `${media.file.name} successfully updated!`,
          style: 'success'
        },
        loading: false,
        media_has_posted: true
      })
    }else{
      obj = {
        gallery_id: gallery_id,
        name: media.file.name,
        type: 1,
        updated_at: new Date(),
        url: url
      }

      api.post(`/resource/media`,obj)
      .then( response => {
        let nm = this.state.media
        obj.id = response.data
        obj.uid = response.data
        obj.status = 'done'
        obj.url = url
        nm.push(obj)

        this.resetAlert()
        //Then update the file references
        this.setState({
          feedback: {
            msg: `${media.file.name} successfully added to gallery #${gallery_id}!`,
            style: 'success'
          },
          loading: false,
          media_has_posted: true
        })
        firebase.storage().ref(media.file.name).put(media.file).on('state_changed' , (snapshot) => {
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              media.file.state = 'paused'
            break;
            case firebase.storage.TaskState.RUNNING:
            default: 
              //console.log('Upload is running')
              media.onProgress({percent: (snapshot.bytesTransferred / snapshot.totalBytes) * 100})
            break;
          }
        }, 
        (error) => {
          let state = {
            feedback: {
              style: 'danger'
            }, 
            media: nm, 
            media_has_posted: false
          }
          switch (error.code) {
            case 'storage/unauthorized':
              state.feedback.msg = `An error occurred while trying to create ${media.file.name} because you don't have permission to access this image/video`
            break;
            case 'storage/canceled':
              state.feedback.msg = `Upload cancelled`
              state.feedback.style = 'warning'
            break;
            case 'storage/unknown':
              state.feedback.msg = `An unknown error occurred while trying to create ${media.file.name}, inspect error.serverResponse`
            break;
          }
          this.setState(state)
          this.media = nm
          media.file.state = 'error'
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          this.setState({
            feedback: {
              msg: `${media.file.name} successfully uploaded to Firebase!`,
              style: 'success'
            }
          })
          media.onSuccess(media.file)
        })
      })
      .catch( error => {
        media.onError(error)
        this.setState({
          feedback: {
            msg: `${media.file.name} can't be uploaded! ${error.response.data.message}`,
            style: 'danger'
          },
          media_has_posted: false
        })
      })
    }
  }

  editProgram(program, callback=false){
    program = this.parseProgram(program)
    this.setState({loading: true})
    api.put(`/resource/programs/${program.id}`,program)
    .then( response => {
      let np = this.injectProgram(response.data)
      this.resetAlert()
      this.setState({
        feedback: {
          msg: `${program.name} successfully updated!`,
          style: 'success'
        },
        programs: np, 
        programs_have_posted: true
      })
      this.programs = np
    })
    .finally(vars => {
      this.setState({loading:false})
      if(callback) callback()
    })
    .catch( error => {
      this.setState({
        feedback: {
          msg: `An error occurred while trying to update ${program.name}: ${error}`,
          style: 'danger'
        },
        programs_have_posted: false
      })
    })
  }

  injectProgram(program) {
    return this.state.programs.map(p => {
      if(p.id !== program.id){
        return p
      }else{
        return program
      }
    })
  }

  postProgram(program, callback=false){
    program = this.parseProgram(program)
    this.setState({loading: true})
    api.post('/resource/programs', program)
    .then( response => {
      program = response.data
      let np = this.state.programs.concat(program)
      
      this.resetAlert()
      this.setState({
        feedback: {
          msg: `${program.name} successfully created!`,
          style: 'success'
        },
        programs: np, 
        loading: false,
        programs_have_posted: true
      })
      this.programs = np
      if(callback) callback(program)
    })
    .catch( error => {
      this.setState({
        feedback: {
          msg: `An error occurred while trying to create a program: ${error}`,
          style: 'danger'
        },
        programs_have_posted: false
      })
    })
  }

  deleteProgram(id){
    this.setState({loading: true})
    api.delete(`/resource/programs/${id}`)
    .then( response => {
      let np = this.state.programs.filter(p => p.id !== id)
      
      this.resetAlert()
      this.setState({
        feedback: {
          msg: response.data,
          style: 'success'
        },
        programs: np, 
        loading: false,
        programs_have_posted: true
      })
      this.programs = np
    })
    .catch( error => {
      this.setState({
        feedback: {
          msg: `An error occurred while trying to delete the program: ${error}`,
          style: 'danger'
        },
        programs_have_posted: false
      })
    })
  }

  deletePrograms(programs){
    let np = this.state.programs
    this.setState({loading: true})
    programs.forEach( pr => {
      api.delete(`/resource/programs/${pr.id}`)
      .then( response => {
        np = this.state.programs.filter(p => p.id !== pr.id)
        this.setState({
          feedback: {
            msg: response.data,
            style: 'success'
          },
          programs: np, 
          programs_have_posted: true
        })
        this.programs = np
      })
      .catch( error => {
        this.setState({
          feedback: {
            msg: `An error occurred while trying to update Programs: ${error}`,
            style: 'danger'
          },
          programs_have_posted: false
        })
      })
    })

    this.resetAlert()
    this.setState({
      loading: false
    })
  }

  //An Interface for the setModal that will slightly realign the display
  editModal(title, copy, inputs, on_submit) {
    if(this.props){
      this.setModal("edit",title,copy, [
        {
          label: 'Update',
          icon: false
        }
      ], inputs, on_submit)
    }
  }
  
  //An Interface for the setModal that will slightly realign the display
  createModal(title, copy, inputs, on_submit) {
    if(this.props){
      this.setModal("create",title,copy, [
        {
          label: 'Save',
          icon: false
        }
      ], inputs, on_submit)
    }
  }
  
  //An Interface for the setModal that will slightly realign the display
  deleteModal(title, copy, inputs, on_submit) {
    if(this.props){
      this.setModal("delete",title,copy, [
        {
          label: 'Confirm',
          style: 'danger',
          icon: 'math--multiply',
          callback: on_submit
        }
      ], inputs)
    }
  }

  //Set the modal in the state object from this or a child component (modal is reusable)
  setModal(type='edit', headline='', copy='', ctas=false, inputs=[], on_submit=false, image='', caption=false){
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
        caption: caption, 
        inputs: inputs,
        nStyle: type === 'delete' ? 'justify-content-center' : false,
        on_submit: on_submit
      }
    })
  }

  //Clear out the modal in the state object for this or a child component
  resetModal(){
    $('#main__modal_window').modal('hide')
    setTimeout(() => this.setState({modal: {}}), 300)
  }

  //Triggered onSubmit of form and onChange
  searchSubmit(str='', use_countries=false, use_programs=false){
    let state = {}
    let target = this
    if(str) {
        let query = str.trim().toLowerCase()
        if(use_countries) {
          let filteredCoun = target.countries.filter(r => 
            `${r.id}`.indexOf(query) >= 0 ||
            `${r.name.toLowerCase()}`.indexOf(query) >= 0
          )
          state.countries = filteredCoun
        }
        if(use_programs) {
          let filteredPro = target.programs.filter(r => 
            `${r.id}`.indexOf(query) >= 0 ||
            `${r.name.toLowerCase()}`.indexOf(query) >= 0 ||
            `${r.semester.toLowerCase()}`.indexOf(query) >= 0
          )
          state.programs = filteredPro
        }
    }else{
      if( use_countries ) {
        state.countries = target.countries
      }
      if( use_programs ) {
        state.programs = target.programs
      }
    }
    target.setState(state)
  }

  //Set the alert window to its original state
  resetAlert(msg=false,style=''){
    timedAlert(() => {
      this.setState({
        feedback: {
          msg: msg,
          style: style
        }
      })
    })
  }

  //Basic calls, requiring no login
  getContinents(callback=false) {
    this.setState({loading:true})
    api.get(`/${this.state.db_path}/continents`)
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
      this.continents = response.data
    })
    .finally(vars => {
      this.setState({loading:false})
      if(callback) callback()
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

  parseCountry(country) {
    country.id = parseFloat(country.id)
    country.enabled = country.enabled === 'true' ? 'on' : 'off'
    country.continent_id = parseFloat(country.continent_id)
    country.continent = JSON.parse(country.continent)
    country.programs = JSON.parse(country.programs)
    country.gallery_id = country.gallery[0].id
    country.gallery = JSON.parse(country.gallery)
    country.updated_at = new Date()
    return country
  }

  parseProgram(program) {
    if(program.id) program.id = parseFloat(program.id)
    program.countries = typeof program.country_ids != 'string' ? 
                        JSON.stringify(program.country_ids) : 
                        program.country_ids
    delete program.country_ids
    return program
  }

  editCountry(country, callback=false){
    country = this.parseCountry(country)
    this.setState({loading: true})
    api.put(`/resource/countries/${country.id}`,country)
    .then((response) => {
      let np = this.injectCountry(response.data)
      this.resetAlert()
      this.setState({
        feedback: {
          msg: `${country.name} updated!`,
          style: 'success'
        },
        countries: np, 
        countries_have_posted: true
      })
      this.countries = np
    })
    .finally(vars => {
      this.setState({loading:false})
      if(callback) callback()
    })
    .catch( error => {
      this.setState({
        feedback: {
          msg: `An error occurred while trying to toggle suspension on ${country.name}: ${error}`,
          style: 'danger'
        },
        countries_have_posted: false
      })
    })
  }

  injectCountry(data){
    return this.state.countries.map(cou => {
      if(cou.id === data.id) {
        return data
      }else{
        return cou
      }
    })
  }

  suspendCountry(country, callback=false){
    country = this.parseCountry(country)
    this.setState({loading: true})
    api.put(`/resource/countries/${country.id}`,country)
    .then((response) => {
      let np = this.injectCountry(response.data)
      this.resetAlert()
      this.setState({
        feedback: {
          msg: `${country.name} ${country.suspended !== 'on' ? 'reinstated' : 'suspended'}!`,
          style: country.suspended !== 'on' ? 'success' : 'warning'
        },
        countries: np, 
        countries_have_posted: true
      })
      this.countries = np
    })
    .finally( vars  => {
      this.setState({loading: false})
      if(callback) callback()
    })
    .catch( error => {
      this.setState({
        feedback: {
          msg: `An error occurred while trying to toggle suspension on ${country.name}: ${error}`,
          style: 'danger'
        },
        countries_have_posted: false
      })
    })
  }

  getCountries(callback=false){
    this.setState({loading:true})
    api.get(`/${this.state.db_path}/countries`)
    .then(response => {
      this.countries = response.data
      this.resetAlert()
    })
    .finally(vars => {
      this.setState({
        countries: this.countries,
        feedback: {
          msg: 'Countries successfully loaded!',
          style: 'success'
        }
      })
      if(callback) callback()
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

  getPrograms(callback=false){
    this.setState({loading:true})
    api.get(`/${this.state.db_path}/programs`)
    .then(response => {
      this.resetAlert()
      this.setState({
        programs: response.data,
        feedback: {
          msg: 'Programs successfully loaded!',
          style: 'success'
        }
      })
      this.programs = response.data
    })
    .finally(vars => {
      this.setState({loading:false})
      if(callback) callback()
    })
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
    api.get(`/${this.state.db_path}/galleries`)
    .then(response => {
      this.resetAlert()
      this.setState({
        galleries: response.data,
        feedback: {
          msg: 'Galleries successfully loaded!',
          style: 'success'
        }
      })
      this.galleries = response.data
    })
    .finally(vars => {
      this.setState({loading:false})
      if(callback) callback()
    })
    .catch(error => {
      this.setState({
        feedback: {
          msg: `And error occurred when loading the Galleries! ${error.data}`,
          style: 'danger'
        }
      })
    })
  }
  
  getMedia(callback=false){
    this.setState({loading:true})
    api.get(`/${this.state.db_path}/media`)
    .then(response => {
      let list = response.data.map(media => {
        return ( {
          id: media.id,
          uid: media.id,
          name: 'no name',
          status: 'done',
          gallery_id: media.gallery_id, 
          thumbUrl: media.thumbUrl, 
          caption: media.caption, 
          poster: media.poster, 
          url: media.url
        } )
      })
      this.resetAlert()
      this.setState({
        media: list,
        feedback: {
          msg: 'Media successfully loaded!',
          style: 'success'
        }
      })
      this.media = list
    })
    .finally(vars => {
      this.setState({loading:false})
      if(callback) callback()
    })
    .catch(error => {
      this.setState({
        feedback: {
          msg: `And error occurred when loading Media! ${error.data}`,
          style: 'danger'
        }
      })
    })
  }

  getUser(callback=false){
    this.setState({loading:true})
    api.get('/user')
    .then(response => {
      this.resetAlert()
      let user = response.data
      let db_path = user ? ( user.user_level_id === 1 ? 'resource' : 'cms' ) : 'resource'
      this.setState({
        user: user,
        db_path: db_path,
        feedback: {
          msg: 'User successfully loaded!',
          style: 'success'
        },
      })
    })
    .finally(vars => {
      this.setState({loading:false})
      if(callback) callback()
      updateBodyStyle('logged')
    })
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
    updateBodyStyle('admin')
    this.checkPage()
  }

  getPage(page) {
    switch(page){
      case 'galleries':
        if(!this.galleries.length & !this.state.loading) this.getGalleries(this.getMedia)
        updateBodyStyle('galleries')
      break;
      case 'continents':
        if(!this.continents.length & !this.state.loading) this.getContinents()
        updateBodyStyle('continents')
      break;
      case 'programs':
        if(!this.programs.length & !this.state.loading) this.getPrograms(this.getCountries)
        updateBodyStyle('programs')
      break;
      case 'settings':
        //if(!this.state.settings) this.getSettings() Dev Note: not devved yet. Settings are in the json for now
        updateBodyStyle('settings')
      case 'countries':
        if(!this.continents.length & !this.state.loading) this.getContinents(this.getCountries)
        updateBodyStyle('countries')
      break;
      case 'country':
        //Dev Note: we need a straight country call, but this'll work for now
        if(!this.continents.length & !this.state.loading) this.getContinents(this.getCountries)
        updateBodyStyle('country')
      break;
      default:
        if(!this.continents.length & !this.state.loading) this.getContinents(this.getCountries)
        if(!this.media.length & !this.state.loading) this.getMedia(this.getPrograms)
        if(!this.galleries.length & !this.state.loading) this.getGalleries()
        updateBodyStyle('dashboard')
      break;
    }
  }

  checkPage(){
    this.getUser(() => {
      let paths = getPaths()
      if(paths.includes('galleries')){
        this.getPage('galleries')
      } else if(paths.includes('continents')){
        this.getPage('continents')
      } else if(paths.includes('programs')){
        this.getPage('programs')
      } else if(paths.includes('settings')){
        //this.getSettings() Dev Note: not devved yet. Settings are in the json for now
        this.getPage('settings')
      } else {
        if(paths.includes('countries')){
          this.getPage('countries')
          if(paths.length > 3){
            this.getPage('country')
          }
        }else{
          this.getPage('dashboard')
        }
      }
    })
  }
    
  render(){
    let user_type = this.state.user ? this.state.user.user_level_id : false
    let globalVars = {
      upload: this.state.upload, 
      continents: this.state.continents,
      countries: this.state.countries,
      galleries: this.state.galleries, 
      programs: this.state.programs, 
      media: this.state.media,
      media_types: this.state.media_types,
      user_type: user_type
    }

    let globalMethods = {
      //Alert Methods
      resetAlert: this.resetAlert, 
      //Page Methods
      getPage: this.getPage,
      //Modal Methods
      editModal: this.editModal, 
      createModal: this.createModal, 
      deleteModal: this.deleteModal, 
      resetModal: this.resetModal, 
      setModal: this.setModal, 
      //Search Methods
      searchSubmit: this.searchSubmit
    }

    let countryMethods = {
      editCountry: this.editCountry,
      parseCountry: this.parseCountry,
      suspendCountry: this.suspendCountry,
      setQR: this.setQR
    }

    let mediaMethods = {
      uploadMedia: this.uploadMedia,  
      deleteMedia: this.deleteMedia
    }

    let programMethods = {
      editProgram: this.editProgram, 
      parseProgram: this.parseProgram, 
      deletePrograms: this.deletePrograms, 
      deleteProgram: this.deleteProgram, 
      postProgram: this.postProgram, 
    }
    
    return (
      <BrowserRouter>
        <Sidebar show_frontend={false}/>
        <Topbar user_type={this.state.user ? this.state.user.user_level_id : false} username={this.state.user ? this.state.user.username : false} image={this.state.user ? this.state.user.photo : false}/>
        <Header show_frontend={false}
         show_menu={this.state.user ? this.state.user.user_level_id === 1 : false} 
         hStyle={'bg-white'} 
         figStyle={"py-0 ps-3 text-start text-uppercase my-auto ms-0 me-auto"}/>
        <Feedback feedback={this.state.feedback}/>
          { user_type === 1 ?
          <Switch>
            <Route exact path="/admin" render={() => (
              <Dashboard {...globalVars} {...globalMethods} {...mediaMethods} {...countryMethods} {...programMethods}/>
            )} />
            <Route exact path="/admin/continents" render={() => (
              <Continents {...globalVars} {...globalMethods}/>
            )} />
            <Route exact path="/admin/countries" render={() => (
              <Countries {...globalVars} {...globalMethods}/>
            )} />
            <Route path="/admin/countries/:slug" render={(params) => (
              <Country {...globalVars} {...globalMethods} {...mediaMethods} {...countryMethods} slug={params.match.params.slug}/>
            )} />
            <Route exact path="/admin/programs" render={() => (
              <Programs {...globalVars} {...globalMethods} {...programMethods}/>
            )} />
            <Route exact path="/admin/galleries" render={() => (
              <Galleries {...globalVars} {...globalMethods} {...mediaMethods}/>
            )} />
            <Route exact path="/admin/settings" render={() => (
              <Settings {...globalVars} {...globalMethods}/>
            )} />
          </Switch>
          :
          <Dashboard {...globalVars} {...globalMethods} {...mediaMethods} {...countryMethods} {...programMethods}/>
        }
        <Modal id="main__modal_window" {...mediaMethods}
          loading={this.state.loading}
          copy={this.state.modal.copy} 
          headline={this.state.modal.headline}
          image={this.state.modal.image} 
          caption={this.state.modal.caption}
          type={this.state.modal.type}
          ctas={this.state.modal.ctas}
          nStyle={this.state.modal.nStyle} 
          inputs={this.state.modal.inputs} 
          resetModal={this.resetModal} 
          on_submit={this.state.modal.on_submit}/>
        <Footer show_frontend={false}/>
      </BrowserRouter>
    )
  }
}

export default Admin