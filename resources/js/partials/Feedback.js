import React, {Component} from 'react'

class Feedback extends Component {
  render(){
    return (
      <aside data-error className={`alert${this.props.feedback.style ? ' alert-'+this.props.feedback.style : ''} alert-dismissible fade show d-flex justify-content-between w-100 m-0 p-0 sticky-top`}>
      {this.props.feedback.msg &&
        <p className="my-auto p-2">
          <small>
            {this.props.feedback.msg}
          </small>
        </p>
        }
      </aside>
    )
  }
}

export default Feedback