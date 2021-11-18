import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import Navbar from './Navbar.js'

const ArticlePage = ({ article })  => 
  <>
    <Navbar />
    <div dangerouslySetInnerHTML={article.output}></div>
  </>