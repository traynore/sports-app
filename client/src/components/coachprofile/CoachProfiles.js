import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom"
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getCoachProfiles } from "../../actions/coachProfileActions";
import TextFieldGroup from "../common/TextFieldGroup"

const CoachProfiles = props => {
  const [filterVal, setFilterVal] = useState(undefined)
  const [coachprofiles, setcoachprofiles] = useState([])
  const [filtering, setfiltering] = useState(false)
  useEffect(() => {
      props.getCoachProfiles()
      setcoachprofiles(props.coachprofiles.coachProfiles)
  }, []);

  let { loading } = props.coachprofiles;
  let coachProfiles = props.coachprofiles.coachProfiles;
  let profileItems;

  const filterProfiles = () => {
    setfiltering(true)
    let CoachProfiles = coachProfiles;
    CoachProfiles = CoachProfiles.filter(coach => coach.coachEducation.length === parseInt(filterVal))
    setcoachprofiles(CoachProfiles)
  }
  if(!filtering)
  {
    if (coachProfiles === null || loading) {
      profileItems = (
        <div className="text-center">
          <Spinner />
        </div>
      );
    } else {
      if (coachProfiles.length > 0 && loading === false) {
        // profileItems = coachProfiles.map(coachprofile => (
        //   <CoachProfileItem key={coachprofile._id} coachprofile={coachprofile} />
        // ));
        profileItems = ( <div className="overflow-auto" style={{width: "100%"}}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Awards</th>
              <th scope="col">Contact</th>
              <th scope="col">Unique ID</th>
            </tr>
          </thead>
          <tbody>
            {coachProfiles.map((coachprofile, index) => {
              return (<tr key={index}>
                <th scope="row">{index + 1}</th>
                <td><Link to={`/coachesprofiles/${coachprofile._id}`}>{coachprofile.name}</Link></td>
                <td>{coachprofile.coachEducation.length}</td>
                <td>{coachprofile.contactNO}</td>
                <td>{coachprofile.unique_id}</td>
              </tr>)
            })}
          </tbody>
        </table>
        </div>)
      } else {
        profileItems = <h4>No Profiles Found...</h4>;
      }
    }
  }else{
    if (coachprofiles === null || loading) {
      profileItems = (
        <div className="text-center">
          <Spinner />
        </div>
      );
    } else {
      if (coachprofiles.length > 0 && loading === false) {
        // profileItems = coachprofiles.map(coachprofile => (
        //   <CoachProfileItem key={coachprofile._id} coachprofile={coachprofile} />
        // ));
        profileItems = ( <div className="overflow-auto" style={{width: "100%"}}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Awards</th>
              <th scope="col">Contact</th>
              <th scope="col">Unique ID</th>
            </tr>
          </thead>
          <tbody>
            {coachprofiles.map((coachprofile, index) => {
              return (<tr key={index}>
                <th scope="row">{index + 1}</th>
                <td><Link to={`/coachesprofiles/${coachprofile._id}`}>{coachprofile.name}</Link></td>
                <td>{coachprofile.coachEducation.length}</td>
                <td>{coachprofile.contactNO}</td>
                <td>{coachprofile.unique_id}</td>
              </tr>)
            })}
          </tbody>
        </table>
        </div>)
      } else {
        profileItems = <h4>No Profiles Found...</h4>;
      }
    }
  }
  return (
    <div>
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 mt-5 text-center">Coaches Profiles</h1>
              <TextFieldGroup
               placeholder="Filter by number of Awards, Add Any Awards Number to filter by..."
               type="number"
               value={filterVal}
               name="awards"
               onChange={e => {
                setFilterVal(e.target.value)
                 setfiltering(false)
               }}
              />
              <button className="btn-reg" disabled={!filterVal ? true : false} onClick={filterProfiles}>Filter</button>
              <p className="lead text-center">See Profiles</p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CoachProfiles.propTypes = {
  getCoachProfiles: PropTypes.func.isRequired,
  coachprofiles: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  coachprofiles: state.coachProfiles
});

export default connect(mapStateToProps, { getCoachProfiles })(CoachProfiles);