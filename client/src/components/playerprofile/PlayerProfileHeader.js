import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import defaultAvatar from "../assets/avatar.png";
import { editPlayerProfile } from "../../actions/playerProfileActions";
import { withRouter } from "react-router-dom";

const ProfileHeader = (props) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadChange, setuploadChange] = useState(false);
  const [uploadedFile, setUploadedFile] = useState({});
  const { playerprofile } = props.playerprofile;

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setuploadChange(false);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
      const imgUrl = {
        imgUrl: ".." + filePath,
      };
      setuploadChange(true);
      props.editPlayerProfile(imgUrl, props.id, props.history);
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was an error");
      }
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body mt-4 text-white mb-3">
            <div className="row">
              <div className="col-md-4 m-auto">
                <div className="">
                  <div className="image-cropper text-center m-auto">
                    <img
                      className="img-responsive rounded"
                      // style={{ maxWidth: "100%", maxHeight: "100%" }}
                      src={
                        !uploadChange
                          ? playerprofile.imgUrl
                            ? playerprofile.imgUrl
                            : defaultAvatar
                          : ".." + uploadedFile.filePath
                      }
                      alt="User"
                    />
                  </div>
                </div>
                <form onSubmit={onSubmit} className="mt-3">
                  <div className="custom-file mb-4">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      {filename}
                    </label>
                  </div>
                  <input
                    type="submit"
                    value="Upload Image"
                    className="btn-reg btn-block"
                    disabled={typeof file === "string" ? true : false}
                  />
                </form>
              </div>
            </div>
            <div className="text-center">
              <h2
                className="display-4 text-center"
                style={{ color: "#184170" }}
              >
                {playerprofile.name}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileHeader.propTypes = {
  editPlayerProfile: PropTypes.func.isRequired,
  playerprofile: PropTypes.object.isRequired,
};

export default connect(null, { editPlayerProfile })(withRouter(ProfileHeader));
