import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPlayerProfileById } from "../../actions/playerProfileActions";
import PlayerProfileHeader from "./PlayerProfileHeader"
import PlayerProfileAbout from "./PlayerProfileAbout"

//Spinner
import Spinner from "../common/Spinner";

const SinglePlayerProfile = props => {
  useEffect(() => {
    props.getPlayerProfileById(props.match.params.id);
  }, []);

  const { singlePlayerProfile, loading } = props.playerprofile;

  let content;
  if (singlePlayerProfile === null || loading) {
    content = (
      <div className="d-flex justify-content-center">
        <Spinner />
      </div>
    );
  } else {
    //check if looged in user has profile data
    if (loading === false && Object.keys(singlePlayerProfile).length > 0) {
      content = (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PlayerProfileHeader  id={props.match.params.id} playerprofile={singlePlayerProfile} />
              <PlayerProfileAbout
              id={props.match.params.id}
                playerprofile={singlePlayerProfile}
              />
            </div>
          </div>
        </div>
      );
    }
  }
  return <div>{content}</div>;
};

SinglePlayerProfile.propTypes = {
    getPlayerProfileById: PropTypes.func.isRequired,
    playerprofile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  playerprofile: state.playerProfiles
});

export default connect(mapStateToProps, { getPlayerProfileById })(
  SinglePlayerProfile
);