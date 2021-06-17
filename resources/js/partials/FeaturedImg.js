import React, {Component} from 'react';

class FeaturedImg extends Component {

  render() {
      this.src = '';
      this.alt = 'Lorem ipsum sin dolor';
      this.srcSet = '';
      this.srcMd = '';
      this.srcLg = '';
      this.srcXl = '';
      this.style = 'w-100';

      if( this.props ) {
          if( this.props.src ) {
              this.src = this.props.src;
          }
          if( this.props.alt ) {
              this.alt = this.props.alt;
          }
          if( this.props.srcSet ) {
              this.srcSet = this.props.srcSet;
          }
          if( this.props.srcMd ) {
              this.srcMd = this.props.srcMd;
          }
          if( this.props.srcLg ) {
              this.srcLg = this.props.srcLg;
          }
          if( this.props.srcXl ) {
              this.srcXl = this.props.srcXl;
          }
          if( this.props.style ) {
              this.style = this.props.style;
          }
      }

      return (
        <div className="feature">
        <img 
             src={this.src} 
             srcSet={this.srcSet} 
             alt={this.alt} 
             className={this.style}
             data-src-medium={this.srcMd}
             data-src-large={this.srcLg}
             data-src-xlarge={this.srcXl}
        />
        </div>
      )
  }
}

export default FeaturedImg;