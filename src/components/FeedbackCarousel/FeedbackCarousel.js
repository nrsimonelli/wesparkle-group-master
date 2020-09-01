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
      <div className="carousel">
        <Carousel className="feedback">
          <div className="feedback">
          <p>"What a great feature. I love this!"</p>
          <p>-Mary M.</p>
          </div>
          <div className="feedback">
          <p>"Whoever built this is awesome!"</p>
          <p>-Dev J.</p>
          </div>
          <div className="feedback">
          <p>"I mean, it sure ain't terrible!"</p>
          <p>-Parakeet Pete.</p>
          </div>
        </Carousel>
      </div>
    );
  }
}

export default connect()(FeedbackCarousel);
