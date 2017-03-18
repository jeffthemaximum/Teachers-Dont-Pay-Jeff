import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';

import BaseComponent from 'libs/components/BaseComponent';

import EventForm from './EventForm';
import TimeLine from './TimeLine';

const TimeLineApp = React.createClass({
  getInitialState(){
    return({
      events: this.props.events,
      share_token: this.props.shareToken
    })
  },

  sortEvents(){
    let events = this.state.events;
    events = events.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.date) - new Date(a.date);
    });
    this.setState({events: events.reverse()});
  },

  updateEvents(event){
    let events = this.state.events;
    events.push(event);
    this.setState({events: events}, this.sortEvents());
  },

  render(){
    return (
      <div>
        <EventForm
          data={this.state}
          updateEvents={this.updateEvents}
          sortEvents={this.sortEvents}
        />
        <TimeLine
          data={this.state}
        />
      </div>
    )
  }
});

module.exports = TimeLineApp