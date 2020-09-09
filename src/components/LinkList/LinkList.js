import React, { Component } from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import LinkListItem from "../LinkListItem/LinkListItem";

class LinkList extends Component {
  state = {
    filterTag: "",
  };
  componentDidMount() {
    console.log("component did mount, LinkList");
    this.props.dispatch({ type: "FETCH_LINKS" });
  }

  handleChange = (event) => {
    this.setState({
      filterTag: event.target.value,
    });
  };

  filterTag = (event) => {
    event.preventDefault();
    const filterTag = this.state.filterTag;
    const user = this.props.reduxState.user;
    this.props.dispatch({ 
      type: "FETCH_FILTERED_LINKS", 
      payload: {filterTag, user} })
    this.setState({
      filterTag: ''
    })
  }
  render() {
    return (
      <div className="link-list container">
        <h3>Here are your links!</h3>
       
       {/* This input is to filter link list
       by tags */}
        <input
          type="text"
          onChange={this.handleChange}
          placeholder="See links by tag"
        />
        <button
        onClick={this.filterTag}
        >Filter</button>
        
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
  reduxState,
});

export default connect(mapReduxStateToProps)(LinkList);
