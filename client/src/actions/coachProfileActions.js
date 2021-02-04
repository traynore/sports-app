import axios from "axios";
import {
  CLEAR_ERRORS,
  GET_ERRORS,
  LOADING,
  LOADINGFALSE,
  GET_COACHES_PROFILES,
  GET_COACH_PROFILE
} from "./types";


export const getCoachProfiles = () => async dispatch => {
    try {
      dispatch(setProfileLoading());
      const res = await axios.get("/routes/api/coachprofile/all");
      dispatch({
        type: GET_COACHES_PROFILES,
        payload: res.data.coachesprofiles
      });
  
      dispatch({ type: CLEAR_ERRORS });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch({ type: LOADINGFALSE });
    }
  };
  

export const getCoachProfileById = (id) => async dispatch => {
  try {
    dispatch(setProfileLoading());
    const res = await axios.get(
      `/routes/api/coachprofile/${id}`
    );

    dispatch({
      type: GET_COACH_PROFILE,
      payload: res.data
    });

    dispatch({ type: CLEAR_ERRORS });
  } catch (err) {
      console.log(err)
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
    dispatch({ type: LOADINGFALSE });
  }
};

export const createCoachProfile = (coachProfileData, history) => async dispatch => {
  try {
    const res = await axios.post(
      "/routes/api/coachprofile/createcoachprofile",
      coachProfileData
    );

    console.log(res);

    history.push("/coachesprofiles");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const AddCurrentGroup = (currentgroup) => async dispatch => {
  try {
    await axios.post(
      "/routes/api/coachprofile/currentgroup",
      currentgroup
    );
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const AddCoachEducation = (coacheducation) => async dispatch => {
  try {
    await axios.post(
      "/routes/api/coachprofile/coacheducation",
      coacheducation
    );
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};



export const deleteCurrentGroup = (data) => async dispatch => {
  try {
    await axios.patch(
      "/routes/api/coachprofiless/deletecurrentgroup",
      data
    );
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const deleteCoachEducation = (data) => async dispatch => {
  try {
    await axios.patch(
      "/routes/api/coachprofiless/deletecurrenteducation",
      data
    );
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const editCoachProfile = (coachProfileData,id, history) => async dispatch => {
  try {
    await axios.put(
      `/routes/api/coachprofile/${id}`,
      coachProfileData
    );
    history.push(`/coachesprofiles/${id}`);
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const deleteCoachProfile = (id,history) => async dispatch => {
  try {
    if (window.confirm("Are you sure? This can not be undone")) {
      await axios.delete(
        `/routes/api/coachprofile/${id}`
      );

      history.push("/coachesprofiles");
    }
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

//Profile loading
export const setProfileLoading = () => {
  return {
    type: LOADING
  };
};

