import React, { Component } from "react";
import { connect } from "react-redux";
import {
  XYPlot,
  VerticalBarSeriesCanvas,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
} from "react-vis";

const data = [
  { x: "9/6", y: 28 },
  { x: "9/7", y: 25 },
  { x: "9/8", y: 24 },
  { x: "9/9", y: 29 },
  { x: "9/10", y: 31 },
  { x: "9/11", y: 27 },
  { x: "9/12", y: 26 },
  { x: "9/13", y: 13 },
  { x: "9/14", y: 12 },
  { x: "9/15", y: 0 },
];

class GraphOne extends Component {
  componentDidMount() {
    console.log("componentDidMount graph");
    // Scroll to top
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <XYPlot xType={'ordinal'} height={500} width={380}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeriesCanvas data={data} color={'#0c1466ff'} />
        </XYPlot>
      </>
    ); // end return
  } // end render
} // end class

export default connect()(GraphOne);
