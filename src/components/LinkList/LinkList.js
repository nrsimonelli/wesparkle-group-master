import React, { Component } from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import LinkListItem from "../LinkListItem/LinkListItem";

class LinkList extends Component {

  componentDidMount() {
    console.log("component did mount, LinkList");
    this.props.dispatch({ type: "FETCH_LINKS" });
  }

  render() {
    return (
      <div>
        <p>Link List</p>
        {/* maps links in database and 
    passes down props to LinkListItem */}
    {/* {JSON.stringify(this.props.reduxState.link)} */}
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