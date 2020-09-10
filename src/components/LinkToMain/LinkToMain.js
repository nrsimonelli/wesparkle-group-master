import React, {Component} from 'react';


import {connect} from 'react-redux';


class LinkToMain extends Component {
  componentDidMount () {
    console.log('did mount linkToMain')
  }

  render() {
    return (
      <div className='link-to-main container'>

        <div className='support description'></div>
        <div className='image-title link-button'>
        <a href='https://www.wesparkle.org/' target='blank'>
        Learn more about how we help small businesses!
        </a>
        </div>
      </div>
  ) // end return
} // end render
} // end class

export default connect()(LinkToMain);