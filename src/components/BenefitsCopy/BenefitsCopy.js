import React, {Component} from 'react';


import {connect} from 'react-redux';

// 1.1
class BenefitsCopy extends Component {
  componentDidMount () {
    console.log('did mount, BenefitsCopy')
  }

  render() {
    return (
      <div className='benefits-container'>
        <div className='benefits image-title'>
          Title One
        </div>
        <div className='benefits image-box'>
          <div className='image-1'></div>

        </div>
        <div className='benefits image-title'>
          Title Two
        </div>
        <div className='benefits image-box'>
          <div className='image-2'></div>

        </div>

      </div>
  ) // end return
} // end render
} // end class

export default connect()(BenefitsCopy);