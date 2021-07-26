import React, {Component} from 'react'
import cms from '../cms.json'
import "slick-carousel/slick/slick.css"
import Button from './Button'
import QRCode from 'react-qr-code'
import {Slider as Scrollbar, Table} from 'antd'
import Slider from 'react-slick'
import {toggleContinents, toggleCountries, zoomMap} from '../world'

class Navigation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      slide: 0,
      panelScrollCoordinates: 0,
      navScrollCoordinates: 0
    }

    this.linkStyle          = cms.navigation.linkStyle;

    this.resetContinent     = this.resetContinent.bind(this)
    this.resetCountry       = this.resetCountry.bind(this)

    this.scrollBtnHandler     = this.scrollBtnHandler.bind(this)

    this.navMouseMoveHandler      = this.navMouseMoveHandler.bind(this)
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

  navMouseMoveHandler(value){
    let target        = document.getElementById('navigation__country')
    target.scrollTop  = Math.floor(target.scrollHeight*(value * 0.01))
    this.setState({navScrollCoordinates:value})
  }

  scrollBtnHandler(event){
    let btn    = event.target
    let target = document.getElementById('navigation__country')
    let handle = document.querySelector('#navigation__country + [data-scrollbar] .ant-slider-handle')
    let rail   = document.querySelector('#navigation__country + [data-scrollbar] .ant-slider-rail')
    let value  = target.scrollTop
    if(btn.dataset.scroll === "up") {
      value += 52
    }else{
      value -= 52
    }
    target.scrollTop = value
    this.setState({navScrollCoordinates:Math.floor(((rail.offsetHeight + handle.offsetHeight)/target.scrollHeight) * value)})
  }

  componentDidUpdate(){
    if(this.props){
      if(this.props.levels.length > 1) {
        if(this.props.levels[1].name != this.state.name) {
          this.setState({name:this.props.levels[1].name})
        }
      }
    }
  }

  render() {
    if( this.props.levels.length > 0 ) {
      let programs = this.props.levels.length > 1 && this.props.levels[1].programs.filter(pr => pr.suspended === 'off')
      
      return(
      <nav 
        key="navigation__wrapper" 
        data-navigation 
        className="d-flex align-items-stretch bg-white">
        <div className="d-flex">
          <>
            <a className={this.linkStyle} key={`navigation__home`} onClick={this.resetContinent}>Home</a>
            { this.props.levels.length > 1 ?
            <>
            <a className={this.linkStyle} key={`navigation__continent`} onClick={this.resetCountry}>{this.props.levels[0].name}</a>
            <span className={`position-relative ${this.linkStyle}`} key={`navigation__country`}>
              {this.props.levels[1].name}
              <div id="navigation__panel" className="bg-list-item position-absolute d-flex flex-column justify-content-between" data-panel>
                { programs.length > 0 &&
                <Table dataSource={programs} className={cms.navigation.tblStyle}
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
                }
                <div className={`d-flex px-4 ${ programs.length > 0 ? 'pb-3' : 'py-3'}`}>
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
                     afterChange={(index) => {
                       this.setState({slide: index})
                     }}
                     onReInit={() => {
                      if(this.props.levels[1].name != this.state.name){
                        let track     = document.querySelector('.slick-track')
                        let slides    = document.querySelectorAll('.slick-slide:not(.slide-cloned)')
                        let slide     = document.querySelector(`.slick-slide[data-index="${this.state.slide}"]`)
                        let current   = false
                        setTimeout(() => {
                          if(slide && slides.length > 4) {
                            console.log(slide, slides.length)
                            Array.from(slides).find((sl, s) => { 
                              if(sl.classList.contains('slick-current')){
                                current = s
                                return sl
                              }
                            })
                          
                            if(current){
                              track.style.transform = `translate3d(${slide.offsetWidth * current * -1}px, 0, 0)`
                            }
                          }else{
                            console.log('unset track')
                            track.style.transform = 'unset'
                          }
                        }, 600)
                      }
                    }}
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
                                <img alt={m.name} src={m.thumbUrl ? m.thumbUrl : m.url} data-src={m.url} title={m.credit}/>
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
                <div data-scrollbar className="d-flex flex-column justify-content-between" style={{backgroundColor:'rgba(255,255,255,0.9)'}}>
                  <Scrollbar vertical tooltipVisible={false}
                    min={0} max={90} className={"mx-0"} 
                    onChange={this.navMouseMoveHandler} 
                    value={this.state.navScrollCoordinates} />
                  <div className="d-flex flex-column">
                    <Button type="scrollup" callback={this.scrollBtnHandler}/>
                    <Button type="scrolldown" callback={this.scrollBtnHandler}/>
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