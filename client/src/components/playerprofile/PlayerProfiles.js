import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getPlayerProfiles } from "../../actions/playerProfileActions";
import {Link} from "react-router-dom"
const PlayerProfiles = (props) => {
  const [filterVal, setFilterVal] = useState(undefined);
  const [age, setage] = useState("");
  const [gender, setgender] = useState("")
  const [playerprofiles, setplayerprofiles] = useState([]);
  const [filtering, setfiltering] = useState(false);
  useEffect(() => {
    props.getPlayerProfiles();
    setplayerprofiles(props.playerprofiles.playerProfiles);
  }, []);

  const handleChange = (e) => {
    setage(e.target.value);
  };

  const handleChangeGender = (e) => {
    setgender(e.target.value);
  };

  let { loading } = props.playerprofiles;
  let playerProfiles = props.playerprofiles.playerProfiles;
  let profileItems
  const filterProfiles = () => {
    setfiltering(true);
    let PlayerProfiles = playerProfiles;
    if(age !== "All" && gender !== "All")
    {
      PlayerProfiles = PlayerProfiles.filter(
        (player) => player.gender === gender && player.age <= age
      );
    }
    setplayerprofiles(PlayerProfiles);
  };
  if (!filtering) {
    if (playerProfiles === null || loading) {
      profileItems = (
        <div className="text-center">
          <Spinner />
        </div>
      );
    } else {
      if (playerProfiles.length > 0 && loading === false) {
        // profileItems = playerProfiles.map((playerprofile) => (
        //   <PlayerProfileItem
        //     key={playerprofile._id}
        //     playerprofile={playerprofile}
        //   />
        // ));
        profileItems = ( <div className="overflow-auto" style={{width: "100%"}}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Gender</th>
              <th scope="col">Group</th>
              <th scope="col">Contact</th>
            </tr>
          </thead>
          <tbody>
            {playerProfiles.map((playerprofile, index) => {
              return (<tr key={index}>
                <th scope="row">{index + 1}</th>
                <td><Link to={`/playerprofiles/${playerprofile._id}`}>{playerprofile.name}</Link></td>
                <td>{playerprofile.age}</td>
                <td>{playerprofile.gender}</td>
                <td>{playerprofile.currentGroup}</td>
                <td>{playerprofile.contactNO}</td>
              </tr>)
            })}
          </tbody>
        </table>
        </div>)
      } else {
        profileItems = <h4>No Profiles Found...</h4>;
      }
    }
  } else {
    if (playerprofiles === null || loading) {
      profileItems = (
        <div className="text-center">
          <Spinner />
        </div>
      );
    } else {
      if (playerprofiles.length > 0 && loading === false) {
        // profileItems = playerprofiles.map((playerprofile) => (
        //   <PlayerProfileItem
        //     key={playerprofile._id}
        //     playerprofile={playerprofile}
        //   />
        // ));
        profileItems = (
          <div className="overflow-auto" style={{width: "100%"}}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Gender</th>
                <th scope="col">Group</th>
                <th scope="col">Contact</th>
              </tr>
            </thead>
            <tbody>
              {playerprofiles.map((playerprofile, index) => {
                return (<tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td><Link to={`/playerprofiles/${playerprofile._id}`}>{playerprofile.name}</Link></td>
                  <td>{playerprofile.age}</td>
                  <td>{playerprofile.gender}</td>
                  <td>{playerprofile.currentGroup}</td>
                  <td>{playerprofile.contactNO}</td>
                </tr>)
              })}
            </tbody>
          </table>
          </div>
        )
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
              <h5 className="label label-default">Select Gender</h5>
                <select
                  className="mb-3 form-control"
                  value={gender}
                  onChange={handleChangeGender}
                >
                  <option>Select Options from Below</option>
                  <option value="All">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              <h5 className="label label-default">Select Age Group</h5>
              <select
                    className="form-control mb-3"
                    value={age}
                    onChange={handleChange}
                  >
                    <option>Select Options from Below</option>
                    <option value="All">All</option>
                    <option value="6">U - 6</option>
                    <option value="7">U - 7</option>
                    <option value="9">U - 9</option>
                    <option value="11">U - 11</option>
                    <option value="13">U - 13</option>
                    <option value="15">U - 15</option>
                    <option value="17">U - 17</option>
                    <option value="20">U - 20</option>
                    <option value="6">U - 6</option>
                    <option value="8">U - 8</option>
                    <option value="10">U - 10</option>
                    <option value="12">U - 12</option>
                    <option value="14">U - 14</option>
                    <option value="16">U - 16</option>
                    <option value="18">U - 18</option>
                    <option value="20">U - 20</option>

                  </select>
              
              <button
                className="btn-reg"
                disabled={!age || !gender ? true : false}
                onClick={filterProfiles}
              >
                Filter
              </button>
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
  playerprofiles: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  playerprofiles: state.playerProfiles,
});

export default connect(mapStateToProps, { getPlayerProfiles })(PlayerProfiles);
