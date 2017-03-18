import React from 'react';

import TimeLineEvent from './TimeLineEvent';

const TimeLine = React.createClass({
  getInitialState(){
    return ({
      events: this.props.data.events
    })
  },

  render(){
    var eventComponents = this.state.events.map(function(event, i){
      return <TimeLineEvent event={event} key={i}/>
    })
    return (
      <div>
        {eventComponents}
      </div>
    )
  }
});

module.exports = TimeLine;