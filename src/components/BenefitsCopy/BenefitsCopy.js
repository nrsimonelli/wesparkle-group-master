import React, {Component} from 'react';


import {connect} from 'react-redux';

// 1.1
class BenefitsCopy extends Component {
  componentDidMount () {
    console.log('did mount, BenefitsCopy')
  }

  render() {
    return (
      <div>

      </div>
  ) // end return
} // end render
} // end class

export default connect()(BenefitsCopy);