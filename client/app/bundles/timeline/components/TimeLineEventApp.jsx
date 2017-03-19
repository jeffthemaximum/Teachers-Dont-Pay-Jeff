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
    return moment(this.props.event.date).format('MMMM Do YYYY, h:mm:ss a');
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
              event={this.props.event} 
              share_token={this.props.share_token}
              formatDate={this.formatDate} 
              toggleEditState={this.toggleEditState}
              updateEvents={this.props.updateEvents}
            />
          :
            <TimeLineEvent 
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