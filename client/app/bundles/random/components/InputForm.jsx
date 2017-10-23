import React from 'react';

import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
  ButtonToolbar,
} from 'react-bootstrap'

const InputForm = React.createClass({
  getInitialState() {
    return {
      value: ''
    };
  },

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  },

  handleChange(e) {
    this.setState({ value: e.target.value });
  },

  handleSubmit(e) {
    e.preventDefault();
    this.props.addStudent(this.state.value)
    this.setState({ value: '' })
  },

  render() {
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel>Working example with validation</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
            bsSize="large"
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
          <ButtonToolbar>
            <Button
              disabled={this.state.submitting}
              bsStyle="info"
              bsSize="large"
              onClick={this.handleSubmit}
            >
              Add Student
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </form>
    );
  }
});

export default InputForm