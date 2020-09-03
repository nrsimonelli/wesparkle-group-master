import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';


class LinkDetails extends Component {
    componentDidMount() {
        //janky workaround for if they try to refresh on details
        //Need to figure out how to keep us on details on refresh
        if (!this.props.reduxState.details.id) {
              this.props.history.push('/');
        }
        console.log("this.props.reduxState...", this.props.reduxState);
      }
    render() {
      return (
        <div>
          <p>Link Details</p>
          {JSON.stringify(this.props.reduxState.details)}
        </div>
      )
    }
  }
  const mapReduxStateToProps = (reduxState) => ({
    reduxState,
  });
  
  export default withRouter(connect(mapReduxStateToProps)(LinkDetails));
