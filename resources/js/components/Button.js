import React, { Component } from "react"
import {randomID} from '../functions'

class Button extends Component {
  render(){
    let button = false

    switch(this.props.type){
      case 'scrollup':
        button = (
          <button data-scroll="up" className="btn btn-white mb-0 p-1 border-0" 
           onClick={this.props.callback} 
           style={{transform:'rotate(180deg)',backgroundColor:'transparent'}}>
            <svg className="icon">
              <use xlinkHref="#icon__angle--down"/>
            </svg>
          </button>
        )
      break;
      case 'scrolldown':
        button = (
          <button data-scroll="down" className="btn btn-white mb-0 p-1 border-0" 
           onClick={this.props.callback} 
           style={{backgroundColor:'transparent'}}>
            <svg className="icon">
              <use xlinkHref="#icon__angle--down"/>
            </svg>
          </button>
        )
      break;
      case 'back':
        button = (
          <button onClick={this.props.callback} className="btn btn-secondary">
            <svg className="me-2 icon">
              <use xlinkHref="#icon__arrow_left"/>
            </svg>
            {this.props.label}
          </button>
        )
      break;
      case 'submit':
        button = (
            <button type="submit" onClick={this.props.callback} className={`btn btn-${this.props.style ? this.props.style : 'secondary'}`} aria-label={`Save the ${this.props.slug ? this.props.slug.toLowerCase() : 'entry'}`}>
              { this.props.label &&
                <span className={this.props.icon ? "me-2" : ''}>{this.props.label}</span>
              }
              { this.props.icon &&
              <svg className="icon">
                <use xlinkHref={`#icon__${this.props.icon}`}/>
              </svg>
              }
            </button>
        )
      break;
      case 'dropdown':
        let id = randomID()
        if(this.props.ctas ) {
          button = (
            <nav className={`dropdown${this.props.nStyle ? ' '+this.props.nStyle : ''}`}>
              { this.props.is_enabled ?
              <>
                <button className={`btn btn-${this.props.style ? this.props.style : 'outline-primary text-secondary px-2 py-1'}`} type="button" id={`dropdownMenuButton--${id}`} data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="Expand/Collapse the menu">
                  <svg className="icon" data-hide>
                    <use xlinkHref={`#icon__${this.props.icon ? this.props.icon : 'ellipsis--vertical'}`}/>
                  </svg>
                  <svg className="icon" data-show>
                    <use xlinkHref={`#icon__math--multiply`}/>
                  </svg>
                </button>
                { this.props.ctas &&
                <div className="dropdown-menu" aria-labelledby={`dropdownMenuButton--${id}`}>
                  { this.props.ctas.map((cta,c) => {
                    let anchor = false
                    switch(cta.type){
                      case 'link':
                        anchor = <a key={`dropdown-item--${id}_${c}`} className={`dropdown-item${cta.style ? ' '+cta.style : ''}`} href={cta.href} target={cta.target}>{cta.label}</a>
                      break;
                      default:
                        anchor = <a key={`dropdown-item--${id}_${c}`} className={`dropdown-item${cta.style ? ' '+cta.style : ''}`} href={`#modal--${id}_${c}`} onClick={cta.callback} data-bs-toggle="modal" data-bs-target={cta.target}>{cta.label}</a>
                      break;
                    }
                    return anchor
                  }) }
                </div>
                }
              </>
              :
              <button className={`btn btn-${this.props.style ? this.props.style : 'outline-primary text-secondary px-2 py-1'} dropdown-toggle disabled`} type="button" id={`dropdownMenuButton--${id}`} aria-label="Expand/Collapse the menu" disabled>
                <svg className="icon" data-hide>
                  <use xlinkHref={`#icon__${this.props.icon ? this.props.icon : 'ellipsis--vertical'}`}/>
                </svg>
              </button>
              }
            </nav>
          )
        }else{
          button = (
            <button className="btn btn-outline-secondary disabled px-2 py-1" disabled aria-label="Actions are disabled for this button">
              <svg className="icon">
                <use xlinkHref={`#icon__ellipsis--vertical`}/>
              </svg>
            </button>
          )
        }
      break;
      case 'modal':
        button = (
          <button className={`btn btn-${this.props.bStyle ? this.props.bStyle : 'secondary btn-sm'}`} data-target="#main__modal_window" data-toggle="modal" onClick={this.props.callback}>
            { this.props.icon &&
              <svg className="icon">
                <use xlinkHref={`#icon__${this.props.icon}`}/>
              </svg>
            }
            {this.props.label &&
              <span className={this.props.icon ? 'ms-2' : ''}>{this.props.label}</span>
            }
          </button>
        )
      break;
      case 'collapse':
        button = (
            <button className={`mx-2 btn-square btn btn-${this.props.style ? this.props.style : 'secondary'} btn-sm`} data-toggle="collapse" data-target={'#'+this.props.target} aria-expanded="false" aria-controls={this.props.target}>
              <svg className="icon">
                <use xlinkHref={`#icon__${this.props.icon}`}/>
              </svg>
            </button>
        )
      break;
      default:
        if( this.props.is_enabled ) {
          button = (
              <button onClick={this.props.callback} className={`${(this.props.icon && !this.props.style) ? 'mx-2 btn-square ' : ''}btn btn-${this.props.style ? this.props.style + ' ' : 'primary'}`}>
              { this.props.label &&
                <span className="me-2">{this.props.label}</span>
              }
              { this.props.icon &&
                <svg className="icon small">
                  <use xlinkHref={`#icon__${this.props.icon}`}/>
                </svg>
              }
              </button>
          )
        }else{
          button = (
            <button className={`${this.props.icon ? 'mx-2 btn-square ' : ''}btn btn-powder disabled${this.props.style ? ' '+this.props.style : ''}`} disabled>
            { this.props.label &&
              <span className="me-2">{this.props.label}</span>
            }
            { this.props.icon &&
              <svg className="icon">
                <use xlinkHref={`#icon__${this.props.icon}`}/>
              </svg>
            }
            </button>
          )
        }
      break;
    }

    return button
  }
}

export default Button