import React, { Component } from "react";
import { connect } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./FeedbackCarousel.css";

class FeedbackCarousel extends Component {
  componentDidMount() {
    console.log("did mount FeedbackCarousel");
  }

  render() {
    return (
      <div className='carousel-flex'>
          <Carousel showThumbs={false} showStatus={false} infiniteLoop className="feedbackCarousel">
            <div>
              <div className="feedbackCarousel image-box image-circle"></div>
              <p>
                "This link shortener is so easy to use. Thank you!"
                <br /><br />
                 - Margaret T.
              </p>
            </div>

            <div>
              <div className="feedbackCarousel image-box image-jump"></div>
              <p>
              "It's nice to be able to shorten my links for free and give back to the community at the same time!"
                <br /><br />
                - Nick M.
              </p>

            </div>
            <div>
              <div className="feedbackCarousel image-box image-bigPhone"></div>           
              <p>
                "Loved printing my QR code on my business cards. Thanks!"
                <br /><br />
                - Rebecca F.
              </p>
            </div>
          </Carousel>
        </div>
    );
  }
}

export default connect()(FeedbackCarousel);
