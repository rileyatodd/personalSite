import React from 'react'
import * as R from 'ramda'

import Head from './Head.js'
import Navbar from './Navbar.js'

import { pipeVal } from '../lib/util.js'

export const HomePage = ({ articles })  => 
  <html>
    <Head />
    <body>
      <Navbar />
      <div className='container'>
        <h1 className='text-center'>Welcome</h1>
        <p>
          I made this site as a place to dump my ideas out, fiddle around with new 
          web technologies, and display my work. 
        </p>
        <h2 className='text-center'>Thoughts</h2>
        <hr />
        {pipeVal(articles,
          R.sortBy(R.prop('publishDate')),
          R.take(2),
          R.map(a => 
            <div 
              key={a.fileName}
              className='article'
              dangerouslySetInnerHTML={{__html: a.html}} />))}
      </div>
    </body>
  </html>

export default HomePage