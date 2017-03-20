import React from 'react';

import TimeLineEventApp from './TimeLineEventApp';

const TimeLine = React.createClass({
  getInitialState(){
    return ({
      events: this.props.data.events
    })
  },

  render(){
    var eventComponents = this.state.events.map(function(event, i){
      return <TimeLineEventApp 
               updateEvents={this.props.updateEvents} 
               deleteEvent={this.props.deleteEvent}
               share_token={this.props.data.share_token} 
               event={event} 
               key={i}
             />
    }.bind(this));
    return (
      <div>
        <h1>My Timeline</h1>
        <section id="cd-timeline" className="cd-container">
          {eventComponents}
        </section>
      </div>
    )
  }
});

module.exports = TimeLine;