import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Page from './page';


const PostsIndexPage = ({ title, stylesheet, main, script, _relativeURL, _ID, _pages }) => {
  let posts = Object.keys(_pages)
    .filter(path => path.startsWith('posts/'))
    .map(path => _pages[path])

  return (
    <Page {...{ title, stylesheet, main, script, _relativeURL, _ID }}>
      <h1>My Thoughts</h1>

      <ul>
        {posts.map(post => 
          <li>
            <a href={post._url}>{ post.title }</a>
          </li> )}
      </ul>
    </Page>
  )
}

PostsIndexPage.propTypes = {
  title: PropTypes.string.isRequired
};

PostsIndexPage.defaultProps = {};

export default PostsIndexPage;
