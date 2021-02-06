import React, { useState } from "react";
import PropTypes from "prop-types";
import DATE_DIFF from "date-diff-js"
import { Link, withRouter } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import {
  AddCurrentGroup,
  deleteCoachProfile,
  deleteCurrentGroup,
} from "../../actions/coachProfileActions";

const CoachProfileAbout = (props) => {
  const [currentGroups, setcurrentGroups] = useState([]);
  const [curgroup, setcurgroup] = useState("");
  const [test, settest] = useState(false);
  const [expired, setexpired] = useState(false)
  const { coachprofile } = props.coachprofile;

  React.useEffect(() => {
    setcurrentGroups(coachprofile.currentGroups);
  }, []);

  const addcurrentGroup = () => {
    const currentgroup = {
      profileid: props.id,
      id: uuidv4(),
      curgroup: curgroup,
    };

    let CurrentGroups = currentGroups;
    CurrentGroups.unshift(currentgroup);
    setcurrentGroups(CurrentGroups);
    props.AddCurrentGroup(currentgroup);
    setcurgroup("");
  };

  const handleChange = (e) => {
    setcurgroup(e.target.value);
  };

  const handleDeleteCurrentGroup = (id) => {
    const deletecurrentgroupinfo = {
      id,
      profileid: props.id,
    };

    let CurrentGroups = currentGroups;
    let index = CurrentGroups.map((curgroup) => curgroup.id).indexOf(id);
    if (index > -1) {
      CurrentGroups.splice(index, 1);
      setcurrentGroups(CurrentGroups);
      settest(!test);
      props.deleteCurrentGroup(deletecurrentgroupinfo);
    }
  };

  const deleteProfile = () => {
    props.deleteCoachProfile(props.id, props.history);
  };

  let currentgroupcontent = currentGroups.map((currengroup, index) => {
    return (
      <div key={index}>
        <div className="card card-body bg-light mb-2">
          {currengroup.curgroup}
        </div>
        <div className="mb-3">
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteCurrentGroup(currengroup.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  
  let date = new Date().toISOString();
  date = date.slice(0,10);
let date2 = coachprofile.childSafeGaurding.slice(0, 10);
let diff = DATE_DIFF(date,date2, "Y").outputs.years;

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h2 className="text-center text-info mb-5">Details</h2>
            <div className="row">
              <div className="col-md-6">
                <h5 className="mb-3">
                  Name : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; {coachprofile.name}{" "}
                </h5>
                <h5 className="mb-3">
                  Unique ID : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                  {coachprofile.unique_id}{" "}
                </h5>
                <h5 className="mb-3">
                  Child Safe <br></br>Guarding Date : &nbsp; &nbsp; &nbsp;{" "}
                  <span className={`${diff >=  3 ? "expired": null}`}>{coachprofile.childSafeGaurding.slice(0, 10)}</span>
                </h5>
                <h5 className="mb-3">
                  Contact No : &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                  {coachprofile.contactNO}{" "}
                </h5>
              </div>
              <div className="col-md-6">
                <h3 className="text-info">Current Groups</h3>
                <div>
                  <select
                    className="form-control mb-3"
                    value={curgroup}
                    onChange={handleChange}
                  >
                    <option>Select Options from Below</option>
                    <option value="Boys U - 6">Boys U - 6</option>
                    <option value="Boys U - 7">Boys U - 7</option>
                    <option value="Boys U - 9">Boys U - 9</option>
                    <option value="Boys U - 11">Boys U - 11</option>
                    <option value="Boys U - 13">Boys U - 13</option>
                    <option value="Boys U - 15">Boys U - 15</option>
                    <option value="Boys U - 17">Boys U - 17</option>
                    <option value="Boys U - 20">Boys U - 20</option>
                    <option value="Girls U - 6">Girls U - 6</option>
                    <option value="Girls U - 8">Girls U - 8</option>
                    <option value="Girls U - 10">Girls U - 10</option>
                    <option value="Girls U - 12">Girls U - 12</option>
                    <option value="Girls U - 14">Girls U - 14</option>
                    <option value="Girls U - 16">Girls U - 16</option>
                    <option value="Girls U - 18">Girls U - 18</option>
                    <option value="Girls U - 20">Girls U - 20</option>

                  </select>
                  <button
                    onClick={addcurrentGroup}
                    disabled={curgroup.length === 0 ? true : false}
                    className="btn-reg mb-2"
                  >
                    Add Group
                  </button>
                  <div
                    className="overflow-auto"
                    style={{ width: "100%", height: "400px" }}
                  >
                    {currentgroupcontent}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Link
                  className="btn-reg"
                  to={`/coachesprofile/editcoachprofile/${coachprofile._id}`}
                >
                  Edit Coach Profile
                </Link>
                <button className="btn-danger-reg" onClick={deleteProfile}>
                  Delete Coach Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CoachProfileAbout.propTypes = {
  AddCurrentGroup: PropTypes.func.isRequired,
  deleteCoachProfile: PropTypes.func.isRequired,
  deleteCurrentGroup: PropTypes.func.isRequired,
  coachprofile: PropTypes.object.isRequired,
};

export default connect(null, {
  AddCurrentGroup,
  deleteCoachProfile,
  deleteCurrentGroup,
})(withRouter(CoachProfileAbout));
