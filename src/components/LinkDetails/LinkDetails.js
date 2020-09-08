import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import QRCode from "qrcode.react";
import copy from "clipboard-copy";
import LinkTags from '../LinkTags/LinkTags';
import Button from '@material-ui/core/Button';
import GraphOne from '../GraphOne/GraphOne';
import GraphTwo from '../GraphTwo/GraphTwo';
import GraphThree from '../GraphThree/GraphThree';


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
      <div className='landing'>
                <h1>Link Details</h1>

        <div className='container link-item'>
          <div className='item-text item-title'>
            Long URL: 
            </div>
            <div className='item-text item-link'>
            {<a href={link.long_url}>{link.long_url}</a>}
            </div>
            <div className='item-text item-title'>

            Short URL:
            </div>
            <div className='item-text item-link'>
            {<a href={this.state.baseUrl + link.short_url}>{this.state.baseUrl + link.short_url}</a>}
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
         <p>{this.state.copySuccess}</p>
                 {this.props.reduxState.details.id ? 
        <LinkTags link={link}/>
        :
        <></>}
        </div>
        <h1>Graph Title</h1>
        <div className='container graph link-item'>
          <GraphOne />
        </div>
        <h1>Graph Title</h1>
        <div className='container graph link-item'>
          <GraphTwo />
        </div>
        <h1>Graph Title</h1>
        <div className='container graph link-item'>
          <GraphThree />
        </div>
      </div>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default withRouter(connect(mapReduxStateToProps)(LinkDetails));
