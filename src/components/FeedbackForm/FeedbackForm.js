import React, { Component } from "react";
import { connect } from "react-redux";
import "../FeedbackForm/FeedbackForm.css";
import * as EmailValidator from "email-validator";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// corresponds to 1.3
class FeedbackForm extends Component {
  state = {
    userEmail: "",
    userName: "",
    emailBody: "",
    emailValid: false,
    emailError: false,
  };

  prepareToSendEmail = () => {
    if (EmailValidator.validate(this.state.userEmail)) {
      // set booleans for conditional rendering of email verification on DOM
      this.setState({ emailValid: true });
      this.setState({ emailError: false });

      this.props.dispatch({
        type: "FETCH_FEEDBACK",
        payload: {
          emailBody: this.state.emailBody,
          userEmail: this.state.userEmail,
          userName: this.state.userName,
        },
      });
      // Clear inputs after submit
      this.setState({
        emailBody: "",
        userEmail: "",
        userName: "",
      });
    } else {
      // set booleans for conditional rendering of email verification on DOM
      this.setState({ emailValid: false });
      this.setState({ emailError: true });
      console.log("E-mail address error");
    }
  }; // End prepareToSendEmail()

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }; // End handleInputChangeFor()

  render() {
    return (
      <>
        <center>
          <h2>Feedback</h2>
          <div className='feedback-input'>
            <TextField
              id="outlined-name-input"
              label="Name"
              type="text"
              name="name"
              margin="normal"
              variant="outlined"
              value={this.state.userName}
              onChange={this.handleInputChangeFor("userName")}
            />

            <TextField
              id="outlined-email-input"
              label="Email"
              type="text"
              name="email"
              margin="normal"
              variant="outlined"            
              value={this.state.userEmail}
              onChange={this.handleInputChangeFor("userEmail")}
            />
          </div>
          <p>
            <textarea
              className='text-area-2'
              placeholder="Type your message here..."
              value={this.state.emailBody}
              onChange={this.handleInputChangeFor("emailBody")}
            ></textarea>
          </p>
          <Button 
            variant='outlined'
            color='secondary'
            id='delete'
            onClick={this.prepareToSendEmail}
            >Submit
          </Button>
          {this.state.emailValid ? <p>E-mail sent successfully</p> : <p></p>}
          {this.state.emailError ? (
            <p>Error: invalid email address</p>
          ) : (
            <p></p>
          )}
        </center>
      </>
    ); // end return
  } // end render
} // end class

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(FeedbackForm);
