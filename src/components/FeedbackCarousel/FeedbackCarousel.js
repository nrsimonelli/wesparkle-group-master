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
              <div className="image-boxxxxx image-circle"></div>
              {/* <img alt="a parakeet cooking in a mini kitchen" src="/images/parakeetCooking.jpg" /> */}
              <p>
                "What a great feature. I love this!"
                <br /><br />
                 -Mary M.
              </p>
            </div>
            <div>
              <div className="image-boxxxxx image-armsUp"></div>
              <p>
                "Whoever built this is awesome!"
                <br /><br />
                -Dev J.
              </p>
            </div>
            <div>
              <div className="image-boxxxxx image-bigPhone"></div>           
              <p>
                "I mean, it sure ain't terrible!"
                <br /><br />
                -Parakeet Pete
              </p>
            </div>
          </Carousel>
        </div>
    );
  }
}

export default connect()(FeedbackCarousel);
