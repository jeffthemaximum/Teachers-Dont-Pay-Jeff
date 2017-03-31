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
      editLink: this.props.editLink,
      sharing: this.props.sharing,
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
    let customStyles = {
      margin: "0 15px"
    }

    let sidebarStyles = 
      {
        // "position":"fixed",
        // "top":"51px",
        // "bottom":"0",
        // "left":"0",
        // "zIndex":"1000",
        // "display":"block",
        // "padding":"20px",
        // "overflowX":"hidden",
        // "overflowY":"auto",
        // "backgroundColor":"#f5f5f5",
        "borderRight":"1px solid #9933CC",
      }

    return (
      <div>
        { this.props.sharing === true ?
        
          <TimeLine
            data={this.state}
            updateEvents={this.updateEvents}
            deleteEvent={this.deleteEvent}
          />

          :
          <div style={customStyles}>
            <div className="col-sm-12 col-md-4  col-lg-3 sidebar" style={sidebarStyles}>
              <EventForm
                data={this.state}
                updateEvents={this.updateEvents}
                sortEvents={this.sortEvents}
              />
            </div>
            <div className="col-sm-12 col-md-8 col-lg-9 main">
              <TimeLine
                data={this.state}
                updateEvents={this.updateEvents}
                deleteEvent={this.deleteEvent}
              />
            </div>
          </div>
        }
      </div>
    )
  }
});

module.exports = TimeLineApp