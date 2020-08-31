import React, {Component} from 'react';


import {connect} from 'react-redux';

// corresponds to 1.0
class LinkShortener extends Component {
  componentDidMount () {
    console.log('component did mount, link Shortener')
  }

  render() {
    return (
      <div>

      </div>
  ) // end return
} // end render
} // end class

export default connect()(LinkShortener);