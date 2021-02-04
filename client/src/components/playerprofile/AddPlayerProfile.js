import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createPlayerProfile } from "../../actions/playerProfileActions";
//Components
import TextFieldGroup from "../common/TextFieldGroup";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import DatePicker from 'react-date-picker';

const AddPlayerProfile = props => {
  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [CurrentGroup, setCurrentGroup] = useState("");
  const [unique_id, setunique_id] = useState("");
  const [contactNO, setcontactNO] = useState("");
  const [imgUrl, setimgUrl] = useState("");
  const [father, setfather] = useState("");
  const [mother, setmother] = useState("");
  const [errors, seterrors] = useState({});

  useEffect(() => {
    seterrors(props.errors);
  }, [props.errors]);

  const handleSubmit = e => {
    e.preventDefault();
    const newPlayerProfile = {
      name: Name,
      age: Age,
      dateofbirth: DateOfBirth,
      currentGroup: CurrentGroup,
      contactNO,
      unique_id,
      imgUrl,
      father,
      mother
    };

    console.log(newPlayerProfile)

    props.createPlayerProfile(newPlayerProfile, props.history);
  };

  return (
    <div className="wrap">
      <div className="container">
        <div className="row">
          <div className="col md-12">
            <div className="mt-5">
              <Link to="/playerprofiles" className="btn-reg">
                Go Back
              </Link>
            </div>
            <h1 className="text-center display-4 mt-4">
              Create Player Profile
            </h1>
            <div className="text-center mb-5">
              <form noValidate onSubmit={handleSubmit}>
                <TextFieldGroup
                  placeholder="Enter Player Name"
                  type="text"
                  name="name"
                  value={Name}
                  error={errors.name}
                  onChange={e => setName(e.target.value)}
                />
                <TextFieldGroup
                  placeholder="Age"
                  type="text"
                  name="age"
                  error={errors.age}
                  value={Age}
                  onChange={e => setAge(e.target.value)}
                />
                <TextFieldGroup
                  placeholder="Father's Name"
                  type="text"
                  value={father}
                  name="father"
                  error={errors.father}
                  onChange={e => setfather(e.target.value)}
                />
                <TextFieldGroup
                  placeholder="Mother's Name"
                  type="text"
                  value={mother}
                  name="mother"
                  error={errors.mother}
                  onChange={e => setmother(e.target.value)}
                />
                <h5 className="label label-default">Select Date of Birth</h5>
                <DatePicker
                className="input-field"
                onChange={setDateOfBirth}
                value={DateOfBirth}
                />
                {errors.dateofbirth && <div className="error">{errors.dateofbirth}</div>}
                <TextFieldGroup
                  placeholder="Current Group"
                  type="text"
                  name="currentGroup"
                  value={CurrentGroup}
                  error={errors.currentGroup}
                  onChange={e => setCurrentGroup(e.target.value)}
                />
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

AddPlayerProfile.propTypes = {
 createPlayerProfile: PropTypes.func.isRequired,
 errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { createPlayerProfile })(
  withRouter(AddPlayerProfile)
);