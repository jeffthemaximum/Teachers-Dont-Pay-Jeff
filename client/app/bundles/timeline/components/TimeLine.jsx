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

          <h1>Responsive Vertical Timeline</h1>


        <section id="cd-timeline" className="cd-container">
          {eventComponents}
        </section>
      </div>
    )
  }
});

module.exports = TimeLine;