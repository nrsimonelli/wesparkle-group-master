import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class LinkDetails extends Component {
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
      <div>
        <p>Link Details</p>
        <div className="container link-item">
          Long URL: {link.long_url}
          <br></br>
          Short URL: {link.short_url}
          {/* <p>{link.short_url}</p> */}
          <div className="link-item button">
            <button 
            onClick={this.copyLink}
            >copy</button>
            <button 
            onClick={() => this.deleteLink(link)}
            >x</button>
          </div>
        </div>
      </div>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default withRouter(connect(mapReduxStateToProps)(LinkDetails));
