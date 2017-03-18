import React from 'react';
import moment from 'moment';
import TimeLineEvent from './TimeLineEvent';

const TimeLineEventApp = React.createClass({

  getInitialState(){
    return({
      editingEvent: false
    })
  },

  formatDate(){
    return moment(this.props.event.date).format('MMMM Do YYYY, h:mm:ss a');
  },

  render(){
    return (
      <div className="timeline-event-container">
        { this.state.editingEvent ?
            <EditTimeLineEvent event={this.props.event} formatDate={this.formatDate} />
          :
            <TimeLineEvent event={this.props.event} formatDate={this.formatDate} />
        }
      </div>
    )
  }
});

module.exports = TimeLineEventApp;