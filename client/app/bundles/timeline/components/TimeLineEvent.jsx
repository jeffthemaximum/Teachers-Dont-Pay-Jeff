import React from 'react';

const TimeLineEvent = React.createClass({
  render(){
    return (
      <div>
        <p>{this.props.event.title}</p>
        <p>{this.props.event.description}</p>
        <p>{this.props.event.date}</p>
      </div>
    )
  }
});

module.exports = TimeLineEvent;