import React from 'react';
import ReactOnRails from 'react-on-rails';

const SubmitButton = React.createClass({

  isDisabled(){
    return (!!this.props.data.submitting)
  },

  buttonText(){
    if (!!this.props.data.submitting){
      return "Jefflating..."
    } else {
      return "Jefflate!"
    }
  },

  render(){
    return(
      <div>
        <button
          onClick={this.props.onSubmit}
          type="button"
          className="btn btn-default submit"
          disabled={this.isDisabled()}
        >
          {this.buttonText()}
        </button>
      </div>
    )
  }
})

module.exports = SubmitButton;