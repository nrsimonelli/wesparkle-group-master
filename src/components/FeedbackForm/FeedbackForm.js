import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../FeedbackForm/FeedbackForm.css';

// corresponds to 1.3
class FeedbackForm extends Component {

  state = {
    userEmail: '',
    userName: '',
    emailBody: ''
  }

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }; // End handleInputChangeFor()

  prepareToSendEmail = () => {

    // AUDRY - can I just send this.state?
    this.props.dispatch({
      type: 'FETCH_FEEDBACK',
      payload: {
        emailBody: this.state.emailBody,
        userEmail: this.state.userEmail,
        userName: this.state.userName
      },
    });
    
    // // make a nice object server can understand
    // let userEmail = {
    //                     emailBody: this.state.emailBody,
    //                     userEmail: this.state.userEmail,
    //                     userName: this.state.userName
    //                  }

    // // ask saga to help us do it
    //this.props.dispatch({ type: 'FETCH_FEEDBACK', payload: userEmail });

  } // End prepareToSendEmail()


  render() {
    return (
      <>
      <center>
          <input  type="text" 
                  placeholder="Name" 
                  onChange={this.handleInputChangeFor("userName")} 
          />

          <input  type="text" 
                  placeholder="Email" 
                  onChange={this.handleInputChangeFor("userEmail")} 
          />

          <textarea placeholder="Type your message here..." 
                    onChange={this.handleInputChangeFor("emailBody")} >
          </textarea>

          <button onClick={this.prepareToSendEmail}>Submit</button>
        </center>
      </>
    ) // end return
  } // end render
} // end class

const mapReduxStateToProps = reduxState => ({
  reduxState
});

export default connect(mapReduxStateToProps)(FeedbackForm);  