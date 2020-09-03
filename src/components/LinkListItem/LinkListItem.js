import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import copy from "clipboard-copy";

class LinkListItem extends Component {
  state = {
    copySuccess: "",
    baseUrl: "http://localhost:5000/api/link/",
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
        Long URL: {<a href={link.long_url}>{link.long_url}</a>}
        <br></br>
        Short URL: {<a href={this.state.baseUrl + link.short_url}>{this.state.baseUrl + link.short_url}</a>}
        {/* <p>{link.short_url}</p> */}
        <div className="link-item button">
          <button 
          onClick={this.copyLink}
          >copy</button>
          <button 
          onClick={() => this.goToDetails(link)}
          >details</button>
          <button 
          onClick={()=>this.deleteLink(link)}
          >x</button>

        </div>
      </div>
    ); // end return
  } // end render
} // end class

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default withRouter(connect(mapReduxStateToProps)(LinkListItem));
