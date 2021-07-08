import cms from '../cms.json'
import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Headline from '../components/Headline'

class Countries extends Component {
  constructor(props) {
    super(props)

    this.letters = {
      'a': [], 'b': [],'c': [],'d': [],'e': [],'f': [],'g': [],
      'h': [],'i': [],'j': [],'k': [],'l': [],'m': [],'n': [],
      'o': [],'p': [],'q': [],'r': [],'s': [],'t': [],'u': [],
      'v': [],'w': [],'x': [],'y': [],'z': []
    }

    this.jumpTo = this.jumpTo.bind(this)
    this.prepStage = this.prepStage.bind(this)
  }

  prepStage(entries){
    // Sort the entries by letter
    entries.forEach(s => {
      let group = s.slug.substr(0,1)
      let letter = this.letters[group]
      s.group = group
      if(letter) letter.push(s)
    })
  }

  //Smoothscroll down/up to a specific member
  jumpTo(event){
    event.preventDefault()
    let href = event.target.href
    let target = document.getElementById(href.substr(href.search('group')))
    target.scrollIntoView({behavior:'smooth'})
  }

  componentDidUpdate() {
    this.props.getPage('countries')
  }

  render() {
    if(this.props){
      if(this.props.countries) {
        this.prepStage(this.props.countries)
      }else{
        this.prepStage(cms.countries)
      }
    }
    
    return (
      <article key="countries__article" className="container ps-4 pe-3 ms-0 position-relative">
        <Headline key="countries__headline" 
        hStyle={cms.components.headline.style+' mx-2 bg-white'}
        headline={cms.countries.headline} copy={cms.countries.description}
        has_search={true} searchSubmit={this.props.searchSubmit}
        use_countries={true}/>
        <div key="countries__scroll_spy" data-bs-spy="scroll" data-bs-target="#navbar--countries" 
          data-bs-offset="210" style={{zIndex:1}}>
          { this.props &&
          Object.keys(this.letters).map(letter => {
          return (
            <dl data-country key={`group--${letter}`} 
            id={`group--${letter}`} className="mb-0">
            { this.props.countries &&
              this.props.countries.map( country => {
                if(country.group === letter ) {
                  return [
                    <dt key={`country__title--${country.id}`}
                      id={`country__title--${country.id}`}>
                      <Link className="h6 pb-3 pt-4 px-3 d-block mb-0" to={`/admin/countries/${country.slug}`} data-country={country.id} data-group={letter}>{country.name}</Link>
                    </dt>,
                    <dd className="d-none" key={`country__name--${country.id}`}
                      id={`country__name--${country.id}`}>{country.name}</dd>
                  ]
                }else{
                  return null
                }
              })
            }
            </dl>
          )
          }) }
          </div>
          <nav key="navbar--countries" id="navbar--countries" data-spynav 
           className="list-group sticky justify-content-start">
            { Object.keys(this.letters).map(letter => {
              let str = this.letters[letter]
              return (
                <a key={`navbar--countries__letter--${letter}`}
                 className={`list-group-item list-group-item-action border-0 text-center${str.length < 1 ? ' disabled' : ''}`} 
                 href={`#group--${letter}`} 
                 onClick={this.jumpTo} 
                 style={{lineHeight:1}}>{letter.toUpperCase()}</a>
              )
            }) }
          </nav>
      </article>
    )
  }
}

export default Countries