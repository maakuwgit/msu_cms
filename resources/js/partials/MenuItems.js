import React, {Component} from 'react'

class MenuItems extends Component {

    constructor(props) {
        super(props);

        this.href = '#no_href';
        this.label = 'No Label';

        if( this.props ) {
            if( this.props.href ) {
                this.href = this.props.href;
            }

            if( this.props.label ) {
                this.label = this.props.label;
            }

            if( this.props.onClick ) {
                this.onClick = this.props.onClick;
            }
        }
    }

    render() {

        return (
            <a href={this.href} onClick={this.onClick}>{this.label}</a>
        )
    }
}

export default MenuItems