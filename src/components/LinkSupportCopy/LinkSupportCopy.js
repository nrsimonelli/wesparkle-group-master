import React, {Component} from 'react';


import {connect} from 'react-redux';


class LinkSupportCopy extends Component {
  componentDidMount () {
    console.log('did mount linkSupportCopy');
  }

  render() {
    return (
      <div>

      </div>
  ) // end return
} // end render
} // end class

export default connect()(LinkSupportCopy);