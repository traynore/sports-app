import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  editPlayerProfile,
  getPlayerProfileById,
} from "../../actions/playerProfileActions";
//Components
import TextFieldGroup from "../common/TextFieldGroup";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-date-picker";
import DATE_DIFF from "date-diff-js";


const EditPlayerProfile = (props) => {
  useEffect(() => {
    props.getPlayerProfileById(props.match.params.id);
  }, []);

  useEffect(() => {
    seterrors(props.errors);
  }, [props.errors]);

  const [agechange, setagechange] = useState(false);
  const [contactOff, setcontactOff] = useState( props.playerprofile.singlePlayerProfile.playerprofile.contactOff
    ? props.playerprofile.singlePlayerProfile.playerprofile.contactOff
    : "")
  const [Name, setName] = useState(
    props.playerprofile.singlePlayerProfile.playerprofile.name
      ? props.playerprofile.singlePlayerProfile.playerprofile.name
      : ""
  );
  const [Age, setAge] = useState(
    props.playerprofile.singlePlayerProfile.playerprofile.age
      ? props.playerprofile.singlePlayerProfile.playerprofile.age
      : ""
  );
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [CurrentGroup, setCurrentGroup] = useState(
    props.playerprofile.singlePlayerProfile.playerprofile.currentGroup
      ? props.playerprofile.singlePlayerProfile.playerprofile.currentGroup
      : ""
  );
  const [unique_id, setunique_id] = useState(
    props.playerprofile.singlePlayerProfile.playerprofile.unique_id
      ? props.playerprofile.singlePlayerProfile.playerprofile.unique_id
      : ""
  );
  const [contactNO, setcontactNO] = useState(
    props.playerprofile.singlePlayerProfile.playerprofile.contactNO
      ? props.playerprofile.singlePlayerProfile.playerprofile.contactNO
      : ""
  );
  const [imgUrl, setimgUrl] = useState(
    props.playerprofile.singlePlayerProfile.playerprofile.imgUrl
      ? props.playerprofile.singlePlayerProfile.playerprofile.imgUrl
      : ""
  );
  const [father, setfather] = useState(
    props.playerprofile.singlePlayerProfile.playerprofile.parents.father
      ? props.playerprofile.singlePlayerProfile.playerprofile.parents.father
      : ""
  );
  const [mother, setmother] = useState(
    props.playerprofile.singlePlayerProfile.playerprofile.parents.mother
      ? props.playerprofile.singlePlayerProfile.playerprofile.parents.mother
      : ""
  );
  const [gender, setgender] = useState( props.playerprofile.singlePlayerProfile.playerprofile.gender
    ? props.playerprofile.singlePlayerProfile.playerprofile.gender
    : "");
  const [errors, seterrors] = useState({});
  useEffect(() => {
    if(typeof DateOfBirth === "object")
    {
      let date = new Date().toISOString().slice(0,10);
    let date2 = DateOfBirth.toISOString().slice(0,10);
    let diff = DATE_DIFF(date,date2, "Y").outputs.years;
    setAge(diff.toString())
    setagechange(true)
    }
  }, [DateOfBirth])

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlayerProfile = {
      name: Name,
      age: Age,
      dateofbirth: DateOfBirth,
      currentGroup: CurrentGroup,
      contactOff,
      contactNO,
      gender,
      unique_id,
      imgUrl,
      father,
      mother,
    };

    props.editPlayerProfile(
      newPlayerProfile,
      props.match.params.id,
      props.history
    );
  };

  const handleChange = (e) => {
    setgender(e.target.value);
  };

  const handleChangeContact = (e) => {
    setcontactOff(e.target.value);
  };

  if (agechange) {
    if (gender === "Male") {
      if (Age <= 6) {
        setCurrentGroup("(Nursery) Boy U-6");
      } else if (Age <= 7) {
        setCurrentGroup("Boy U-7");
      } else if (Age <= 9) {
        setCurrentGroup("Boy U-9");
      } else if (Age <= 11) {
        setCurrentGroup("Boy U-11");
      } else if (Age <= 13) {
        setCurrentGroup("Boy U-13");
      } else if (Age <= 15) {
        setCurrentGroup("Boy U-15");
      } else if (Age <= 17) {
        setCurrentGroup("Boy U-17");
      } else {
        setCurrentGroup("Boy U-20");
      }
    } else if (gender === "Female") {
      if (Age <= 6) {
        setCurrentGroup("(Nursery) Girl U-6");
      } else if (Age <= 8) {
        setCurrentGroup("Girl U-8");
      } else if (Age <= 10) {
        setCurrentGroup("Girl U-10");
      } else if (Age <= 12) {
        setCurrentGroup("Girl U-12");
      } else if (Age <= 14) {
        setCurrentGroup("Girl U-14");
      } else if (Age <= 16) {
        setCurrentGroup("Girl U-16");
      } else if (Age <= 18) {
        setCurrentGroup("Girl U-18");
      } else {
        setCurrentGroup("Girl U-20");
      }
    }

    setagechange(false);
  }

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
            <h1 className="text-center display-4 mt-4">Edit Player Profile</h1>
            <div className="text-center mb-5">
              <form noValidate onSubmit={handleSubmit}>
                <h5 className="label label-default">Name</h5>
                <TextFieldGroup
                  placeholder="Enter Player Name"
                  type="text"
                  name="name"
                  value={Name}
                  error={errors.name}
                  onChange={(e) => setName(e.target.value)}
                />
                <h5 className="label label-default">Select Gender</h5>
                <select
                  className="mb-3 form-control"
                  value={gender}
                  onChange={handleChange}
                >
                  <option>Select Options from Below</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && <div className="error">{errors.gender}</div>}
                <h5 className="label label-default">Father's Name</h5>
                <TextFieldGroup
                  placeholder="Father's Name"
                  type="text"
                  value={father}
                  name="father"
                  error={errors.father}
                  onChange={(e) => setfather(e.target.value)}
                />
                <h5 className="label label-default">Mother Name (Optional)</h5>
                <TextFieldGroup
                  placeholder="Mother's Name"
                  type="text"
                  value={mother}
                  name="mother"
                  error={errors.mother}
                  onChange={(e) => setmother(e.target.value)}
                />
                <h5 className="label label-default">Select Date of Birth</h5>
                <DatePicker
                  className="input-field"
                  onChange={setDateOfBirth}
                  value={DateOfBirth}
                />
                {errors.dateofbirth && (
                  <div className="error">{errors.dateofbirth}</div>
                )}
                 <h5 className="label label-default">Age</h5>
                <TextFieldGroup
                  placeholder="Age"
                  type="number"
                  name="age"
                  error={errors.age}
                  value={Age}
                  onChange={(e) => {
                    setAge(e.target.value);
                    setagechange(true);
                  }}
                />
                <h5 className="label label-default">Current Group</h5>
                <TextFieldGroup
                  placeholder="Current Group"
                  type="text"
                  name="currentGroup"
                  value={CurrentGroup}
                  error={errors.currentGroup}
                  onChange={(e) => setCurrentGroup(e.target.value)}
                />
                 <h5 className="label label-default">Select Contact Number Of</h5>
                <select
                  className="mb-3 form-control"
                  value={contactOff}
                  onChange={handleChangeContact}
                >
                  <option>Select Options from Below</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                </select>
                {errors.contactOff && <div className="error">{errors.contactOff}</div>}
                <PhoneInput
                  className="input-field m-auto"
                  placeholder="Enter phone number"
                  value={contactNO}
                  onChange={setcontactNO}
                />
                {errors.contactNO && (
                  <div className="error">{errors.contactNO}</div>
                )}
                <h5 className="label label-default">Unique ID</h5>
                <TextFieldGroup
                  placeholder="Unique ID"
                  type="text"
                  name="unique_id"
                  value={unique_id.toString()}
                  error={errors.unique_id}
                  onChange={(e) => setunique_id(e.target.value)}
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
  playerprofile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  playerprofile: state.playerProfiles,
});

export default connect(mapStateToProps, {
  editPlayerProfile,
  getPlayerProfileById,
})(withRouter(EditPlayerProfile));
