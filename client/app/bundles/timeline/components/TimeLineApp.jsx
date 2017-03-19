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
      share_token: this.props.shareToken,
      shareLink: this.props.shareLink,
      editLink: this.props.editLink
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
    let elementInArray = $.grep(this.state.events, function(e){ return e.id == event.id; });
    if (elementInArray.length > 0) {
      let eventIndex = events.indexOf(elementInArray[0]);
      events[eventIndex] = event;
    } else {
      events.push(event);
    }
    this.setState({events: events}, this.sortEvents());
  },

  deleteEvent(event){
    let events = this.state.events;
    // find event in events by id
    let elementInArray = $.grep(this.state.events, function(e){ return e.id == event.id; });
    if (elementInArray.length > 0) {
      // get event index in events
      let eventIndex = events.indexOf(elementInArray[0]);
      if (eventIndex > -1) {
        events.splice(eventIndex, 1);
      }
    }
    this.setState({events: events}, this.sortEvents());
    // hacky solution to stop buttons from showing on timeline events
    document.getElementById('dummy').click();
  },

  render(){
    return (
      <div>
        { this.props.sharing === true ?
        
          <TimeLine
            data={this.state}
            updateEvents={this.updateEvents}
            deleteEvent={this.deleteEvent}
          />

          :
          <div>
            <EventForm
              data={this.state}
              updateEvents={this.updateEvents}
              sortEvents={this.sortEvents}
            />
            <TimeLine
              data={this.state}
              updateEvents={this.updateEvents}
              deleteEvent={this.deleteEvent}
            />
          </div>
        }
      </div>
    )
  }
});

module.exports = TimeLineApp