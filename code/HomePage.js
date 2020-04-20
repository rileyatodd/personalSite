import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Page from './page'

const HomePage = ({ title, stylesheet, posts, script, _relativeURL, _ID }) => (
  <Page {...{title, stylesheet, script, _relativeURL, _ID }}>
    <h1>Welcome to my site!</h1>

    <p>
      I made this site as a place to dump my ideas out, fiddle around with new web 
      technologies, and display my work.
    </p>

    <h1 className="sectionDivider" id="thoughts">Thoughts</h1>

    {posts.map(post => 
      <div className="article">
        { post }
      </div> )}
  </Page>
)

HomePage.defaultProps = {};

export default HomePage;
