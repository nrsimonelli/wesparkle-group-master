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

  render() {
    return (
      <div>
        <p>Link Details</p>
        {JSON.stringify(this.props.reduxState.details)}
      </div>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default withRouter(connect(mapReduxStateToProps)(LinkDetails));
