import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';


const EditApp = React.createClass({

  getInitialState() {
    return ({
      copied: false
    });
  },

  toggleCopyState(){
    this.setState({copied: true})
    setTimeout(function(){
      this.setState({copied: false})
    }.bind(this), 1000);
  },

  render(){

    return (
      <div>
        <input className="form-control input-sm" type="text" value={this.props.data.editLink} readonly></input>
        <CopyToClipboard 
          text={this.props.data.editLink}
          onCopy={this.toggleCopyState}
        >
          <button onClick={this.props.toggleEditState} type="button" className="btn btn-default btn-xs">
            <span className="glyphicon glyphicon-edit" aria-hidden="true"></span> Copy Edit link
          </button>
        </CopyToClipboard>
        {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
      </div>
    )
  }

});

module.exports = EditApp;