import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

class LinkListItem extends Component {
  goToDetails = (link) => {
    console.log("editDetails clicked", link);
    // calls SET_DETAILS (details reducer) with
    //payload of the selected link's details
    this.props.dispatch({ type: 'SET_DETAILS', payload: { ...this.props.link } })
    //Then pushes history and brings us to the selected link's details
    this.props.history.push('/details');
  };

  copyLink = () => {
    console.log("copyLink clicked");
  };

  deleteLink = (link) => {
    //id isn't being passed yet
    console.log("deleteLink clicked,", link);
    this.props.dispatch({ type: "REMOVE_LINK", payload: link})
  };

  render() {
    const link = this.props.link

    return (
      <div className="container link-item">
        Long URL: {JSON.stringify(link.long_url)}
        <br></br>
        Short URL: {JSON.stringify(link.short_url)}
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
