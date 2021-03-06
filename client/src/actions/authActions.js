import axios from "axios";
import { GET_ERRORS, SET_USER, CLEAR_ERRORS, CLEAR_PROFILES } from "./types";
import jwtdecode from "jwt-decode";
import setAuthToken from "../components/utils/SetAuthToken";
export const registerUser = (userData, history) => async dispatch => {
  try {
    await axios.post(
      "/routes/api/register",
      userData
    );

    history.push("/login");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const changePassword = (userData, history) => async dispatch => {
  try {
    const res = await axios.put(
      "/routes/api/changepassword",
      userData
    );

    if(res.data.success === "true")
    {

    history.push("/login");
    }
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const loginUser = (userData, history) => async dispatch => {
  try {
    const res = await axios.post(
      "/routes/api/login",
      userData
    );

    const { token } = res.data;
    localStorage.setItem("JwtToken", token);
    setAuthToken(token);
    const decoded = jwtdecode(token);
    dispatch(setCurrentUser(decoded));
    dispatch({ type: CLEAR_ERRORS });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const setCurrentUser = decoded => dispatch => {
  dispatch({
    type: SET_USER,
    payload: decoded
  });
};
export const logoutUser = () => dispatch => {
  localStorage.removeItem("JwtToken");
  //Remove auth header from future request
  setAuthToken(false);
  //set current user to empty object
  dispatch(setCurrentUser({}));
  dispatch({ type: CLEAR_PROFILES });
};