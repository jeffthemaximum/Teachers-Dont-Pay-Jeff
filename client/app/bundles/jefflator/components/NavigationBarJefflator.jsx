// https://github.com/eslint/eslint/issues/6876
// eslint-disable new-cap

import React, { PropTypes } from 'react';


const NavigationBarJefflator = React.createClass({

  customStyles(){
    return {
      marginBottom: '0px',
      borderRadius: '0px',
      background: '#89253e',
      borderColor: '#89253e'
    }
  },

  render(){
    /* eslint-disable new-cap */
    return (
      <nav
        className="navbar navbar-default"
        role="navigation"
        style={this.customStyles()}
      >
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="/">Teachers Don't Pay Jeff</a>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = NavigationBarJefflator;
