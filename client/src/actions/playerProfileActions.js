import axios from "axios";
import {
  CLEAR_ERRORS,
  GET_ERRORS,
  LOADING,
  LOADINGFALSE,
  GET_PLAYER_PROFILES,
  GET_PLAYER_PROFILE
} from "./types";


export const getPlayerProfiles = () => async dispatch => {
    try {
      dispatch(setProfileLoading());
      const res = await axios.get("/routes/api/playerprofile/all");
      dispatch({
        type: GET_PLAYER_PROFILES,
        payload: res.data.playerprofiles
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
  

export const getPlayerProfileById = (id) => async dispatch => {
  try {
    dispatch(setProfileLoading());
    const res = await axios.get(
      `/routes/api/playerprofile/${id}`
    );

    dispatch({
      type: GET_PLAYER_PROFILE,
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

export const createPlayerProfile = (playerProfileData, history) => async dispatch => {
  try {
    const res = await axios.post(
      "/routes/api/playerprofile/createplayerprofile",
      playerProfileData
    );

    console.log(res);

    history.push("/playerprofiles");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const AddPlayerNote = (playerNote) => async dispatch => {
  try {
    await axios.post(
      "/routes/api/playerprofile/playernote",
      playerNote
    );
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const AddPlayerMedicalNote = (medicalNote) => async dispatch => {
  try {
    await axios.post(
      "/routes/api/playerprofile/medicalnote",
      medicalNote
    );
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const updatePlayerNote = (playerNote) => async dispatch => {
  try {
    await axios.patch(
      "/routes/api/playerprofile/updateplayernote",
      playerNote
    );
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const updatePlayerMedicalNote = (medicalNote) => async dispatch => {
  try {
    await axios.patch(
      "/routes/api/playerprofile/updateplayermedicalnote",
      medicalNote
    );
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const deletePlayerNote = (data) => async dispatch => {
  try {
    await axios.patch(
      "/routes/api/playerprofiless/deleteplayernote",
      data
    );
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const deletePlayerMedicalNote = (data) => async dispatch => {
  try {
    await axios.patch(
      "/routes/api/playerprofiless/deleteplayermedicalnote",
      data
    );
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const editPlayerProfile = (playerProfileData,id, history) => async dispatch => {
  try {
    await axios.put(
      `/routes/api/playerprofile/${id}`,
      playerProfileData
    );
    history.push(`/playerprofiles/${id}`);
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const deletePlayerProfile = (id,history) => async dispatch => {
  try {
    if (window.confirm("Are you sure? This can not be undone")) {
      await axios.delete(
        `/routes/api/playerprofile/${id}`
      );

      history.push("/playerprofiles");
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

