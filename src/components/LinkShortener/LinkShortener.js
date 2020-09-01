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
    copySuccess: "",
  };

  buttonClicked = () => {
    console.log("Button clicked");
    this.setState({
      shortenedUrl: "https://wespark.le/" + shortId.generate(),
    });
    console.log(
      "In buttonClicked. this.state.shortenedUrl is",
      this.state.shortenedUrl
    );
    this.props.dispatch({
      type: "ADD_LINK",
      payload: {
        inputURL: this.state.inputUrl,
        shortenedUrl: this.state.shortenedUrl,
      },
    });
  }; // end buttonClicked()

  copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand("copy");
    // Next two lines from example code:
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    this.setState({ copySuccess: "Link copied!" });
  }; // end copyToClipboard()

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }; // end handleInputChangeFor()

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
          <br />
          Your shortened link:
          <br />
          {/* <input type="text" name="username" value={this.state.shortenedUrl} /> */}
          <textarea
            ref={(textarea) => (this.textArea = textarea)}
            name="username"
            value={this.state.shortenedUrl}
          />
          {/* From example at: https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard */}
          <div>
            {
              /* Logical shortcut for only displaying the 
            button if the copy command exists */
              document.queryCommandSupported("copy") && (
                <div>
                  <button onClick={this.copyToClipboard}>
                    Copy Shortened Link
                  </button>
                  {this.state.copySuccess}
                </div>
              )
            }
            
            this.state.shortenedUrl is: {JSON.stringify(this.state.shortenedUrl)}
          </div>
        </div>
      </center>
    ); // end return
  } // end render
} // end class

export default connect()(LinkShortener);
