import React, {Component} from 'react';
//import Editor from 'tinymce-react';
class Form extends Component {

  constructor(props) {
    super(props);

    this.style        = "relative row justify-content-center";
    this.state = {
      rel: this.props.rel ? this.props.rel : '',
      form_id: this.props ? this.props.form_id : 1,
      headline: this.props ? this.props.headline : false,
      copy: this.props ? this.props.copy : false
    };

    this.formSubmit = this.formSubmit.bind(this);

    if( this.props ) {
      if( this.props.style ) {
        this.style = this.style + ' ' + this.props.style;
      }
    }
  }

  fieldChange(event) {
    console.log('field change', event.target.value);
  }

  formSubmit(event) {
    var inputs;
    if( event ){
      inputs = event.target.querySelectorAll('input');

      for (var i = 0; i < inputs.length; ++i) {
        inputs[i].classList.add('success');
      }
    }else{
      return;
    }
    event.preventDefault();
  }

  render() {
    
    return  <section data-component="form" data-rel={this.state.rel}>
                <div className="container">
                    <div className={this.style}>
                        <form onSubmit={this.formSubmit} className="col-12 col-sm-6">
                          <fieldset>
                            <legend className="row hidden">
                                {this.state.headline}
                                {this.state.copy}
                            </legend>
                            <div className="row">
                                <div className="col-12 col-sm-6">
                                  <input
                                    name="name"
                                    type="text"
                                    required
                                    placeholder="Name"
                                    onChange={this.fieldChange}
                                  />
                                </div>
                                <div className="col-12 col-sm-6">
                                  <input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    onChange={this.fieldChange}
                                  />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <textarea
                                    name="message"
                                    rows="3"
                                    placeholder="Message"
                                    onChange={this.fieldChange}/>
                                </div>
                            </div>
                          </fieldset>
                        </form>
                    </div>
                </div>
            </section>;
  }
}

export default Form;