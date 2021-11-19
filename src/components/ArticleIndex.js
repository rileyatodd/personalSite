import React from 'react'
import * as R from 'ramda'

import Head from './Head.js'
import Navbar from './Navbar.js'

import { pipeVal } from '../lib/util.js'

export const ArticleIndex 
= ({ articles })  => 
  <html>
    <Head />
    <body>
      <Navbar />
      <div className='container'>
        <h1 className='text-center'>Thoughts</h1>
        <p>
          Here are some thoughts that I've written out as essays or blog articles. Enjoy.
        </p>
        <hr />
        {articles.map(a => 
          <a href={`/articles/${a.outputName}`} key={a.fileName}>
            {a.title}
          </a>)}
      </div>
    </body>
  </html>

export default ArticleIndex