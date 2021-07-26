import cms from '../cms.json'
import React, {Component} from 'react'
import Gallery from '../partials/Gallery'
import Headline from '../components/Headline'

class Galleries extends Component {
  constructor(props) {
    super(props)

    this.previewModal = this.previewModal.bind(this)
  }

  componentDidUpdate() {
    this.props.getPage('galleries')
  }

  //An Interface for the setModal that will slightly realign the display
  previewModal(file) {
    if(this.props){
      this.props.setModal("preview",file.name,'', [], false, false, file.url)
    }
  }

  render() {
    return (
      <article key="galleries__article" className={cms.theme.article}> 
        <Headline key="galleries__headline" 
        hStyle={cms.components.headline.style+' bg-white'}
        headline={cms.galleries.headline} copy={cms.galleries.description}/>
        <div className="px-3 overflow-scroll h-100">
        { ( this.props.galleries ) &&
          this.props.galleries.map((gallery, g) => {
            let country = gallery.countries
            if(country) {
              let files = this.props.media.filter(media => media.gallery_id === gallery.id)
              return <Gallery key={`gallery--${g}`} 
               deleteMedia={this.props.deleteMedia} 
               uploadMedia={this.props.uploadMedia} 
               country={country} 
               id={gallery.id} 
               index={g} 
               previewModal={this.previewModal}
               files={files}/>
            }
          })
        }
        </div>
      </article>
    )
  }
}

export default Galleries