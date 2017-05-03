import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';

import BaseComponent from 'libs/components/BaseComponent';

const JefflatorApp = React.createClass({
  render(){
    return(
      <section id="contact">
        <div className="section-content">
          <h1 className="section-header">Translate only <span className="content-header wow fadeIn " data-wow-delay="0.2s" data-wow-duration="2s"> nouns and verbs</span></h1>
          <h3>Enter as much text as you want. Jefflator will translate just the nouns and verbs in your text.</h3>
        </div>
        <div className="contact-section">
          <div className="container">
            <form>
              <div className="col-md-6 form-line">
                <div className="form-group">
                  <label for ="description"> Message</label>
                  <textarea  className="form-control" id="description" placeholder="Enter Your Message"></textarea>
                </div>
                <div className="form-group">
                  <div className="dropdown">
                    <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Input Language
                    <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                      <li><a href="#">English</a></li>
                      <li><a href="#">Spanish</a></li>
                    </ul>
                  </div>
                </div>
                <div className="form-group">
                  <div className="dropdown">
                    <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Output Language
                    <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                      <li><a href="#">English</a></li>
                      <li><a href="#">Spanish</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label for ="description"> Message</label>
                  <textarea  className="form-control" id="description" placeholder="Enter Your Message"></textarea>
                </div>
                <div>
                  <button type="button" className="btn btn-default submit"><i className="fa fa-paper-plane" aria-hidden="true"></i>  Send Message</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
});

module.exports = JefflatorApp;