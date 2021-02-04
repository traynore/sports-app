import {
    CLEAR_PROFILES,
    LOADING,
    LOADINGFALSE,
    GET_COACHES_PROFILES,
    GET_COACH_PROFILE,
  } from "../actions/types";
  
  const initialState = {
    coachProfiles: {},
    singleCoachProfile: {},
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case GET_COACHES_PROFILES:
        //console.log(action.payload)
        return {
          ...state,
          coachProfiles: action.payload,
          loading: false,
        };
  
      case GET_COACH_PROFILE:
          return {
              ...state,
              singleCoachProfile: action.payload,
              loading: false
          }
      case LOADING:
        return {
          ...state,
          loading: true,
        };
  
        case CLEAR_PROFILES:
          return {
            ...state,
            coachProfiles: {},
            singleCoachProfile: {},
            loading: false
          };
  
      case LOADINGFALSE:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  };
  