import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./LinkTags.css";

class LinkTags extends Component {
  state = {
      tags: this.props.reduxState.details.tags,
    };
  
    componentDidMount() {
      //if no details in redux, it will call this
      //to get it from server based on id in /details/:id
      if (!this.props.reduxState.details.link_id) {
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
    this.setState({ tags: newTags });
  };

  inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
      this.setState({ tags: [...this.state.tags, val.toLowerCase()] });
      this.tagInput.value = null;
    } else if (e.key === "Backspace" && !val) {
      this.removeTag(this.state.tags.length - 1);
    }
  };

  saveTags = () => {
    console.log('saveTags clicks', this.state, this.props.reduxState.details.link_id)
    const tags = this.state.tags;
    const details = this.props.reduxState.details;
    this.props.dispatch({
      type: "SAVE_TAGS",
      payload: {tags, details}
    });
  }
  ///"save tags" button that calls a PUT request to update the details of the link
  render() {
    const { tags } = this.state;

    return (
      <div className="input-tag">
        <p>Tags Component</p>
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
              onKeyDown={this.inputKeyDown}
              ref={(c) => {
                this.tagInput = c;
              }}
            />
          </li>
        </ul>
        <button
        onClick={this.saveTags}
        >Save Tags</button>
      </div>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default withRouter(connect(mapReduxStateToProps)(LinkTags));

