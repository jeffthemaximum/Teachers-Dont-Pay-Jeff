import React from 'react';

const TimeLineEvent = React.createClass({
  render(){
    return (
      <div className="cd-timeline-block">
        <div className="cd-timeline-img cd-picture">
          <img src="/event-location.svg" alt="Picture"></img>
        </div>

        <div className="cd-timeline-content">
          <h2>{this.props.event.title}</h2>
          <p>{this.props.event.description}</p>
          <span className="cd-date">{this.props.event.date}</span>
        </div>
      </div>
    )
  }
});

module.exports = TimeLineEvent;