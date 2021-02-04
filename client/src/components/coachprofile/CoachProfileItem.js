import React from "react";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/isEmpty";
import DefaultAvatar from "../assets/avatar.png";

const CoachProfileItem = (props) => {
  const { coachprofile } = props;
  return (
    <div>
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-md-2 text-center mb-5">
            <img
              src={coachprofile.imgUrl ? coachprofile.imgUrl : DefaultAvatar}
              alt="User"
              className="rounded-circle"
              style={{ width: "200px", height: "200px" }}
            />
          </div>
          <div className="col-md-9 ml-5 mt-4">
            <h3>
              <Link to={`/coachesprofiles/${coachprofile._id}`}>
                {coachprofile.name}
              </Link>
            </h3>
            <p>
              Unique ID: &nbsp;
              {isEmpty(coachprofile.unique_id) ? null : (
                <span>{coachprofile.unique_id}</span>
              )}
            </p>
            {coachprofile.coachEducation.length > 0 ? (
              <p>
                Awards: &nbsp;
                <span>{coachprofile.coachEducation.length}</span>
              </p>
            ) : null}
            <p>
              Contact No: &nbsp;
              {isEmpty(coachprofile.contactNO) ? null : (
                <span>{coachprofile.contactNO}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachProfileItem;
