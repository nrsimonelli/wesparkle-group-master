import React, {Component} from 'react';
import {connect} from 'react-redux';
import {XYPlot, LineSeries, HorizontalGridLines, XAxis, YAxis } from 'react-vis';


class GraphThree extends Component {
  
  componentDidMount () {
    console.log('componentDidMount G3');
  }

  render() {
    return (
      <>
        <XYPlot
          width={380}
          height={500}>
            <XAxis />
          <YAxis />
          <HorizontalGridLines />
          <LineSeries
            data={[
              {x: 1, y: 10},
              {x: 2, y: 5},
              {x: 3, y: 15}
            ]}/>
  
        </XYPlot>
      </>
    ) // end return
  } // end render
} // end class

export default connect()(GraphThree);