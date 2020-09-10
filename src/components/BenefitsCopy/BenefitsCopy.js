import React, {Component} from 'react';


import {connect} from 'react-redux';

// 1.1
class BenefitsCopy extends Component {
  componentDidMount () {
    console.log('did mount, BenefitsCopy')
  }

  render() {
    return (
      <div className='benefits container'>
        <div className='benefits image-title'>
          Why make a short link?
        </div>
        <div className='benefits image-box image-1'>

        </div>
        <div className='support description'>
        - Makes it easy for people to remember your website or link!
        </div>
        <div className='support description'>
        - Some social media channels like Twitter have character limits.
        </div>
        <div className='support description'>
        - Makes your social media posts, flyers, and emails look more professional.
        </div>
        <div className='benefits image-title'>
          Why make a QR code?
        </div>
        <div className='benefits image-box image-2'>

        </div>
        <div className='support description'>
        - Makes it easy for people to use their phones to scan and be directed to the correct website.   
        </div>      
        <div className='support description'>
        - People don't have to remember your website or type it into their phone/laptop (and accidentally misspell it).        
        </div>
        <div className='support description'>
        - QR codes are graphics that can sometimes be more eye-catching than a website link.
        </div>
        <div className='image-title link-button'>
        <a href='https://www.wesparkle.org/' target='blank'>
        View the full guide
        </a>
        </div>
      </div>
    ) // end return
  } // end render
} // end class

export default connect()(BenefitsCopy);