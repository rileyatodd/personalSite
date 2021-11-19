import React from 'react'

import Head from './Head.js'
import Navbar from './Navbar.js'

export const ArticlePage = ({ article })  => 
  <html>
    <Head title={article.title} />
    <body>
      <Navbar />
      <div
        className='article container' 
        dangerouslySetInnerHTML={{__html: article.html}}>
      </div>
    </body>
  </html>

export default ArticlePage