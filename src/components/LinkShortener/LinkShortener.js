import shortId from "shortid";
import React, { Component } from "react";
import { connect } from "react-redux";
import QRCode from "qrcode.react";
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

// corresponds to 1.0
class LinkShortener extends Component {
  componentDidMount() {
    console.log("component did mount, link Shortener");
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
    const baseUrl = "localhost:5000/api/link/";
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

  copyClicked = (e) => {
    this.textArea.select();
    document.execCommand("copy");
    // Next two lines from example code:
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    this.setState({
      copySuccess: "Link copied!",
      inputUrl: "",
      shortenedUrl: "",
    });
  }; // end copyClicked()

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }; // end handleInputChangeFor()

  render() {
    return (
      <div className='container link-shortener'>
       
          <TextField
            id="outlined-link-input"
            label="Type link here"
            type="text"
            className="text-field"
            name="link"
            margin="normal"
            variant="outlined"
            value={this.state.inputUrl}
            onChange={this.handleInputChangeFor("inputUrl")}
          />
          <Button 
            onClick={this.generateClicked}
            variant='outlined'
            color='default'
            >Generate
          </Button>
          <div>
          Your shortened link:
          </div>
    
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
                  <Button 
                    onClick={this.copyClicked}
                    variant='outlined'
                    color='primary'
                    >
                    Copy Shortened Link
                  </Button>
                  {this.state.copySuccess}
                </div>
              )
            }
          </div>

            <QRCode value={this.state.shortenedUrl} />
            
              {/* {JSON.stringify(this.state.shortenedUrl)} */}
           
          
        
      </div>
    ); // end return
  } // end render
} // end class

export default connect()(LinkShortener);
