import React from 'react';
import ReactOnRails from 'react-on-rails';

import BaseComponent from 'libs/components/BaseComponent';

export default class EventForm extends BaseComponent {
  render() {
    return (
      <form>
       <div class="form-group">
          <label for="eventTitle">Input Label</label>
          <input 
            onChange={this.props.onTitleInputChange} 
            value={this.props.titleValue} 
            type="text" 
            placeholder="large-12.columns"
            className="form-control"
            id="eventTitle"
          />
        </div>
        <div class="form-group">
          <label for="eventDescription">Textarea Label</label>
          <textarea 
            placeholder="small-12.columns"
            id="eventDescription"
            className="form-control"
          ></textarea>
        </div>
         <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
};