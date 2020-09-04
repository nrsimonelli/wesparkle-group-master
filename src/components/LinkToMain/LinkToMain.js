import React, {Component} from 'react';


import {connect} from 'react-redux';


class LinkToMain extends Component {
  componentDidMount () {
    console.log('did mount linkToMain')
  }

  render() {
    return (
      <div className='link-to-main container'>

        <div className='support description'>A different but very similar discription than the one above about the same topic. should be the same style and lead to the same place.</div>
        <div className='image-title link-button'>
        <a href='https://www.wesparkle.org/' target='blank'>
        Learn More About how we help small businesses
        </a>
        </div>
      </div>
  ) // end return
} // end render
} // end class

export default connect()(LinkToMain);