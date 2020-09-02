import React, { Component } from "react";
import { connect } from "react-redux";

class LinkListItem extends Component {
  editDetails = () => {
    console.log("editDetails clicked");
    // calls SET_DETAILS (details reducer) with
    //payload of the selected link's details
    this.props.dispatch({ type: 'SET_DETAILS', payload: { ...this.props.link } })
    //Then pushes history and brings us to the selected link's details
    this.props.history.push('/details');
  };

  copyLink = () => {
    console.log("copyLink clicked");
  };
  deleteLink = (row) => {
    console.log("deleteLink clicked,", row);
  };

  render() {
    const row = this.props.reduxState.link;

    return (
      <div className="container link-item">
        <p>LinkListItem </p>
        {JSON.stringify(this.props.reduxState.link)}

        <div className="link-item button">
          <button onClick={this.copyLink}>copy</button>
          <button onClick={this.editDetails}>edit</button>
          <button onClick={()=>this.deleteLink(row.id)}>x</button>
        </div>
      </div>
    ); // end return
  } // end render
} // end class

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(LinkListItem);
