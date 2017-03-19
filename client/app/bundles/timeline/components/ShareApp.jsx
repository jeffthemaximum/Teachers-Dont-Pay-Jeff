import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

const ShareApp = React.createClass({

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
        <input className="form-control input-sm" type="text" value={this.props.data.shareLink} readonly></input>
        <CopyToClipboard text={this.props.data.shareLink}
          onCopy={this.toggleCopyState}>
          <button onClick={this.props.toggleEditState} type="button" className="btn btn-default btn-xs">
            <span className="glyphicon glyphicon-share" aria-hidden="true"></span> Copy Share link
          </button>
        </CopyToClipboard>
        {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
      </div>
    )
  }

});

module.exports = ShareApp;