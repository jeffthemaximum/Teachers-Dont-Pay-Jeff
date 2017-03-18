import React from 'react';
import axios from 'axios';

const EventTimeLineEvent = React.createClass({
  getInitialState(){
    const {event} = this.props
    return({
      id: event.id,
      share_token: this.props.share_token,
      title: event.title,
      description: event.description ? event.description : "",
      year: event.year ? event.year : "",
      month: event.month ? event.month : "",
      day: event.day ? event.day : "",
      hour: event.hour ? event.hour : "",
      minute: event.minute ? event.minute : "",
      ampm: event.ampm ? event.ampm : "",
      errors : {
        title: false,
        year: false,
      }
    })
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

  onEditSubmit(){
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
      let url = "/events/" + this.state.id;
      axios.patch(url, data, requestConfig)
      .then(function(response){
        let event = response.data;
        this.props.updateEvents(event);
        this.props.toggleEditState();
      }.bind(this))
      .catch(function(error){
        console.log(error);
      })
    }
  },

  render(){
    return (
      <div className="cd-timeline-block">
        <div className="cd-timeline-img cd-picture">
          <img src="/event-location.svg" alt="Picture"></img>
        </div>

        <div className="cd-timeline-content form-group">
          <div className="row">
            <div className="col-md-12">
              <label className='control-label' htmlFor="eventTitle">Event Title</label>
              <input 
                onChange={this.onTitleInputChange} 
                value={this.state.title} 
                type="text" 
                placeholder="Event title"
                className="form-control"
                id="eventTitle"
                required="required"
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="eventDescription">Event Description</label>
              <textarea 
                placeholder="On this day, Jeff Maxim, the creator of JeffLine, was born. He was born in West Chester, PA. His Mom is named Libby, and his Dad is George."
                id="eventDescription"
                className="form-control"
                onChange={this.onDescriptionInputChange}
                value={this.state.description}
              ></textarea>
            </div>
          </div>
          <div className="form-group required">
            <div className="row">
              <div className={"col-sm-6 col-md-4" + (this.props.year ? " has-error" : "")}>
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
              <div className="col-sm-6 col-md-4">
                <label htmlFor="event-month">
                  Month
                </label>
                <select value={this.state.month} onChange={this.onMonthInputChange} className="form-control" id='event-month'>
                  <option selected value=''>--Select Month--</option>
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
              <div className="col-sm-6 col-md-4">
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
              <div className="col-sm-6 col-md-4">
                <label htmlFor="event-hour">
                  Hour
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
              <div className="col-sm-6 col-md-4">
                <label htmlFor="event-minute">
                  Minute
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
              <div className="col-sm-6 col-md-4">
                <label htmlFor="event-ampm">
                  AM / PM
                </label>
                <select value={this.state.ampm} onChange={this.onAmpmInputChange} className="form-control" id='event-ampm'>
                  <option selected value=''>--AM / PM--</option>
                  <option value='1'>AM</option>
                  <option value='2'>PM</option>
                </select> 
              </div>
            </div>
          </div>

          <div className="buttons">
            <button onClick={this.props.toggleEditState} type="button" className="btn btn-default btn-xs">
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Cancel
            </button>
            <button onClick={this.onEditSubmit} type="button" className="btn btn-default btn-xs">
              <span className="glyphicon glyphicon-floppy-save" aria-hidden="true"></span> Save
            </button>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = EventTimeLineEvent;