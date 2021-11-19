import React from 'react'

export const Navbar = _ =>
  <div className="navbar">
    <a href="/#" className="navbar-brand">Riley A Todd</a>
    <div id="site-nav" data-move-to="body" data-move-to-max-width="960">
    <div data-toggle-class="open" data-target="#site-nav" className="close">&times;</div>
      <ul>
        <li><a href="/articles" data-toggle-class="open" data-target="#site-nav">thoughts</a></li>
        <li><a href="/about.html">about me</a></li>
      </ul>
    </div>
    <a data-target="#site-nav" data-toggle-class="open" className="menu-toggle">menu</a>
  </div>

export default Navbar