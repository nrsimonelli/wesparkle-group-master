import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import LinkDetails from '../LinkDetails/LinkDetails';
import Home from '../Home/Home';
import './App.css';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div className='root'>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home 
            This is a route anyone can see, no login necessary */}
            <Redirect exact from="/" to="/home" />
            <Route
              exact
              path="/home"
              component={Home}
            />
            <Route 
              exact
              path='/login'
              component={LoginPage}
            />
            <Route 
              exact
              path='/register'
              component={RegisterPage}
            />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            {/* <ProtectedRoute
              exact
              path="/protected"
              component={AdvancedLanding}
            /> */}
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}

            <ProtectedRoute
              exact path="/details/:id"
              component={LinkDetails}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
