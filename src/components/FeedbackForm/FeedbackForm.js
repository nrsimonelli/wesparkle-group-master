import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../FeedbackForm/FeedbackForm.css';

// corresponds to 1.3
class FeedbackForm extends Component {
  componentDidMount () {
    console.log('did mount feedbackForm')
  }

  render() {
    return (
      <>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Email" />
        <textarea placeholder="Type your message here..."></textarea>
      </>
  ) // end return
} // end render
} // end class

export default connect()(FeedbackForm);       