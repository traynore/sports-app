import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { editCoachProfile, getCoachProfileById } from "../../actions/coachProfileActions";
//Components
import TextFieldGroup from "../common/TextFieldGroup";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import DatePicker from 'react-date-picker';

const EditCoachProfile = props => {
    useEffect(() => {
        props.getCoachProfileById(props.match.params.id);
      }, [])
    
      useEffect(() => {
        seterrors(props.errors);
      }, [props.errors]);
    
  const [Name, setName] = useState(props.coachProfiles.singleCoachProfile.coachprofile.name ? props.coachProfiles.singleCoachProfile.coachprofile.name : "" );
  const [childSafeGaurding, setchildSafeGaurding] = useState("");
  const [unique_id, setunique_id] = useState(props.coachProfiles.singleCoachProfile.coachprofile.unique_id ? props.coachProfiles.singleCoachProfile.coachprofile.unique_id : "" );
  const [contactNO, setcontactNO] = useState(props.coachProfiles.singleCoachProfile.coachprofile.contactNO ? props.coachProfiles.singleCoachProfile.coachprofile.contactNO : "" );
  const [errors, seterrors] = useState({});
  const handleSubmit = e => {
    e.preventDefault();
    const newCoachProfile = {
      name: Name,
      childSafeGaurding,
      contactNO,
      unique_id,
    };

    props.editCoachProfile(newCoachProfile,props.match.params.id, props.history);
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
              Edit Coach Profile
            </h1>
            <div className="text-center mb-5">
              <form noValidate onSubmit={handleSubmit}>
              <h5 className="label label-default">Name</h5>
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
                 <h5 className="label label-default">Unique ID</h5>
                <TextFieldGroup
                  placeholder="Unique ID"
                  type="text"
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

EditCoachProfile.propTypes = {
 editCoachProfile: PropTypes.func.isRequired,
 getCoachProfileById: PropTypes.func.isRequired,
 errors: PropTypes.object.isRequired,
 coachProfiles: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  coachProfiles: state.coachProfiles
});

export default connect(mapStateToProps, { editCoachProfile, getCoachProfileById })(
  withRouter(EditCoachProfile)
);