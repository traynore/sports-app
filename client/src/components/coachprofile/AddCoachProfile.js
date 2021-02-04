import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createCoachProfile } from "../../actions/coachProfileActions";
//Components
import TextFieldGroup from "../common/TextFieldGroup";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import DatePicker from 'react-date-picker';

const AddCoachProfile = props => {
  const [Name, setName] = useState("");
  const [childSafeGaurding, setchildSafeGaurding] = useState("");
  const [unique_id, setunique_id] = useState("");
  const [contactNO, setcontactNO] = useState("");
  const [errors, seterrors] = useState({});

  useEffect(() => {
    seterrors(props.errors);
  }, [props.errors]);

  const handleSubmit = e => {
    e.preventDefault();
    const newCoachProfile = {
      name: Name,
      childSafeGaurding,
      contactNO,
      unique_id,
    };

  //  console.log(newCoachProfile)

    props.createCoachProfile(newCoachProfile, props.history);
  };

  return (
    <div className="wrap">
      <div className="container">
        <div className="row">
          <div className="col md-12">
            <div className="mt-5">
              <Link to="/coachesprofiles" className="btn-reg">
                Go Back
              </Link>
            </div>
            <h1 className="text-center display-4 mt-4">
              Create Coach Profile
            </h1>
            <div className="text-center mb-5">
              <form noValidate onSubmit={handleSubmit}>
                <TextFieldGroup
                  placeholder="Enter Coach Name"
                  type="text"
                  name="name"
                  value={Name}
                  error={errors.name}
                  onChange={e => setName(e.target.value)}
                />
                <h5 className="label label-default">Select Child Safe Gaurding Date</h5>
                <DatePicker
                className="input-field"
                onChange={setchildSafeGaurding}
                value={childSafeGaurding}
                />
                {errors.childSafeGaurding && <div className="error">{errors.childSafeGaurding}</div>}
                <PhoneInput
                 className="input-field m-auto"
                 placeholder="Enter phone number"
                 value={contactNO}
                 onChange={setcontactNO}/>
                 {errors.contactNO && <div className="error">{errors.contactNO}</div>}
                <TextFieldGroup
                  placeholder="Unique ID"
                  type="number"
                  name="unique_id"
                  value={unique_id}
                  error={errors.unique_id}
                  onChange={e => setunique_id(e.target.value)}
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

AddCoachProfile.propTypes = {
 createCoachProfile: PropTypes.func.isRequired,
 errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { createCoachProfile })(
  withRouter(AddCoachProfile)
);