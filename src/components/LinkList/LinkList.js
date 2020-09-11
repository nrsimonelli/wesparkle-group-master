import React, { Component } from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import LinkListItem from "../LinkListItem/LinkListItem";
import { Button } from "@material-ui/core";

class LinkList extends Component {
  state = {
    filterTag: "",
    newLinkShow: true,
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
      payload: { filterTag, user },
    });
    // this.setState({
    //   filterTag: "",
    // });
  };

  newLinksFirst = () => {
    console.log("newLinksFirst clicked");
    const filterTag = this.state.filterTag;
    const user = this.props.reduxState.user;
    this.props.dispatch({
      type: "FETCH_NEW_FILTERED_LINKS",
      payload: { filterTag, user },
    });
    this.setState({
      // filterTag: "",
      newLinkShow: true,
    });
  };

  oldLinksFirst = () => {
    console.log("oldLinksFirst clicked");
    const filterTag = this.state.filterTag;
    const user = this.props.reduxState.user;
    this.props.dispatch({
      type: "FETCH_OLD_FILTERED_LINKS",
      payload: { filterTag, user },
    });
    this.setState({
      // filterTag: "",
      newLinkShow: false,
    });
  };
  render() {
    return (
      <div className="link-list container">
        <h2 id="userHeader">{this.props.reduxState.user.username}, here are your links!</h2>

        {/* This input is to filter link list
       by tags */}
        <textarea
          type="text"
          className="text-area short"
          name="filter"
          onChange={this.handleChange}
          placeholder="See links by tag"
        />
        <div className="filter-items">
          <Button
            id="filter"
            variant="outlined"
            color="default"
            onClick={this.filterTag}
          >
            Filter
          </Button>
          {this.state.newLinkShow ? (
            <Button
              id="filter"
              variant="outlined"
              color="default"
              onClick={this.oldLinksFirst}
            >
              Oldest First
            </Button>
          ) : (
            <Button
              id="filter"
              variant="outlined"
              color="default"
              onClick={this.newLinksFirst}
            >
              Newest First
            </Button>
          )}
          <Button
              id="filter"
              variant="outlined"
              color="default"
              onClick={()=>{this.props.dispatch({ type: "FETCH_LINKS" })}}
            >
              Clear
            </Button>
        </div>
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
