import React from 'react';

import TimeLineEventApp from './TimeLineEventApp';

const EditTimelineTitle = React.createClass({
  render(){
    return(
      <div className="timeline-title-text container">
        {(this.props.data.editingTitle) ?
          <form>
            <div className={"form-group" + (this.props.data.error.title ? " has-error" : "")}>
              <div className="row">
                <div className="col-md-12">
                  {/*<label className='control-label' htmlFor="eventTitle">Timeline Title</label>*/}
                  <input
                    onChange={this.props.onTitleInputChange}
                    value={this.props.data.timelineTitle}
                    type="text"
                    placeholder="Timeline title"
                    className="form-control edit-timeline-title"
                    id="eventTitle"
                  />
                </div>
              </div>
              <div className="warning">
                <p>{this.props.data.error.title}</p>
              </div>
              <div className="buttons">
                <button disabled={this.props.data.saving} onClick={this.props.onCancelTitleEditClick} type="button" className="btn btn-default btn-xs">
                  <span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Cancel
                </button>
                <button disabled={this.props.data.saving} onClick={this.props.onTitleEditSubmit} type="button" className="btn btn-default btn-xs">
                  <span className="glyphicon glyphicon-floppy-save" aria-hidden="true"></span> Save
                </button>
              </div>
            </div>
          </form>
        :
            <h1 onClick={this.props.toggleTitleEditState} style={this.props.data.sharing ? {cursor:'default'} : {cursor:'pointer'}}>{this.props.data.timeline.title}</h1>
        }
      </div>
    )
  }
})

const TimeLine = React.createClass({
  getInitialState(){
    return ({
      events: this.props.data.events
    })
  },

  render(){
    var eventComponents = this.state.events.map(function(event, i){
      return <TimeLineEventApp 
               updateEvents={this.props.updateEvents} 
               deleteEvent={this.props.deleteEvent}
               share_token={this.props.data.share_token} 
               event={event} 
               key={i}
               data={this.props.data}
             />
    }.bind(this));
    return (
      <div className="timeline-container">
        <EditTimelineTitle
          data={this.props.data}
          onTitleInputChange={this.props.onTitleInputChange}
          toggleTitleEditState={this.props.toggleTitleEditState}
          onTitleEditSubmit={this.props.onTitleEditSubmit}
          onCancelTitleEditClick={this.props.onCancelTitleEditClick}
        />
        <section id="cd-timeline" className="cd-container">
          {eventComponents}
        </section>
      </div>
    )
  }
});

module.exports = TimeLine;