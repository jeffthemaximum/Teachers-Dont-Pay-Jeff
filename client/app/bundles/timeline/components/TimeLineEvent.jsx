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
          <span className="cd-date">{this.props.formatDate()}</span>

          <div className="buttons">
            <button onClick={this.props.toggleEditState} type="button" className="btn btn-default btn-xs">
              <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit
            </button>
            <button type="button" className="btn btn-default btn-xs">
              <span className="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete
            </button>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = TimeLineEvent;