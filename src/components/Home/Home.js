import React, {Component} from 'react';
import {connect} from 'react-redux';
import AdvancedLanding from '../AdvancedLanding/AdvancedLanding';
import Landing from '../Landing/Landing';

class Home extends Component {
  
  componentDidMount () {
    console.log('componentDidMount Home');
  }



  render() {
    return (
      <>
        { this.props.user.id ? (<AdvancedLanding />) : (<Landing />)}
      </>
    ) // end return
  } // end render
} // end class

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
    user: state.user,
  });
  
  // this allows us to use <App /> in index.js
  export default connect(mapStateToProps)(Home);
  