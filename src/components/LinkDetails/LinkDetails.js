import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';

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
      <div className='landing'>
                <h1>Link Details</h1>

        <div className='container link-item'>
          <div className='item-text item-title'>
            Long URL: 
            </div>
            <div className='item-text item-link'>
            {link.long_url}
            </div>
            <div className='item-text item-title'>

            Short URL:
            </div>
            <div className='item-text item-link'>

            {link.short_url}
            </div>
            <div className="link-item button">
              <Button
              id="copy"
              className="short"
              onClick={this.copyLink}
              variant="outlined"
              color="primary" 
              >copy</Button>
              <Button
              id="edit"
              className="short"
              onClick={() => this.props.history.push('/home')}
              variant="outlined"
              color="primary" 
              >back</Button>
              <Button 
              id='delete'
              onClick={() => this.deleteLink(link)}
              variant='outlined'
              color='secondary'
              >x
            </Button>
          </div>
        </div>
        <div className='container link-item'>
          component 1 goes here
        </div>
        <div className='container link-item'>
          component 2 goes here
        </div>
        <div className='container link-item'>
          component 3 goes here
        </div>
        
      </div>
      
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default withRouter(connect(mapReduxStateToProps)(LinkDetails));
