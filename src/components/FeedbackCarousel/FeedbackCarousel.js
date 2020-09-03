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
      <center>
          <Carousel showThumbs={false} showStatus={false} infiniteLoop className="feedback">
            <div>
              <img alt="a parakeet cooking in a mini kitchen" src="/images/parakeetCooking.jpg" />
              <p>"What a great feature. I love this!"</p>
              <p>-Mary M.</p>
            </div>
            <div>
              <img alt="a parakeet cooking in a mini kitchen" src="/images/mervyn.png" />
              <p>"Whoever built this is awesome!"</p>
              <p>-Dev J.</p>
            </div>
            <div>
              <img alt="a parakeet cooking in a mini kitchen" src="/images/mervynChair.png" />
              <p>"I mean, it sure ain't terrible!"</p>
              <p>-Parakeet Pete.</p>
            </div>
          </Carousel>
        </center>
    );
  }
}

export default connect()(FeedbackCarousel);
