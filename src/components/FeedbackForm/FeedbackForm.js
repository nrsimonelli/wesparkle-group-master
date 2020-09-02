import React, { Component } from "react";
import { connect } from "react-redux";
import "../FeedbackForm/FeedbackForm.css";

// corresponds to 1.3
class FeedbackForm extends Component {
  state = {
    userEmail: "",
    userName: "",
    emailBody: "",
  };

  prepareToSendEmail = () => {
    // AUDRY - can I just send this.state?
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
          <p>
            <input
              type="text"
              placeholder="Name"
              value={this.state.userName}
              onChange={this.handleInputChangeFor("userName")}
            />

            <input
              type="text"
              placeholder="Email"
              value={this.state.userEmail}
              onChange={this.handleInputChangeFor("userEmail")}
            />
          </p>
          <p>
            <textarea
              placeholder="Type your message here..."
              value={this.state.emailBody}
              onChange={this.handleInputChangeFor("emailBody")}
            ></textarea>
          </p>
          <button onClick={this.prepareToSendEmail}>Submit</button>
        </center>
      </>
    ); // end return
  } // end render
} // end class

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(FeedbackForm);
