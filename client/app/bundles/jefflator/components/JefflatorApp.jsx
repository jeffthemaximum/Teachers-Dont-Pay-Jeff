import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';

import BaseComponent from 'libs/components/BaseComponent';
import SubmitButton from "./SubmitButton"
import OutputField from "./OutputField"

const JefflatorApp = React.createClass({
  getInitialState(){
    return({
      inputLanguage: "en",
      outputLanguage: "es",
      inputText: "Jeff is a nice guy who likes to ride his bike and play Nintendo.",
      submitting: false,
      translatedText: "",
    })
  },

  handleTextChange(e){
    this.setState({inputText: e.target.value})
  },

  handleInputLanguageChange(e){
    this.setState({inputLanguage: e.target.value})
  },

  handleOutputLanguageChange(e){
    this.setState({outputLanguage: e.target.value})
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
      inputLanguage: this.state.inputLanguage,
      outputLanguage: this.state.outputLanguage
    }

    axios.get("/jefflate", {params: data}, requestConfig)

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

  render(){
    return(
      <section
        id="contact"
      >
        <div className="section-content">
          <h1 className="section-header">Translate only <span className="content-header wow fadeIn " data-wow-delay="0.2s" data-wow-duration="2s"> nouns and verbs</span></h1>
          <h3>Enter as much text as you want. Jefflator will translate just the nouns and verbs in your text.</h3>
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
                <div className="form-group select-form-group">
                    <label for="sel1">Input Language</label>
                    <select onChange={this.handleInputLanguageChange} value={this.state.inputLanguage} className="form-control language-select" id="sel1">
                      <option value="en">English</option>
                      {/* <option value="es">Spanish</option> */}
                    </select>
                </div>
                <div className="form-group select-form-group output">
                    <label for="sel1">Output Language</label>
                    <select onChange={this.handleOutputLanguageChange} value={this.state.outputLanguage} className="form-control language-select" id="sel1">
                      {/* <option value="en">English</option> */}
                      <option value="es">Spanish</option>
                    </select>
                </div>
                <SubmitButton
                  data={this.state}
                  onSubmit={this.handleSubmit}
                />
              </div>
              <div className="col-lg-6 col-sm-12">
                <OutputField
                  loadingGifTag={this.props.loadingGifTag}
                  data={this.state}
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
});

module.exports = JefflatorApp;

// deactivate button when submitting === true
// show gif while submitting === true
// change header
  // get rid of white
  // only link to back