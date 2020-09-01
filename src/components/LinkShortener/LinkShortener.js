import shortId from "shortid";
import React, { Component } from "react";
import { connect } from "react-redux";

// corresponds to 1.0
class LinkShortener extends Component {
  componentDidMount() {
    console.log("component did mount, link Shortener");
    console.log(shortId.generate());
  }

  state = {
    inputUrl: "",
    shortenedUrl: "",
  };

  buttonClicked = () => {
    console.log("Button clicked");
    this.setState({
      shortenedUrl: "https://wespark.le/" + shortId.generate(),
    });
  }; // End buttonClicked()

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }; // End handleInputChangeFor()

  render() {
    return (
      <center>
        <div>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChangeFor("inputUrl")}
          />
          <button onClick={this.buttonClicked}>Generate</button>
          <br />Your shortened link:
          <input
            type="text"
            name="username"
            value={this.state.shortenedUrl}
          />
          
        </div>
      </center>
    ); // end return
  } // end render
} // end class

export default connect()(LinkShortener);
