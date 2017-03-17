import React from 'react';
import ReactOnRails from 'react-on-rails';

import BaseComponent from 'libs/components/BaseComponent';

export default class EventForm extends BaseComponent {
  render() {
    return (
      <form>
        <div className="row">
          <div className="large-12 columns">
            <label>Input Label
              <input 
                onChange={this.props.onTitleInputChange} 
                value={this.props.titleValue} 
                type="text" 
                placeholder="large-12.columns" 
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="large-12 columns">
            <label>Textarea Label
              <textarea placeholder="small-12.columns"></textarea>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="large-12 columns">
            <a href="#" className="button">Default Button</a>
          </div>
        </div>
      </form>
    )
  }
};