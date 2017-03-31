import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';

import BaseComponent from 'libs/components/BaseComponent';
import ShareApp from './ShareApp';
import EditApp from './EditApp';
import EditShareApp from './EditShareApp';
import FileInput from './FileInput';

const EventForm = React.createClass ({

  getInitialState(){
    return({
      documents: [],
      events: this.props.data.events,
      title: "",
      description: "",
      year: "",
      month: "",
      day: "",
      hour: "",
      minute: "",
      ampm: "",
      share_token: this.props.data.share_token,
      errors : {
        title: false,
        year: false,
      }
    })
  },

  updateEventFormStateWithDocument(document){
    this.setState({ documents: $.merge([document], this.state.documents) });
  },

  onTitleInputChange(e){
    this.setState({title: e.target.value});
  },

  onDescriptionInputChange(e){
    this.setState({description: e.target.value});
  },

  onYearInputChange(e){
    this.setState({year: e.target.value});
  },

  onMonthInputChange(e){
    this.setState({month: e.target.value});
  },

  onDayInputChange(e){
    this.setState({day: e.target.value});
  },

  onHourInputChange(e){
    this.setState({hour: e.target.value});
  },

  onMinuteInputChange(e){
    this.setState({minute: e.target.value});
  },

  onAmpmInputChange(e){
    this.setState({ampm: e.target.value});
  },

  validateForm(){
    let isErrors = false;
    if (this.state.title === "") {
      let errors = this.state.errors
      errors.title = true
      isErrors = true;
      this.setState({
        errors: errors
      })
    }
    if (this.state.year === "") {
      let errors = this.state.errors
      errors.year = true
      isErrors = true;
      this.setState({
        errors: errors
      })
    }
    return isErrors;
  },

  clearForm(){
    this.setState({
      documents: [],
      title: "",
      description: "",
      year: "",
      month: "",
      day: "",
      hour: "",
      minute: "",
      ampm: "",
      errors : {
        title: false,
        year: false,
      }
    });
  },

  onSubmit(e){
    e.preventDefault();
    let isErrors = this.validateForm();
    if (isErrors === true) {
      return;
    } else {
      const requestConfig = {
        responseType: 'json',
        headers: ReactOnRails.authenticityHeaders(),
      };
      const data = {
        event: this.state
      }
      axios.post('/events', data, requestConfig)
      .then(function(response){
        let event = response.data;
        this.props.updateEvents(event);
        this.clearForm();
      }.bind(this))
      .catch(function(error){
        console.log(error);
      })
    }
  },

  render() {
    return (
      <form>
       <div className={"form-group required" + (this.state.errors.title ? " has-error" : "")}>
          <label className='control-label' htmlFor="eventTitle">Event Title</label>
          <input 
            onChange={this.onTitleInputChange} 
            value={this.state.title} 
            type="text" 
            placeholder="Jeff Maxim was born"
            className="form-control"
            id="eventTitle"
            required="required"
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventDescription">Event Description</label>
          <textarea 
            placeholder="On this day, Jeff Maxim, the creator of JeffLine, was born. He was born in West Chester, PA. His Mom is named Libby, and his Dad is George."
            id="eventDescription"
            className="form-control"
            onChange={this.onDescriptionInputChange}
            value={this.state.description}
          >
          </textarea>
        </div>
        <div className="form-group required">
          <div className="row">
            <div className={"col-sm-6 col-md-6" + (this.state.errors.year ? " has-error" : "")}>
              <label className='control-label' htmlFor="event-year">
                Year
              </label>
              <input 
                onChange={this.onYearInputChange} 
                value={this.state.year} 
                type="text" 
                placeholder="1984"
                className="form-control"
                id="event-year"
                required="required"
              />
            </div>
            <div className="col-sm-6 col-md-6">
              <label htmlFor="event-month">
                Month
              </label>
              <select value={this.state.month} onChange={this.onMonthInputChange} className="form-control" id='event-month'>
                <option value=''>--Select Month--</option>
                <option value='1'>Janaury</option>
                <option value='2'>February</option>
                <option value='3'>March</option>
                <option value='4'>April</option>
                <option value='5'>May</option>
                <option value='6'>June</option>
                <option value='7'>July</option>
                <option value='8'>August</option>
                <option value='9'>September</option>
                <option value='10'>October</option>
                <option value='11'>November</option>
                <option value='12'>December</option>
              </select> 
            </div>
            <div className="col-sm-6 col-md-6">
              <label htmlFor="event-day">
                Day
              </label>
              <input 
                onChange={this.onDayInputChange} 
                value={this.state.day} 
                type="text" 
                placeholder="31"
                className="form-control"
                id="event-day"
              />
            </div>
            <div className="col-sm-6 col-md-6">
              <label htmlFor="event-hour">
                Time - hour
              </label>
              <input 
                onChange={this.onHourInputChange} 
                value={this.state.hour} 
                type="text" 
                placeholder="10"
                className="form-control"
                id="event-hour"
              />
            </div>
            <div className="col-sm-6 col-md-6">
              <label htmlFor="event-minute">
                Time - minute
              </label>
              <input 
                onChange={this.onMinuteInputChange} 
                value={this.state.minute} 
                type="text" 
                placeholder="32"
                className="form-control"
                id="event-minute"
              />
            </div>
            <div className="col-sm-6 col-md-6">
              <label htmlFor="event-ampm">
                AM / PM
              </label>
              <select value={this.state.ampm} onChange={this.onAmpmInputChange} className="form-control" id='event-ampm'>
                <option value=''>--AM / PM--</option>
                <option value='1'>AM</option>
                <option value='2'>PM</option>
              </select> 
            </div>
          </div>
        </div>

        <div className="col-sm-12">
          <FileInput 
            updateEventFormStateWithDocument={this.updateEventFormStateWithDocument} 
            documents={this.state.documents}
          />
        </div>

        <div className="btn-group" role="group" aria-label="Basic example">
          <button onClick={this.onSubmit} className="btn btn-primary">Submit</button>
          <EditShareApp data={this.props.data} />
        </div>

      </form>
    )
  }
});

module.exports = EventForm;