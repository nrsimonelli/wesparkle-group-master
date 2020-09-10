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
  { x: 0, y: 8 },
  { x: 1, y: 5 },
  { x: 2, y: 4 },
  { x: 3, y: 9 },
  { x: 4, y: 1 },
  { x: 5, y: 7 },
  { x: 6, y: 6 },
  { x: 7, y: 3 },
  { x: 8, y: 2 },
  { x: 9, y: 0 },
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
        <XYPlot height={500} width={380}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeriesCanvas data={data} />
        </XYPlot>
      </>
    ); // end return
  } // end render
} // end class

export default connect()(GraphOne);
