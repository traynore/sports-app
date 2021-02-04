import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import {
  AddCoachEducation,
  deleteCoachEducation,
} from "../../actions/coachProfileActions";
import TextFieldGroup from "../common/TextFieldGroup"

const CoachEducation = (props) => {
  const [coachEducations, setcoachEducations] = useState([]);
  const [category, setcategory] = useState("");
  const [AwardName, setAwardName] = useState("");
  const [test, settest] = useState(false);
  const [errors, seterrors] = useState({});
  const { coachprofile } = props.coachprofile;

  React.useEffect(() => {
    setcoachEducations(coachprofile.coachEducation);
  }, []);

  React.useEffect(() => {
    seterrors(props.errors);
  }, [props.errors]);

  const addEducationCoach = () => {
    const coachedu = {
      profileid: props.id,
      id: uuidv4(),
      category,
      award: AwardName
    };

    let CoachEdcations = coachEducations;
    CoachEdcations.unshift(coachedu);
    setcoachEducations(CoachEdcations);
    props.AddCoachEducation(coachedu);
    setcategory("");
    setAwardName("");
  };

  const handleChange = e => {
    setcategory(e.target.value);
  }

  const handleDeleteCoachEducation = (id) => {
    const deletecoacheducationinfo = {
      id,
      profileid: props.id,
    };

    let CoachEdcations = coachEducations;
    let index = CoachEdcations.map((coachedu) => coachedu.id).indexOf(id);
    if (index > -1) {
      CoachEdcations.splice(index, 1);
      setcoachEducations(CoachEdcations);
      settest(!test);
      props.deleteCoachEducation(deletecoacheducationinfo);
    }
  };

  let coachEducationcontent = coachEducations.map((coachedu, index) => {
    return (
      <div key={index} className="col-md-6">
        <div className="card card-body bg-light mb-2">
          <div><h4>Category: {coachedu.category}</h4></div>
          <div><h4>Award Name: <span className="highlight">{coachedu.award}</span></h4></div>
        </div>
        <button
            className="btn btn-danger mb-2"
            onClick={() => handleDeleteCoachEducation(coachedu.id)}
          >
            Delete
          </button>
      </div>
    );
  });
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h2 className="text-center text-info mb-5">Coach Education and Awards</h2>
            <div className="row">
              <div className="col-md-5">
                <h3 className="text-info">Category</h3>
                  <div>
                    <select
                      className="form-control mb-3"
                      value={category}
                      onChange={handleChange}
                    >
                      <option>Select Options from Below</option>
                      <option value="Children">Children</option>
                      <option value="Youth">Youth</option>
                      <option value="Adult">Adult</option>
                    </select>
                  </div>
              </div>
              <div className="col-md-5">
                <h3 className="text-info">Award Name</h3>
                  <div>
                  <TextFieldGroup
                  placeholder="Enter Award Name"
                  type="text"
                  name="award"
                  value={AwardName}
                  error={errors.award}
                  onChange={e => setAwardName(e.target.value)}
                />
                  </div>
              </div>
              <div className="col-md-2">
              <button onClick={addEducationCoach} disabled={category.length === 0 || AwardName.length === 0 ? true : false} className="btn-reg mb-2">Add Award</button>
              </div>
            </div>
            <div className="row">
              {coachEducationcontent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CoachEducation.propTypes = {
  AddCoachEducation: PropTypes.func.isRequired,
  deleteCoachEducation: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  coachprofile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps, {
  AddCoachEducation,
  deleteCoachEducation,
})(withRouter(CoachEducation));
