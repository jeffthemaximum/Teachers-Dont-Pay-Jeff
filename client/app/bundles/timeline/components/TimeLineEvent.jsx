import React from 'react';
import moment from 'moment';

const TimeLineEvent = React.createClass({
  formatDate(){
    return moment(this.props.event.date).format('MMMM Do YYYY, h:mm:ss a');
  },

  render(){
    return (
      <div className="cd-timeline-block">
        <div className="cd-timeline-img cd-picture">
          <img src="/event-location.svg" alt="Picture"></img>
        </div>

        <div className="cd-timeline-content">
          <h2>{this.props.event.title}</h2>
          <p>{this.props.event.description}</p>
          <span className="cd-date">{this.formatDate()}</span>
        </div>
      </div>
    )
  }
});

module.exports = TimeLineEvent;