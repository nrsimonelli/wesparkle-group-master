import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import QRCode from "qrcode.react";
import copy from "clipboard-copy";
import LinkTags from '../LinkTags/LinkTags';

class LinkDetails extends Component {
  state = {
    copySuccess: "",
    baseUrl: "http://localhost:5000/api/link/",
  };

  componentDidMount() {
    //if no details in redux, it will call this
    //to get it from server based on id in /details/:id
    if (!this.props.reduxState.details.id) {
      this.props.dispatch({
        type: "FETCH_DETAILS",
        payload: this.props.match.params.id,
      });
    }
    console.log("this.props.reduxState...", this.props.reduxState);
  }

  copyLink = () => {
    console.log("copyLink clicked");
    // this calls the clipboard-copy library imported above
    copy(this.state.baseUrl + this.props.reduxState.details.short_url);
    this.setState({
        copySuccess: "Link copied!",
      });
  };

  deleteLink = (link) => {
    //   deletes (disables) link and returns user to main page
    console.log("deleteLink clicked,", link);
    this.props.dispatch({ type: "REMOVE_LINK", payload: link });
    this.props.history.push(`/`);
  };

  render() {
    const link = this.props.reduxState.details;
    return (
      <center>
        <p>Link Details</p>
        <div className="container link-item">
        Long URL: {<a href={link.long_url}>{link.long_url}</a>}
        <br></br>
        Short URL: {<a href={this.state.baseUrl + link.short_url}>{this.state.baseUrl + link.short_url}</a>}
        {/* <p>{link.short_url}</p> */}
        <p>{this.state.copySuccess}</p>
        <div className="link-item button">
          <button 
          onClick={this.copyLink}
          >copy</button>
          <button 
          onClick={()=>this.deleteLink(link)}
          >x</button> </div>
         {/* asynchronicity doesn't like this. 
         It tries to generate QR before componentDidMount 
         <QRCode value={link.short_url} /> */}
         
        </div>
        <LinkTags />
      </center>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default withRouter(connect(mapReduxStateToProps)(LinkDetails));
