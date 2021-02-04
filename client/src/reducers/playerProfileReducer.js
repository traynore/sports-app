import {
  CLEAR_PROFILES,
  LOADING,
  LOADINGFALSE,
  GET_PLAYER_PROFILES,
  GET_PLAYER_PROFILE,
} from "../actions/types";

const initialState = {
  playerProfiles: {},
  singlePlayerProfile: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYER_PROFILES:
      //console.log(action.payload)
      return {
        ...state,
        playerProfiles: action.payload,
        loading: false,
      };

    case GET_PLAYER_PROFILE:
        return {
            ...state,
            singlePlayerProfile: action.payload,
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
          playerProfiles: {},
          singlePlayerProfile: {},
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
