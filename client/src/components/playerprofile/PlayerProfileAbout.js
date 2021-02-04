import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import {
  AddPlayerMedicalNote,
  AddPlayerNote,
  deletePlayerNote,
  deletePlayerMedicalNote,
  deletePlayerProfile,
} from "../../actions/playerProfileActions";
import isEmpty from "../../validation/isEmpty";

const PlayerProfileAbout = (props) => {
  const [playerNotes, setPlayerNotes] = useState([]);
  const [playerMedicalNotes, setPlayerMedicalNotes] = useState([]);
  const [playernote, setPlayernote] = useState("");
  const [showplayerNoteTextArea, setshowplayerNoteTextArea] = useState(false);
  const [
    showplayerMedicalNoteTextArea,
    setshowplayerMedicalNoteTextArea,
  ] = useState(false);
  const [test, settest] = useState(false);
  const [playermedicalNote, setPlayermedicalNote] = useState("");
  const { playerprofile } = props.playerprofile;

  React.useEffect(() => {
    setPlayerNotes(playerprofile.playerNotes);
    setPlayerMedicalNotes(playerprofile.medicalNotes);
  }, []);

  const showPlayerNoteArea = () => {
    setshowplayerNoteTextArea(!showplayerNoteTextArea);
  };

  const showPlayerMedicalNoteArea = () => {
    setshowplayerMedicalNoteTextArea(!showplayerMedicalNoteTextArea);
  };

  const addplayerNote = () => {
    const note = {
      profileid: props.id,
      id: uuidv4(),
      playerNote: playernote,
    };

    let PlayerNotes = playerNotes;
    PlayerNotes.unshift(note);
    setPlayerNotes(PlayerNotes);
    console.log(playerNotes);
    props.AddPlayerNote(note);
    setPlayernote("");
    setshowplayerNoteTextArea(false);
    console.log(note);
  };

  const addplayerMedicalNote = () => {
    const medicalnote = {
      profileid: props.id,
      id: uuidv4(),
      playerMedicalNote: playermedicalNote,
    };
    let MedicalNotes = playerMedicalNotes;
    MedicalNotes.unshift(medicalnote);
    setPlayerMedicalNotes(MedicalNotes);
    props.AddPlayerMedicalNote(medicalnote);
    setPlayermedicalNote("");
    setshowplayerMedicalNoteTextArea(false);
    console.log(medicalnote);
  };

  const handleDeletePlayerNote = (id) => {
    const deletenoteinfo = {
      id,
      profileid: props.id,
    };

    let PlayerNotes = playerNotes;
    let index = PlayerNotes.map((note) => note.id).indexOf(id);
    if (index > -1) {
      PlayerNotes.splice(index, 1);
      setPlayerNotes(PlayerNotes);
      settest(!test);
      props.deletePlayerNote(deletenoteinfo);
    }
  };

  const handleDeletePlayerMedicalNote = (id) => {
    const deletenoteinfo = {
      id,
      profileid: props.id,
    };

    let PlayerMedicalNotes = playerMedicalNotes;
    let index = PlayerMedicalNotes.map((note) => note.id).indexOf(id);
    if (index > -1) {
      PlayerMedicalNotes.splice(index, 1);
      setPlayerMedicalNotes(PlayerMedicalNotes);
      settest(!test);
      props.deletePlayerMedicalNote(deletenoteinfo);
    }
  };

  const deleteProfile = () => {
    props.deletePlayerProfile(props.id, props.history);
  };

  let playernotescontent = playerNotes.map((playerNote, index) => {
    return (
      <div key={index}>
        <div
          className="card card-body bg-light mb-3 overflow-auto"
          style={{ height: "150px" }}
        >
          {playerNote.playerNote}
        </div>
        <div className="mb-3">
          <button
            className="btn btn-danger"
            onClick={() => handleDeletePlayerNote(playerNote.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });
  let playermedicalnotescontent = playerMedicalNotes.map(
    (playerMedicalNote, index) => {
      return (
        <div key={index}>
          <div
            className="card card-body bg-light mb-3 overflow-auto"
            style={{ height: "150px" }}
          >
            {playerMedicalNote.playerMedicalNote}
          </div>
          <div className="mb-3">
            <button
              className="btn btn-danger"
              onClick={() =>
                handleDeletePlayerMedicalNote(playerMedicalNote.id)
              }
            >
              Delete
            </button>
          </div>
        </div>
      );
    }
  );

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
                  &nbsp; {playerprofile.name}{" "}
                </h5>
                <h5 className="mb-3">
                  Unique ID : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                  {playerprofile.unique_id}{" "}
                </h5>
                <h5 className="mb-3">
                  Age : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; {playerprofile.age}{" "}
                </h5>
                <h5 className="mb-3">
                  Date Of Birth : &nbsp; &nbsp; &nbsp;{" "}
                  {playerprofile.dateofbirth.slice(0, 10)}
                </h5>
                <h5 className="mb-3">
                  Current Group : &nbsp; &nbsp; {playerprofile.currentGroup}{" "}
                </h5>
                <h5 className="mb-3">
                  Contact No : &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                  {playerprofile.contactNO}{" "}
                </h5>
                {playerprofile.parents ? (
                  <div>
                    <h3 className="text-info">
                      {playerprofile.parents ? "Parents" : null}
                    </h3>
                    <h5 className="mb-3">
                      Father : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      &nbsp; &nbsp; {playerprofile.parents.father}{" "}
                    </h5>
                    {playerprofile.parents.mother ? (
                      <h5 className="mb-5">
                        Mother : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; {playerprofile.parents.mother}{" "}
                      </h5>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="col-md-6">
                <h3 className="text-info">Player Notes</h3>
                <button className="btn-reg mb-3" onClick={showPlayerNoteArea}>
                  Add Player Note
                </button>
                {playerNotes.length > 0 ? (
                  <div>
                    {showplayerNoteTextArea === true ? (
                      <div>
                        <textarea
                          rows="4"
                          cols="20"
                          placeholder="Write Player Note here....."
                          value={playernote}
                          onChange={(e) => setPlayernote(e.target.value)}
                        />
                        <button
                          className="btn-reg mb-3"
                          disabled={playernote.length === 0 ? true : false}
                          onClick={addplayerNote}
                        >
                          Add
                        </button>
                      </div>
                    ) : null}
                    {playernotescontent}
                  </div>
                ) : (
                  <div>
                    {showplayerNoteTextArea === true ? (
                      <div>
                        <textarea
                          rows="4"
                          cols="20"
                          placeholder="Write Player Note here....."
                          value={playernote}
                          onChange={(e) => setPlayernote(e.target.value)}
                        />
                        <button
                          className="btn-reg mb-3"
                          disabled={playernote.length === 0 ? true : false}
                          onClick={addplayerNote}
                        >
                          Add
                        </button>
                      </div>
                    ) : null}
                    <div className="lead mb-5">No Player Notes Added yet</div>
                  </div>
                )}
                <h4 className="text-info">Player Medical Notes</h4>
                <button
                  className="btn-reg mb-3"
                  onClick={showPlayerMedicalNoteArea}
                >
                  Add Medical Note
                </button>
                {playerMedicalNotes.length > 0 ? (
                  <div>
                    {showplayerMedicalNoteTextArea === true ? (
                      <div>
                        <textarea
                          rows="4"
                          cols="20"
                          placeholder="Write Player Medical Note here"
                          value={playermedicalNote}
                          onChange={(e) => setPlayermedicalNote(e.target.value)}
                        />
                        <button
                          className="btn-reg mb-3"
                          disabled={
                            playermedicalNote.length === 0 ? true : false
                          }
                          onClick={addplayerMedicalNote}
                        >
                          Add
                        </button>
                      </div>
                    ) : null}
                    {playermedicalnotescontent}
                  </div>
                ) : (
                  <div>
                    {showplayerMedicalNoteTextArea === true ? (
                      <div>
                        <textarea
                          rows="4"
                          cols="20"
                          placeholder="Write Player Medical Note here"
                          value={playermedicalNote}
                          onChange={(e) => setPlayermedicalNote(e.target.value)}
                        />
                        <button
                          className="btn-reg mb-3"
                          disabled={
                            playermedicalNote.length === 0 ? true : false
                          }
                          onClick={addplayerMedicalNote}
                        >
                          Add
                        </button>
                      </div>
                    ) : null}
                    <div className="lead">No Medical Notes Added yet</div>
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Link
                  className="btn-reg"
                  to={`/playerprofile/editplayerprofile/${playerprofile._id}`}
                >
                  Edit Player Profile
                </Link>
                <button className="btn-danger-reg" onClick={deleteProfile}>
                  Delete Player Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PlayerProfileAbout.propTypes = {
  AddPlayerNote: PropTypes.func.isRequired,
  AddPlayerMedicalNote: PropTypes.func.isRequired,
  deletePlayerNote: PropTypes.func.isRequired,
  deletePlayerMedicalNote: PropTypes.func.isRequired,
  deletePlayerProfile: PropTypes.func.isRequired,
  playerprofile: PropTypes.object.isRequired,
};

export default connect(null, {
  AddPlayerNote,
  AddPlayerMedicalNote,
  deletePlayerMedicalNote,
  deletePlayerProfile,
  deletePlayerNote,
})(withRouter(PlayerProfileAbout));
