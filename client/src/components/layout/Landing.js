import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"
//CSS
import "./Landing.css";

const Landing = props => {
  return (
    <div className="landingPage">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12">
            <div className="content shadow p-5">
              <div>
              <img src={Logo} alt="logo" className="img-fluid" />
              </div>
              <h1>Welcome to our Coaching Platform</h1>
              <Link to="/playerprofiles" className="btn-reg">
                View Player Profiles
              </Link>
              <Link to="/coachesprofiles" className="btn-reg">
                View Coaches Profiles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Landing.propTypes = {
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });
export default Landing//connect(mapStateToProps)(Landing);