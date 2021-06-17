import React, {Component} from 'react'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import QRCode from 'react-qr-code'
import {Slider as Scrollbar, Table} from 'antd'
import Slider from 'react-slick'
import {toggleContinents, toggleCountries, zoomMap} from '../functions'

class Navigation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'Home',
      scrollCoordinates: 0
    }

    this.resetContinent     = this.resetContinent.bind(this)
    this.resetCountry       = this.resetCountry.bind(this)
    this.setHome            = this.setHome.bind(this)

    this.mouseMoveHandler   = this.mouseMoveHandler.bind(this)
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

  mouseMoveHandler(value){
    let target = document.getElementById('navigation__country')
    target.scrollTop = Math.floor(target.scrollHeight*(value * 0.01))//, 10*(Math.ceil(10*(target.scrollHeight - target.scrollTop)/target.scrollHeight)))
    this.setState({scrollCoordinates:value})
  }

  render() {
    let linkStyle = "d-flex h1 text-uppercase fw-bold px-5 my-0 align-items-center"

    this.props.levels.length > 1 && console.log(this.props.levels[1])

    if( this.props.levels.length > 0 ) {
      return(
      <nav 
        key="navigation__wrapper" 
        data-navigation 
        className="d-flex align-items-stretch bg-white">
        <div className="d-flex">
          <>
            <a className={linkStyle} key={`navigation__home`} onClick={this.resetContinent}>{this.state.name}</a>
            { this.props.levels.length > 1 ?
            <>
            <a className={linkStyle} key={`navigation__continent`} onClick={this.resetCountry}>{this.props.levels[0].name}</a>
            <span className={`position-relative ${linkStyle}`} key={`navigation__country`}>
              {this.props.levels[1].name}
              <div className="bg-list-item position-absolute d-flex flex-column justify-content-between" data-panel>
                <Table dataSource={this.props.levels[1].programs} className="w-100 mb-5"
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
                <div className="row px-5 pb-5">
                  { this.props.levels[1].code &&
                  <div className="col-3 py-2">
                    <h3 className="text-white fw-bold mb-4" style={{textTransform:'none',maxWidth:'23.5rem'}}>Scan QR code with <br className="d-none d-lg-block"/>your mobile device <br className="d-none d-lg-block"/>for more information</h3>
                    <div className="p-3 bg-white" style={{width: '14rem', height: '14rem'}}>
                      <QRCode value={this.props.levels[1].code} size={90}/>
                    </div>
                  </div>
                  }
                  <div className={`${this.props.levels[1].code ? 'col-8 offset-1 py-2' : 'col-12 pt-2 pb-5'} d-flex flex-column justify-content-center`}>
                    { ( this.props.levels[1].gallery ) &&
                    <Slider dots={false} infinite={true} adaptiveHeight={true}
                      nextArrow={
                      <button type="button" title="Next">
                        <div className="btn h3 py-0 mb-0 text-white">
                          <svg className="icon">
                            <use xlinkHref="#icon__angle--right"/>
                          </svg>
                        </div>
                      </button>
                      }
                      prevArrow={
                      <button type="button" title="Previous">
                        <div className="btn h3 py-0 mb-0 text-white">
                          <svg className="icon">
                            <use xlinkHref="#icon__angle--left"/>
                          </svg>
                        </div>
                      </button>
                      }
                      speed={0} slidesToShow={3} slidesToScroll={1} swipe={false}> 
                      { this.props.levels[1].gallery.media.map(m => {
                        if(m.url.search('.mp4') > 0) {
                          //Video
                          return (
                            <figure key={m.id} className="mb-0 h-100">
                              <div style={{backgroundImage:`url(${m.poster})`}} data-backgrounder>
                                <video title={m.name} src={m.url} poster={m.poster}/>
                                <svg className="icon">
                                  <use xlinkHref="#icon__play"/>
                                </svg>
                              </div>
                            </figure>
                          )
                        }else{
                          //Image
                          return (
                            <picture key={m.id}>
                              <div style={{backgroundImage:`url(${m.url})`}} data-backgrounder>
                                <img alt={m.name} src={m.url}/>
                              </div>
                            </picture>
                          )
                        }
                      }) }
                    </Slider>
                    }
                  </div>
                </div>
              </div>
            </span>
            </>
            :
            <span className={`position-relative ${linkStyle}`} key={`navigation__continent`}>
              {this.props.levels[0].name}
              <nav className="d-flex position-absolute justify-content-between align-items-stretch">
                <div id="navigation__country" className="col d-flex flex-column align-items-stretch justify-contrent-stretch px-0">
                  { this.props.levels[0].countries.map((cou, c) => {
                    return (
                    <button key={`map__navigation__anchor${c}`}
                    className="btn btn-list-item py-3 px-5 text-uppercase text-left border-0 h1 mb-0 mt-1" 
                    data-country_slug={cou.slug} style={{lineHeight:'1.1875'}}
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
                  }) }
                </div>
                { this.props.levels[0].countries.length > 3 &&
                <div className="d-flex flex-column px-0 py-3 bg-white justify-content-between">
                  <Scrollbar vertical tooltipVisible={false}
                    min={0} max={90}
                    onChange={this.mouseMoveHandler} 
                    value={this.state.scrollCoordinates} />
                  <div className="d-flex flex-column">
                    <button className="btn btn-white h3 mb-0 p-1" style={{transform:'rotate(180deg)'}}>
                      <svg className="icon">
                        <use xlinkHref="#icon__angle--down"/>
                      </svg>
                    </button>
                    <button className="btn btn-white h3 mb-0 p-1">
                      <svg className="icon">
                        <use xlinkHref="#icon__angle--down"/>
                      </svg>
                    </button>
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