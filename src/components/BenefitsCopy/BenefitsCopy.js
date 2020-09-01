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
          Benefits of Link Shortening Part One
        </div>
        <div className='benefits image-box image-1'>

        </div>
        <div className='benefits image-title'>
          Benefits of Link Shortening Part Two
        </div>
        <div className='benefits image-box image-2'>

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