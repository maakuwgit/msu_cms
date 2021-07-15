import React, {Component} from 'react'
import cms from '../cms.json'
import "slick-carousel/slick/slick.css"
//import "slick-carousel/slick/slick-theme.css"
import Button from './Button'
import QRCode from 'react-qr-code'
import {Slider as Scrollbar, Table} from 'antd'
import Slider from 'react-slick'
import {toggleContinents, toggleCountries, zoomMap} from '../world'

class Navigation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'Home',
      panelScrollCoordinates: 0,
      navScrollCoordinates: 0
    }

    this.linkStyle          = cms.navigation.linkStyle;

    this.resetContinent     = this.resetContinent.bind(this)
    this.resetCountry       = this.resetCountry.bind(this)
    this.setHome            = this.setHome.bind(this)

    this.navMouseMoveHandler      = this.navMouseMoveHandler.bind(this)
    this.panelMouseMoveHandler    = this.panelMouseMoveHandler.bind(this)
  }

  resetContinent(){
    this.props.selectCountry(false)
    this.props.selectContinent(false)
    zoomMap()
    toggleContinents('on')
    toggleCountries('on')
  }

  resetCountry(){
    let group = document.getElementById(this.props.levels[0].slug)
    this.props.selectCountry(false)
    zoomMap(group.dataset.scale,group.dataset.transformoriginx,group.dataset.transformoriginy)
    toggleCountries('off', group)
  }

  setHome(name){
    this.setState({name:name})
  }

  navMouseMoveHandler(value){
    let target        = document.getElementById('navigation__country')
    target.scrollTop  = Math.floor(target.scrollHeight*(value * 0.01))
    this.setState({navScrollCoordinates:value})
  }

  panelMouseMoveHandler(value){
    let target        = document.getElementById('navigation__panel')
    target.scrollTop  = Math.floor(target.scrollHeight*(value * 0.01))
    this.setState({panelScrollCoordinates:value})
  }

  componentDidMount(){
    window.addEventListener('resize', () => {
      let panel     = document.getElementById("navigation__panel")
      let scrollbar = document.getElementById("navigation__panel_scroll")
      if(scrollbar){
        scrollbar.classList.remove('d-flex')
        scrollbar.classList.add('d-none')

        let footer      = document.querySelector('[data-footer]')
        let greeting    = document.querySelector('[data-greeting]')
        let header      = document.querySelector('[data-header]')
        let navigation  = document.querySelector('[data-navigation]')
        setTimeout(() => {
          if(panel){
            if(panel.scrollHeight > window.innerHeight - header.scrollHeight - footer.scrollHeight - greeting.scrollHeight - navigation.scrollHeight){
              scrollbar.classList.add('d-flex')
              scrollbar.classList.remove('d-none')
            }
          }
        }, 1000)
      }
    })
  }

  componentDidUpdate(){
    window.dispatchEvent(new Event('resize'))
  }

  render() {
    if( this.props.levels.length > 0 ) {
      return(
      <nav 
        key="navigation__wrapper" 
        data-navigation 
        className="d-flex align-items-stretch bg-white">
        <div className="d-flex">
          <>
            <a className={this.linkStyle} key={`navigation__home`} onClick={this.resetContinent}>{this.state.name}</a>
            { this.props.levels.length > 1 ?
            <>
            <a className={this.linkStyle} key={`navigation__continent`} onClick={this.resetCountry}>{this.props.levels[0].name}</a>
            <span className={`position-relative ${this.linkStyle}`} key={`navigation__country`}>
              {this.props.levels[1].name}
              <div id="navigation__panel" className="bg-list-item position-absolute d-flex flex-column justify-content-between" data-panel>
                <Table dataSource={this.props.levels[1].programs} className={cms.navigation.tblStyle}
                  rowKey={(record) => {
                    return `dashboard__table__row--${record.id}`
                  }} 
                  columns={[
                    {
                      title: 'Program Name',
                      dataIndex: 'name',
                      key: 'name',
                      className: 'fw-bold'
                    },{
                      title: 'Semesters',
                      dataIndex: 'semester',
                      key: 'semester',
                      className: 'fw-bold'
                    }
                  ]}
                  pagination={false}/>
                <div className="d-flex px-4 pb-3">
                  { this.props.levels[1].code &&
                  <div className="col-3 py-1" data-qr>
                    <h3 className="h5 text-white fw-bold">Scan QR code with <br className="d-none d-lg-block"/>your mobile device <br className="d-none d-lg-block"/>for more information</h3>
                    <div className="d-flex justify-content-center align-items-center bg-white" style={{width: '7rem', height: '7rem'}}>
                      <QRCode value={this.props.levels[1].code} size={93}/>
                    </div>
                  </div>
                  }
                  <div className={`${this.props.levels[1].code ? 'col-8 offset-1 py-2' : 'col-12 pt-2 pb-5'} d-flex flex-column justify-content-center`}>
                    { ( this.props.levels[1].gallery ) &&
                    <Slider dots={false} infinite={true} adaptiveHeight={true} 
                      nextArrow={
                      <button type="button" title="Next">
                        <div className="btn p-0 mb-0 text-white">
                          <svg className="icon">
                            <use xlinkHref="#icon__angle--right"/>
                          </svg>
                        </div>
                      </button>
                      }
                      prevArrow={
                      <button type="button" title="Previous">
                        <div className="btn p-0 mb-0 text-white">
                          <svg className="icon">
                            <use xlinkHref="#icon__angle--left"/>
                          </svg>
                        </div>
                      </button>
                      }
                      speed={0} slidesToShow={3} slidesToScroll={1} swipe={false}> 
                      { this.props.levels[1].gallery.media.map(m => {
                          return (
                            <picture key={m.id}>
                              <div style={{backgroundImage:`url(${m.url.search('.mp4') > 0 ? 
                              ( m.poster ? m.poster : 'images/poster.png') 
                              : ( m.thumbUrl ? m.thumbUrl : m.url ) })`}} data-backgrounder>
                                <img alt={m.name} src={m.thumbUrl ? m.thumbUrl : m.url} data-url={m.url} title={m.credit}/>
                                { m.url.search('.mp4') > 0 &&
                                <svg className="icon">
                                  <use xlinkHref="#icon__play"/>
                                </svg>
                                }
                              </div>
                            </picture>
                          )
                      }) }
                    </Slider>
                    }
                  </div>
                </div>
              </div>
              {/*
              <div id="navigation__panel_scroll" className="d-none position-absolute flex-column justify-content-between"
               style={{backgroundColor:'rgba(255,255,255,0.9)',bottom:0,right:'-1.75rem',height:'calc(100vh - 9.5rem - 44px)'}}>
                <Scrollbar vertical tooltipVisible={false} className={"mx-0"} 
                  onChange={this.panelMouseMoveHandler} 
                  value={this.state.panelScrollCoordinates} />
                <div className="d-flex flex-column">
                  <Button type="scrollup"/>
                  <Button type="scrolldown"/>
                </div>
              </div>*/}
            </span>
            </>
            :
            <span className={`position-relative ${this.linkStyle}`} key={`navigation__continent`}>
              {this.props.levels[0].name}
              <nav data-subnavigation className="d-flex position-absolute justify-content-between align-items-stretch">
                <div id="navigation__country" className="col d-flex flex-column align-items-stretch justify-contrent-stretch px-0">
                  { this.props.levels[0].countries.map((cou, c) => {
                    if(cou.suspended === 'off'){
                      return (
                      <button key={`map__navigation__anchor${c}`}
                      className={cms.navigation.sublinkStyle} 
                      data-country_slug={cou.slug}
                      onClick={(event) => {
                        let btn     = event.target
                        let slug    = btn.dataset.country_slug
                        let markup  = document.getElementById(`${slug}`)
                        if(markup) {
                          this.props.toggleCountries('off', markup)
                          markup.classList.add('selected')
                          let country = this.props.levels[0].countries.filter(cn => cn.slug === slug)
                          this.props.selectCountry(country[0])
                        }
                      }}>{cou.name}</button>
                      )
                    }
                  }) }
                </div>
                { this.props.levels[0].countries.length > 3 &&
                <div className="d-flex flex-column justify-content-between" style={{backgroundColor:'rgba(255,255,255,0.9)'}}>
                  <Scrollbar vertical tooltipVisible={false}
                    min={0} max={90} className={"mx-0"} 
                    onChange={this.navMouseMoveHandler} 
                    value={this.state.navScrollCoordinates} />
                  <div className="d-flex flex-column">
                    <Button type="scrollup"/>
                    <Button type="scrolldown"/>
                  </div>
                </div>
                }
              </nav>
            </span>
            }
          </>
        </div>
      </nav>
      )
    }else{
      return null
    }
  }
}

export default Navigation