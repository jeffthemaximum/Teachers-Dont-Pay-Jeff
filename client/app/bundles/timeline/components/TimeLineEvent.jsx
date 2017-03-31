import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactOnRails from 'react-on-rails';

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

  onDeleteClick(){
    const requestConfig = {
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
    };
    let url = "/events/" + this.props.event.id;
    let data = {
      "_method":"delete",
      "event": {
        "share_token": this.props.share_token,
      }
    }

     var promise = $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: data,
        headers: ReactOnRails.authenticityHeaders()
    });
    promise.then(function(response){
      this.props.deleteEvent(response);
    }.bind(this))
    promise.catch(function(error){
      console.log(error);
    })
  },

  render(){
    const renderedPics = this.props.event.documents.map(function(doc){
      return (
        <img 
          key={doc.id} 
          src={doc.direct_upload_url} 
          className="img-responsive img-rounded" 
          alt={this.props.upload_file_name} 
          width="304" 
          height="236">
        </img>
      )
    }.bind(this));
    return (
      <div className="cd-timeline-block">
        <div className="cd-timeline-img cd-picture">
          <img src="/event-location.svg" alt="Picture"></img>
        </div>

        <div className="cd-timeline-content">
          <h2>{this.props.event.title}</h2>
          <p>{this.props.event.description}</p>
          <p className="cd-date">{this.props.formatDate()}</p>
          {renderedPics}
          {
            this.state.showButtons &&

              <div className="buttons">
                <button onClick={this.props.toggleEditState} type="button" className="btn btn-default btn-xs">
                  <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit
                </button>
                <button onClick={this.onDeleteClick} type="button" className="btn btn-default btn-xs">
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