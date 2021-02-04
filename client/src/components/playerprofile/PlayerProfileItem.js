import React from "react";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/isEmpty";
import DefaultAvatar from "../assets/avatar.png";

const PlayerProfileItem = props => {
  const { playerprofile } = props;
  return (
    <div>
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-md-2 text-center mb-5">
            <img
              src={playerprofile.imgUrl ? playerprofile.imgUrl : DefaultAvatar}
              alt="User"
              className="rounded-circle"
              style={{width: "200px", height: "200px"}}
            />
          </div>
          <div className="col-md-9 ml-5 mt-4">
            <h3>
              <Link to={`/playerprofiles/${playerprofile._id}`}>
                {playerprofile.name}
              </Link>
            </h3>
            <p>
                Age:  &nbsp;   
              {isEmpty(playerprofile.age) ? null : (
                <span>{playerprofile.age}</span>
              )}
            </p>
            <p>
                Current Group:  &nbsp;   
              {isEmpty(playerprofile.currentGroup) ? null : (
                <span>{playerprofile.currentGroup}</span>
              )}
            </p>
            <p>
                Contact No:  &nbsp;   
              {isEmpty(playerprofile.contactNO) ? null : (
                <span>{playerprofile.contactNO}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfileItem;