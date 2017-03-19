import * as ReactBootstrap from 'react-bootstrap';
import React from 'react';

import ShareApp from './ShareApp';
import EditApp from './EditApp';

var Modal = ReactBootstrap.Modal;
var Popover = ReactBootstrap.Popover;
var Tooltip = ReactBootstrap.Tooltip;
var Button = ReactBootstrap.Button;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;

const EditShareApp = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

    return (
      <div className="d-inline-block">
        
        <button onClick={this.open} type="button" className="btn btn-default btn-xs edit-share-btn">
          <span className="glyphicon glyphicon-cog" aria-hidden="true"></span> Edit / Share
        </button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Edit or Share your timeline</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Click the button to copy a link. You can use these links to come back and edit your timeline or share it with someone else.
            </p>
            <div className="col-sm-6 col-md-6 col-lg-6">
              <EditApp data={this.props.data}/>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6">
              <ShareApp data={this.props.data}/>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

module.exports = EditShareApp;