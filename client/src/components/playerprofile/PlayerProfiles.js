import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getPlayerProfiles } from "../../actions/playerProfileActions";
import PlayerProfileItem from "./PlayerProfileItem";
import TextFieldGroup from "../common/TextFieldGroup"

const PlayerProfiles = props => {
  const [filterVal, setFilterVal] = useState(undefined)
  const [playerprofiles, setplayerprofiles] = useState([])
  const [filtering, setfiltering] = useState(false)
  useEffect(() => {
      props.getPlayerProfiles()
      setplayerprofiles(props.playerprofiles.playerProfiles)
  }, []);

  let { loading } = props.playerprofiles;
  let playerProfiles = props.playerprofiles.playerProfiles;
  let profileItems;

  const filterProfiles = () => {
    setfiltering(true)
    let PlayerProfiles = playerProfiles;
    PlayerProfiles = PlayerProfiles.filter(player => player.age === parseInt(filterVal))
    setplayerprofiles(PlayerProfiles)
  }
  if(!filtering)
  {
    if (playerProfiles === null || loading) {
      profileItems = (
        <div className="text-center">
          <Spinner />
        </div>
      );
    } else {
      if (playerProfiles.length > 0 && loading === false) {
        profileItems = playerProfiles.map(playerprofile => (
          <PlayerProfileItem key={playerprofile._id} playerprofile={playerprofile} />
        ));
      } else {
        profileItems = <h4>No Profiles Found...</h4>;
      }
    }
  }else{
    if (playerprofiles === null || loading) {
      profileItems = (
        <div className="text-center">
          <Spinner />
        </div>
      );
    } else {
      if (playerprofiles.length > 0 && loading === false) {
        profileItems = playerprofiles.map(playerprofile => (
          <PlayerProfileItem key={playerprofile._id} playerprofile={playerprofile} />
        ));
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
              <h1 className="display-4 mt-5 text-center">Player Profiles</h1>
              <TextFieldGroup
               placeholder="Filter by Age Value, Add Any Age to filter by..."
               type="number"
               value={filterVal}
               name="age"
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

PlayerProfiles.propTypes = {
  getPlayerProfiles: PropTypes.func.isRequired,
  playerprofiles: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  playerprofiles: state.playerProfiles
});

export default connect(mapStateToProps, { getPlayerProfiles })(PlayerProfiles);