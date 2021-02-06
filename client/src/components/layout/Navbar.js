import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
import Logo from "../assets/logo.png";

//CSS
import "./Navbar.css";

const Navbar = (props) => {
  const { isAuthenticated, user } = props.auth;
  const onLogoutClick = (e) => {
    e.preventDefault();
    props.logoutUser();
  };

  const handleClick = () => {
    let ul = document.getElementById("ul");
    ul.classList.toggle("show");
  };
  const authLinks = (
    <ul id="ul" className="nav-links">
      <li className="nav-link">
        <Link to="/" className="nav-item">
          Dashboard
        </Link>
      </li>
      <li className="nav-link">
        <Link to="/playerprofile/createplayerprofile" className="nav-item">
          Create Player Profile
        </Link>
      </li>
      <li className="nav-link">
        <Link to="/playerprofiles" className="nav-item">
          Player Profiles
        </Link>
      </li>
      <li className="nav-link">
        <Link to="/coachesprofile/createcoachprofile" className="nav-item">
          Create Coach Profile
        </Link>
      </li>
      <li className="nav-link">
        <Link to="/coachesprofiles" className="nav-item">
          Coaches Profile
        </Link>
      </li>
      <li className="nav-link nav-item" onClick={onLogoutClick}>
        logout
      </li>
    </ul>
  );

  const guestLinks = (
    <ul id="ul" className="nav-links">
      <li className="nav-link">
        <Link to="/login" className="nav-item">
          Login
        </Link>
      </li>
    </ul>
  );
  return (
    <div>
      <div className="menu" onClick={handleClick}>
        <i className="fa fa-bars fa-2x"></i>
      </div>
      <header>
     <div className="Logo">
     <Link className="" to="/">
            <img
              src={Logo}
              style={{ width: "65px", height: "65px" }}
              className=""
              alt=""
            />
          </Link>
     </div>
        <h1 className="logo">
          <Link to="/" className="nav-item brand">
            C.L.G Cillin Cheir
          </Link>
        </h1>
        <nav>{isAuthenticated ? authLinks : guestLinks}</nav>
      </header>
    </div>
  );
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
