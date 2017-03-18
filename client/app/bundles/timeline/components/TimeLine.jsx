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
      return <TimeLineEventApp event={event} key={i}/>
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