import React from 'react';
import ReactDOM from 'react-dom';

const TimeLineEvent = React.createClass({
  getInitialState() {
    return({
      showButtons: false
    })
  },

  componentWillMount() {
    // add event listener for clicks
    document.addEventListener('click', this.handleClick, false);
  },

  componentWillUnmount() {
    // make sure you remove the listener when the component is destroyed
    document.removeEventListener('click', this.handleClick, false);
  },

  handleClick(e){
    // this is the key part - ReactDOM.findDOMNode(this) gives you a reference
    // to your CalendarPopup component;
    // e.target is the element which was clicked upon.
    // check whether the element clicked upon is in your component - if not,
    // then call the close logic
    
    if(!ReactDOM.findDOMNode(this).contains(e.target)) {
      // the click was outside your component, so handle closing here
      this.setState({showButtons: false})
    } else{
      this.setState({showButtons: true})
    }
  },

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
          
          {
            this.state.showButtons &&

              <div className="buttons">
                <button onClick={this.props.toggleEditState} type="button" className="btn btn-default btn-xs">
                  <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit
                </button>
                <button type="button" className="btn btn-default btn-xs">
                  <span className="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete
                </button>
              </div>
          }
          
        </div>
      </div>
    )
  }
});

module.exports = TimeLineEvent;