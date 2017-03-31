// https://github.com/eslint/eslint/issues/6876
// eslint-disable new-cap

import classNames from 'classnames';
import _ from 'lodash';
import React, { PropTypes } from 'react';

import CommentsCount from './CommentsCount';
import * as paths from '../../constants/paths';

const NavigationBar = (props) => {

  const { commentsCount, pathname, data } = props;

  /* eslint-disable new-cap */
  return (
    <nav className="navbar navbar-default" role="navigation">
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
          <a className="navbar-brand" href="/timeline">JeffLine</a>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          { data.loggedIn ?
            <ul className="nav navbar-nav">
              <li>
                <a rel="nofollow" data-method="delete" href="/users/sign_out">Logout</a>
              </li>
              <li>
                <a href="/users/edit">My timelines</a>
              </li>
            </ul>
            :
            <ul className="nav navbar-nav">
              <li>
                <a href="/users/sign_in">Login</a>
              </li>
            </ul>
          }
          
        </div>
      </div>
    </nav>
  );
};

NavigationBar.propTypes = {
  commentsCount: PropTypes.number,
  pathname: PropTypes.string.isRequired,
};

export default NavigationBar;
