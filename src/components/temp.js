import React, {Component} from 'react';


import {connect} from 'react-redux';


class temp extends Component {
  componentDidMount () {
    console.log('componentDidMount temp');
  }

  render() {
    return (
      <div>

      </div>
  ) // end return
} // end render
} // end class

export default connect()(temp);