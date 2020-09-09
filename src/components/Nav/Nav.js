import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => (
  <div className="nav root">
    <Link to="/home">
      {/* I couldn't figure out how to manipulate the size of the image if I used CSS url(...) :( */}
      <img className="nav-logo" src="https://static.wixstatic.com/media/450dbd_791a4f2fc1c94a339a98cdeca033fa20~mv2.png/v1/fill/w_500,h_84,al_c,lg_1,q_85/WeSparkle_H_Red.webp" />
    </Link>

    <div className="nav-right">

      {/* Show the basic features vs. logged in features main page */}
      {props.user.id ? 
      ( <Link className="nav-link" to="/home">Home</Link>) 
      :
      (<Link className="nav-link" to="/login">Login/Register</Link>)}

      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <LogOutButton className="nav-link"/>
        </>
      )}
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
