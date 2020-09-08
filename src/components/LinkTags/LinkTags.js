import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./LinkTags.css";
import Button from  '@material-ui/core/Button';

class LinkTags extends Component {
  // to move to link details re show:false
  state = {
      tags: this.props.reduxState.details.tags,
      show: false,
    };
  
    componentDidMount() {
      //if no details in redux, it will call this
      //to get it from server based on id in /details/:id
      if (!this.props.reduxState.details.id) {
        console.log('in fetch details for linktags')
        this.props.dispatch({
          type: "FETCH_DETAILS",
          payload: this.props.match.params.id,
        });
      }
      console.log("this.props.reduxState...", this.props.reduxState);
    }
  removeTag = (i) => {
    const newTags = [...this.state.tags];
    newTags.splice(i, 1);
    this.setState({ tags: newTags,
                    show: true
                  });
  };

  inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
      this.setState({ tags: [...this.state.tags, val.toLowerCase()],
                      show: true });
      this.tagInput.value = null;
    } else if (e.key === "Backspace" && !val) {
      this.removeTag(this.state.tags.length - 1);
    }
  };

  revealMe = () => {
    this.setState({
      show: true
    });
  }

  saveTags = () => {
    console.log('saveTags clicks, this.state is', this.state)
    console.log('saveTags clicks, this.props.reduxState.details is', this.props.reduxState.details)
    const tags = this.state.tags;
    const details = this.props.reduxState.details;
    this.props.dispatch({
      type: "SAVE_TAGS",
      payload: {tags, details}
    });
    this.setState ({
      show: false
    });
    ///Could reroute to main dashboard after save?
  }
  render() {
    const { tags } = this.state;

    return (
      <div className="input-tag">
        <ul className="input-tag__tags">
          {tags.map((tag, i) => (
            <li key={tag}>
              {tag}
              <button
                type="button"
                onClick={() => {
                  this.removeTag(i);
                }}
              >
                +
              </button>
            </li>
          ))}
          <li className="input-tag__tags__input">
            <input
              type="text"
              placeholder="add here..."
              onKeyDown={this.inputKeyDown}
              // onChange={()=> this.revealMe()}
              ref={(c) => {
                this.tagInput = c;
              }}
            />
          </li>
        </ul>
        <div className='link-item button save'>
          {this.state.show === true && (
          <Button
            id="save"
            className="short"
            variant="outlined"
            color="primary" 
            onClick={this.saveTags}
          >Save</Button>
        )}
        </div>
        
        
      </div>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default withRouter(connect(mapReduxStateToProps)(LinkTags));

