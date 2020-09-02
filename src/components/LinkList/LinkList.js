import React, { Component } from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import LinkListItem from "../LinkListItem/LinkListItem";

class LinkList extends Component {
  render() {
    return (
      <div>
        <p>Link List</p>
        {/* maps links in database and 
    passes down props to LinkListItem */}
        {this.props.reduxState.link.map((link, i) => (
          <LinkListItem key={i} link={link} />
        ))}
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(LinkList);