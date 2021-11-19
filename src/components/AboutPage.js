import React from 'react'
import * as R from 'ramda'

import Head from './Head.js'
import Navbar from './Navbar.js'

export const AboutPage = ({ })  => 
  <html>
    <Head />
    <body>
      <Navbar />
      <div className='container'>
        <h1 className='text-center'>About Me</h1>
        <p>
          I am a software engineer currently working on making it easier to teach and learn math. I also accept
          consulting engagements via <a href='https://toddconsultingllc.com'>Todd Consulting LLC</a>
        </p>
        <p>You can contact me at <span className='bold'>riley(at){'<this domain>'}</span></p>
      </div>
    </body>
  </html>

export default AboutPage