import React from 'react';
import axios from 'axios';

const SuggestionApp = React.createClass({
  getInitialState(){
    return({
      inputText: "Jeff is a nice guy who likes to ride his bike and play Nintendo.",
      submitting: false,
      translatedText: "",
    })
  },

  handleTextChange(e){
    this.setState({inputText: e.target.value})
  },


  handleSubmit(e){

    e.preventDefault();

    this.setState({submitting: true});

    const requestConfig = {
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
    };

    const data = {
      sentence: this.state.inputText,
    }

    axios.get("/suggest", {params: data}, requestConfig)

    .then(function(response){
      this.setState({
        translatedText: response.data.translated,
        submitting: false
      });

    }.bind(this))

    .catch(function(error){
      // TODO error messaging
      console.log(error);
      this.setState({submitting: false});

    }.bind(this))

  },

  isDisabled(){
    return (!!this.submitting)
  },

  buttonText(){
    if (!!this.submitting){
      return "Suggesting..."
    } else {
      return "Suggest!"
    }
  },

  render(){
    return(
      <section
        id="contact"
      >
        <div className="section-content">
          <h1 className="section-header">Help figure out <span className="content-header wow fadeIn " data-wow-delay="0.2s" data-wow-duration="2s"> hard words</span></h1>
          <h3>Enter some text. Suggestor will give you definitions and synonyms for the hard words</h3>
        </div>
        <div className="contact-section">
          <div className="container">
            <form>
              <div className="col-lg-6 col-sm-12 form-line">
                <div className="form-group">
                  <label for ="description"> Input text</label>
                  <textarea onChange={this.handleTextChange} className="form-control" id="description">
                    {this.state.inputText}
                  </textarea>
                </div>
                <div>
                  <button
                    onClick={this.handleSubmit}
                    type="button"
                    className="btn btn-default submit"
                    disabled={this.isDisabled()}
                  >
                    {this.buttonText()}
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </section>
    )
  }
});

module.exports = SuggestionApp;

// deactivate button when submitting === true
// show gif while submitting === true
// change header
  // get rid of white
  // only link to back