import React, {Component} from 'react';


import {connect} from 'react-redux';


class LinkToMain extends Component {
  componentDidMount () {
    console.log('did mount linkToMain')
  }

  render() {
    return (
      <div>

      </div>
  ) // end return
} // end render
} // end class

export default connect()(LinkToMain);