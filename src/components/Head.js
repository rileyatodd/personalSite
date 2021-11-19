import React from 'react'

export const Head = ({ title })  => 
  <head>
    <title>{title || 'Riley A Todd'}</title>
    <link rel="stylesheet" href="/stylesheets/style.css" />

    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Personal Website of Riley A Todd" />
    <meta name="author" content="Riley A. Todd" />
    <meta name="robot" content="index, follow" />
    <link rel="shortcut icon" href="/favicon.ico?v=2" />
    <script src="/javascripts/index.js" />
  </head>

export default Head