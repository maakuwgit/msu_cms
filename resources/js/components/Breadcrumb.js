import React, {Component} from 'react'
import {Tooltip} from 'antd'
import cms from '../cms.json'
import {toggleContinents, toggleCountries, zoomMap} from '../functions'

class Breadcrumb extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: '',
      name: cms.world.label
    }

    this.filters = [
      {
        value: '', 
        label: 'View All'
      },
      {
        label: 'Active Countries',
        value: 'countries--active'
      },
      {
        value: 'countries--programs', 
        label: 'Place With Programs'
      },
      {
        value: 'continents',
        label: 'Contients Only'
      },
      {
        value: 'islands-archipelagos',
        label: 'Islands & Archipelagos'
      }
    ]

    this.resetContinent  = this.resetContinent.bind(this)
    this.resetCountry  = this.resetCountry.bind(this)
    this.setFilter = this.setFilter.bind(this)
    this.setHome = this.setHome.bind(this)
  }

  setFilter(event){
    let target = event.target
    let islands = document.querySelectorAll('[data-country].island')
    let countries = document.querySelectorAll('[data-country]')
    let nograms = document.querySelectorAll('[data-country]:not(.programs)')
    let inactives = document.querySelectorAll('[data-country]:not(.active)')
    switch(target.value) {
      case 'islands-archipelagos':
        countries.forEach(cou => cou.classList && cou.classList.add('d-none'))
        islands.forEach(isl => isl.classList && isl.classList.remove('d-none'))
      break;
      case 'continents':
        countries.forEach(cou => cou.classList && cou.classList.remove('d-none'))
        islands.forEach(isl => isl.classList && isl.classList.add('d-none'))
      break;
      case 'countries--active':
        countries.forEach(cou => cou.classList && cou.classList.remove('d-none'))
        inactives.forEach(ina => ina.classList ? ina.classList.add('d-none') : ina.className = 'd-none')
      break;
      case 'countries--programs':
        countries.forEach(cou => cou.classList && cou.classList.remove('d-none'))
        nograms.forEach(nog => nog.classList ? nog.classList.add('d-none') : nog.className = 'd-none')
      break;
      default:
        countries.forEach(cou => cou.classList && cou.classList.remove('d-none'))
      break;
    }
    this.setHome(cms.filters[target.value])
    this.setState({
      filter:{
        value: target.value,
        label: target.options[target.selectedIndex].text
      }
    })
  }

  resetContinent(event){
    this.props.selectCountry(false)
    this.props.selectContinent(false)
    zoomMap()
    toggleContinents('on')
    toggleCountries('on')
  }

  resetCountry(event){
    let group = document.getElementById(this.props.levels[0].slug)
    this.props.selectCountry(false)
    toggleCountries('off', group)
  }

  setHome(name){
    this.setState({name:name})
  }

  componentDidMount(){
    if(this.props){
      if(this.props.filter.value){
        this.setState({name: this.props.filter.label})
      }
    }
  }

  render() {
    return(
      <header 
        key="breadcrumb__wrapper" 
        data-breadcrumb 
        className="d-flex align-items-center bg-seafoam w-100 mb-2">
        <h1 className="mb-0">
        { this.props.levels.length > 0 ?
        <>
        <a key={`breadcrumb__home`}
          onClick={this.resetContinent}>
            <Tooltip title="Return to the World View">{this.state.name}</Tooltip>
        </a>
          { this.props.levels.length > 1 ?
          <>
            <a key={`breadcrumb__continent`}
            onClick={this.resetCountry}>
              <Tooltip title="Return to the Countries View">{this.props.levels[0].name}</Tooltip>
            </a>
            <span key={`breadcrumb__country`}>{this.props.levels[1].name}</span>
          </>
          :
            <span key={`breadcrumb__continent`}>{this.props.levels[0].name}</span>
          }
          </>
          :
          this.state.name
        }
        </h1>
        { this.props.levels.length < 1 &&
        <form className="ms-3">
          <Tooltip title="Filter the map view to show only what you desire" placement="right">
            <select className="form-control" onChange={this.setFilter}>
            {this.filters.map((option,o) => {
              return (
                <option key={'option-'+o} value={option.value}>{option.label}</option>
              )
            })}
            </select>
          </Tooltip>
        </form>
  }
      </header>
    )
  }
}

export default Breadcrumb