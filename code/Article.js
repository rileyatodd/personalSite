import PropTypes from 'prop-types';
import React from 'react';
import Page from './page';

const Article = ({ title, stylesheet, header, main, footer, script, _relativeURL, _ID, children }) => (
  <Page {...{ title, stylesheet, header, footer, script, _relativeURL, _ID }}>
    <div className="article">
      { main }
    </div>
  </Page>
);

Article.propTypes = {
  title: PropTypes.string.isRequired
};

Article.defaultProps = {};

export default Article;
