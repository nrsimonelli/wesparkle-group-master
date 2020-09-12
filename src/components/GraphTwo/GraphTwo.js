import React, {Component} from 'react';
import {connect} from 'react-redux';
import {XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries, VerticalBarSeriesCanvas} from 'react-vis';



const data = [
  {x: 'Roster Management', y: 25},
  {x: 'Why We Sleep', y: 22},
  {x: 'On Field Nutrition', y: 19}
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
            data={data}/>
          
        </XYPlot>
      </>
    ) // end return
  } // end render
} // end class

export default connect()(GraphTwo);