import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";
import LinkShortener from "../LinkShortener/LinkShortener";
import LinkList from "../LinkList/LinkList";
import FeedbackCarousel from "../FeedbackCarousel/FeedbackCarousel";

class UserPage extends Component {

  render() {
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.user.username}!</h1>
        <p>Your ID is: {this.props.user.id}</p>
        <LinkShortener />
        <LinkList />
        <FeedbackCarousel />
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
