import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';

import {
  Col,
  Grid,
  Row,
  Jumbotron,
  Button,
  ButtonToolbar
} from 'react-bootstrap';

import InputForm from './InputForm';
import List from './List';

const RandomApp = React.createClass({

  getInitialState() {
    return {
      randomList: JSON.parse(this.props.randomList),
      submitting: false,
    };
  },

  addStudent(val) {
    this.setState({ submitting: true });

    const requestConfig = {
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
    };

    const data = {
      name: val,
      randomListId: this.state.randomList.id,
    };

    axios.post('/random_students', data, requestConfig)
    .then((response) => {
      this.setState({
        randomList: response.data,
        submitting: false,
      });
    })
    .catch((error) => {
      // TODO error messaging
      console.log(error);
      this.setState({ saving: false });
    });
  },

  randomPick() {
    this.setState({ submitting: true });

    const requestConfig = {
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
    };

    const data = {
      randomListId: this.state.randomList.id,
    };

    axios.post('/random_lists/pick', data, requestConfig)
    .then((response) => {
      this.setState({
        randomList: response.data,
        submitting: false,
      });
    })
    .catch((error) => {
      // TODO error messaging
      console.log(error);
      this.setState({ saving: false });
    });
  },

  undoPick() {
    this.setState({ submitting: true });

    const requestConfig = {
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
    };

    const data = {
      randomListId: this.state.randomList.id,
    };

    axios.post('/random_lists/undo', data, requestConfig)
    .then((response) => {
      this.setState({
        randomList: response.data,
        submitting: false,
      });
    })
    .catch((error) => {
      // TODO error messaging
      console.log(error);
      this.setState({ saving: false });
    });
  },

  render() {

    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col xs={6} sm={6} md={6}>
              <Jumbotron>
                <h1>Pick a student!</h1>
                <ButtonToolbar>
                  <Button
                    bsStyle="primary"
                    onClick={this.randomPick}
                  >
                    Random!
                  </Button>
                  <Button
                    bsStyle="warning"
                    onClick={this.undoPick}
                  >
                    Undo
                  </Button>
                </ButtonToolbar>
              </Jumbotron>
            </Col>
            <Col xs={6} sm={6} md={6}>
              <InputForm
                addStudent={this.addStudent}
                {...this.state}
              />
            </Col>
          </Row>
        </Grid>
        <List
          {...this.state}
        />
      </div>
    );
  }
})

export default RandomApp;
