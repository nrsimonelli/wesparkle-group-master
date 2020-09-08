import React, {Component} from 'react';
import {connect} from 'react-redux';
import {XYPlot, MarkSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';



const data = [
  {x: 1, y: 10, size: 30},
  {x: 1.7, y: 12, size: 10},
  {x: 2, y: 5, size: 1},
  {x: 3, y: 15, size: 12},
  {x: 2.5, y: 7, size: 4}
]

class GraphTwo extends Component {
  
  componentDidMount () {
    console.log('componentDidMount g2');
  }

  render() {
    return (
      <>
        <XYPlot
          width={380}
          height={500}>
            <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <MarkSeries
            className="mark-series-example"
            sizeRange={[5, 15]}
            data={data}/>
          
        </XYPlot>
      </>
    ) // end return
  } // end render
} // end class

export default connect()(GraphTwo);