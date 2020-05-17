import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const NavBar = () => (
  <div className="navbar">
    <a className="navbar-brand" href="/#">
      Riley A Todd
    </a>
    <div id="site-nav" data-move-to="body" data-move-to-max-width="960">
      <div className="close" data-toggle-class="open" data-target="#site-nav">
        &times;
      </div>
      <ul>
        <li>
          <a href="/posts/" data-toggle-class="open" data-target="#site-nav">
            thoughts
          </a>
        </li>
        <li>
          <a href="/projects/chicago-food-safety">
            food safety map
          </a>
        </li>
      </ul>
    </div>
    <a className="menu-toggle" data-target="#site-nav" data-toggle-class="open">
      menu
    </a>
  </div>
);

NavBar.defaultProps = {};

export default NavBar;
