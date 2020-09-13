import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import copy from "clipboard-copy";
import Button from "@material-ui/core/Button";

class LinkListItem extends Component {
  state = {
    copySuccess: "",
    baseUrl: "http://sprk.le/",
  };
  goToDetails = (link) => {
    console.log("editDetails clicked");
    // calls SET_DETAILS (details reducer) with
    //payload of the selected link's details
    this.props.dispatch({
      type: "SET_DETAILS",
      payload: { ...this.props.link },
    });
    //Then pushes history and brings us to the selected link's details
    this.props.history.push(`/details/${link.id}`);
  };

  copyLink = () => {
    console.log("copyLink clicked");
    // this calls the clipboard-copy library imported above
    copy(this.state.baseUrl + this.props.link.short_url);
  };

  deleteLink = (link) => {
    //id isn't being passed yet
    console.log("deleteLink clicked,", link);
    this.props.dispatch({ type: "REMOVE_LINK", payload: link });
  };

  render() {
    const link = this.props.link;

    return (
      <div className="container link-item">
        <div className="item-text item-title">Long URL:</div>
        <div className="item-text item-link">
          {<a href={link.long_url}>{link.long_url}</a>}
        </div>
        <div className="item-text item-title">Short URL:</div>
        <div className="item-text item-link">
          {
            <a href={this.state.baseUrl + link.short_url}>
              {this.state.baseUrl + link.short_url}
            </a>
          }
        </div>
        <div className="input-tag">
          <ul className="input-tag__tags">
            {link.tags.map((tag, i) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        <div className="link-item button">
          <Button
            id="copy"
            onClick={this.copyLink}
            variant="outlined"
            color="primary"
          >
            copy
          </Button>
          <Button
            id="edit"
            onClick={() => this.goToDetails(link)}
            variant="outlined"
            color="default"
          >
            edit
          </Button>
          <Button
            id="delete"
            onClick={() => this.deleteLink(link)}
            variant="outlined"
            color="secondary"
          >
            x
          </Button>
        </div>
      </div>
    ); // end return
  } // end render
} // end class

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default withRouter(connect(mapReduxStateToProps)(LinkListItem));
