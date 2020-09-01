import React, {Component} from 'react';


import {connect} from 'react-redux';


class LinkSupportCopy extends Component {
  componentDidMount () {
    console.log('did mount linkSupportCopy');
  }

  render() {
    return (
      <div className='support container'>
        <div className='support image-box image-1'></div>
        <div className='support image-title'>Support Small Businesses</div>
        <div className='support description'>This is a longer description about small businesses. It should have slightly smaller font and it should explain our points clearly</div>
      </div>
  ) // end return
} // end render
} // end class

export default connect()(LinkSupportCopy);