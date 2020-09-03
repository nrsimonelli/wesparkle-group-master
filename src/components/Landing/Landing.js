import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";
import LinkShortener from "../LinkShortener/LinkShortener";
import FeedbackCarousel from "../FeedbackCarousel/FeedbackCarousel";
import BenefitsCopy from '../BenefitsCopy/BenefitsCopy';
import LinkSupportCopy from '../LinkSupportCopy/LinkSupportCopy';
import FeedbackForm from '../FeedbackForm/FeedbackForm';
import LinkToMain from '../LinkToMain/LinkToMain';

class Landing extends Component {

  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <div>
        <LinkShortener />
        <button onClick={()=> this.props.history.push('/login')}>Login/Register for Advanced Features</button>
        <BenefitsCopy />
        <LinkSupportCopy />
        <FeedbackCarousel />
        <FeedbackForm />
        <LinkToMain />
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Landing);
