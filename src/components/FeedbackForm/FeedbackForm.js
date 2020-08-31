import React, {Component} from 'react';


import {connect} from 'react-redux';

// corresponds to 1.3
class FeedbackForm extends Component {
  componentDidMount () {
    console.log('did mount feedbackForm')
  }

  render() {
    return (
      <div>

      </div>
  ) // end return
} // end render
} // end class

export default connect()(FeedbackForm);