import React, { Component } from "react";
import { connect } from "react-redux";
import LinkShortener from "../LinkShortener/LinkShortener";
import LinkList from "../LinkList/LinkList";
import FeedbackCarousel from "../FeedbackCarousel/FeedbackCarousel";
import TextField from "@material-ui/core/TextField";
import FeedbackForm from "../FeedbackForm/FeedbackForm";

class LoginPage extends Component {
  state = {
    username: "",
    password: "",
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: "LOGIN",
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        {this.props.errors.loginMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.loginMessage}
          </h2>
        )}
        <LinkShortener />
        <LinkList />
        <FeedbackCarousel />
        <form onSubmit={this.login}>
          <h1>Login</h1>
          <div>
            <TextField
              id="outlined-username-input"
              label="Username"
              type="text"
              className="text-field"
              name="username"
              margin="normal"
              variant="outlined"
              value={this.state.username}
              onChange={this.handleInputChangeFor("username")}
            />
          </div>
          <div>
            <TextField
              id="outlined-password-input"
              label="Password"
              className="text-field"
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChangeFor("password")}
            />
          </div>
          <div>
            <input
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
            />
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {
              this.props.dispatch({ type: "SET_TO_REGISTER_MODE" });
            }}
          >
            Register
          </button>
        </center>
        <FeedbackForm />
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
