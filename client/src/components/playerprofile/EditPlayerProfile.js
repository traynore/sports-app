import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { editPlayerProfile,getPlayerProfileById } from "../../actions/playerProfileActions";
//Components
import TextFieldGroup from "../common/TextFieldGroup";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import DatePicker from 'react-date-picker';

const EditPlayerProfile = props => {
    useEffect(() => {
        props.getPlayerProfileById(props.match.params.id);
      }, [])
    
      useEffect(() => {
        seterrors(props.errors);
      }, [props.errors]);
    
  const [Name, setName] = useState(props.playerprofile.singlePlayerProfile.playerprofile.name ? props.playerprofile.singlePlayerProfile.playerprofile.name : "" );
  const [Age, setAge] = useState(props.playerprofile.singlePlayerProfile.playerprofile.age ? props.playerprofile.singlePlayerProfile.playerprofile.age : "" );
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [CurrentGroup, setCurrentGroup] = useState(props.playerprofile.singlePlayerProfile.playerprofile.currentGroup ? props.playerprofile.singlePlayerProfile.playerprofile.currentGroup : "" );
  const [unique_id, setunique_id] = useState(props.playerprofile.singlePlayerProfile.playerprofile.unique_id ? props.playerprofile.singlePlayerProfile.playerprofile.unique_id : "" );
  const [contactNO, setcontactNO] = useState(props.playerprofile.singlePlayerProfile.playerprofile.contactNO ? props.playerprofile.singlePlayerProfile.playerprofile.contactNO : "" );
  const [imgUrl, setimgUrl] = useState(props.playerprofile.singlePlayerProfile.playerprofile.imgUrl ? props.playerprofile.singlePlayerProfile.playerprofile.imgUrl : "" );
  const [father, setfather] = useState(props.playerprofile.singlePlayerProfile.playerprofile.parents.father ? props.playerprofile.singlePlayerProfile.playerprofile.parents.father : "" );
  const [mother, setmother] = useState(props.playerprofile.singlePlayerProfile.playerprofile.parents.mother ? props.playerprofile.singlePlayerProfile.playerprofile.parents.mother : "" );
  const [errors, seterrors] = useState({});
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

    props.editPlayerProfile(newPlayerProfile,props.match.params.id, props.history);
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
              Edit Player Profile
            </h1>
            <div className="text-center mb-5">
              <form noValidate onSubmit={handleSubmit}>
              <h5 className="label label-default">Name</h5>
                <TextFieldGroup
                  placeholder="Enter Player Name"
                  type="text"
                  name="name"
                  value={Name}
                  error={errors.name}
                  onChange={e => setName(e.target.value)}
                />
                 <h5 className="label label-default">Age</h5>
                <TextFieldGroup
                  placeholder="Age"
                  type="number"
                  name="age"
                  error={errors.age}
                  value={Age}
                  onChange={e => setAge(e.target.value)}
                />
                 <h5 className="label label-default">Father's Name</h5>
                <TextFieldGroup
                  placeholder="Father's Name"
                  type="text"
                  value={father}
                  name="father"
                  error={errors.father}
                  onChange={e => setfather(e.target.value)}
                />
                <h5 className="label label-default">Mother Name (Optional)</h5>
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
                <h5 className="label label-default">Current Group</h5>
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

EditPlayerProfile.propTypes = {
 editPlayerProfile: PropTypes.func.isRequired,
 getPlayerProfileById: PropTypes.func.isRequired,
 errors: PropTypes.object.isRequired,
 playerprofile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  playerprofile: state.playerProfiles
});

export default connect(mapStateToProps, { editPlayerProfile, getPlayerProfileById })(
  withRouter(EditPlayerProfile)
);