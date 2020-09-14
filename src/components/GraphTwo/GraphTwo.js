import React, {Component} from 'react';
import {connect} from 'react-redux';
import {XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries, VerticalBarSeriesCanvas} from 'react-vis';



const data = [
  {x: 'Roster Management', y: 1925},
  {x: 'Why We Sleep', y: 922},
  {x: 'On Field Nutrition', y: 619}
]

class GraphTwo extends Component {
  
  componentDidMount () {
    console.log('componentDidMount g2');
  }

  render() {
    return (
      <>
        <XYPlot
          xType={'ordinal'}
          width={380}
          height={500}>
            <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeriesCanvas
            data={data}
            color={'#0c1466ff'} />
          
        </XYPlot>
      </>
    ) // end return
  } // end render
} // end class

export default connect()(GraphTwo);