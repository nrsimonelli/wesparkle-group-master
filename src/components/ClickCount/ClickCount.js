import React, {Component} from 'react';
import {connect} from 'react-redux';

class ClickCount extends Component {
  
    componentDidMount () {
      console.log('componentDidMount ClickCount');
    }

    render() {
      return (
        <>
            <div>
                Click Count
            </div>
            <div>
                Top 3 what?
            </div>
        </>
      ) // end return
    } // end render
} // end class

export default connect()(ClickCount);