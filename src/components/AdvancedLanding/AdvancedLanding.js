import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";
import LinkShortener from "../LinkShortener/LinkShortener";
import LinkList from "../LinkList/LinkList";
import FeedbackCarousel from "../FeedbackCarousel/FeedbackCarousel";
import FeedbackForm from '../FeedbackForm/FeedbackForm';
import LinkToMain from '../LinkToMain/LinkToMain';

class AdvancedLanding extends Component {

  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <div className='landing'>
        <LinkShortener />
        <LinkList />
        <FeedbackCarousel />
        <FeedbackForm />
        <LinkToMain />
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AdvancedLanding);
