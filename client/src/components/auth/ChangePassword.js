import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { changePassword } from "../../actions/authActions";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

//Component
import TextFieldGroup from "../common/TextFieldGroup";

const ChangePassword = props => {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("")
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

    const newPassword = {
      name,
      password,
      password2: confirmpassword
    };

    props.changePassword(newPassword, props.history);
  };

  return (
    <div className="landingPage">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5">
            <div className="text-center mt-5 shadow p-3">
              <h1>Change Password</h1>
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
                  placeholder="New Password"
                  error={errors.password}
                />
                <TextFieldGroup
                  type="password"
                  name="password2"
                  value={confirmpassword}
                  onChange={e => setconfirmpassword(e.target.value)}
                  placeholder="Confirm Password"
                  error={errors.password2}
                />

                <button className="btn-reg">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { changePassword })(withRouter(ChangePassword));