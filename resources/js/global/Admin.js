import api from '../api.js'
import cms from '../cms.json'
import {timedAlert, updateBodyStyle} from '../functions'
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

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
      },
      countries_have_posted: true,
      programs_have_posted: true
    }

    this.countries = []
    this.programs = []

    this.resetAlert = this.resetAlert.bind(this)

    this.getContinents  = this.getContinents.bind(this)

    //Country Methods
    this.parseCountry     = this.parseCountry.bind(this)
    this.editCountry      = this.editCountry.bind(this)
    this.suspendCountry   = this.suspendCountry.bind(this)
    this.getCountries     = this.getCountries.bind(this)

    // Program Methods
    this.getPrograms      = this.getPrograms.bind(this)
    this.deleteProgram    = this.deleteProgram.bind(this)
    this.deletePrograms   = this.deletePrograms.bind(this)
    this.editProgram      = this.editProgram.bind(this)
    this.parseProgram     = this.parseProgram.bind(this)
    this.postProgram      = this.postProgram.bind(this)
    this.getGalleries     = this.getGalleries.bind(this)

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

    this.setQR            = this.setQR.bind(this)
  }

  setQR(url, country){
    this.setState({loading: true})
    country.code = url
    api.put(`/resource/countries/${country.id}`,country)
    .then( () => {
      let np = this.state.countries
      country = this.parseCountry(country)
      this.state.countries[country.id - 1] = country
      
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

  uploadMedia(media, gallery_id, country) {
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
          media.file.percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          media.file.state = 'uploading'
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              media.file.state = 'paused'
            break;
            case firebase.storage.TaskState.RUNNING:
            default: 
              //console.log('Upload is running')
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
          media.file.percent = 100
          media.file.state = 'done'
        })
      })
      .catch( error => {
        this.setState({
          feedback: {
            msg: `An error occurred while trying to create ${media.file.name}: ${error}`,
            style: 'danger'
          },
          media_has_posted: false
        })
      })
    }
  }

  editProgram(program){
    this.setState({loading: true})
    api.put(`/resource/programs/${program.id}`,program)
    .then( response => {
      let np = this.state.programs.filter(p => p.id !== program.id)
      np.push(response.data)
      this.resetAlert()
      this.setState({
        feedback: {
          msg: `${program.name} successfully updated!`,
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
          msg: `An error occurred while trying to update ${program.name}: ${error}`,
          style: 'danger'
        },
        programs_have_posted: false
      })
    })
  }

  postProgram(program){
    this.setState({loading: true})
    api.post('/resource/programs', program)
    .then( response => {
      program.id = response.data
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

  //Clear out the modal in the state object for this or a child component
  resetModal(){
    this.setState({modal: {}})
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
    api.get('/resource/continents')
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

  parseCountry(country) {
    country.id = parseFloat(country.id)
    country.continent_id = parseFloat(country.continent_id)
    country.programs = this.state.countries[country.id - 1].programs
    country.updated_at = new Date()
    return country
  }

  parseProgram(program) {
    program.id = parseFloat(program.id)
    program.countries = program.countries.map(c => parseFloat(c))
    return program
  }

  editCountry(country){
    this.setState({loading: true})
    api.put(`/resource/countries/${country.id}`,country)
    .then( () => {
      let np = this.state.countries
      country = this.parseCountry(country)
      this.state.countries[country.id - 1] = country
      
      this.resetAlert()
      this.setState({
        feedback: {
          msg: `${country.name} updated!`,
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
          msg: `An error occurred while trying to toggle suspension on ${country.name}: ${error}`,
          style: 'danger'
        },
        countries_have_posted: false
      })
    })
  }

  suspendCountry(country){
    this.setState({loading: true})
    api.put(`/resource/countries/${country.id}`,country)
    .then( () => {
      let np = this.state.countries
      country = this.parseCountry(country)
      this.state.countries[country.id - 1] = country
      
      this.resetAlert()
      this.setState({
        feedback: {
          msg: `${country.name} ${country.suspended !== 'on' ? 'reinstated' : 'suspended'}!`,
          style: country.suspended !== 'on' ? 'success' : 'warning'
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
          msg: `An error occurred while trying to toggle suspension on ${country.name}: ${error}`,
          style: 'danger'
        },
        countries_have_posted: false
      })
    })
  }

  getCountries(){
    this.setState({loading:true})
    api.get('/resource/countries')
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
    api.get('/resource/programs')
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

  getGalleries(){
    this.setState({loading:true})
    api.get('/resource/galleries')
    .then(response => {
      this.resetAlert()
      this.setState({
        galleries: response.data,
        feedback: {
          msg: 'Galleries successfully loaded!',
          style: 'success'
        }
      })
    })
    .finally(
      updateBodyStyle()
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
    api.get('/resource/media')
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
      this.resetAlert()
      this.setState({
        media: list,
        feedback: {
          msg: 'Media successfully loaded!',
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
          msg: `And error occurred when loading Media! ${error.data}`,
          style: 'danger'
        }
      })
    })
  }

  componentDidMount() {
    this.getContinents()
    this.getCountries()
    this.getGalleries()
    this.getMedia()
    this.getPrograms()

    updateBodyStyle('admin')
  }
    
  render(){
    return (
      <BrowserRouter>
        <Sidebar show_frontend={false}/>
        <Header show_frontend={false} show_ui={true}/>
        <Feedback feedback={this.state.feedback}/>
        <Switch>
          <Route exact path="/admin" render={() => (
            <Dashboard 
              countries={this.state.countries} 
              continents={this.state.continents} 
              programs={this.state.programs}
              galleries={this.state.galleries} 
              media={this.state.media} 
              upload={this.state.upload} 
              editModal={this.editModal} 
              createModal={this.createModal} 
              deleteModal={this.deleteModal} 
              resetModal={this.resetModal} 
              setModal={this.setModal} 
              searchSubmit={this.searchSubmit}
              editCountry={this.editCountry} 
              parseCountry={this.parseCountry} 
              suspendCountry={this.suspendCountry}
              editProgram={this.editProgram}
              deletePrograms={this.deletePrograms}
              deleteProgram={this.deleteProgram}
              parseProgram={this.parseProgram} 
              postProgram={this.postProgram} 
              uploadMedia={this.uploadMedia} 
              setQR={this.setQR} 
              resetAlert={this.resetAlert}/>
          )} />
          <Route exact path="/admin/continents" render={() => (
            <Continents countries={this.state.countries} continents={this.state.continents}/>
          )} />
          <Route exact path="/admin/countries" render={() => (
            <Countries countries={this.state.countries}
            editModal={this.editModal} 
            createModal={this.createModal} 
            deleteModal={this.deleteModal} 
            searchSubmit={this.searchSubmit}/>
          )} />
          <Route path="/admin/countries/:slug" render={(params) => (
            <Country 
              slug={params.match.params.slug}
              countries={this.state.countries} 
              programs={this.state.programs} 
              parseProgram={this.parseProgram} 
              postProgram={this.postProgram} 
              galleries={this.state.galleries} 
              media={this.state.media} 
              uploadMedia={this.uploadMedia} 
              deleteMedia={this.deleteMedia}
              editModal={this.editModal} 
              createModal={this.createModal} 
              deleteModal={this.deleteModal} 
              resetModal={this.resetModal} 
              setModal={this.setModal} 
              suspendCountry={this.suspendCountry}
              editProgram={this.editProgram}
              deletePrograms={this.deletePrograms}
              deleteProgram={this.deleteProgram} 
              postProgram={this.postProgram} 
              uploadMedia={this.uploadMedia} 
              setQR={this.setQR} 
              resetAlert={this.resetAlert}/>
          )} />
          <Route exact path="/admin/programs" render={() => (
            <Programs 
             countries={this.state.countries}
             galleries={this.state.galleries} 
             programs={this.state.programs}
             media={this.state.media}
             editModal={this.editModal} 
             createModal={this.createModal} 
             deleteModal={this.deleteModal} 
             resetModal={this.resetModal} 
             setModal={this.setModal} 
             editProgram={this.editProgram}
             parseProgram={this.parseProgram}
             deletePrograms={this.deletePrograms}
             deleteProgram={this.deleteProgram} 
             postProgram={this.postProgram} 
             searchSubmit={this.searchSubmit}/>
          )} />
          <Route exact path="/admin/galleries" render={() => (
            <Galleries 
             countries={this.state.countries} 
             galleries={this.state.galleries} 
             setModal={this.setModal} 
             deleteMedia={this.deleteMedia}  
             uploadMedia={this.uploadMedia} 
             media={this.state.media} 
             media_types={this.state.media_types}/>
          )} />
          <Route exact path="/admin/settings" render={() => (
            <Settings settings={cms.settings.options}/>
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
        <Footer show_frontend={false}/>
      </BrowserRouter>
    )
  }
}

export default Admin