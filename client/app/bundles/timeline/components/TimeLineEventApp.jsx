import React from 'react';
import moment from 'moment';
import TimeLineEvent from './TimeLineEvent';
import EditTimeLineEvent from './EditTimeLineEvent';

const TimeLineEventApp = React.createClass({

  getInitialState(){
    return({
      editingEvent: false
    })
  },

  formatDate(){
    let event = this.props.event;
    let momentFormat;
    const {date, month, day, hour, minute} = event;
    // if only year
    if (!month && !day && !hour && !minute){
      momentFormat = 'YYYY';
    }
    // if it has month
    else if (month && !day && !hour && !minute) {
      momentFormat = 'MMMM YYYY';
    }
    else if (month && day && !hour && !minute) {
      momentFormat = 'MMMM Do, YYYY';
    }
    else if (month && day && hour && !minute) {
      momentFormat = 'MMMM Do, YYYY, h a';
    }
    else if (month && day && hour && minute) {
      momentFormat = 'MMMM Do, YYYY, h:mm a';
    }
    // if it only has time
    else if (!month && !day && hour && !minute) {
      momentFormat = 'h a YYYY';
    }
    else if (!month && !day && hour && minute) {
      momentFormat = 'h:mm a YYYY';
    } else {
      momentFormat = 'MMMM Do, YYYY, h:mm a';
    }
    return moment.utc(date).format(momentFormat);
  },



  toggleEditState(){
    let currState = this.state.editingEvent;
    this.setState({editingEvent: !currState});
  },

  render(){
    return (
      <div className="timeline-event-container">
        { this.state.editingEvent ?
            <EditTimeLineEvent 
              data={this.props.data}
              event={this.props.event} 
              share_token={this.props.share_token}
              formatDate={this.formatDate} 
              toggleEditState={this.toggleEditState}
              updateEvents={this.props.updateEvents}
            />
          :
            <TimeLineEvent 
              data={this.props.data}
              event={this.props.event} 
              share_token={this.props.share_token}
              formatDate={this.formatDate} 
              toggleEditState={this.toggleEditState}
              deleteEvent={this.props.deleteEvent}
            />
        }
      </div>
    )
  }
});

module.exports = TimeLineEventApp;