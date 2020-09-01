import shortId from "shortid";
import React, { Component } from "react";
import { connect } from "react-redux";
import QRCode from "qrcode.react";

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

  generateClicked = () => {
    console.log("Button clicked");

    // Base URL goes in this variable
    // This can be changed to a custom domain later,
    // if needed.
    const baseUrl = "https://localhost:3000/";
    const shortString = shortId.generate();
    this.setState({
      shortenedUrl: baseUrl + shortString,
    });
    console.log(
      "In generateClicked. this.state.shortenedUrl is",
      this.state.shortenedUrl
    );
    this.props.dispatch({
      type: "ADD_LINK",
      payload: {
        //variable names changed here to match names on '/' POST route
        long_url: this.state.inputUrl,
        short_url: shortString,
      },
    });
  }; // end generateClicked()

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
          <button onClick={this.generateClicked}>Generate</button>
          <br />
          Your shortened link:
          <br />
          {/* <input type="text" name="username" value={this.state.shortenedUrl} /> */}
          <textarea
            ref={(textarea) => (this.textArea = textarea)}
            name="username"
            defaultValue={this.state.shortenedUrl}
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

            <QRCode value={this.state.shortenedUrl} />
            <p>
              this.state.shortenedUrl is:{" "}
              {JSON.stringify(this.state.shortenedUrl)}
            </p>
          </div>
        </div>
      </center>
    ); // end return
  } // end render
} // end class

export default connect()(LinkShortener);
