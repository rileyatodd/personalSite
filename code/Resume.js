import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Page from './page';


const Resume = ({ title, stylesheet, main, script, _relativeURL, _ID, _pages }) => {

  return (
    <Page {...{ title, stylesheet, main, script, _relativeURL, _ID }}>
      <div className="resume">
        <div className="space-between v-center">
          <div>
            <h1 style={{fontSize: '40px', marginBottom: '18px'}}>Riley A. Todd</h1>
          </div>
          <div className="text-right">
            {/*<div style={{fontSize: '.8em'}}>
              (317) 413-8240
            </div>*/}
            <div style={{fontSize: '.8em'}}>
              <a href="mailto:rileyatodd@gmail.com">rileyatodd@gmail.com</a>
            </div>
            <div style={{fontSize: '.8em'}}>
              <a href="rileyatodd.com">rileyatodd.com</a>
            </div>
          </div>
        </div>

        <div className="section" style={{marginTop: '.8em'}}>
          <div className="space-between">
            <div>
              <h2>Publicis Media</h2>
              <div className="subheader">Sr. Software Engineer</div>
            </div>
            <div className="text-right">
              <div>Aug 2016 - Present</div>
              <div>Chicago, IL</div>
            </div>
          </div>
          <div>
            <p>
              I'm building a global marketing platform to help clients develop insights about their 
              customers. I've architected our Angular UI, driven features from the data modeling 
              phase through delivery of a polished interface, revamped the security controls, and 
              transformed the application from a frail monolith to a resilient, distributed system 
              that is deployed in eight configurations across three continents.
            </p>
            <p>
              In addition to developing new features, I focus on security, reliability, and automation.
               It used to take two days to provision the infrastructure for a new instance of the 
               application. I automated that processes using ansible and cloudformation and now it 
               takes two hours. I saw that our teams were wasting effort writing similar code for 
               each service, so I extracted common code to a shared client library. Our ingress 
               policies were poorly defined until I implemented an API gateway to handle all incoming 
               traffic. When our team members struggled to follow requests through our distributed 
               architecture, I added standardized logging, monitoring, and tracing to improve 
               visibility. I've refactored misguided data models, improved our continuous integration 
               pipeline, implemented single sign on via ADFS, and built rich interfaces and data 
               visualizations. Overcoming this wide array of challenges has been very satisfying.
            </p>
          </div>
        </div>

        <div className="section">
          <div className="space-between">
            <div>
              <h2>Healthcare Reasearch LLC</h2>
              <div className="subheader">Software Engineer</div>
            </div>
            <div className="text-right">
              <div>Jul 2015 - Jul 2016</div>
              <div>Chicago, IL</div>
            </div>
          </div>
          <div>
            <p>
              I created new features on both a public php site with over a million users and 
              an internal analytics platform built in Java using the Spring framework.
            </p>
          </div>
        </div>

        <div className="section">
          <div className="space-between">
            <div>
              <h2>GE Capital</h2>
              <div className="subheader">
                <div>Information Technology Leadership Program</div>
              </div>
            </div>
            <div className="text-right">
              <div>May 2014 - Jul 2014</div>
              <div>New Orleans, LA</div>
            </div>
          </div>
          <div>
            <p>
              I created a risk assessment application using Angular, Spring, and PostgreSQL that
               automated a months long analysis so that it could be done in a matter of days.
            </p>
          </div>
        </div>

        <div className="section">
          <div className="space-between">
            <div>
              <h2>Indiana University</h2>
              <div className="subheader">
                <div>B.S. in Economic Consulting</div>
                <div>Computer Science Minor</div>
              </div>
            </div>
            <div className="text-right">
              <div>Aug 2011 - May 2015</div>
              <div>Bloomington, IN</div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <h3 style={{marginBottom: '8px'}}>Interests</h3>
            <p style={{marginBottom: '8px'}}>
              I enjoy exploring generative art, functional programming, and guitar. I also love 
              playing tennis, basketball, and volleyball.
            </p>
          </div>
        </div>
      </div>
    </Page>
  )
}

Resume.propTypes = {};

Resume.defaultProps = {};

export default Resume;
