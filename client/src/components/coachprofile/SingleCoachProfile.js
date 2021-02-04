import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCoachProfileById } from "../../actions/coachProfileActions";
import CoachProfileHeader from "./CoachProfileHeader";
import CoachProfileAbout from "./CoachProfileAbout";
import CoachEducation from "./CoachEducation";

//Spinner
import Spinner from "../common/Spinner";

const SingleCoachProfile = (props) => {
  useEffect(() => {
    props.getCoachProfileById(props.match.params.id);
  }, []);

  const { singleCoachProfile, loading } = props.coachprofile;

  let content;
  if (singleCoachProfile === null || loading) {
    content = (
      <div className="d-flex justify-content-center">
        <Spinner />
      </div>
    );
  } else {
    //check if looged in user has profile data
    if (loading === false && Object.keys(singleCoachProfile).length > 0) {
      content = (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <CoachProfileHeader
                id={props.match.params.id}
                coachprofile={singleCoachProfile}
              />
              <CoachProfileAbout
                id={props.match.params.id}
                coachprofile={singleCoachProfile}
              />
              <CoachEducation
                id={props.match.params.id}
                coachprofile={singleCoachProfile}
              />
            </div>
          </div>
        </div>
      );
    }
  }
  return <div>{content}</div>;
};

SingleCoachProfile.propTypes = {
  getCoachProfileById: PropTypes.func.isRequired,
  coachprofile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  coachprofile: state.coachProfiles,
});

export default connect(mapStateToProps, { getCoachProfileById })(
  SingleCoachProfile
);
