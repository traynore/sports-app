import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";

//Component
import TextFieldGroup from "../common/TextFieldGroup";

const Login = props => {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/");
    }
  }, []);

  //SET ERRORS IF THEY EXISTS
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/");
    }
    setErrors(props.errors);
  }, [props.auth.isAuthenticated, props.errors]);
  const handleSubmit = e => {
    e.preventDefault();

    const newUser = {
      name,
      password
    };

    props.loginUser(newUser, props.history);
  };

  return (
    <div className="landingPage">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5">
            <div className="text-center mt-5 shadow p-3">
              <h1>Login Here!</h1>
              <h6>Welcome to CLG Cillin Cheir</h6>
              <form noValidate className="registerForm" onSubmit={handleSubmit}>
                <TextFieldGroup
                  type="text"
                  name="name"
                  value={name}
                  onChange={e => setname(e.target.value)}
                  placeholder="User Name"
                  error={errors.name}
                />
                <TextFieldGroup
                  type="password"
                  name="password"
                  value={password}
                  onChange={e => setpassword(e.target.value)}
                  placeholder="Password"
                  error={errors.password}
                />
                <Link className="form-text text-muted mb-4" to="/changepassword">Forgot Password? Click here.</Link>
                <button className="btn-reg">Login!</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));